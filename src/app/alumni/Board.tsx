"use client";
import React from "react";
// MUI
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Board({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      sx={{
        overflow: "hidden",
        borderRadius: "0.5rem",
        elevation: 0,
        boxShadow: {
          xs: "none",
          md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Typography
        sx={{
          backgroundColor: { xs: "#FFF", md: "#024761" },
          padding: { xs: "0.4rem 0", md: "0.8rem 2rem" },
          color: { xs: "#000", md: "#FFF" },
          fontSize: "1.3rem",
          fontWeight: { xs: "600", md: "400" },
          borderBottom: { xs: "1px solid #C4C4C4", md: "none" },
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
