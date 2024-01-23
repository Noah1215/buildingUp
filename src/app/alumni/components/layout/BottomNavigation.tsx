"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// MUI
import { styled } from "@mui/material/styles";
import { default as MuiBottomNavigation } from "@mui/material/BottomNavigation";
import { default as MuiBottomNavigationAction } from "@mui/material/BottomNavigationAction";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material";
// MUI Icons
import HomeIcon from "@mui/icons-material/HouseOutlined";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import NotificationIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MentorIcon from "@mui/icons-material/AccessibilityNew";
import EventIcon from "@mui/icons-material/EventNote";
import JobsIcon from "@mui/icons-material/EngineeringOutlined";
import SupportIcon from "@mui/icons-material/SpeakerNotes";
import MeetingIcon from "@mui/icons-material/PermContactCalendar";
import UnionIcon from "@mui/icons-material/BusinessCenter";

const NAVIGATION_ITEMS = [
  { icon: HomeIcon, label: "Home", link: "/alumni" },
  { icon: MyPageIcon, label: "MyPage", link: "/alumni/myPage" },
  { icon: MoreIcon, label: "More", link: "/" },
  {
    icon: NotificationIcon,
    label: "Notifications",
    link: "/alumni/notifications",
  },
  { icon: LogoutIcon, label: "Log out", link: "/logout" },
];

const HIDDEN_MENU_ITEMS = [
  { icon: MentorIcon, label: "My Mentor", link: "/alumni/myMentor" },
  { icon: EventIcon, label: "Event", link: "/alumni/event" },
  { icon: JobsIcon, label: "Jobs", link: "/alumni/jobs" },
  { icon: SupportIcon, label: "Support", link: "/alumni/support" },
  { icon: MeetingIcon, label: "Meeting", link: "/alumni/meeting" },
  { icon: UnionIcon, label: "My Union", link: "/alumni/myUnion" },
];

const StyledNavigation = styled(MuiBottomNavigation)({
  height: "100%",
  width: "100%",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
});

const StyledNavigationItem = styled(MuiBottomNavigationAction)({
  // padding: 0,
  minWidth: "fit-content",
  "& .MuiBottomNavigationAction-label": {
    color: "#234561",
    fontSize: "0.7rem",
    fontWeight: "400",
  },
  "& .MuiSvgIcon-root": {
    color: "#234561",
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  // "&:hover": {
  //   backgroundColor: "#EBF4FF",
  // },
});

const StyledMenu = styled(Menu)({
  ".MuiPaper-root": {
    display: { sx: "block", md: "none" },
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#234561",
  },
});

const StyledMenuItem = styled(MenuItem)({
  paddingLeft: "2rem",
  gap: "3rem",
  "& .MuiTypography-root": {
    color: "#ffffff",
  },
  "& .MuiSvgIcon-root": {
    color: "#ffffff",
    fontSize: "1.8rem",
  },
  // "&:hover": { backgroundColor: "#2f597d" },
});

export default function BottomNavigation() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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
      <StyledNavigation showLabels>
        {NAVIGATION_ITEMS.map((item) => (
          <StyledNavigationItem
            key={item.label}
            label={item.label}
            icon={<item.icon />}
            onClick={
              item.label === "More"
                ? handleMenuToggle
                : () => {
                    router.push(item.link);
                  }
            }
          />
        ))}
      </StyledNavigation>
      <StyledMenu
        sx={{ display: { xs: "block", md: "none" } }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        marginThreshold={0}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {HIDDEN_MENU_ITEMS.map((item) => (
          <StyledMenuItem
            key={item.label}
            onClick={() => {
              router.push(item.link);
            }}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
}
