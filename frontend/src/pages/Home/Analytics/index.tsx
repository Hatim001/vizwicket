import { Box, Typography } from "@mui/material";
import { BarChartDataItem, BarChart } from "components/Charts";

type Props = {};

const data: BarChartDataItem[] = [
  { name: "A", value: 0.08167 },
  { name: "B", value: 0.01492 },
  { name: "C", value: 0.07167 },
  { name: "D", value: 0.06492 },
  { name: "E", value: 0.05167 },
  { name: "F", value: 0.21492 },
];

const Analytics = (props: Props) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6">Analytics</Typography>
      <Box sx={{ width: "100%", height: "500px"}}>
        <BarChart
          data={data}
          xLabel="Categories"
          yLabel="Values"
          title="Sample Bar Chart"
          barPadding={0.5}
        />
      </Box>
    </Box>
  );
};

export default Analytics;
