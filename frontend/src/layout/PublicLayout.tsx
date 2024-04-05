import { Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

import VizWicketLogo from "assets/images/vizwicket_logo.png";

const APP_BAR_HEIGHT = "60px";

const PublicLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          background: "#fff",
          color: "#000",
          height: APP_BAR_HEIGHT,
          zIndex: (theme) => theme?.zIndex?.drawer + 1,
          boxShadow: "0 1px 2px 0 #0000001a",
        }}
      >
        <Toolbar sx={{ paddingX: 1, width: "100%", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Box sx={{ height: "55px", width: "45px", mr: 2 }}>
                <img
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  src={VizWicketLogo}
                  alt="VizWicket Logo"
                />
              </Box>
              <Typography variant="h6">VizWicket</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default PublicLayout;
