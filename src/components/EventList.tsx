"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";

import EventCard from "./Card/EventCard";
import SearchBar from "./SearchBar";
import LightButton from "./Button/LightButton";

const eventData = [
  {
    category: "Seminar",
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

const EventList = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const filteredEventData =
    selectedCategory === "ALL"
      ? eventData
      : eventData.filter((event) => event.category === selectedCategory);

  const handleButtonClick = (category: string, index: number) => {
    setSelectedCategory(category);
    setSelectedButtonIndex(index);
  };

  return (
    <>
      <SearchBar />
      <Box
        sx={{
          display: "flex",
          gap: "0.2rem",
          marginTop: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {["ALL", "Seminar", "Workshop", "Party"].map((category, index) => (
          <div key={index} onClick={() => handleButtonClick(category, index)}>
            <LightButton
              content={category}
              isSelected={index === selectedButtonIndex}
            />
          </div>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "95%" }}>
        {filteredEventData.map((data, index) => (
          <EventCard event={data} key={index} />
        ))}
      </Box>
    </>
  );
};

export default EventList;
