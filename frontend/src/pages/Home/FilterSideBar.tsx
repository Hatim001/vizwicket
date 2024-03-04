import { Check, Replay } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

import { FilterProps } from "./Dashboard";

type Props = {
  filters: FilterProps;
  setFilters: Function;
};

const SIDEBAR_WIDTH = "300px";

const FilterSideBar = ({ filters, setFilters }: Props) => {
  const { year, team1, team2, matchNo } = filters;

  const resetFilters = () => {
    setFilters({
      year: "",
      team1: "",
      team2: "",
      matchNo: 0,
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: SIDEBAR_WIDTH,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h6">Match Filters</Typography>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="match-year-input-label">Match Year</InputLabel>
          <Select
            value={year}
            label="Match Year"
            id="match-year-input"
            labelId="match-year-input-label"
            placeholder="Select Match Year"
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <MenuItem value={"2022"}>2022</MenuItem>
            <MenuItem value={"2021"}>2021</MenuItem>
            <MenuItem value={"2020"}>2020</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="team-1-input-label">Team #1</InputLabel>
          <Select
            value={team1}
            label="Team #1"
            id="team-1-input"
            labelId="team-1-input-label"
            placeholder="Select Team #1"
            onChange={(e) => setFilters({ ...filters, team1: e.target.value })}
          >
            <MenuItem value={"Chennai Super Kings"}>
              Chennai Super Kings
            </MenuItem>
            <MenuItem value={"Kolkata Knight Riders"}>
              Kolkata Knight Riders
            </MenuItem>
            <MenuItem value={"Royal Challengers Bangalore"}>
              Royal Challengers Bangalore
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="team-2-input-label">Team #2</InputLabel>
          <Select
            value={team2}
            label="Team #2"
            id="team-2-input"
            labelId="team-2-input-label"
            placeholder="Select Team #2"
            onChange={(e) => setFilters({ ...filters, team2: e.target.value })}
          >
            <MenuItem value={"Chennai Super Kings"}>
              Chennai Super Kings
            </MenuItem>
            <MenuItem value={"Kolkata Knight Riders"}>
              Kolkata Knight Riders
            </MenuItem>
            <MenuItem value={"Royal Challengers Bangalore"}>
              Royal Challengers Bangalore
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="match-number-input-label">Match Number</InputLabel>
          <Select
            value={!!matchNo ? matchNo : null}
            label="Match Number"
            id="match-number-input"
            labelId="match-number-input-label"
            placeholder="Select Match Number"
            onChange={(e) =>
              setFilters({ ...filters, matchNo: Number(e.target.value) })
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button color="warning" onClick={resetFilters} startIcon={<Replay />}>
            Reset
          </Button>
          <Button startIcon={<Check />}>Apply</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterSideBar;
