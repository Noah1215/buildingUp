"use client";
// MUI
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import NotificationIcon from "@mui/icons-material/Notifications";
// Components
import SignOutButton from "@/components/SignOutButton";

interface Props {
  userName: string;
}

export default function Header({ userName }: Props) {
  return (
    <AppBar
      component="header"
      sx={{
        width: "100%",
      }}
    >
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
            <Avatar
              sx={{
                height: { xs: "2rem", md: "3rem" },
                width: { xs: "2rem", md: "3rem" },
                backgroundColor: "#D9D9D9",
                marginLeft: "3rem",
              }}
            ></Avatar>
            <Typography
              variant="h6"
              color="#024761"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              Welcome, {userName}
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
          <SignOutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
