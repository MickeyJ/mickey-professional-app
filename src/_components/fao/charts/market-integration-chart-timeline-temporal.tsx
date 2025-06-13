// import { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// import { stringToColorCountry } from '@/lib/utils';
// import type {
//   FAOMarketIntegration,
//   // FAOMarketIntegrationComparison
// } from '@/types';

// interface MarketIntegrationChartProps {
//   data: FAOMarketIntegration | null;
//   width?: number;
//   height?: number;
//   loading?: boolean;
// }

// // Helper function to calculate correlation between two arrays
// function calculateCorrelation(arr1: number[], arr2: number[]): number {
//   const n = arr1.length;
//   if (n !== arr2.length || n === 0) return 0;

//   const mean1 = arr1.reduce((a, b) => a + b) / n;
//   const mean2 = arr2.reduce((a, b) => a + b) / n;

//   let numerator = 0;
//   let denom1 = 0;
//   let denom2 = 0;

//   for (let i = 0; i < n; i++) {
//     const diff1 = arr1[i] - mean1;
//     const diff2 = arr2[i] - mean2;
//     numerator += diff1 * diff2;
//     denom1 += diff1 * diff1;
//     denom2 += diff2 * diff2;
//   }

//   const denominator = Math.sqrt(denom1) * Math.sqrt(denom2);
//   return denominator === 0 ? 0 : numerator / denominator;
// }

// // Calculate rolling correlation for each year
// function calculateRollingCorrelations(timeSeries: any[], windowSize: number = 3) {
//   const correlations = [];

//   for (let i = 0; i < timeSeries.length; i++) {
//     if (i < windowSize - 1) {
//       // Not enough data for window, use overall correlation
//       correlations.push(null);
//     } else {
//       // Get window of data
//       const window = timeSeries.slice(Math.max(0, i - windowSize + 1), i + 1);

//       // Calculate returns for the window
//       const returns1 = [];
//       const returns2 = [];

//       for (let j = 1; j < window.length; j++) {
//         const return1 = (window[j].price1 - window[j - 1].price1) / window[j - 1].price1;
//         const return2 = (window[j].price2 - window[j - 1].price2) / window[j - 1].price2;
//         returns1.push(return1);
//         returns2.push(return2);
//       }

//       // Calculate correlation for this window
//       const correlation = returns1.length > 0 ? calculateCorrelation(returns1, returns2) : 0;
//       correlations.push(correlation);
//     }
//   }

//   return correlations;
// }

// export default function MarketIntegrationChart({
//   data,
//   loading,
//   width = 800,
//   height = 500,
// }: MarketIntegrationChartProps) {
//   const svgRef = useRef<SVGSVGElement>(null);
//   const [dimensions, setDimensions] = useState({ width, height });

//   useEffect(() => {
//     const handleResize = () => {
//       if (svgRef.current) {
//         const containerWidth = svgRef.current.parentElement?.clientWidth || width;
//         setDimensions({
//           width: containerWidth,
//           height,
//         });
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, [width, height]);

//   useEffect(() => {
//     if (!svgRef.current) return;

//     d3.select(svgRef.current).selectAll('*').remove();

//     // Adjusted margins for better spacing
//     const margin = { top: 20, right: 150, bottom: 50, left: 100 };
//     const chartWidth = dimensions.width - margin.left - margin.right;
//     const chartHeight = dimensions.height - margin.top - margin.bottom;

//     const svg = d3
//       .select(svgRef.current)
//       .attr('width', dimensions.width)
//       .attr('height', dimensions.height)
//       .attr('overflow-y', 'scroll');

//     const chartGroup = svg
//       .append('g')
//       .attr('transform', `translate(${margin.left}, ${margin.top})`);

//     if (data && data.comparisons_count) {
//       const integrationColor = d3
//         .scaleOrdinal<string>()
//         .domain(['high', 'moderate', 'none'])
//         .range(['#22c55e', '#f59e0b', '#ef4444']);

//       // Create color scale for correlation-based coloring
//       const correlationColorScale = d3
//         .scaleLinear<string>()
//         .domain([-1, 0, 1])
//         .range(['#ef4444', '#f97316', '#eab308']) // red -> orange -> yellow
//         .clamp(true);

//       // Calculate height needed
//       const trackHeight = 70;
//       const trackSpacing = 15;
//       const totalHeight = data.comparisons.length * (trackHeight + trackSpacing);

//       // Update SVG height if needed
//       if (totalHeight > chartHeight) {
//         svg.attr('height', totalHeight + margin.top + margin.bottom);
//       }

//       // Create defs element for gradients
//       const defs = svg.append('defs');

//       // Set up scales
//       const xScale = d3
//         .scaleLinear()
//         .domain([data.analysis_period.start_year, data.analysis_period.end_year])
//         .range([0, chartWidth]);

//       // Find the overall price range
//       const allPrices = data.comparisons.flatMap((comp) =>
//         comp.time_series.flatMap((d) => [d.price1, d.price2])
//       );
//       const priceExtent = d3.extent(allPrices) as [number, number];

//       // Create a track for each comparison
//       const tracks = chartGroup
//         .selectAll('.track')
//         .data(data.comparisons)
//         .join('g')
//         .attr('class', 'track')
//         .attr('transform', (d, i) => `translate(0, ${i * (trackHeight + trackSpacing)})`);

//       // Add background for each track
//       tracks
//         .append('rect')
//         .attr('width', chartWidth)
//         .attr('height', trackHeight)
//         .attr('fill', 'var(--color-base-2-bg)')
//         .attr('stroke', 'var(--color-base-2-brdr)')
//         .attr('rx', 4);

//       // Add country pair labels
//       tracks
//         .append('text')
//         .attr('x', -10)
//         .attr('y', trackHeight / 2.5)
//         .attr('text-anchor', 'end')
//         .attr('dominant-baseline', 'middle')
//         .style('font-size', '11px')
//         .style('fill', 'var(--color-base-content)')
//         .style('stroke-width', 0.75)
//         .style('stroke', '#f97316')
//         .text((d) => `${d.country_pair.country1.area_name}`);

//       tracks
//         .append('text')
//         .attr('x', -10)
//         .attr('y', trackHeight / 1.5)
//         .attr('text-anchor', 'end')
//         .attr('dominant-baseline', 'middle')
//         .style('font-size', '11px')
//         .style('fill', 'var(--color-base-content)')
//         .style('stroke-width', 0.75)
//         .style('stroke', '#3b82f6') // Blue for country2
//         .text((d) => `${d.country_pair.country2.area_name}`);

//       // Add integration level indicator
//       tracks
//         .append('circle')
//         .attr('cx', chartWidth + 20)
//         .attr('cy', trackHeight / 2)
//         .attr('r', 6)
//         .attr('fill', (d) => integrationColor(d.calculated_metrics.correlation_based_integration));

//       // Scale for prices within each track
//       const priceScale = d3
//         .scaleLinear()
//         .domain(priceExtent)
//         .range([trackHeight - 10, 10]);

//       // Draw lines for each track
//       tracks.each(function (trackData, trackIndex) {
//         const track = d3.select(this);
//         const { country1, country2 } = trackData.country_pair;

//         // Calculate rolling correlations
//         const rollingCorrelations = calculateRollingCorrelations(trackData.time_series, 3);

//         // Fill in null values with overall correlation
//         const overallCorr = trackData.calculated_metrics.correlation || 0;
//         const correlations = rollingCorrelations.map((c) => (c !== null ? c : overallCorr));

//         // Draw country2 line (blue, constant color)
//         const line2 = d3
//           .line<any>()
//           .x((d) => xScale(d.year))
//           .y((d) => priceScale(d.price2))
//           .curve(d3.curveMonotoneX);

//         track
//           .append('path')
//           .datum(trackData.time_series)
//           .attr('fill', 'none')
//           .attr('stroke', '#3b82f6') // Blue color
//           .attr('stroke-width', 2)
//           .attr('opacity', 0.8)
//           .attr('d', line2);

//         // For country1, first draw a full line in the base color
//         const line1 = d3
//           .line<any>()
//           .x((d) => xScale(d.year))
//           .y((d) => priceScale(d.price1))
//           .curve(d3.curveMonotoneX);

//         // Draw base line
//         track
//           .append('path')
//           .datum(trackData.time_series)
//           .attr('fill', 'none')
//           .attr('stroke', correlationColorScale(overallCorr))
//           .attr('stroke-width', 3)
//           .attr('opacity', 0.3)
//           .attr('d', line1);

//         // Add colored segments on top
//         const segmentGroup = track.append('g').attr('class', 'colored-segments');

//         // Draw overlapping segments for smooth color transitions
//         for (let i = 0; i < trackData.time_series.length - 1; i++) {
//           const segmentCorr = correlations[Math.min(i + 1, correlations.length - 1)] || overallCorr;

//           // Create a subset of data points for this segment (with overlap for smoothness)
//           const startIdx = Math.max(0, i - 2);
//           const endIdx = Math.min(trackData.time_series.length - 1, i + 3);
//           const segmentData = trackData.time_series.slice(startIdx, endIdx + 1);

//           // Create a clip path for this segment
//           const clipId = `clip-${trackIndex}-${i}`;
//           const clipWidth =
//             i === trackData.time_series.length - 2
//               ? chartWidth - xScale(trackData.time_series[i].year)
//               : xScale(trackData.time_series[i + 1].year) - xScale(trackData.time_series[i].year);

//           // Add clip path to defs
//           defs
//             .append('clipPath')
//             .attr('id', clipId)
//             .append('rect')
//             .attr('x', xScale(trackData.time_series[i].year))
//             .attr('y', 0)
//             .attr('width', clipWidth)
//             .attr('height', trackHeight);

//           // Draw the segment
//           segmentGroup
//             .append('path')
//             .datum(segmentData)
//             .attr('fill', 'none')
//             .attr('stroke', correlationColorScale(segmentCorr))
//             .attr('stroke-width', 3)
//             .attr('opacity', 0.8)
//             .attr('d', line1)
//             .attr('clip-path', `url(#${clipId})`);
//         }
//       });

//       // Add X axis
//       chartGroup
//         .append('g')
//         .attr(
//           'transform',
//           `translate(0, ${data.comparisons.length * (trackHeight + trackSpacing)})`
//         )
//         .call(d3.axisBottom(xScale).tickFormat(d3.format('d')))
//         .style('color', 'var(--color-base-content)');

//       // Add legend
//       const legend = svg
//         .append('g')
//         .attr('transform', `translate(${dimensions.width - 120}, ${margin.top})`);

//       // Integration level legend
//       ['high', 'moderate', 'none'].forEach((level, i) => {
//         const g = legend.append('g').attr('transform', `translate(30, ${i * 20})`);

//         g.append('circle').attr('r', 6).attr('fill', integrationColor(level));

//         g.append('text')
//           .attr('x', 10)
//           .attr('y', 0)
//           .attr('dominant-baseline', 'middle')
//           .style('font-size', '11px')
//           .style('fill', 'var(--color-base-content)')
//           .text(level);
//       });

//       // Add correlation gradient legend
//       const gradientLegend = legend.append('g').attr('transform', `translate(30, 80)`);

//       gradientLegend
//         .append('text')
//         .attr('x', 0)
//         .attr('y', -5)
//         .style('font-size', '10px')
//         .style('fill', 'var(--color-base-content)')
//         .text('Correlation:');

//       // Create gradient
//       const gradientId = 'correlation-gradient';
//       const linearGradient = defs
//         .append('linearGradient')
//         .attr('id', gradientId)
//         .attr('x1', '0%')
//         .attr('x2', '100%');

//       linearGradient.append('stop').attr('offset', '0%').style('stop-color', '#ef4444');

//       linearGradient.append('stop').attr('offset', '50%').style('stop-color', '#f97316');

//       linearGradient.append('stop').attr('offset', '100%').style('stop-color', '#eab308');

//       gradientLegend
//         .append('rect')
//         .attr('x', 0)
//         .attr('y', 5)
//         .attr('width', 80)
//         .attr('height', 10)
//         .style('fill', `url(#${gradientId})`);

//       gradientLegend
//         .append('text')
//         .attr('x', 0)
//         .attr('y', 25)
//         .style('font-size', '9px')
//         .style('fill', 'var(--color-base-content)')
//         .text('-1');

//       gradientLegend
//         .append('text')
//         .attr('x', 80)
//         .attr('y', 25)
//         .attr('text-anchor', 'end')
//         .style('font-size', '9px')
//         .style('fill', 'var(--color-base-content)')
//         .text('1');

//       // Add tooltip
//       const tooltip = d3
//         .select('body')
//         .append('div')
//         .attr('class', 'chart-tooltip')
//         .style('position', 'absolute')
//         .style('visibility', 'hidden')
//         .style('background-color', 'rgba(0, 0, 0, 0.9)')
//         .style('color', 'white')
//         .style('padding', '10px')
//         .style('border-radius', '4px')
//         .style('font-size', '12px');

//       // Add hover interactions
//       tracks.each(function (trackData) {
//         const track = d3.select(this);
//         const rollingCorrelations = calculateRollingCorrelations(trackData.time_series, 3);

//         // Add invisible wider rect for better hover detection
//         track
//           .append('rect')
//           .attr('width', chartWidth)
//           .attr('height', trackHeight)
//           .attr('fill', 'transparent')
//           .style('cursor', 'pointer')
//           .on('mousemove', function (event) {
//             // Find nearest data point
//             const [mouseX] = d3.pointer(event, this);
//             const year = Math.round(xScale.invert(mouseX));
//             const dataIndex = trackData.time_series.findIndex((d) => d.year === year);
//             const dataPoint = trackData.time_series[dataIndex];

//             if (dataPoint) {
//               const localCorr = rollingCorrelations[dataIndex];
//               const corrText = localCorr !== null ? localCorr.toFixed(3) : 'N/A';

//               tooltip
//                 .style('visibility', 'visible')
//                 .html(
//                   `
//                   <strong>${year}</strong><br/>
//                   ${trackData.country_pair.country1.area_name}: $${dataPoint.price1.toFixed(2)}<br/>
//                   ${trackData.country_pair.country2.area_name}: $${dataPoint.price2.toFixed(2)}<br/>
//                   Ratio: ${dataPoint.ratio.toFixed(3)}<br/>
//                   Local Correlation: ${corrText}<br/>
//                   Overall Correlation: ${trackData.calculated_metrics.correlation}<br/>
//                   Integration: <span style="color: ${integrationColor(trackData.calculated_metrics.correlation_based_integration)}">${trackData.calculated_metrics.correlation_based_integration}</span>
//                 `
//                 )
//                 .style('left', event.pageX + 10 + 'px')
//                 .style('top', event.pageY - 10 + 'px');
//             }
//           })
//           .on('mouseout', function () {
//             tooltip.style('visibility', 'hidden');
//           });
//       });
//     }

//     // Cleanup tooltip on unmount
//     return () => {
//       d3.select('body').selectAll('.chart-tooltip').remove();
//     };
//   }, [data, dimensions]);

//   return (
//     <div className="w-full overflow-hidden relative">
//       <svg
//         ref={svgRef}
//         width={dimensions.width}
//         height={dimensions.height}
//         className="w-full"
//         preserveAspectRatio="xMidYMid meet"
//       />
//       {!(data && data.comparisons_count) && !loading && (
//         <div className=" flex items-center justify-center">
//           <p className="text-gray-500 text-sm">Choose a commodity and some countries!</p>
//         </div>
//       )}
//       {loading && (
//         <div className="absolute inset-0 bg-black/3 flex items-center justify-center">
//           <div className="flex flex-col items-center gap-2">
//             <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-300/30 rounded-full animate-spin"></div>
//             <p className="text-white text-sm font-medium">Loading data...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
