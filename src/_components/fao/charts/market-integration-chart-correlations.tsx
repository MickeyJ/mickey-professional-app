import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import { stringToColorCountry } from '@/lib/utils';
import type {
  FAOMarketIntegrationCorrelationData,
  // FAOMarketIntegrationComparison
} from '@/types';

interface MarketIntegrationCorrelationsChartProps {
  data: FAOMarketIntegrationCorrelationData | null;
  width?: number;
  height?: number;
  loading?: boolean;
}

export default function MarketIntegrationCorrelationsChart({
  data,
  loading,
  width = 800,
  height = 1000,
}: MarketIntegrationCorrelationsChartProps) {
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

    // console.log('Rendering Market Integration Chart with data:', data);

    d3.select(svgRef.current).selectAll('*').remove();

    // Adjusted margins for better spacing
    const margin = { top: 20, right: 150, bottom: 50, left: 100 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height);

    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    if (data && data.comparisons_count) {
      const integrationColor = d3
        .scaleOrdinal<string>()
        .domain(['high', 'moderate', 'none'])
        .range(['#22c55e', '#f59e0b', '#ef4444']);

      // Calculate height needed
      const trackHeight = 70;
      const trackSpacing = 15;
      const totalHeight = data.comparisons.length * (trackHeight + trackSpacing);

      // Update SVG height if needed
      if (totalHeight > chartHeight) {
        svg.attr('height', totalHeight + margin.top + margin.bottom);
      }

      // Set up scales
      const xScale = d3
        .scaleLinear()
        .domain([data.analysis_period.start_year, data.analysis_period.end_year])
        .range([0, chartWidth]);

      // Find the overall price range
      const allPrices = data.comparisons.flatMap((comp) =>
        comp.time_series.flatMap((d) => [d.price1, d.price2])
      );
      const priceExtent = d3.extent(allPrices) as [number, number];

      // Create a track for each comparison
      const tracks = chartGroup
        .selectAll('.track')
        .data(data.comparisons)
        .join('g')
        .attr('class', 'track')
        .attr('transform', (d, i) => `translate(0, ${i * (trackHeight + trackSpacing)})`);

      // Add background for each track
      tracks
        .append('rect')
        .attr('width', chartWidth)
        .attr('height', trackHeight)
        .attr('fill', 'var(--color-base-2-bg)')
        .attr('stroke', 'var(--color-base-2-brdr)')
        .attr('rx', 4);

      // Add country pair labels
      tracks
        .append('text')
        .attr('x', -10)
        .attr('y', trackHeight / 2.5)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '11px')
        .style('fill', 'var(--color-base-content)')
        .style('stroke-width', 0.75)
        .style('stroke', (d) => stringToColorCountry(d.country_pair.country1))
        .text((d) => `${d.country_pair.country1.area_name}`);

      tracks
        .append('text')
        .attr('x', -10)
        .attr('y', trackHeight / 1.5)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '11px')
        .style('fill', 'var(--color-base-content)')
        .style('stroke-width', 0.75)
        .style('stroke', (d) => stringToColorCountry(d.country_pair.country2))
        .text((d) => `${d.country_pair.country2.area_name}`);

      // Add integration level indicator
      tracks
        .append('circle')
        .attr('cx', chartWidth + 20)
        .attr('cy', trackHeight / 2)
        .attr('r', 6)
        .attr('fill', (d) => integrationColor(d.calculated_metrics.correlation_based_integration));

      // Scale for prices within each track
      const priceScale = d3
        .scaleLinear()
        .domain(priceExtent)
        .range([trackHeight - 10, 10]);

      // Create line generators for both prices
      const line1 = d3
        .line<any>()
        .x((d) => xScale(d.year))
        .y((d) => priceScale(d.price1))
        .curve(d3.curveMonotoneX);

      const line2 = d3
        .line<any>()
        .x((d) => xScale(d.year))
        .y((d) => priceScale(d.price2))
        .curve(d3.curveMonotoneX);

      // Draw lines for each track
      tracks.each(function (trackData) {
        const track = d3.select(this);

        const { country1, country2 } = trackData.country_pair;

        const timeWithCountries = trackData.time_series.map((d) => ({
          year: d.year,
          price1: d.price1,
          price2: d.price2,
          ratio: d.ratio,
          country1,
          country2,
        }));

        // console.log('timeWithCountries', timeWithCountries);

        // Draw line for country 1
        track
          .append('path')
          .datum(timeWithCountries)
          .attr('fill', 'none')
          .attr('stroke', (d) => {
            return stringToColorCountry(d[0].country1);
          })
          .attr('stroke-width', 2)
          .attr('opacity', 0.8)
          .attr('d', line1);

        // Draw line for country 2
        track
          .append('path')
          .datum(timeWithCountries)
          .attr('fill', 'none')
          .attr('stroke', (d) => {
            return stringToColorCountry(d[0].country2);
          })
          .attr('stroke-width', 2)
          .attr('opacity', 0.8)
          .attr('d', line2);
      });

      // Add X axis
      chartGroup
        .append('g')
        .attr(
          'transform',
          `translate(0, ${data.comparisons.length * (trackHeight + trackSpacing)})`
        )
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
        .style('color', 'var(--color-base-content)');

      // Add legend
      const legend = svg
        .append('g')
        .attr('transform', `translate(${dimensions.width - 90}, ${margin.top})`);

      ['high', 'moderate', 'none'].forEach((level, i) => {
        const g = legend.append('g').attr('transform', `translate(0, ${i * 20})`);

        g.append('circle').attr('r', 6).attr('fill', integrationColor(level));

        g.append('text')
          .attr('x', 10)
          .attr('y', 0)
          .attr('dominant-baseline', 'middle')
          .style('font-size', '11px')
          .style('fill', 'var(--color-base-content)')
          .text(level);
      });

      // Add tooltip
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'chart-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'rgba(0, 0, 0, 0.9)')
        .style('color', 'white')
        .style('padding', '10px')
        .style('border-radius', '4px')
        .style('font-size', '12px');

      // Add hover interactions
      tracks.each(function (trackData) {
        const track = d3.select(this);

        // Add invisible wider rect for better hover detection
        track
          .append('rect')
          .attr('width', chartWidth)
          .attr('height', trackHeight)
          .attr('fill', 'transparent')
          .style('cursor', 'pointer')
          .on('mousemove', function (event) {
            // Find nearest data point
            const [mouseX] = d3.pointer(event, this);
            const year = Math.round(xScale.invert(mouseX));
            const dataPoint = trackData.time_series.find((d) => d.year === year);

            if (dataPoint) {
              tooltip
                .style('visibility', 'visible')
                .html(
                  `
                  <strong>${year}</strong><br/>
                  ${trackData.country_pair.country1.area_name}: $${dataPoint.price1.toFixed(2)}<br/>
                  ${trackData.country_pair.country2.area_name}: $${dataPoint.price2.toFixed(2)}<br/>
                  Ratio: ${dataPoint.ratio.toFixed(3)}<br/>
                  Correlation: ${trackData.calculated_metrics.correlation}<br/>
                  Integration: <span style="color: ${integrationColor(trackData.calculated_metrics.correlation_based_integration)}">${trackData.calculated_metrics.correlation_based_integration}</span>
                `
                )
                .style('left', event.pageX + 10 + 'px')
                .style('top', event.pageY - 10 + 'px');
            }
          })
          .on('mouseout', function () {
            tooltip.style('visibility', 'hidden');
          });
      });
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

      {!(data && data.comparisons_count) && !loading && (
        <div className=" flex items-center justify-center">
          <p className="text-gray-500 text-sm">Choose a commodity and some countries!</p>
        </div>
      )}
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
