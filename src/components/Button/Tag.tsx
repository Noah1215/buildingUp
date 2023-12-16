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
        border: "1px solid #616480",
        padding: "0.1rem 0.4rem",
        borderRadius: "0.6rem",
        width: "10%",
        textAlign: "center",
      }}
    >
      {content}
    </Typography>
  );
};

export default Tag;
