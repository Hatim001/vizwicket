import { Fragment, useState } from "react";
import { Box, Toolbar } from "@mui/material";

import Analytics from "./Analytics";
import FilterSideBar from "./FilterSideBar";

export type FilterProps = {
  year: string;
  team1: string;
  team2: string;
  matchNo: number;
};

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterProps>({
    year: "",
    team1: "",
    team2: "",
    matchNo: 0,
  });
  return (
    <Fragment>
      <FilterSideBar filters={filters} setFilters={setFilters} />
      <Box component="main" sx={{ flexGrow: 1, px: 2, py: 1 }}>
        <Toolbar />
        <Analytics />
      </Box>
    </Fragment>
  );
};

export default Dashboard;
