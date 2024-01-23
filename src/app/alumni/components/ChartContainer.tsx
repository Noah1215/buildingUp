"use client";
// MUI
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
// Components
import React from "react";

export default function ChartContainer({
  updatedAt,
  children,
}: {
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Typography
        sx={{
          padding: { xs: "0.2rem 0", md: "0.3rem 2rem" },
          fontSize: "0.8rem",
        }}
      >
        Last updated on {updatedAt}
      </Typography>
      <Box
        sx={{
          height: "370px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </>
  );
}
