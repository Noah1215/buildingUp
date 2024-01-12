import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button";

//icon
import CancelIcon from "@mui/icons-material/Cancel";

//method
import { toggleEventRegistration } from "@/app/supabase-client";

//type
import { EventType } from "@/app/mentor/event/eventType";

type modalHeaderProps = {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventId: string;
  userId: string;
  updateEventList: (newEvents: EventType[] | null) => void;
};

const ModalHeader = ({
  title,
  setIsOpen,
  userId,
  eventId,
  updateEventList,
}: modalHeaderProps) => {
  const handleRegisterButtonClick = async () => {
    try {
      await toggleEventRegistration(eventId, userId, updateEventList);
      console.log("Event registered successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleRegisterButtonClick}
          sx={{
            backgroundColor: { xs: "transparent", lg: "#024761" },
            color: { xs: "#024761", lg: "#FFF" },
            transition: "background-color 0.3s ease",
            ":hover": {
              backgroundColor: "#035B7D",
              color: "#FFF",
              cursor: "pointer",
            },
            padding: { xs: 0, lg: "0.3rem 1rem" },
            fontWeight: "medium",
            fontSize: { xs: "12px", lg: "14px" },
            borderRadius: "8px",
          }}
        >
          Register
        </Button>
        <Typography
          sx={{ marginRight: "2rem", fontWeight: "medium", fontSize: "19px" }}
        >
          {title}
        </Typography>
        <CancelIcon onClick={() => setIsOpen(false)} />
      </Box>
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
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
          {title}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={handleRegisterButtonClick}
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
            Register
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
