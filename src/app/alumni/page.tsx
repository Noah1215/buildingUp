// Component
import Board from "@/app/alumni/(components)/Board";
import EventTable from "@/app/alumni/(components)/EventTable";
import SupportTable from "@/app/alumni/(components)/SupportTable";
import ChartContainer from "@/app/alumni/(components)/ChartContainer";
import JobDistribution from "@/recharts/JobDistribution";
import CurrentJob from "@/recharts/CurrentJob";
// MUI
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default async function Home() {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        padding: {
          md: 6,
        },
      }}
    >
      <Grid xs={12} md={6} order={1}>
        <Board title={"Upcoming Events"}>
          <EventTable />
        </Board>
      </Grid>
      <Grid xs={12} md={6} order={2}>
        <Board title={"Support Status"}>
          <SupportTable />
        </Board>
      </Grid>
      <Grid xs={12} md={6} order={3}>
        <Board title={"Current Job Distribution"}>
          <ChartContainer updatedAt={"April 2023"}>
            <JobDistribution />
          </ChartContainer>
        </Board>
      </Grid>
      <Grid xs={12} md={6} order={4}>
        <Board title={"Current Job By Education Level"}>
          <ChartContainer updatedAt={"April 2023"}>
            <CurrentJob />
          </ChartContainer>
        </Board>
      </Grid>
    </Grid>
  );
}
