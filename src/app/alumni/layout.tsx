// Supabase
import { getUser, getUserName, getUserRole } from "@/app/supabase-server";
// Next
import { redirect, notFound } from "next/navigation";
// Components
import Header from "@/components/Header";
import SideDrawer from "@/components/SideDrawer";
import Footer from "@/components/Footer";
// MUI
import Box from "@mui/material/Box";
// MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import MenteeIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/EventNote";
import JobsIcon from "@mui/icons-material/BusinessCenter";
import SupportIcon from "@mui/icons-material/SpeakerNotes";
import MeetingIcon from "@mui/icons-material/PermContactCalendar";
import MentorListIcon from "@mui/icons-material/PersonAdd";

const DRAWER_WIDTH = 220;

const LINKS = [
  { text: "Home", href: "/alumni", icon: HomeIcon },
  { text: "My Page", href: "/alumni/myPage", icon: MyPageIcon },
  { text: "My Mentor", href: "/alumni/myMentor", icon: MenteeIcon },
  { text: "Event", href: "/alumni/event", icon: EventIcon },
  { text: "Jobs", href: "/alumni/jobs", icon: JobsIcon },
  { text: "Support", href: "/alumni/support", icon: SupportIcon },
  { text: "Meeting", href: "/alumni/meeting", icon: MeetingIcon },
  { text: "Mentor List", href: "/alumni/mentors", icon: MentorListIcon },
  { text: "My Union", href: "/alumni/myUnion", icon: JobsIcon },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Layout");

  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const userRole = await getUserRole();

  if (userRole !== "alumni") {
    return notFound();
  }

  const userName = await getUserName();

  return (
    <>
      <Header userName={userName} />
      <SideDrawer links={LINKS} width={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#FFF",
          ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
          mt: ["48px", "56px", "64px"],
          p: 3,
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
