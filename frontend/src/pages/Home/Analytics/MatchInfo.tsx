import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { TEAM_INFO } from "./constants";
import { isEmpty } from "utils/helpers";
import { useAnalytics } from "hooks/useAnalytics";

const MatchInfo = () => {
  const { match = {} } = useAnalytics();
  const [team1, setTeam1] = useState<any>(null);
  const [team2, setTeam2] = useState<any>(null);

  const team1Color = TEAM_INFO?.[match?.team1]?.color;
  const team2Color = TEAM_INFO?.[match?.team2]?.color;

  useEffect(() => {
    if (!isEmpty(match)) {
      setTeam1(TEAM_INFO?.[match?.team1]);
      setTeam2(TEAM_INFO?.[match?.team2]);
    }
  }, [match]);

  const { match_number = "", venue = "", date = "" } = match?.match || {};

  return (
    <Box
      sx={{
        padding: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack alignItems={"center"}>
        <img
          src={team1?.logo}
          alt={team1?.name}
          style={{
            height: "100px",
            width: "100px",
            border: `3px solid ${team1Color}`,
            borderRadius: "50%",
          }}
        />
      </Stack>
      <Stack spacing={1} sx={{ textAlign: "center" }}>
        <Typography>Match {match_number}</Typography>
        <Typography>{venue}</Typography>
        <Typography>{date}</Typography>
      </Stack>
      <Stack alignItems={"center"}>
        <img
          src={team2?.logo}
          alt={team2?.name}
          style={{
            height: "100px",
            width: "100px",
            border: `3px solid ${team2Color}`,
            borderRadius: "50%",
          }}
        />
      </Stack>
    </Box>
  );
};

export default MatchInfo;
