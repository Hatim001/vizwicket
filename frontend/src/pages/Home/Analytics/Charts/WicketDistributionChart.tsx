import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import { isEmpty } from "utils/helpers";
import { useAnalytics } from "hooks/useAnalytics";
import useResponsiveSize from "hooks/useResponsiveSize";

const WicketDistributionChart = () => {
  const { summary = {} } = useAnalytics();
  const svgRef = useRef<any>();
  const legendRef = useRef<any>();
  const svgWrapperRef = useRef<any>();
  const legendWrapperRef = useRef<any>();
  const { width, height } = useResponsiveSize(svgWrapperRef);
  const { width: legendWidth, height: legendHeight } =
    useResponsiveSize(legendWrapperRef);

  useEffect(() => {
    if (!isEmpty(summary) && svgRef.current && legendRef.current) {
      d3.select(svgRef.current).selectAll("*").remove();
      d3.select(legendRef.current).selectAll("*").remove();

      const radius = Math.min(width, height) / 2 - 30;

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3
        .pie()
        .sort(null)
        .value((d: any) => d?.total_wickets);

      const data_ready = pie(summary?.wicket_distribution_team1);

      const arc = d3
        .arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8);

      const outerArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      svg
        .selectAll(".arc")
        .data(pie(summary?.wicket_distribution_team1))
        .enter()
        .append("path")
        .attr("d", arc as any)
        .style("fill", (d: any) => color(d.data.bowler_name))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

      svg
        .selectAll(".arc")
        .data(data_ready)
        .join("polyline")
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", (d: any) => {
          const posA = arc.centroid(d);
          const posB = outerArc.centroid(d);
          const posC = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
          return `${posA},${posB},${posC}`;
        });

      svg
        .selectAll(".arc")
        .data(data_ready)
        .join("text")
        .text((d: any) => d.data.bowler_name)
        .style("font-size", "10px")
        .attr("transform", function (d: any) {
          const pos = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .style("text-anchor", function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });

      const legendItems = data_ready.map((d: any) => ({
        name: d.data.bowler_name,
        wickets: d.data.total_wickets,
        color: color(d.data.bowler_name),
      }));

      const legendMargin = { top: 50, right: 30, bottom: 60, left: 100 };

      const legendSvg = d3
        .select(legendRef.current)
        .attr("viewBox", `0 0 ${legendWidth} ${legendHeight}`)
        .append("g")
        .attr(
          "transform",
          `translate(${legendWidth / 2 - legendMargin.left},${
            legendHeight / 2 - legendMargin.top
          })`
        );

      legendSvg
        .selectAll(".legend-item .circle")
        .data(legendItems)
        .enter()
        .append("circle")
        .attr("cx", 10)
        .attr("cy", (d, i) => i * 30)
        .attr("r", 5)
        .attr("fill", (d) => d.color);

      legendSvg
        .selectAll(".legend-item text")
        .data(legendItems)
        .enter()
        .append("text")
        .style("font-size", "10px")
        .attr("x", 25)
        .attr("y", (d, i) => i * 30 + 4)
        .text((d: any) => `${d.name} (${d.wickets})`);
    }
  }, [summary, width, height, legendWidth, legendHeight]);

  const renderHeader = (title: string) => {
    return (
      <Box
        sx={{
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
      {renderHeader("Wicket Distribution")}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div ref={svgWrapperRef} style={{ width: "60%", height: "100%" }}>
          <svg ref={svgRef} width={width} height={height} />
        </div>
        <div ref={legendWrapperRef} style={{ width: "40%", height: "100%" }}>
          <svg ref={legendRef} width={width} height={height} />
        </div>
      </div>
    </Box>
  );
};

export default WicketDistributionChart;
