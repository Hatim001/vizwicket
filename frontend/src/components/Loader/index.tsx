import { CircularProgress, Typography } from "@mui/material";
import React from "react";

type Props = {
  occupyWindow?: boolean;
};

const Loader = (props: Props) => {
  const { occupyWindow = false } = props;

  return (
    <React.Fragment>
      <div
        style={{
          position: occupyWindow ? "absolute" : "inherit",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(5px)", // Add backdrop-filter property for blur effect
          zIndex: 9999,
        }}
      >
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          title="Loading...."
        />
      </div>
    </React.Fragment>
  );
};

export default Loader;
