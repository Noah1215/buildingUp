import React from "react";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box";

//components
import SearchBar from "@/components/SearchBar";
import LightButton from "@/components/Button/LightButton";
import EventCard from "@/components/Card/EventCard";

const eventData = [
  {
    category: "Career",
    title: "Career Consulting Seminar",
    date: "11/01/2023",
    startTime: "09:00AM",
    endTime: "11:00AM",
    address: "123 ABC, Toronto, ON",
    registered: 114,
    color: "#ED6C02",
  },
  {
    category: "Workshop",
    title: "Alumni Workshop",
    date: "11/02/2023",
    startTime: "09:00AM",
    endTime: "11:00AM",
    address: "123 ABC, Toronto, ON",
    registered: 123,
    color: "#86CD82",
  },
  {
    category: "Party",
    title: "Dinner Party",
    date: "11/03/2023",
    startTime: "09:00PM",
    endTime: "11:00PM",
    address: "123 ABC, Toronto, ON",
    registered: 130,
    color: "#024761",
  },
];

const mentorEvent = () => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" align="left">
        Event
      </Typography>
      <SearchBar />
      <Box
        sx={{
          display: "flex",
          gap: "0.2rem",
          marginTop: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <LightButton content="ALL" />
        <LightButton content="Seminar" />
        <LightButton content="Workshop" />
        <LightButton content="Party" />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "95%" }}>
        {eventData.map((data, index) => (
          <EventCard event={data} key={index} />
        ))}
      </Box>
    </>
  );
};

export default mentorEvent;
