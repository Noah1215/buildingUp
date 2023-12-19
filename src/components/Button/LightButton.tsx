"use client";

import React from "react";
import Typography from "@mui/material/Typography/Typography";
type LightButtonProps = {
  content: string;
  isSelected: boolean;
};

const LightButton = ({ content, isSelected }: LightButtonProps) => {
  return (
    <>
      <Typography
        variant="body2"
        fontWeight="light"
        sx={{
          border: "1px solid #616480",
          padding: "0.1rem 0.4rem",
          borderRadius: "0.6rem",
          backgroundColor: isSelected ? "#EBF4FF" : "transparent",
          "&:hover": {
            backgroundColor: "#EBF4FF",
            cursor: "pointer",
          },
        }}
      >
        {content}
      </Typography>
    </>
  );
};

export default LightButton;
