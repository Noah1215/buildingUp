import { notFound, redirect } from "next/navigation";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

import HomeIcon from "@mui/icons-material/HouseOutlined";
import EventIcon from "@mui/icons-material/EventNote";
import JobpostingIcon from "@mui/icons-material/BusinessCenter";
import CalendarIcon from "@mui/icons-material/PermContactCalendar";
import ManageIcon from "@mui/icons-material/SpeakerNotes";
//import NotificationActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Footer from "@/components/Footer";

const LINKS = [
  { text: "Home", href: "/admin", icon: HomeIcon },
  { text: "Event", href: "/admin/event", icon: EventIcon },
  { text: "Job Posting", href: "/admin/jobposting", icon: JobpostingIcon },
  { text: "Calendar", href: "/admin/calendar", icon: CalendarIcon },
  { text: "Manage", href: "/admin/manage", icon: ManageIcon },
];
import { getUser, getUserRole } from "@/app/supabase-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const userRole = await getUserRole();

  if (userRole !== "alumni") {
    return notFound();
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 2000 }}>
        <Toolbar
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="header"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
              justifyContent: { xs: "space-between", md: "flex-start" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100px", md: "140px" },
                height: { xs: "21px", md: "30px" },
              }}
            >
              <Image
                src="/img/logo.png"
                alt="logo"
                width={140}
                height={30}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  height: { xs: "2rem", md: "3rem" },
                  width: { xs: "2rem", md: "3rem" },
                  backgroundColor: "#D9D9D9",
                  borderRadius: { xs: "1rem", md: "1.5rem" },
                  marginLeft: "3rem",
                }}
              />
              <Typography
                variant="h6"
                color="#024761"
                sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}
              >
                Welcome, User
              </Typography>
            </Box>

            <NotificationIcon
              sx={{
                display: { xs: "none", md: "block" },
                color: "#024761",
                fontSize: "1.8rem",
              }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <LogoutIcon sx={{ color: "#024761", fontSize: "2rem" }} />
            <Typography
              variant="h6"
              color="#024761"
              sx={{ fontSize: "1.1rem", whiteSpace: "nowrap" }}
            >
              Log Out
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: ["48px", "56px", "64px"],
            height: "auto",
            bottom: 0,
            backgroundColor: "#024761",
          },
          display: { xs: "none", md: "block" },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {LINKS.map(({ text, href, icon: Icon }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                sx={{
                  color: "#FFF",
                  "&:hover": {
                    backgroundColor: "#035B7D",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#FFF" }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#FFF",
          ml: { xs: 0, md: `${CHILD_WIDTH}px` },
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
