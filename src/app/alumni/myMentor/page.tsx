import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// MUI
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Components
import MeetingRequestForm from "@/components/Meetings/MeetingRequestForm";
import { Avatar } from "@mui/material";

async function getMentorProfile() {
  const res = await fetch("http://localhost:3000/api/alumni/mentor/profile");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const profile = await getMentorProfile();

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "1rem", md: "2rem" },
      }}
    >
      {/* title */}
      <Box component="header">
        <Typography
          component={"h1"}
          sx={{
            fontSize: { xs: "20px", md: "32px" },
            fontWeight: 600,
          }}
        >
          My Mentor
        </Typography>
      </Box>
      {/* desktop mentor profile */}
      <Paper
        component="section"
        elevation={4}
        sx={{ display: { xs: "none", md: "block" }, padding: "2rem" }}
      >
        <MentorProfile profile={profile} />
      </Paper>
      {/* mobile mentor profile */}
      <Box component="section" sx={{ display: { xs: "block", md: "none" } }}>
        <MentorProfile profile={profile} />
      </Box>
      {/* meeting request form*/}
      <Box component="section" sx={{ width: "100%" }}>
        <MeetingRequestForm />
      </Box>
    </Box>
  );
}

function MentorProfile({ profile }: { profile: any }) {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
      {/* mentor avatar */}
      <Box sx={{ flexBasis: 0, padding: "0 4em", textAlign: "center" }}>
        <Avatar
          alt="Avatar"
          src={profile.avatar}
          sx={{
            margin: "auto",
            width: { xs: "10rem", md: "18rem" },
            height: { xs: "10rem", md: "18rem" },
          }}
        />
        <Typography
          component="h3"
          sx={{
            // 19pt, 14pt, light
            fontSize: { xs: "19px", md: "25px" },
            fontWeight: 500,
          }}
        >
          {profile.name}
        </Typography>
      </Box>
      {/* mentor bio */}
      <Box sx={{ display: "flex", flexFlow: "row wrap", flexGrow: 1 }}>
        <BioItem title={"Phone:"} content={profile.phone} />
        <BioItem title={"Email:"} content={profile.email} />
        <BioItem title={"Employer:"} content={profile.employer} />
        <BioItem title={"Union:"} content={profile.union} />
        <BioItem
          title={"Mentor period:"}
          content={dayjs(profile.since).fromNow(true)}
        />
      </Box>
    </Box>
  );
}

function BioItem({ title, content }: { title: string; content: string }) {
  return (
    <Box sx={{ minWidth: "50%" }}>
      <Typography
        component="p"
        sx={{
          // 14pt, 12pt, light
          fontSize: { xs: "16px", md: "19px" },
          fontWeight: 300,
        }}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        // 17pt, 14pt, regular
        sx={{
          fontSize: { xs: "19px", md: "23px" },
          fontWeight: 400,
        }}
      >
        {content}
      </Typography>
    </Box>
  );
}
