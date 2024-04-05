import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { isEmpty } from "utils/helpers";
import { TEAM_INFO } from "../constants";
import { useAnalytics } from "hooks/useAnalytics";
import useResponsiveSize from "hooks/useResponsiveSize";

const ManhattanChart = () => {
  const { match = {}, summary = {} } = useAnalytics();
  const svgRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const barPadding = 0.6;
  const barWidth = 5;
  const { width, height } = useResponsiveSize(wrapperRef);
  const team1Color = TEAM_INFO?.[match?.team1]?.color;
  const team2Color = TEAM_INFO?.[match?.team2]?.color;

  useEffect(() => {
    if (!isEmpty(summary) && svgRef.current) {
      d3.select(svgRef.current).selectAll("*").remove();

      const margin = { top: 10, right: 30, bottom: 60, left: 55 };

      const svg = d3
        .select(svgRef?.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      const xScale = d3
        .scaleLinear()
        .domain([
          0,
          Math.max(
            summary?.runs_per_over_team1.length,
            summary?.runs_per_over_team2.length
          ),
        ])
        .range([0, chartWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(
            [...summary?.runs_per_over_team1, ...summary?.runs_per_over_team2],
            (d) => d.runs + 2
          ),
        ])
        .range([chartHeight, 0]);

      const xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(
          d3.axisBottom(xScale).ticks(summary?.runs_per_over_team1?.length)
        );

      xAxisGroup
        .selectAll("text")
        .attr("dx", "-2em")
        .style("font-weight", "bold");

      xAxisGroup
        .append("text")
        .attr("class", "axis-label")
        .attr("x", chartWidth)
        .attr("y", 35)
        .attr("fill", "#000")
        .style("text-anchor", "end")
        .text("Overs")
        .style("font-weight", "bold");

      const yAxisGroup = svg
        .append("g")
        .call(
          d3.axisLeft(yScale).ticks(summary?.runs_per_over_team1?.length / 2)
        );

      yAxisGroup.selectAll("text").style("font-weight", "bold");

      yAxisGroup
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -chartHeight / 2)
        .attr("fill", "#000")
        .style("text-anchor", "start")
        .text("Runs")
        .style("font-weight", "bold");

      svg
        .selectAll(".bar-team1")
        .data(summary?.runs_per_over_team1)
        .enter()
        .append("rect")
        .attr("class", "bar-team1")
        .attr("x", (d: any) => xScale(d.over) + 15)
        .attr("y", (d: any) => yScale(d.runs))
        .attr("width", barWidth)
        .attr("height", (d: any) => chartHeight - yScale(d.runs))
        .attr("fill", team1Color);

      svg
        .selectAll(".bar-team2")
        .data(summary?.runs_per_over_team2)
        .enter()
        .append("rect")
        .attr("class", "bar-team2")
        .attr("x", (d: any) => xScale(d.over) + barWidth + barPadding + 15)
        .attr("y", (d: any) => yScale(d.runs))
        .attr("width", barWidth)
        .attr("height", (d: any) => chartHeight - yScale(d.runs))
        .attr("fill", team2Color);
    }
  }, [summary, width, height]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default ManhattanChart;
