import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// MUI
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Components
import MeetingRequestForm from "@/components/Meetings/MeetingRequestForm";

import MentorProfile from "./MentorProfile";
const DEFAULT_AVATAR = "https://i.pravatar.cc/300";

interface MentorProfile {
  name: string;
  phone: string;
  employer: string;
  email: string;
  union: string;
  mentorPeriod: string;
  avatar: string;
}

export default async function Page() {
  const profile = await getMentorProfile();
  console.log(profile);

  if (!profile) {
    // TODO: Add error handling for user without mentor profile
    notFound();
  }

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
        <MentorProfile data={profile} />
      </Paper>
      {/* mobile mentor profile */}
      <Box component="section" sx={{ display: { xs: "block", md: "none" } }}>
        <MentorProfile data={profile} />
      </Box>
      {/* meeting request form*/}
      <Box component="section" sx={{ width: "100%" }}>
        <MeetingRequestForm />
      </Box>
    </Box>
  );
}

async function getMentorProfile(): Promise<MentorProfile> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const { data: mentor } = await supabase
      .from("alumni_mentor")
      .select("mentor_id")
      .eq("alumni_id", user.id)
      .single()
      .throwOnError();

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    const mentorId = mentor.mentor_id;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", mentorId)
      .single()
      .throwOnError();

    // TODO: Change default avatar
    const mentorProfile: MentorProfile = {
      name: profile.name ?? "N/A",
      phone: profile.phone ?? "N/A",
      employer: profile.employer ?? "N/A",
      email: profile.email ?? "N/A",
      union: profile.union ?? "N/A",
      mentorPeriod: profile.joined_at
        ? dayjs(profile.joined_at).fromNow(true)
        : "N/A",
      avatar: profile.avatar ?? DEFAULT_AVATAR,
    };

    return mentorProfile;
  } catch (error) {
    console.error("Error:", error);

    const emptyProfile: MentorProfile = {
      name: "N/A",
      phone: "N/A",
      employer: "N/A",
      email: "N/A",
      union: "N/A",
      mentorPeriod: "N/A",
      avatar: DEFAULT_AVATAR,
    };

    return emptyProfile;
  }
}
