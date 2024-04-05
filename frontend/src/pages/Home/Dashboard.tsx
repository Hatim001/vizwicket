import { Box, Toolbar } from "@mui/material";

import Analytics from "./Analytics";
import FilterSideBar from "./FilterSideBar";
import { AnalyticsProvider } from "hooks/useAnalytics";

const Dashboard = () => {
  return (
    <AnalyticsProvider>
      <FilterSideBar />
      <Box component="main" sx={{ flexGrow: 1, px: 1, py: 1 }}>
        <Toolbar />
        <Analytics />
      </Box>
    </AnalyticsProvider>
  );
};

export default Dashboard;
