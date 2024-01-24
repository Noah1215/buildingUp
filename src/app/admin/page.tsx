//React
import React from "react";
//Component
import Board from "@/app/alumni/components/Board";
import EventTable from "@/app/alumni/components/EventTable";
import JobDistribution from "@/components/Recharts/JobDistribution";
import WageDistribution from "@/components/Recharts/WageDistribution";
import AverageWage from "@/components/Recharts/AverageWage";
//MUI
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";

const announcements = [
  { title: "[Workshop] Alumni Workshop", date: "2023-11-28" },
  { title: "[Party] Trainee Party", date: "2023-10-24" },
];

export default async function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid xs={12} md={7}>
          <Stack spacing={1}>
            <Paper
              sx={{
                //width: { xs: "100%", md: "40%" },
                overflow: "hidden",
                borderRadius: "0.5rem",
                marginBottom: { xs: "2rem", md: 0 },
                elevation: 0,
                boxShadow: {
                  xs: "none",
                  md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: { xs: "#FFF", md: "#024761" },
                  padding: { xs: "0.4rem 0", md: "0.8rem 2rem" },
                  color: { xs: "#000", md: "#FFF" },
                  fontSize: "1.3rem",
                  fontWeight: { xs: "600", md: "400" },
                  borderBottom: { xs: "1px solid #C4C4C4", md: "none" },
                }}
              >
                Average Wage
              </Typography>
              <Typography
                sx={{
                  padding: { xs: "0.2rem 0", md: "0.3rem 2rem" },
                  fontSize: "0.8rem",
                }}
              >
                Last updated on April 2023
              </Typography>
              <Box
                sx={{
                  height: "370px",
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                <AverageWage />
              </Box>
            </Paper>
            <Grid container spacing={1}>
              <Grid xs={12} md={6} pl={0}>
                <Paper
                  sx={{
                    //width: { xs: "100%", md: "40%" },
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                    marginBottom: { xs: "2rem", md: 0 },
                    elevation: 0,
                    boxShadow: {
                      xs: "none",
                      md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: { xs: "#FFF", md: "#024761" },
                      padding: { xs: "0.4rem 0", md: "0.8rem 2rem" },
                      color: { xs: "#000", md: "#FFF" },
                      fontSize: "1rem",
                      fontWeight: { xs: "600", md: "400" },
                      borderBottom: { xs: "1px solid #C4C4C4", md: "none" },
                    }}
                  >
                    Current Job Distribution
                  </Typography>
                  <Typography
                    sx={{
                      padding: { xs: "0.2rem 0", md: "0.3rem 2rem" },
                      fontSize: "0.8rem",
                    }}
                  >
                    Last updated on April 2023
                  </Typography>
                  <Box
                    sx={{
                      height: "330px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <JobDistribution />
                  </Box>
                </Paper>
              </Grid>
              <Grid xs={12} md={6} pr={0}>
                <Paper
                  sx={{
                    //width: { xs: "100%", md: "40%" },
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                    marginBottom: { xs: "2rem", md: 0 },
                    elevation: 0,
                    boxShadow: {
                      xs: "none",
                      md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: { xs: "#FFF", md: "#024761" },
                      padding: { xs: "0.4rem 0", md: "0.8rem 2rem" },
                      color: { xs: "#000", md: "#FFF" },
                      fontSize: "1rem",
                      fontWeight: { xs: "600", md: "400" },
                      borderBottom: { xs: "1px solid #C4C4C4", md: "none" },
                    }}
                  >
                    Current Wage Distribution
                  </Typography>
                  <Typography
                    sx={{
                      padding: { xs: "0.2rem 0", md: "0.3rem 2rem" },
                      fontSize: "0.8rem",
                    }}
                  >
                    Last updated on April 2023
                  </Typography>
                  <Box
                    sx={{
                      height: "330px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <WageDistribution />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid xs={12} md={5}>
          <Board title={"Upcoming Events"}>
            <EventTable />
          </Board>
        </Grid>
      </Grid>
    </Box>
  );
}
