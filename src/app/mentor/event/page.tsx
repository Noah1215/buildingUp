import React from "react";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box";
//components
import EventList from "@/components/EventList";

const mentorEvent = () => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" align="left">
        Event
      </Typography>
      <EventList />
    </>
  );
};

export default mentorEvent;
