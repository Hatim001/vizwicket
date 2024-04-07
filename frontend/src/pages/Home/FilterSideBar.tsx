import { Fragment, useEffect, useState } from "react";
import { Check, Replay } from "@mui/icons-material";
import { Box, Button, Drawer, Toolbar, Typography } from "@mui/material";

import { GET } from "utils/axios";
import { Loader, SelectField } from "components";
import { isEmpty, range } from "utils/helpers";
import { useAnalytics } from "hooks/useAnalytics";

const SIDEBAR_WIDTH = "300px";

const FilterSideBar = () => {
  const { showAppLoader, setAnalytics } = useAnalytics();
  const [results, setResults] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    year: "2022",
    team1: "",
    team2: "",
    match: "",
  });
  const [teams, setTeams] = useState<string[]>([]);
  const [matchList, setMatchList] = useState<any[]>([]);

  useEffect(() => {
    !!filters?.year && fetchMatches();
  }, [filters?.year]);

  useEffect(() => {
    setMatchList([]);
    setFilters({ ...filters, match: "" });
    if (!!filters?.team1 && !!filters?.team2) {
      let matchList = results?.filter((ins: any) => {
        if (
          (ins.team1 === filters?.team1 && ins.team2 === filters?.team2) ||
          (ins.team1 === filters?.team2 && ins.team2 === filters?.team1)
        ) {
          return {
            ...ins,
          };
        }
        return null;
      });
      setMatchList(matchList);
    }
  }, [filters?.team1, filters?.team2]);

  const fetchMatches = async () => {
    setAnalytics({ showAppLoader: true });
    setTimeout(() => {
      GET(`/api/matches?year=${filters.year}`)
        .then((res) => {
          let teamList: string[] = res?.data?.matches?.map(
            (ins: any) => ins.team1
          );
          setTeams([...new Set(teamList)]);
          setResults(res?.data?.matches);
        })
        ?.finally(() => {
          setAnalytics({ showAppLoader: false });
        });
    }, 1000);
  };

  const resetFilters = () => {
    setFilters({
      year: "2022",
      team1: "",
      team2: "",
      match: 0,
    });
    setAnalytics({ match: {}, selectedTeam: "" });
  };

  const handleApply = () => {
    setAnalytics({ match: filters, selectedTeam: "team1" });
  };

  const { year, team1, team2, match } = filters;

  return (
    <Fragment>
      {showAppLoader && <Loader occupyWindow={true} />}
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
          <SelectField
            id="match-year-input"
            label="Match Year"
            sx={{ mt: 3 }}
            options={range(2008, 2022)?.map((item: number) => {
              return {
                value: item.toString(),
                label: item.toString(),
              };
            })}
            value={year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            variant={"outlined"}
          />
          <SelectField
            id="team-1-input"
            label="Team #1"
            sx={{ mt: 3 }}
            options={teams.map((item: string) => {
              return {
                value: item,
                label: item,
              };
            })}
            value={team1}
            onChange={(e) => setFilters({ ...filters, team1: e.target.value })}
            variant={"outlined"}
          />
          <SelectField
            id="team-2-input"
            label="Team #2"
            sx={{ mt: 3 }}
            options={teams.map((item: string) => {
              return {
                value: item,
                label: item,
              };
            })}
            value={team2}
            onChange={(e) => setFilters({ ...filters, team2: e.target.value })}
            variant={"outlined"}
          />
          <SelectField
            id="match-number-input"
            label="Match Number"
            disabled={!matchList?.length || !team1 || !team2}
            sx={{ mt: 3 }}
            options={matchList?.map((item: any) => {
              return {
                value: item,
                label: item?.match_number,
              };
            })}
            value={!!match ? match : ""}
            onChange={(e) => {
              setFilters({ ...filters, match: e.target.value });
            }}
            variant={"outlined"}
          />
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              color="warning"
              onClick={resetFilters}
              startIcon={<Replay />}
            >
              Reset
            </Button>
            <Button
              startIcon={<Check />}
              onClick={handleApply}
              disabled={
                !!Object.values(filters)?.some((ins: any) => isEmpty(ins))
              }
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default FilterSideBar;
