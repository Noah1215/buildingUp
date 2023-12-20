import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button";

//icon
import CancelIcon from "@mui/icons-material/Cancel";
type modalHeaderProps = {
  title: string;
  buttonContent: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalHeader = ({ title, buttonContent, setIsOpen }: modalHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" fontWeight="500" fontSize={19}>
        {title}
      </Typography>
      <Box>
        <Button
          sx={{
            backgroundColor: "#024761",
            color: "#FFF",
            transition: "background-color 0.3s ease",
            ":hover": {
              backgroundColor: "#035B7D",
              color: "#FFF",
              cursor: "pointer",
            },
            padding: "0.3rem 1rem",
            fontWeight: "medium",
            fontSize: "14px",
            borderRadius: "9px",
          }}
        >
          {buttonContent}
        </Button>
        <CancelIcon
          onClick={() => setIsOpen(false)}
          sx={{
            position: "absolute",
            top: "3%",
            left: "95%",
            fontSize: "40px",
            color: "#495057",
            transition: "transform 0.3s ease",
            ":hover": { cursor: "pointer", transform: "scale(1.2)" },
          }}
        />
      </Box>
    </Box>
  );
};

export default ModalHeader;
