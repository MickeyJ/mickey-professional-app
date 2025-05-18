"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { d3FormatBillions } from "@/lib/utils";
import type { DataPoint } from "@/types";

interface LineChartProps {
  title?: string;
  width?: number;
  height?: number;
  scaleExponent?: number;
  data?: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({
  title = "Population Data",
  width = 1000,
  height = 500,
  scaleExponent = 1000000,
  data = [
    { name: "Texas", value: 30 },
    { name: "California", value: 50 },
    { name: "Nevada", value: 100 },
    { name: "Mississippi", value: 70 },
    { name: "Delaware", value: 65 },
    { name: "New York", value: 90 },
  ],
}) => {
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

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [width, height]);

  // Color schemes based on your CSS variables

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Parse data (keep in case useful later)
    const parsedData = data.map(({ name, value }) => ({
      name,
      value: value,
    }));

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG element
    const svg = d3.select(svgRef.current).attr("width", dimensions.width).attr("height", dimensions.height);

    // Calculate margins
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const innerWidth = dimensions.width - margin.left - margin.right;
    const innerHeight = dimensions.height - margin.top - margin.bottom;

    // Create group element for the chart
    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const x = d3.scaleLinear().domain([0, parsedData.length]).nice().range([0, innerWidth]);

    console.log(d3.min(parsedData, (d) => d.value));
    const scaleValue = 0.1 + (scaleExponent / 100000000) * 0.5;

    const y = d3
      .scalePow() // Power scale with customizable exponent
      .exponent(scaleValue) // Square root scaling (0.5) spreads out small values and compresses large ones
      .domain([0, d3.max(parsedData, (d) => d.value) || 100])
      .nice()
      .range([innerHeight, 0]);

    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .attr("class", "text-bright")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("fill", "var(--color-neutral-800)")
      .attr("text-anchor", "end")
      .attr("x", innerWidth)
      .attr("y", 35)
      .text("Population");

    g.append("g")
      .attr("class", "text-success")
      .call(
        d3
          .axisLeft(y)
          .ticks(6)
          .tickFormat((s) => d3FormatBillions(".2s")(s as number))
      )
      .attr("font-size", "10px");

    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-innerWidth)
          .tickFormat(() => "")
      )
      .attr("stroke-opacity", 0.1)
      .select("path")
      .attr("stroke-width", 0);

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "var(--color-blue-500)").attr("stop-opacity", 0.7);

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "var(--color-blue-500)").attr("stop-opacity", 0);

    // Add area
    const area = d3
      .area<DataPoint>()
      .x((_, i) => x(i))
      .y0(innerHeight)
      .y1((d) => y(d.value));

    g.append("path").datum(parsedData).attr("fill", "url(#area-gradient)").attr("d", area);

    // Create line generator
    const line = d3
      .line<DataPoint>()
      .x((_, i) => x(i))
      .y((d) => y(d.value));

    // Add line
    g.append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", "var(--color-blue-600)")
      .attr("stroke-width", 2.5) // Thicker line
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    // Enhance the dots with tooltips
    g.selectAll(".dot")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d, i) => x(i))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("stroke", "var(--color-blue-600)")
      .attr("stroke-width", 2)
      .attr("fill", "white")
      .on("mouseover", function (event, d) {
        d3.select(this).transition().duration(200).attr("r", 8);

        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.name}</strong>: ${d.value}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("r", 5);

        tooltip.style("visibility", "hidden");
      });
  }, [data, dimensions, title]);

  return (
    <div className="w-full overflow-hidden">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default LineChart;
