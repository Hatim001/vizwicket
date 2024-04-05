import * as d3 from "d3";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

import { MATCH_VENUE_MAPPER } from "./constants";
import { useAnalytics } from "hooks/useAnalytics";
import worldGeoJSON from "assets/geojson/world.json";
import useResponsiveSize from "hooks/useResponsiveSize";

const LocationInfo = () => {
  const { match = {} } = useAnalytics();
  const svgRef = useRef<any>();
  const wrapperRef = useRef<any>();
  const { width, height } = useResponsiveSize(wrapperRef);

  useEffect(() => {
    const matchVenues = [MATCH_VENUE_MAPPER?.[match?.match?.venue]?.country];
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 0, right: 0, bottom: 60, left: 0 };

    const svg = d3
      .select(svgRef?.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    let selectedFeatures: any = worldGeoJSON.features.filter((feature: any) =>
      MATCH_VENUE_MAPPER?.[match?.match?.venue]?.neighbors?.includes(
        feature?.properties?.name
      )
    );

    selectedFeatures?.push(
      worldGeoJSON.features?.filter(
        (feature: any) => feature?.properties?.name === matchVenues[0]
      )[0]
    );

    const worldGeoJSONWithGeometries: d3.ExtendedGeometryCollection = {
      type: "GeometryCollection",
      geometries: selectedFeatures?.map((feature: any) => feature?.geometry),
    };

    const projection = d3
      .geoMercator()
      .fitSize([width, height], worldGeoJSONWithGeometries);

    const pathGenerator = d3.geoPath().projection(projection);

    svg
      .selectAll(".state")
      .data(selectedFeatures)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", (d: any) => pathGenerator(d) as string)
      .attr("fill", (d: any) =>
        matchVenues.includes(d.properties.name) ? "red" : "grey"
      );
  }, [match, width, height]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "14px",
        marginLeft: 2,
      }}
    >
      <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
        <svg ref={svgRef} width={width} height={height} />
      </div>
    </Box>
  );
};

export default LocationInfo;
