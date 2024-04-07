import { Box, Typography } from "@mui/material";
import React from "react";
import NotFoundImage from "assets/images/image.png";

type Props = {
  title?: string;
};

const NotFound = ({ title = "Not Found" }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <img
          src={NotFoundImage}
          alt="Not Found"
          style={{ width: "200px", height: "200px" }}
        />
        <Typography variant="h5" sx={{ marginTop: 5 }}>{title}</Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
