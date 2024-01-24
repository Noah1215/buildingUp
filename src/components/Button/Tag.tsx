import React from "react";
import Typography from "@mui/material/Typography/Typography";

type TagProps = {
  content: string;
};

const Tag = ({ content }: TagProps) => {
  return (
    <Typography
      variant="body2"
      fontWeight="light"
      sx={{
        border: "1px solid #000",
        padding: "0.1rem 1.5rem",
        borderRadius: "8px",
        textAlign: "center",
        fontSize: { xs: "12px", md: "14px" },
      }}
    >
      {content}
    </Typography>
  );
};

export default Tag;
