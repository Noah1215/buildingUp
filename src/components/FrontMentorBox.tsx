import React from "react";
import Paper from "@mui/material/Paper";

const FrontMentorBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Paper
      sx={{
        width: { xs: "100%", md: "40%" },
        overflow: "hidden",
        borderRadius: "0.5rem",
        marginBottom: { xs: "2rem", md: 0 },
        elevation: 0,
        boxShadow: {
          xs: "none",
          md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        },
      }}
    >
      {children}
    </Paper>
  );
};

export default FrontMentorBox;
