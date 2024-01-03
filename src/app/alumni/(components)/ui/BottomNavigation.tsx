"use client";
import React from "react";
import Link from "next/link";
// MUI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// MUI Icons
import HomeIcon from "@mui/icons-material/HouseOutlined";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import NotificationIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import MenteeIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/EventNote";
import JobsIcon from "@mui/icons-material/BusinessCenter";
import SupportIcon from "@mui/icons-material/SpeakerNotes";
import MeetingIcon from "@mui/icons-material/PermContactCalendar";

const FOOTER = [
  { id: 0, text: "Home", icon: HomeIcon },
  { id: 1, text: "My Page", icon: MyPageIcon },
  { id: 2, text: "More", icon: MoreIcon },
  { id: 3, text: "Notification", icon: NotificationIcon },
  { id: 4, text: "Log Out", icon: LogoutIcon },
];

const MenuList = [
  { text: "Mentee", href: "/mentor/mentee", icon: MenteeIcon },
  { text: "Event", href: "/mentor/event", icon: EventIcon },
  { text: "Jobs", href: "/mentor/jobs", icon: JobsIcon },
  { text: "Support", href: "/mentor/support", icon: SupportIcon },
  { text: "Meeting", href: "/mentor/meeting", icon: MeetingIcon },
];

const BottomNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          display: { xs: "flex", md: "none" },
          zIndex: 2000,
        }}
      >
        <List
          sx={{
            width: "100%",
            padding: 0,
            position: "fixed",
            backgroundColor: "#FFFFFF",
            bottom: 0,
            display: "flex",
            boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {FOOTER.map(({ id, text, icon: Icon }) => (
            <ListItem
              key={id}
              disablePadding
              sx={{
                alignItems: "center",
                justifyContent: "center",
                height: "10%",
              }}
            >
              <ListItemButton
                component={Button}
                sx={{
                  color: "#024761",
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  "&:hover": {
                    backgroundColor: "#EBF4FF",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                href={
                  id === 0 ? "/mentor" : id === 1 ? "/mentor/myPage" : undefined
                }
                onClick={id === 2 ? handleMenuToggle : undefined}
              >
                <ListItemIcon sx={{ color: "#024761", marginTop: "0.5rem" }}>
                  <Icon sx={{ fontSize: "2.5rem", margin: "auto" }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "0.7rem", fontWeight: "400" }}
                    >
                      {text}
                    </Typography>
                  }
                  sx={{ marginBottom: "0.5rem" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AppBar>
      <Menu
        id="simple-menu"
        marginThreshold={0}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: "100%",
              backgroundColor: "#024761",
              display: { xs: "block", md: "none" },
            },
          },
        }}
      >
        {MenuList.map(({ text, href, icon: Icon }) => (
          <MenuItem
            key={text}
            onClick={handleClose}
            sx={{ "&:hover": { backgroundColor: "#035B7D" } }}
          >
            <ListItemButton
              component={Link}
              href={href}
              sx={{
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                gap: "3rem",
                paddingLeft: "2rem",
              }}
            >
              <ListItemIcon sx={{ color: "#FFF" }}>
                <Icon sx={{ fontSize: "1.8rem" }} />
              </ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItemButton>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BottomNavigation;
