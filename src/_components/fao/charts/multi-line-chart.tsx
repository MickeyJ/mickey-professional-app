import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import { stringToColor } from '@/lib/utils';
import type { FoodOasisMultiLineChartData } from '@/types';

interface MultiLineChartProps {
  data: FoodOasisMultiLineChartData | null;
  width?: number;
  height?: number;
  loading?: boolean;
}

export default function MultiLineChart({
  data,
  loading,
  width = 800,
  height = 500,
}: MultiLineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const containerWidth = svgRef.current.parentElement?.clientWidth || width;
        setDimensions({
          width: containerWidth,
          height,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll('*').remove(); // Clear previous content
    const margin = { top: 20, right: 100, bottom: 30, left: 70 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Default domain values when no data is present
    const defaultYears = [2010, 2023];
    const defaultPriceRange = [0, 100]; // Default price change range -20% to +20%

    // Use data if available, otherwise use defaults
    const allYears =
      data && data.lines.length > 0
        ? data.lines.flatMap((line) => line.data_points.map((dp) => dp.year))
        : defaultYears;

    // Calculate normalized prices only if data exists
    let allNormalizedPrices: number[] = defaultPriceRange;
    let normalizedData: any[] = [];

    // Add this data transformation before creating scales
    if (data && data.lines.length > 0) {
      normalizedData = data.lines.map((line) => {
        const basePrice = line.data_points[0].price_per_t; // First year as baseline
        return {
          ...line,
          data_points: line.data_points.map((point) => ({
            ...point,
            normalized_price: ((point.price_per_t - basePrice) / basePrice) * 100,
            // normalized_price: point.price_per_t,
          })),
        };
      });

      allNormalizedPrices = normalizedData.flatMap((line) =>
        line.data_points.map((point: { normalized_price: number }) => point.normalized_price)
      );
    }

    // years
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allYears) as [number, number])
      .range([0, chartWidth]);

    // prices
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(allNormalizedPrices) as [number, number]) // from 0 to max price
      .range([chartHeight, 0]);

    // color for different lines?
    // const colorScale = d3
    //   .scaleOrdinal(d3.schemeCategory10)
    //   .domain(normalizedData.map((line) => line.area_name));

    // years axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(d3.format('d')) // format as integer
      .ticks(8); // nice spacing

    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d3.format(',.0f')(d)}%`); // $1,832

    // add x axis to chart
    chartGroup
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`) // move to bottom
      .call(xAxis);

    // Add Y Axis to chart
    chartGroup
      .append('g') // what is g?
      .attr('class', 'y-axis')
      .call(yAxis);

    // add axis labels - years
    chartGroup
      .append('text')
      .attr('class', 'x-label')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + 40)
      .style('text-anchor', 'middle')
      .text('Year');

    // add vertical axis labels - price change
    chartGroup
      .append('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -chartHeight / 2)
      .attr('y', -50)
      .style('text-anchor', 'middle')
      .style('fill', 'var(--color-base-content)')
      .text('Price Change (%)'); // Change in price from first year

    // Add after creating the axes, before drawing lines
    chartGroup
      .append('line')
      .attr('x1', 0)
      .attr('x2', chartWidth)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0))
      .style('stroke', '#999')
      .style('stroke-width', 2)
      .style('stroke-dasharray', '7,7') // slightly longer dashes
      .style('opacity', 0.7);

    chartGroup
      .append('text')
      .attr('x', chartWidth + 5)
      .attr('y', yScale(0))
      .attr('dy', '0.3em')
      .style('fill', '#666')
      .style('font-size', '10px')
      .text('0%');

    if (data && data.lines.length) {
      // Create the line generator
      const line = d3
        .line<{ year: number; normalized_price: number }>()
        .x((d) => xScale(d.year)) // Use xScale to position points horizontally
        .y((d) => yScale(d.normalized_price)) // Use yScale to position points vertically
        .curve(d3.curveMonotoneX); // Smooth curve that preserves monotonicity

      // Create a group for each country's line
      const lineGroups = chartGroup
        .selectAll('.line-group')
        .data(normalizedData) // Bind each country's data
        .enter()
        .append('g')
        .attr('class', 'line-group');

      // Draw the actual lines
      lineGroups
        .append('path')
        .attr('class', 'price-line')
        .attr('d', (d) => line(d.data_points)) // Use our line generator
        .style('fill', 'none') // Lines should not be filled
        .style('stroke', (d) => stringToColor(d.area_name)) // Color by country
        .style('stroke-width', 2.5)
        .style('opacity', 0.8);

      // Create legend
      const legend = chartGroup
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${chartWidth + 20}, 20)`); // Position to the right

      // Create legend items
      const legendItems = legend
        .selectAll('.legend-item')
        .data(data.lines)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 25})`); // Stack vertically

      // Add colored rectangles
      legendItems
        .append('rect')
        .attr('width', 18) // Make wider to accommodate text
        .attr('height', 18)
        .style('fill', (d) => stringToColor(d.area_name))
        .style('stroke', '#333')
        .style('stroke-width', 1);

      // Add currency text inside the rectangles
      legendItems
        .append('text')
        .attr('x', 9) // Center horizontally in the 50px wide rectangle
        .attr('y', 9)
        .attr('dy', '0.35em')
        .style('fill', 'black')
        .style('font-size', '8px')
        .style('font-weight', 'bold')
        .style('text-anchor', 'middle')
        // .style('text-shadow', '2px 1px 2px rgba(0,0,0,0.8)') // Better readability
        .text((d) => d.currency);

      // Add country names
      legendItems
        .append('text')
        .attr('x', 25)
        .attr('y', 9)
        .attr('dy', '0.35em') // Center vertically
        .style('fill', 'var(--color-base-content)')
        .style('font-size', '12px')
        .attr('class', 'max-w-10 truncate')
        .text((d) => d.area_name)
        .text((d) => {
          const maxLength = 10; // Maximum character length
          return d.area_name.length > maxLength
            ? d.area_name.substring(0, maxLength) + '...'
            : d.area_name;
        });
    }
  }, [data, dimensions]);

  return (
    <div className="w-full overflow-hidden relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      />
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-300/30 rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Loading data...</p>
          </div>
        </div>
      )}
    </div>
  );
}
