import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button";

//icon
import CancelIcon from "@mui/icons-material/Cancel";

//type
import { eventDetail } from "../Card/EventCard";

type modalProps = {
  event: eventDetail;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailModal = ({ event, isOpen, setIsOpen }: modalProps) => {
  const { category, title, date, startTime, endTime, address, registered } =
    event;
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          outline: "none",
          padding: "3rem 6rem",
          width: "75%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="semibold" fontSize={19}>
            Event Detail
          </Typography>
          <Box>
            <Button
              sx={{
                backgroundColor: "#024761",
                color: "#FFF",
                transition: "transform 0.3s ease",
                ":hover": {
                  backgroundColor: "#024761",
                  color: "#FFF",
                  cursor: "pointer",
                  transform: "scale(1.1)",
                },
                padding: "0.3rem 1rem",
                fontWeight: "medium",
                fontSize: "14px",
                borderRadius: "9px",
              }}
            >
              Register
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
        <Box>{title}</Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
