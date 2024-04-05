import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { TEAM_INFO } from "./constants";
import { isEmpty } from "utils/helpers";
import { useAnalytics } from "hooks/useAnalytics";

const MatchInfo = () => {
  const { match = {}, selectedTeam = "team1", setAnalytics } = useAnalytics();
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
        <Box
          sx={{
            border: `${
              selectedTeam === "team1" ? "10px" : "3px"
            } solid ${team1Color}`,
            borderRadius: "50%",
            cursor: "pointer",
            height: "100px",
            width: "100px",
            "&:hover": {
              border: `10px solid ${team1Color}`,
            },
          }}
        >
          <img
            onClick={() => {
              setAnalytics({ selectedTeam: "team1" });
            }}
            src={team1?.logo}
            alt={team1?.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Stack>
      <Stack spacing={1} sx={{ textAlign: "center" }}>
        <Typography>Match {match_number}</Typography>
        <Typography>{venue}</Typography>
        <Typography>{date}</Typography>
      </Stack>
      <Stack alignItems={"center"}>
        <Box
          sx={{
            border: `${
              selectedTeam === "team2" ? "10px" : "3px"
            } solid ${team2Color}`,
            borderRadius: "50%",
            cursor: "pointer",
            height: "100px",
            width: "100px",
            "&:hover": {
              border: `10px solid ${team2Color}`,
            },
          }}
        >
          <img
            onClick={() => {
              setAnalytics({ selectedTeam: "team2" });
            }}
            src={team2?.logo}
            alt={team2?.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default MatchInfo;
