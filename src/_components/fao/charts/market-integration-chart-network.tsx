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
//     const margin = { top: 20, right: 150, bottom: 50, left: 80 };
//     const chartWidth = dimensions.width - margin.left - margin.right;
//     const chartHeight = dimensions.height - margin.top - margin.bottom;

//     const svg = d3
//       .select(svgRef.current)
//       .attr('width', dimensions.width)
//       .attr('height', dimensions.height);

//     const chartGroup = svg
//       .append('g')
//       .attr('transform', `translate(${margin.left}, ${margin.top})`);

//     if (data && data.comparisons_count) {
//       // Extract nodes (countries)
//       const countriesMap = new Map();

//       data.comparisons.forEach((comp) => {
//         const c1 = comp.country_pair.country1;
//         const c2 = comp.country_pair.country2;

//         if (!countriesMap.has(c1.area_code)) {
//           countriesMap.set(c1.area_code, {
//             id: c1.area_code,
//             name: c1.area_name,
//             area_id: c1.area_id,
//             area_name: c1.area_name,
//             area_code: c1.area_code,
//           });
//         }
//         if (!countriesMap.has(c2.area_code)) {
//           countriesMap.set(c2.area_code, {
//             id: c2.area_code,
//             name: c2.area_name,
//             area_id: c2.area_id,
//             area_name: c2.area_name,
//             area_code: c2.area_code,
//           });
//         }
//       });

//       const nodes = Array.from(countriesMap.values());

//       // Create edges
//       const links = data.comparisons.map((comp) => ({
//         source: comp.country_pair.country1.area_code,
//         target: comp.country_pair.country2.area_code,
//         integration: comp.metrics.integration_level,
//         avgRatio: comp.metrics.avg_ratio,
//         volatility: comp.metrics.volatility,
//       }));

//       // Color scale for integration levels
//       const integrationColor = d3
//         .scaleOrdinal<string>()
//         .domain(['high', 'moderate', 'none'])
//         .range(['#22c55e', '#f59e0b', '#ef4444']); // green, amber, red

//       // Create force simulation
//       const simulation = d3
//         .forceSimulation(nodes)
//         .force(
//           'link',
//           d3
//             .forceLink(links)
//             .id((d: any) => d.area_id)
//             .distance(250)
//         )
//         .force('charge', d3.forceManyBody().strength(-300))
//         .force('center', d3.forceCenter(chartWidth / 2, chartHeight / 2));

//       const linkThickness = (size = 10) => {
//         return (d) => Math.max(1, size - (Math.min(d.volatility, 1) / 2) * 12);
//       };

//       // Create links (edges)
//       const link = chartGroup
//         .append('g')
//         .selectAll('line')
//         .data(links)
//         .join('line')
//         .attr('stroke', (d) => integrationColor(d.integration))
//         .attr('stroke-opacity', 0.6)
//         .attr('stroke-width', linkThickness()); // Thicker = less volatile

//       // Create nodes
//       const node = chartGroup
//         .append('g')
//         .selectAll('circle')
//         .data(nodes)
//         .join('circle')
//         .attr('r', 40)
//         .attr('fill', (d) => stringToColorCountry(d, 0))
//         .attr('stroke', '#fff')
//         .attr('stroke-width', 2)
//         .style('cursor', 'pointer')
//         .style('text-wrap', 'wrap')
//         .call(
//           d3
//             .drag<SVGCircleElement, unknown, unknown>()
//             .on('start', dragstarted)
//             .on('drag', dragged)
//             .on('end', dragended)
//         );

//       // Add labels
//       // Replace the labels section with this:
//       const labels = chartGroup
//         .append('g')
//         .selectAll('text')
//         .data(nodes)
//         .join('text')
//         .attr('text-anchor', 'middle')
//         .style('fill', 'white')
//         .style('font-size', '10px')
//         .style('pointer-events', 'none')
//         .each(function (d: any) {
//           const text = d3.select(this);
//           const words = d.area_name.split(/\s+/);
//           const lineHeight = 12;
//           // const maxWidth = 50; // Max width for text inside node

//           // const line: string[] = [];
//           // const lineNumber = 0;
//           // const tspan = text.append('tspan').attr('x', 0).attr('dy', 0);

//           // Build lines
//           const lines: string[] = [];
//           let currentLine = '';

//           words.forEach((word) => {
//             const testLine = currentLine ? `${currentLine} ${word}` : word;
//             if (testLine.length > 8) {
//               // Approximate chars per line
//               if (currentLine) {
//                 lines.push(currentLine);
//                 currentLine = word;
//               } else {
//                 lines.push(word);
//                 currentLine = '';
//               }
//             } else {
//               currentLine = testLine;
//             }
//           });
//           if (currentLine) lines.push(currentLine);

//           // Center the text vertically
//           const totalHeight = lines.length * lineHeight;
//           const startY = -totalHeight / 2 + lineHeight / 2;

//           // Create tspans for each line
//           text.selectAll('tspan').remove();
//           lines.forEach((line, i) => {
//             text
//               .append('tspan')
//               .attr('x', 0)
//               .attr('y', startY + i * lineHeight + 3.5)
//               .text(line);
//           });
//         });

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

//       // Hover effects on links
//       link
//         .on('mouseover', function (event, d: any) {
//           tooltip.style('visibility', 'visible').html(`
//               <div>
//                 <strong>${d.source.area_name} ↔ ${d.target.area_name}</strong><br/>
//                 Integration: <span style="color: ${integrationColor(d.integration)}">${d.integration}</span><br/>
//                 Avg Ratio: ${d.avgRatio.toFixed(3)}<br/>
//                 Volatility: ${d.volatility.toFixed(3)}
//               </div>
//             `);

//           d3.select(this).attr('stroke-opacity', 1).attr('stroke-width', linkThickness(8));
//         })
//         .on('mousemove', function (event) {
//           tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 10 + 'px');
//         })
//         .on('mouseout', function () {
//           tooltip.style('visibility', 'hidden');

//           d3.select(this).attr('stroke-opacity', 0.6).attr('stroke-width', linkThickness());
//         });

//       // Update positions on tick
//       simulation.on('tick', () => {
//         link
//           .attr('x1', (d: any) => d.source.x)
//           .attr('y1', (d: any) => d.source.y)
//           .attr('x2', (d: any) => d.target.x)
//           .attr('y2', (d: any) => d.target.y);

//         node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

//         labels.attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
//       });

//       // Drag functions
//       function dragstarted(event: any, d: any) {
//         if (!event.active) simulation.alphaTarget(0.3).restart();
//         d.fx = d.x;
//         d.fy = d.y;
//       }

//       function dragged(event: any, d: any) {
//         d.fx = event.x;
//         d.fy = event.y;
//       }

//       function dragended(event: any, d: any) {
//         if (!event.active) simulation.alphaTarget(0);
//         d.fx = null;
//         d.fy = null;
//       }

//       // Add legend
//       const legend = svg.append('g').attr('transform', `translate(${dimensions.width - 140}, 20)`);

//       const legendData = [
//         { level: 'high', label: 'High Integration' },
//         { level: 'moderate', label: 'Moderate' },
//         { level: 'none', label: 'No Integration' },
//       ];

//       legendData.forEach((item, i) => {
//         const g = legend.append('g').attr('transform', `translate(0, ${i * 25})`);

//         g.append('line')
//           .attr('x1', 0)
//           .attr('x2', 20)
//           .attr('y1', 0)
//           .attr('y2', 0)
//           .attr('stroke', integrationColor(item.level))
//           .attr('stroke-width', 3);

//         g.append('text')
//           .attr('x', 25)
//           .attr('y', 0)
//           .attr('dominant-baseline', 'middle')
//           .style('font-size', '12px')
//           .style('fill', 'var(--color-base-content)')
//           .text(item.label);
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
