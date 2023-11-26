"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";

import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

import HomeIcon from "@mui/icons-material/HouseOutlined";
import MyPageIcon from "@mui/icons-material/AccountCircle";
import NotificationIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const FOOTER = [
  { id: 0, text: "Home", icon: HomeIcon },
  { id: 1, text: "My Page", icon: MyPageIcon },
  { id: 2, text: "More", icon: MoreIcon },
  { id: 3, text: "Notification", icon: NotificationIcon },
  { id: 4, text: "Log Out", icon: LogoutIcon },
];

const Footer = () => {
  return (
    <Drawer
      sx={{
        width: "100%",
        "& .MuiDrawer-paper": {
          width: "100%",
          boxSizing: "border-box",
          bottom: 0,
          backgroundColor: "#024761",
        },
        display: { xs: "flex", md: "none" },
        bottom: 0,
      }}
      variant="permanent"
      anchor="bottom"
    >
      <List
        sx={{
          width: "100%",
          padding: 0,
          position: "fixed",
          backgroundColor: "#024761",
          bottom: 0,
          display: "flex",
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
                color: "#FFF",
                width: "100%",
                height: "100%",
                padding: 0,
                "&:hover": {
                  backgroundColor: "#035B7D",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              href={
                id === 0 ? "/mentor" : id === 1 ? "/mentor/myPage" : undefined
              }
            >
              <ListItemIcon sx={{ color: "#FFF", marginTop: "0.5rem" }}>
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
    </Drawer>
  );
};

export default Footer;
