"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import EventCard from "./Card/EventCard";
import SearchBar from "./SearchBar";
import LightButton from "./Button/LightButton";

import {
  checkRegistrationStatus,
  getEventsList,
  getUser,
} from "@/app/supabase-client";

// Type
import { EventType } from "@/app/mentor/event/eventType";

const popoverContent = ["ALL", "Seminar", "Workshop", "Party"];

const sortEvents = (events: EventType[] | null) => {
  if (events) {
    const sortedEvents = events.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.startTime}`);
      const dateB = new Date(`${b.date} ${b.startTime}`);
      if (dateA.getTime() === dateB.getTime()) {
        const startTimeA = new Date(`1970-01-01 ${a.startTime}`);
        const startTimeB = new Date(`1970-01-01 ${b.startTime}`);
        return startTimeA.getTime() - startTimeB.getTime();
      }

      return dateA.getTime() - dateB.getTime();
    });

    return sortedEvents;
  }

  return [];
};

const EventList = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState<EventType[]>([]);
  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const eventsList = await getEventsList();
        const sortedEvents = sortEvents(eventsList);
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventList();
  }, []);

  const updateEventList = async (newEvents: EventType[] | null) => {
    try {
      if (newEvents !== null) {
        const sortedEvents = sortEvents(newEvents);
        setEvents(sortedEvents);
      }
    } catch (error) {
      console.error("Error updating event list:", error);
    }
  };

  const filteredEventData =
    selectedCategory === "ALL"
      ? events
      : events.filter((event) => event.type === selectedCategory);

  const getFilteredData = () => {
    if (!searchText) {
      return filteredEventData;
    }

    return filteredEventData.filter((event) =>
      event.name.toLowerCase().includes(searchText.toLowerCase())
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
          <EventCard
            event={data}
            key={index}
            updateEventList={updateEventList}
          />
        ))}
      </Box>
    </>
  );
};

export default EventList;
