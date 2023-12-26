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
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            backgroundColor: { xs: "transparent", md: "#024761" },
            color: { xs: "#024761", md: "#FFF" },
            transition: "background-color 0.3s ease",
            ":hover": {
              backgroundColor: "#035B7D",
              color: "#FFF",
              cursor: "pointer",
            },
            padding: { xs: 0, md: "0.3rem 1rem" },
            fontWeight: "medium",
            fontSize: { xs: "12px", md: "14px" },
            borderRadius: "8px",
          }}
        >
          {buttonContent}
        </Button>
        <Typography
          sx={{ marginRight: "2rem", fontWeight: "medium", fontSize: "19px" }}
        >
          Event Detail
        </Typography>
        <CancelIcon onClick={() => setIsOpen(false)} />
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="500"
          fontSize={19}
          sx={{ display: "flex" }}
        >
          Event Detail
        </Typography>
        <Box sx={{ display: "flex" }}>
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
              top: "2%",
              left: "95%",
              fontSize: "40px",
              color: "#495057",
              transition: "transform 0.3s ease",
              ":hover": { cursor: "pointer", transform: "scale(1.2)" },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ModalHeader;
