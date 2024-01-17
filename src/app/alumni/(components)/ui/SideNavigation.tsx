"use client";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

// MUI Icons
import SvgIcon from "@mui/material/SvgIcon";
import HomeIcon from "@mui/icons-material/Home";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import MentorIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/EventNote";
import JobsIcon from "@mui/icons-material/BusinessCenter";
import SupportIcon from "@mui/icons-material/SpeakerNotes";
import MeetingIcon from "@mui/icons-material/PermContactCalendar";
import MentorListIcon from "@mui/icons-material/PersonAdd";

const LINKS = [
  { text: "Home", href: "/alumni", icon: HomeIcon },
  { text: "My Page", href: "/alumni/myPage", icon: MyPageIcon },
  { text: "My Mentor", href: "/alumni/myMentor", icon: MentorIcon },
  { text: "Event", href: "/alumni/event", icon: EventIcon },
  { text: "Jobs", href: "/alumni/jobs", icon: JobsIcon },
  { text: "Support", href: "/alumni/support", icon: SupportIcon },
  { text: "Meetings", href: "/alumni/meetings", icon: MeetingIcon },
  // { text: "Mentor List", href: "/alumni/mentors", icon: MentorListIcon },
  { text: "My Union", href: "/alumni/myUnion", icon: JobsIcon },
];

const DRAWER_WIDTH = "220px";

export default function SideNavigation() {
  return (
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
  );
}
