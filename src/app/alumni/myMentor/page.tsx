import { cache } from "react";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// MUI
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
// Components
import MeetingRequestForm from "@/components/MeetingRequestForm";
import { Stack, Avatar } from "@mui/material";
import { WidthFull } from "@mui/icons-material";

async function getMentorProfile() {
  const res = await fetch("http://localhost:3000/api/alumni/mentor/profile");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const profile = await getMentorProfile();
  console.log("profile ", profile);

  return (
    <Grid
      container
      spacing={4}
      sx={{
        margin: {
          md: 6,
        },
      }}
      maxWidth={"1200px"}
    >
      <Grid xs={12} order={1}>
        My Mentor
      </Grid>
      <Grid xs={12} order={2}>
        <Paper elevation={4}>
          <Grid
            container
            spacing={4}
            sx={{
              padding: {
                md: 6,
              },
            }}
          >
            <Grid xs={12} md={5}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  alt="Avatar"
                  src={profile.avatar}
                  sx={{ width: 200, height: 200 }}
                />
                <div>{profile.name}</div>
                <div>{profile.userType}</div>
              </Stack>
            </Grid>
            <Grid xs={12} md={7} container>
              <Grid xs={12}>
                <div>About your mentor:</div>
              </Grid>
              <Grid xs={12} md={4}>
                <div>Phone Number:</div>
                <div>{profile.phone}</div>
              </Grid>
              <Grid xs={12} md={4}>
                <div>Email:</div>
                <div>{profile.email}</div>
              </Grid>
              <Grid xs={12} md={4}>
                <div>Employer:</div>
                <div>{profile.employer}</div>
              </Grid>
              <Grid xs={12} md={4}>
                <div>Union:</div>
                <div>{profile.union}</div>
              </Grid>
              <Grid xs={12} md={4}>
                <div>Mentor period:</div>
                <div>{dayjs(profile.since).fromNow(true)}</div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={12} order={3}>
        <MeetingRequestForm />
      </Grid>
    </Grid>
  );
}
