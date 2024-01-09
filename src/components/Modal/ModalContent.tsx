import React from "react";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography/Typography";

type ModalContentProps = {
  firstTitle: string;
  secondTitle: string;
  firstContent: string;
  secondContent: string;
  FirstIcon: typeof SvgIcon;
  SecondIcon: typeof SvgIcon;
};

const ModalContent = ({
  firstTitle,
  secondTitle,
  firstContent,
  secondContent,
  FirstIcon,
  SecondIcon,
}: ModalContentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <div style={{ width: "40%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FirstIcon
            sx={{
              fontSize: "19px",
              marginRight: "0.2rem",
            }}
          />
          <Typography sx={{ fontWeight: "light", fontSize: "17px" }}>
            {firstTitle}
          </Typography>
        </div>
        <Typography sx={{ fontWeight: "Regular", fontSize: "17px" }}>
          {firstContent}
        </Typography>
      </div>
      <div style={{ width: "40%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SecondIcon
            sx={{
              fontSize: "19px",
              marginRight: "0.2rem",
            }}
          />
          <Typography sx={{ fontWeight: "light", fontSize: "17px" }}>
            {secondTitle}
          </Typography>
        </div>
        <Typography sx={{ fontWeight: "Regular", fontSize: "17px" }}>
          {secondContent}
        </Typography>
      </div>
    </Box>
  );
};

export default ModalContent;
