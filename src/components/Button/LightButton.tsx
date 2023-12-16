import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography/Typography";
type LightButtonProps = {
  content: string;
};

const LightButton = ({ content }: LightButtonProps) => {
  return (
    <>
      <Typography
        variant="body2"
        fontWeight="light"
        sx={{
          border: "1px solid #616480",
          padding: "0.1rem 0.4rem",
          borderRadius: "0.6rem",
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
