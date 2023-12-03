// Supabase
import { getUser, getUserName, getUserRole } from "@/app/supabase-server";
// Next
import { notFound, redirect } from "next/navigation";
// Components
import Header from "@/components/Header";
import SideDrawer from "@/components/SideDrawer";
import Footer from "@/components/Footer";
// MUI
import Box from "@mui/material/Box";
// MUI Icons
import HomeIcon from "@mui/icons-material/HouseOutlined";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/EventNote";
import JobsIcon from "@mui/icons-material/BusinessCenter";
import CalendarIcon from "@mui/icons-material/PermContactCalendar";
import ManageIcon from "@mui/icons-material/SpeakerNotes";

const DRAWER_WIDTH = 220;

const LINKS = [
  { text: "Home", href: "/admin", icon: HomeIcon },
  { text: "My Page", href: "/admin/myPage", icon: MyPageIcon },
  { text: "Event", href: "/admin/event", icon: EventIcon },
  { text: "Jobs", href: "/admin/jobs", icon: JobsIcon },
  { text: "Calendar", href: "/admin/calendar", icon: CalendarIcon },
  { text: "Manage", href: "/admin/manage", icon: ManageIcon },
];

export default async function AdminLayout({
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

  if (userRole !== "admin") {
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
