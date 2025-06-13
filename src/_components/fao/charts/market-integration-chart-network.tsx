import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import { stringToColorCountry } from '@/lib/utils';
import type { FAOMarketIntegrationCorrelationData } from '@/types';

interface MarketIntegrationChartProps {
  data: FAOMarketIntegrationCorrelationData | null;
  width?: number;
  height?: number;
  loading?: boolean;
}

export default function MarketIntegrationNetworkChart({
  data,
  loading,
  width = 800,
  height = 500,
}: MarketIntegrationChartProps) {
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
    if (!svgRef.current || !data || data.comparisons_count === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

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

    // Extract unique countries as nodes
    const countriesMap = new Map();

    data.comparisons.forEach((comp) => {
      const c1 = comp.country_pair.country1;
      const c2 = comp.country_pair.country2;

      if (!countriesMap.has(c1.area_code)) {
        countriesMap.set(c1.area_code, {
          id: c1.area_code, // Use area_code as id for the force simulation
          name: c1.area_name,
          area_id: c1.area_id,
          area_name: c1.area_name,
          area_code: c1.area_code,
        });
      }
      if (!countriesMap.has(c2.area_code)) {
        countriesMap.set(c2.area_code, {
          id: c2.area_code, // Use area_code as id for the force simulation
          name: c2.area_name,
          area_id: c2.area_id,
          area_name: c2.area_name,
          area_code: c2.area_code,
        });
      }
    });

    const nodes = Array.from(countriesMap.values());

    // Create edges with the new data structure
    const links = data.comparisons.map((comp) => ({
      source: comp.country_pair.country1.area_code,
      target: comp.country_pair.country2.area_code,
      integration: comp.calculated_metrics.correlation_based_integration,
      avgRatio: comp.metrics.avg_ratio,
      volatility: comp.metrics.volatility,
      yearsCompared: comp.metrics.years_compared,
      correlation: comp.calculated_metrics?.correlation || 0,
      // Store full comparison data for tooltip
      fullData: comp,
    }));

    // Color scale for integration levels
    const integrationColor = d3
      .scaleOrdinal<string>()
      .domain(['high', 'moderate', 'none'])
      .range(['#22c55e', '#f59e0b', '#ef4444']); // green, amber, red

    // Drag functions (defined before use)
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
      d.fx = Math.max(35, Math.min(chartWidth - 35, event.x));
      d.fy = Math.max(35, Math.min(chartHeight - 35, event.y));
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id) // Now correctly uses d.id which is area_code
          .distance(200)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Function to calculate link thickness based on volatility
    const linkThickness = (d: any) => {
      // Lower volatility = thicker line (more integrated)
      return Math.max(2, 10 - d.volatility * 20);
    };

    // Create links (edges)
    const link = chartGroup
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => integrationColor(d.integration))
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', linkThickness);

    // Create nodes
    const node = chartGroup
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 35)
      .attr('fill', (d) => stringToColorCountry(d))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(
        d3
          .drag<SVGCircleElement, (typeof nodes)[0]>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any
      );

    // Add labels with text wrapping
    const labels = chartGroup
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '10px')
      .style('font-weight', '500')
      .style('pointer-events', 'none')
      .each(function (d: any) {
        const text = d3.select(this);
        const words = d.area_name.split(/\s+/);
        const lineHeight = 11;

        // Build lines with better word wrapping
        const lines: string[] = [];
        let currentLine = '';

        words.forEach((word: string) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          if (testLine.length > 10) {
            // Chars per line
            if (currentLine) {
              lines.push(currentLine);
              currentLine = word;
            } else {
              // If single word is too long, add it anyway
              lines.push(word);
              currentLine = '';
            }
          } else {
            currentLine = testLine;
          }
        });
        if (currentLine) lines.push(currentLine);

        // Limit to 3 lines max
        const displayLines = lines.slice(0, 3);
        if (lines.length > 3) {
          displayLines[2] = displayLines[2].slice(0, -3) + '...';
        }

        // Center the text vertically
        const totalHeight = displayLines.length * lineHeight;
        const startY = -totalHeight / 2 + lineHeight / 2;

        // Create tspans for each line
        text.selectAll('tspan').remove();
        displayLines.forEach((line, i) => {
          text
            .append('tspan')
            .attr('x', 0)
            .attr('y', startY + i * lineHeight)
            .text(line);
        });
      });

    // Enhanced tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'chart-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.95)')
      .style('color', 'white')
      .style('padding', '12px')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('box-shadow', '0 2px 8px rgba(0,0,0,0.3)')
      .style('max-width', '300px');

    // Hover effects on links
    link
      .on('mouseover', function (event, d: any) {
        const source =
          typeof d.source === 'object' ? d.source : nodes.find((n) => n.id === d.source);
        const target =
          typeof d.target === 'object' ? d.target : nodes.find((n) => n.id === d.target);

        tooltip.style('visibility', 'visible').html(`
          <div style="margin-bottom: 8px;">
            <strong style="font-size: 14px;">${source?.area_name} ↔ ${target?.area_name}</strong>
          </div>
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 4px 12px;">
            <span style="opacity: 0.7;">Integration:</span>
            <span style="color: ${integrationColor(d.integration)}; font-weight: 600;">${d.integration.toUpperCase()}</span>
            
            <span style="opacity: 0.7;">Correlation:</span>
            <span>${d.correlation.toFixed(3)}</span>
            
            <span style="opacity: 0.7;">Avg Ratio:</span>
            <span>${d.avgRatio.toFixed(3)}</span>
            
            <span style="opacity: 0.7;">Volatility:</span>
            <span>${d.volatility.toFixed(3)}</span>
            
            <span style="opacity: 0.7;">Years:</span>
            <span>${d.yearsCompared}</span>
          </div>
        `);

        // Highlight the link
        d3.select(this)
          .attr('stroke-opacity', 1)
          .attr('stroke-width', (d: any) => linkThickness(d) * 1.5);
      })
      .on('mousemove', function (event) {
        tooltip.style('left', event.pageX + 10 + 'px').style('top', event.pageY - 10 + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');

        d3.select(this).attr('stroke-opacity', 0.6).attr('stroke-width', linkThickness);
      });

    // Node hover effects
    node
      .on('mouseover', function (event, d: any) {
        // Highlight connected links
        link.style('opacity', (l: any) => {
          return l.source.id === d.id || l.target.id === d.id ? 1 : 0.2;
        });

        // Highlight connected nodes
        node.style('opacity', (n: any) => {
          const isConnected = links.some(
            (l: any) =>
              (l.source === d.id || l.target === d.id) && (l.source === n.id || l.target === n.id)
          );
          return n.id === d.id || isConnected ? 1 : 0.3;
        });
      })
      .on('mouseout', function () {
        link.style('opacity', 1);
        node.style('opacity', 1);
      });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => Math.max(35, Math.min(chartWidth - 35, d.x)))
        .attr('cy', (d: any) => Math.max(35, Math.min(chartHeight - 35, d.y)));

      labels.attr(
        'transform',
        (d: any) =>
          `translate(${Math.max(35, Math.min(chartWidth - 35, d.x))}, ${Math.max(35, Math.min(chartHeight - 35, d.y))})`
      );
    });

    // Add legend
    const legend = svg.append('g').attr('transform', `translate(${dimensions.width - 140}, 20)`);

    const legendData = [
      { level: 'high', label: 'High Integration', color: '#22c55e' },
      { level: 'moderate', label: 'Moderate', color: '#f59e0b' },
      { level: 'none', label: 'No Integration', color: '#ef4444' },
    ];

    const legendItem = legend
      .selectAll('g')
      .data(legendData)
      .join('g')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`);

    legendItem
      .append('line')
      .attr('x1', 0)
      .attr('x2', 20)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 3);

    legendItem
      .append('text')
      .attr('x', 25)
      .attr('y', 0)
      .attr('dominant-baseline', 'middle')
      .style('font-size', '12px')
      .style('fill', 'var(--color-base-content)')
      .text((d) => d.label);

    // Add title with item name
    svg
      .append('text')
      .attr('x', margin.left)
      .attr('y', 15)
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', 'var(--color-base-content)')
      .text(`Market Integration Network: ${data.item.name}`);

    // Cleanup tooltip on unmount
    return () => {
      d3.select('body').selectAll('.chart-tooltip').remove();
    };
  }, [data, dimensions]);

  if (!data || data.comparisons_count === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          No correlation data available. Select at least two countries to view the network.
        </p>
      </div>
    );
  }

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
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-300/30 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm font-medium">Loading network data...</p>
          </div>
        </div>
      )}
    </div>
  );
}
