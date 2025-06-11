import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import type { FoodOasisMultiLineChartData } from '@/types';

interface MultiLineChartProps {
  data: FoodOasisMultiLineChartData | null;
  width?: number;
  height?: number;
  loading?: boolean;
}

// Distinct colors optimized for white background
const DISTINCT_COLORS = [
  '#2563eb', // Bright blue
  '#dc2626', // Vibrant red
  '#16a34a', // Green
  '#ea580c', // Orange
  '#9333ea', // Purple
];

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

    d3.select(svgRef.current).selectAll('*').remove();

    // Adjusted margins for better spacing
    const margin = { top: 20, right: 150, bottom: 50, left: 80 };
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
    const defaultPriceRange = [0, 100];

    // Use data if available, otherwise use defaults
    const allYears =
      data && data.lines.length > 0
        ? data.lines.flatMap((line) => line.data_points.map((dp) => dp.year))
        : defaultYears;

    // Calculate normalized prices only if data exists
    let allNormalizedPrices: number[] = defaultPriceRange;
    let normalizedData: any[] = [];

    if (data && data.lines.length > 0) {
      normalizedData = data.lines.map((line) => {
        const basePrice = line.data_points[0].price_per_t;
        return {
          ...line,
          data_points: line.data_points.map((point) => ({
            ...point,
            normalized_price: ((point.price_per_t - basePrice) / basePrice) * 100,
          })),
        };
      });

      allNormalizedPrices = normalizedData.flatMap((line) =>
        line.data_points.map((point: { normalized_price: number }) => point.normalized_price)
      );
    }

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allYears) as [number, number])
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(allNormalizedPrices) as [number, number])
      .range([chartHeight, 0]);

    // Grid lines (subtle)
    chartGroup
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-chartHeight)
          .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.1);

    chartGroup
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => '')
      )
      .style('stroke-dasharray', '3,3')
      .style('opacity', 0.1);

    // Axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d')).ticks(10);

    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d3.format('+,.0f')(d)}%`);

    // X axis
    chartGroup
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis)
      .style('color', 'var(--color-base-content)')
      .style('font-size', '12px');

    // Y axis
    chartGroup
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .style('color', 'var(--color-base-content)')
      .style('font-size', '12px');

    // Axis labels
    chartGroup
      .append('text')
      .attr('class', 'x-label')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + 50)
      .style('text-anchor', 'middle')
      .style('fill', 'var(--color-base-content)')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .text('Year');

    chartGroup
      .append('text')
      .attr('class', 'y-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -chartHeight / 2)
      .attr('y', -60)
      .style('text-anchor', 'middle')
      .style('fill', 'var(--color-base-content)')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .text('Price Change (%)');

    // Zero line (more prominent)
    chartGroup
      .append('line')
      .attr('x1', 0)
      .attr('x2', chartWidth)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0))
      .style('stroke', 'var(--color-base-content)')
      .style('stroke-width', 1)
      .style('opacity', 0.3);

    // Tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'chart-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px 12px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('z-index', '1000');

    if (data && data.lines.length) {
      // Line generator
      const line = d3
        .line<{ year: number; normalized_price: number }>()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.normalized_price))
        .curve(d3.curveMonotoneX);

      // Create a group for each country's line
      const lineGroups = chartGroup
        .selectAll('.line-group')
        .data(normalizedData)
        .enter()
        .append('g')
        .attr('class', 'line-group');

      // Draw lines
      lineGroups
        .append('path')
        .attr('class', 'price-line')
        .attr('d', (d) => line(d.data_points))
        .style('fill', 'none')
        .style('stroke', (d, i) => DISTINCT_COLORS[i % DISTINCT_COLORS.length])
        .style('stroke-width', 3)
        .style('opacity', 0.9)
        .style('transition', 'opacity 0.2s');

      // Add invisible wider hover area for better interaction
      lineGroups
        .append('path')
        .attr('class', 'hover-line')
        .attr('d', (d) => line(d.data_points))
        .style('fill', 'none')
        .style('stroke', 'transparent')
        .style('stroke-width', 20)
        .style('cursor', 'pointer')
        .on('mousemove', function (event, lineData) {
          // Find closest data point
          const [mouseX] = d3.pointer(event);
          const year = Math.round(xScale.invert(mouseX));
          const dataPoint = lineData.data_points.find((d: any) => d.year === year);

          if (dataPoint) {
            tooltip
              .style('visibility', 'visible')
              .html(
                `
                <div><strong>${lineData.area_name}</strong></div>
                <div>Year: ${dataPoint.year}</div>
                <div>Change: ${dataPoint.normalized_price > 0 ? '+' : ''}${dataPoint.normalized_price.toFixed(1)}%</div>
                <div>Price: ${lineData.currency} ${dataPoint.price_per_t.toFixed(2)}</div>
              `
              )
              .style('top', event.pageY - 10 + 'px')
              .style('left', event.pageX + 10 + 'px');
          }
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        });

      // Legend (vertical on the right)
      const legendContainer = svg
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${dimensions.width - margin.right + 20}, ${margin.top})`);

      const legendItems = legendContainer
        .selectAll('.legend-item')
        .data(data.lines)
        .enter()
        .append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 25})`);

      // Legend dots
      legendItems
        .append('circle')
        .attr('cx', 8)
        .attr('cy', 8)
        .attr('r', 6)
        .style('fill', (d, i) => DISTINCT_COLORS[i % DISTINCT_COLORS.length]);

      // Legend text
      legendItems
        .append('text')
        .attr('x', 20)
        .attr('y', 8)
        .attr('dy', '0.35em')
        .style('fill', 'var(--color-base-content)')
        .style('font-size', '13px')
        .style('font-weight', '400')
        .text((d) => d.area_name);
    }

    // Cleanup tooltip on unmount
    return () => {
      d3.select('body').selectAll('.chart-tooltip').remove();
    };
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
      {loading && (
        <div className="absolute inset-0 bg-black/3 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-300/30 rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Loading data...</p>
          </div>
        </div>
      )}
    </div>
  );
}
