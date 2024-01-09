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

const popoverContent = ["ALL", "Seminar", "Workshop", "Party"];

const EventList = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const filteredEventData =
    selectedCategory === "ALL"
      ? eventData
      : eventData.filter((event) => event.category === selectedCategory);

  const getFilteredData = () => {
    if (!searchText) {
      return filteredEventData;
    }

    return filteredEventData.filter((event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleButtonClick = (category: string, index: number) => {
    setSelectedCategory(category);
    setSelectedButtonIndex(index);
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        isFilter={false}
        popoverContent={popoverContent}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "95%" },
          marginTop: { xs: "0.5rem", md: 0 },
        }}
      >
        {getFilteredData().map((data, index) => (
          <EventCard event={data} key={index} />
        ))}
      </Box>
    </>
  );
};

export default EventList;
