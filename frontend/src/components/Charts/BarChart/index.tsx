// BarChart.tsx
import { debounce } from "@mui/material";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

export interface BarChartDataItem {
  name: string;
  value: number;
}

interface BarChartProps {
  data: BarChartDataItem[];
  xLabel?: string;
  yLabel?: string;
  title?: string;
  barColor?: string;
  barPadding?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  xLabel = "",
  yLabel = "",
  title = "",
  barColor = "steelblue",
  barPadding = 0.1,
}) => {
  const chartRef = useRef<SVGSVGElement>(null);

  const designWidth = 600; // Example design width
  const designHeight = 400; // Example design height

  useEffect(() => {
    drawChart();
  }, [data, barPadding]);

  const drawChart = () => {
    if (!chartRef.current) return;

    const margin = { top: 60, right: 20, bottom: 60, left: 50 };
    const chartWidth = designWidth - margin.left - margin.right;
    const chartHeight = designHeight - margin.top - margin.bottom;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("viewBox", `0 0 ${designWidth} ${designHeight}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    const xScale = d3
      .scaleBand()
      .range([0, chartWidth])
      .padding(barPadding)
      .domain(data.map((d) => d.name));

    const yScale = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(data, (d: any) => d.value)]);

    // Append the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));

    // Append the y-axis
    svg.append("g").call(d3.axisLeft(yScale));

    // X-axis label
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${chartWidth / 2}, ${chartHeight + margin.top - 20})`
      )
      .style("text-anchor", "middle")
      .text(xLabel);

    // Y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - chartHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yLabel);

    // Chart title
    svg
      .append("text")
      .attr("x", chartWidth / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(title);

    // Define a transition
    const transition = d3.transition().duration(1500);

    // Update the bars
    const bars: any = svg.selectAll(".bar").data(data, (d: any) => d.name);

    // Append bars
    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: any) => xScale(d.name) || 0)
      .attr("width", xScale.bandwidth())
      .attr("y", chartHeight) // Start transition from bottom of chart
      .attr("height", 0) // Start height as 0
      .merge(bars) // Merge enter and update selections
      .transition(transition) // Apply transition
      .attr("fill", (d: any) => d.color || "steelblue")
      .attr("y", (d: any) => yScale(d.value))
      .attr("height", (d: any) => chartHeight - yScale(d.value));
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default BarChart;
