import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import { isEmpty } from "utils/helpers";
import { useAnalytics } from "hooks/useAnalytics";
import useResponsiveSize from "hooks/useResponsiveSize";

const BoundariesChart = () => {
  const { summary = {} } = useAnalytics();
  const svgRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const { width, height } = useResponsiveSize(wrapperRef);

  useEffect(() => {
    if (!isEmpty(summary) && svgRef.current) {
      d3.select(svgRef.current).selectAll("*").remove();

      const margin = { top: 10, right: 40, bottom: 70, left: 20 };

      const svg = d3
        .select(svgRef?.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max([...summary?.boundaries_team1], (d) => d.over)])
        .range([0, chartWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max([...summary?.boundaries_team1], (d) => d.cumulative_runs),
        ])
        .range([chartHeight, 0]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.selectAll("circle")
        .data(summary?.boundaries_team1)
        .enter()
        .append("circle")
        .attr("cx", (d: any) => xScale(d.over))
        .attr("cy", (d: any) => yScale(d.cumulative_runs))
        .attr("r", 5) // radius of circles
        .attr("fill", (d: any) => (d.batsman_run === 4 ? "blue" : "red"));

      const xAxisGroup = g
        .append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));

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

      const yAxisGroup = g
        .append("g")
        .call(d3.axisLeft(yScale).ticks(summary?.boundaries_team1?.length / 2));

      yAxisGroup.selectAll("text").style("font-weight", "bold");

      yAxisGroup
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left - 10)
        .attr("x", -chartHeight / 2)
        .attr("fill", "#000")
        .style("text-anchor", "start")
        .text("Runs")
        .style("font-weight", "bold");
    }
  }, [summary, width, height]);

  const renderLegend = () => {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CircleIcon sx={{ color: "blue", fontSize: "12px" }} />
          <Typography
            sx={{
              marginLeft: 1,
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "14px",
            }}
          >
            {`4's`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "left", marginLeft: 1 }}>
          <CircleIcon sx={{ color: "red", fontSize: "12px" }} />
          <Typography
            sx={{
              marginLeft: 1,
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "14px",
            }}
          >
            {`6's`}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderHeader = (title: string) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: "10px",
          marginBottom: "10px",
          borderBottom: "1px solid #d9d9d9",
        }}
      >
        <Typography
          sx={{
            lineHeight: "12px",
            fontStyle: "italic",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {title}
        </Typography>
        {renderLegend()}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        border: "1px solid #d9d9d9",
        borderRadius: "14px",
        padding: "20px 10px",
        marginLeft: 2,
      }}
    >
      {renderHeader("Boundaries")}
      <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
        <svg ref={svgRef} width={width} height={height} />
      </div>
    </Box>
  );
};

export default BoundariesChart;
