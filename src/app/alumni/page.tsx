import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import Board from "@/app/alumni/board";

const announcements = [
  { title: "[Workshop] Alumni Workshop", date: "2023-11-28" },
  { title: "[Party] Trainee Party", date: "2023-10-24" },
];

const Schedule = [
  { title: "Mentor 1", date: "2023-11-23" },
  { title: "Mentor 2", date: "2023-10-25" },
];

export default async function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={5}>
        <Grid xs={12} sm={6}>
          <Board title={"Announcement"} data={announcements} />
        </Grid>
        <Grid xs={12} sm={6}>
          <Board title={"Schedule"} data={Schedule} />
        </Grid>
      </Grid>
    </Box>
  );
}
