import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import Box from "@mui/material/Box";

import HomeIcon from "@mui/icons-material/HouseOutlined";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import MenteeIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/EventNote";
import JobsIcon from "@mui/icons-material/BusinessCenter";
import SupportIcon from "@mui/icons-material/SpeakerNotes";
import MeetingIcon from "@mui/icons-material/PermContactCalendar";
//import NotificationActiveIcon from "@mui/icons-material/NotificationsActive";

import Footer from "@/components/Footer";
import { getUserName, getUserRole } from "@/app/supabase-server";
import Header from "@/components/Header";
import SideDrawer from "@/components/SideDrawer";

const LINKS = [
  { text: "Home", href: "/mentor", icon: HomeIcon },
  { text: "My Page", href: "/mentor/myPage", icon: MyPageIcon },
  { text: "Mentee", href: "/mentor/mentee", icon: MenteeIcon },
  { text: "Events", href: "/mentor/event", icon: EventIcon },
  { text: "Jobs", href: "/mentor/jobs", icon: JobsIcon },
  { text: "Support", href: "/mentor/support", icon: SupportIcon },
  { text: "Meeting", href: "/mentor/meeting", icon: MeetingIcon },
];

export default async function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const DRAWER_WIDTH = 220;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const userRole = await getUserRole();
  const userName = await getUserName();
  if (userRole !== "mentor") {
    return notFound();
  }

  return (
    <>
      <Header userName={userName} />
      <SideDrawer links={LINKS} width={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#FFF",
          ml: { xs: 0, md: "300px" },
          mt: ["60px", "80px", "100px"],
          p: 3,
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
