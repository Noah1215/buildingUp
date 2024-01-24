"use client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
// MUI Icons
import SvgIcon from "@mui/material/SvgIcon";
import HomeIcon from "@mui/icons-material/Home";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import MentorIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/EventNote";
import JobsIcon from "@mui/icons-material/BusinessCenter";
import SupportIcon from "@mui/icons-material/SpeakerNotes";
import MeetingIcon from "@mui/icons-material/PermContactCalendar";

const LINKS = [
  { text: "Home", href: "/alumni", icon: HomeIcon },
  { text: "My Page", href: "/alumni/myPage", icon: MyPageIcon },
  { text: "My Mentor", href: "/alumni/myMentor", icon: MentorIcon },
  { text: "Event", href: "/alumni/event", icon: EventIcon },
  { text: "Jobs", href: "/alumni/jobs", icon: JobsIcon },
  { text: "Support", href: "/alumni/support", icon: SupportIcon },
  { text: "Meeting", href: "/alumni/meeting", icon: MeetingIcon },
  // { text: "My Union", href: "/alumni/myUnion", icon: JobsIcon },
];

export default function Sidebar() {
  return (
    <Box
      component="nav"
      sx={{ height: "100%", width: "100%", backgroundColor: "#024761" }}
    >
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
    </Box>
  );
}
