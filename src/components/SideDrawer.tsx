"use client";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SvgIcon from "@mui/material/SvgIcon";

interface Props {
  links: link[];
  width: number;
}

interface link {
  text: string;
  href: string;
  icon: typeof SvgIcon;
}

export default function SideDrawer({ links, width }: Props) {
  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
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
        {links.map(({ text, href, icon: Icon }) => (
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
  );
}
