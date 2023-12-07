import React from "react";
import Typography from "@mui/material/Typography/Typography";

type Props = {
  title: string;
  updated: string;
};

const ChartHeader = ({ title, updated }: Props) => {
  return (
    <>
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
      <Typography
        sx={{
          padding: { xs: "0.2rem 0", md: "0.3rem 2rem" },
          fontSize: "0.8rem",
        }}
      >
        {updated}
      </Typography>
    </>
  );
};

export default ChartHeader;
