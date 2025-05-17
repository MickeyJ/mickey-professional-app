'use client';

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function SimpleBarChart() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Simple dataset
    const data = [
      { label: 'A', value: 30 },
      { label: 'B', value: 50 },
      { label: 'C', value: 25 },
      { label: 'D', value: 70 },
      { label: 'E', value: 45 },
    ];

    // Clear any previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([innerHeight, 0]);

    // Create chart group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label) || 0)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - y(d.value))
      .attr('fill', 'var(--color-purple-600)');

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append('g').call(d3.axisLeft(y));
  }, []);

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        width="400"
        height="300"
        viewBox="0 0 400 300"
      />
    </div>
  );
}
