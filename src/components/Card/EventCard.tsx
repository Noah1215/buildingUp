"use client";

import React, { useState } from "react";

import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

//components
import Tag from "@/components/Button/Tag";

//icon
import LikeIcon from "@mui/icons-material/FavoriteBorder";
import FilledLikeIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import ClockIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import RegisteredIcon from "@mui/icons-material/AccountBoxOutlined";
import DetailModal from "../Modal/DetailModal";

export type eventDetail = {
  type: "Seminar" | "Workshop" | "Party";
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  description: string;
};

type EventDetailProps = {
  event: eventDetail;
  key: number;
};

const getColorByType = (eventType: string): string => {
  switch (eventType) {
    case "Seminar":
      return "#ED6C02";
    case "Workshop":
      return "#86CD82";
    case "Party":
      return "#024761";
    default:
      return "#000000";
  }
};

export const formatTime = (timeString: string): string => {
  const [hour, minute] = timeString.split(":");
  let parsedHour = parseInt(hour, 10);
  const isAfterNoon = parsedHour >= 12;
  parsedHour = parsedHour === 24 ? 0 : parsedHour;

  return `${String(parsedHour).padStart(2, "0")}:${minute} ${
    isAfterNoon ? "PM" : "AM"
  }`;
};

const EventCard = ({ event }: EventDetailProps) => {
  // const { title, date, startTime, endTime, address, registered, color } = event;
  const { type, name, date, startTime, endTime, address, description } = event;
  const color = getColorByType(type);
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const LikeComponent = liked ? FilledLikeIcon : LikeIcon;

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: { xs: "180px", md: "230px" },
          borderRadius: "0.8rem",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          marginBottom: "1rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: { md: "none", lg: "flex" },
              width: "150px",
              height: "150px",
              backgroundColor: "#D9D9D9",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Image</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", lg: "80%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            padding: "1rem 3rem 0 1rem",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            {name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: { xs: "0.2rem", md: "3rem" },
              alignItems: { xs: "left", md: "center" },
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: "1rem", md: "3rem" },
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                fontWeight="regular"
                fontSize="0.7rem"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CalendarIcon
                  sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }}
                />
                {date}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="regular"
                fontSize="0.7rem"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ClockIcon sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }} />
                {formattedStartTime} - {formattedEndTime}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="regular"
                fontSize="0.7rem"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LocationIcon
                  sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }}
                />
                {address}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              fontWeight="regular"
              fontSize="0.7rem"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <RegisteredIcon
                sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }}
              />
              0 Registered
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "50%",
              borderRadius: "0.8rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: "medium" }}>
              Description
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: { xs: "regular", md: "light" } }}
            >
              {description}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
            <Tag content="#Tag1" />
            <Tag content="#Tag2" />
            <Tag content="#Tag3" />
          </Box>
        </Box>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "2rem",
            backgroundColor: color || "#000",
          }}
        />
        <LikeComponent
          sx={{
            position: "absolute",
            top: { xs: -65, md: -85 },
            right: { xs: 40, md: 50 },
            height: "100%",
            width: { xs: "1.5rem", md: "2rem" },
            cursor: "pointer",
            color: "#E91A1A",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick();
          }}
        />
      </Paper>
      {isOpen && (
        <DetailModal event={event} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default EventCard;
