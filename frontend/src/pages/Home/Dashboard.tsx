import { Box, Toolbar } from "@mui/material";

import Analytics from "./Analytics";
import FilterSideBar from "./FilterSideBar";
import { AnalyticsProvider, useAnalytics } from "hooks/useAnalytics";
import { Fragment } from "react/jsx-runtime";
import { Loader } from "components";

const Dashboard = () => {
  return (
    <Fragment>
      <FilterSideBar />
      <Box component="main" sx={{ flexGrow: 1, px: 1, py: 1 }}>
        <Toolbar />
        <Analytics />
      </Box>
    </Fragment>
  );
};

export default Dashboard;
