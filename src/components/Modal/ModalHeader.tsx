"use client";
import React, { useState, useEffect } from "react";
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
  isRegistered: boolean | undefined;
};

const ModalHeader = ({
  title,
  setIsOpen,
  userId,
  eventId,
  updateEventList,
  isRegistered,
}: modalHeaderProps) => {
  const [buttonText, setButtonText] = useState("Register");

  useEffect(() => {
    setButtonText(isRegistered ? "Registered" : "Register");
  }, [isRegistered]);
  const handleRegisterButtonClick = async () => {
    try {
      await toggleEventRegistration(eventId, userId, updateEventList);

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
            backgroundColor: isRegistered ? "#616480" : "transparent",
            color: isRegistered ? "#FFF" : "#024761",
            transition: "background-color 0.3s ease",
            ":hover": {
              backgroundColor: isRegistered ? "#616480" : "#035B7D",
              color: "#FFF",
              cursor: "pointer",
            },
            padding: "0.2rem",
            fontWeight: "medium",
            fontSize: "12px",
            borderRadius: "8px",
          }}
        >
          {isRegistered ? "Registered" : "Register"}
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
              backgroundColor: isRegistered ? "#616480" : "#024761",
              color: "#FFF",
              transition: "background-color 0.3s ease",
              ":hover": {
                backgroundColor: isRegistered ? "#616480" : "#035B7D",
                color: "#FFF",
                cursor: "pointer",
              },
              padding: "0.3rem 1rem",
              fontWeight: "medium",
              fontSize: "14px",
              borderRadius: "9px",
            }}
          >
            {buttonText}
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
