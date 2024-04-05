import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import Charts from "./Charts";
import { GET } from "utils/axios";
import MatchInfo from "./MatchInfo";
import { isEmpty } from "utils/helpers";
import LocationInfo from "./LocationInfo";
import { useAnalytics } from "hooks/useAnalytics";
import BoundariesChart from "./Charts/BoundariesChart";
import WicketDistributionChart from "./Charts/WicketDistributionChart";

const Analytics = () => {
  const { match = {}, setAnalytics } = useAnalytics();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    !isEmpty(match?.match) && fetchSummary();
  }, [match]);

  const fetchSummary = () => {
    setLoading(true);
    GET(
      `/api/match/${match?.match?.id}/summary?team1=${match?.team1}&team2=${match?.team2}`
    )
      .then((res) => {
        setAnalytics({ summary: res?.data });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isEmpty(match)) {
    return <>Match not found</>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <Stack
      direction={"row"}
      sx={{
        height: "calc(100vh - 100px)",
        width: "calc(100vw - 332px)",
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{ width: "60%", height: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ height: "20%", width: "100%" }}>
          <MatchInfo />
        </Box>
        <Box sx={{ width: "100%", height: "80%" }}>
          <Charts />
        </Box>
      </Stack>
      <Stack
        sx={{ width: "40%", height: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ height: "29%", width: "100%" }}>
          <LocationInfo />
        </Box>
        <Box sx={{ height: "29%", width: "100%" }}>
          <WicketDistributionChart />
        </Box>
        <Box sx={{ height: "39%", width: "100%" }}>
          <BoundariesChart />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Analytics;
