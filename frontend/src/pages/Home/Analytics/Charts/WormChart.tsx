import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { isEmpty } from "utils/helpers";
import { TEAM_INFO } from "../constants";
import { useAnalytics } from "hooks/useAnalytics";
import useResponsiveSize from "hooks/useResponsiveSize";

const WormChart = () => {
  const { match = {}, summary = {} } = useAnalytics();
  const svgRef = useRef<any>();
  const wrapperRef = useRef<any>();
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

      const xScale = d3.scaleLinear().domain([0, 20]).range([0, chartWidth]);
      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(
            [
              ...summary?.cumulative_runs_team1,
              ...summary?.cumulative_runs_team2,
            ],
            (d) => d.cumulative_runs
          ),
        ])
        .range([chartHeight, 0]);

      const line = d3
        .line()
        .curve(d3.curveBasis)
        .x((d: any) => xScale(d.over))
        .y((d: any) => yScale(d.cumulative_runs));

      ["cumulative_runs_team1", "cumulative_runs_team2"].forEach((team, i) => {
        const path: any = svg
          .append("path")
          .datum(summary[team])
          .attr("fill", "none")
          .attr("stroke", i === 0 ? team1Color : team2Color)
          .attr("stroke-width", "3px")
          .attr("d", line);

        const totalLength = path.node().getTotalLength();
        path
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);
      });

      ['cumulative_runs_team1', 'cumulative_runs_team2'].forEach((team, i) => {
        svg.selectAll('.wicket-dot-' + team)
          .data(summary[team].filter((d: any) => d.wicket > 0))
          .enter()
          .append('circle')
          .attr('cx', (d: any) => xScale(d.over))
          .attr('cy', -10)
          .attr('r', 0)
          .attr('fill', 'black')
          .transition()
          .duration(1500)
          .delay((d, i) => 200 + i * 200)
          .attr('cy', (d: any) => yScale(d.cumulative_runs))
          .attr('r', 5);
      });

      const xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0,${chartHeight})`)
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
          d3.axisLeft(yScale).ticks(summary?.runs_per_over_team1?.length / 3)
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
    }
  }, [summary, width, height]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default WormChart;
