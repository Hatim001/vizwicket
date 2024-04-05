import CircleIcon from "@mui/icons-material/Circle";
import { Box, Stack, Typography } from "@mui/material";

import WormChart from "./WormChart";
import { TEAM_INFO } from "../constants";
import ManhattanChart from "./ManhattanChart";
import { useAnalytics } from "hooks/useAnalytics";

const Charts = () => {
  const { match = {} } = useAnalytics();
  const team1Color = TEAM_INFO?.[match?.team1]?.color;
  const team2Color = TEAM_INFO?.[match?.team2]?.color;
  const renderLegend = () => {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <CircleIcon sx={{ color: team1Color, fontSize: "12px" }} />
          <Typography
            sx={{
              marginLeft: 1,
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "14px",
            }}
          >
            {match?.team1}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "left", marginLeft: 2 }}>
          <CircleIcon sx={{ color: team2Color, fontSize: "12px" }} />
          <Typography
            sx={{
              marginLeft: 1,
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "14px",
            }}
          >
            {match?.team2}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderHeader = (title: string) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: "10px",
          marginBottom: "10px",
          borderBottom: "1px solid #d9d9d9",
        }}
      >
        <Typography
          sx={{
            lineHeight: "12px",
            fontStyle: "italic",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {title}
        </Typography>
        {renderLegend()}
      </Box>
    );
  };

  return (
    <Stack
      sx={{ justifyContent: "space-between", height: "100%", width: "100%" }}
    >
      <Box
        sx={{
          height: "49%",
          width: "100%",
          border: "1px solid #d9d9d9",
          borderRadius: "14px",
          padding: "20px 10px",
        }}
      >
        {renderHeader("Manhattan")}
        <ManhattanChart />
      </Box>
      <Box
        sx={{
          height: "49%",
          width: "100%",
          border: "1px solid #d9d9d9",
          borderRadius: "14px",
          padding: "20px 10px",
        }}
      >
        {renderHeader("Worm")}
        <WormChart />
      </Box>
    </Stack>
  );
};

export default Charts;
