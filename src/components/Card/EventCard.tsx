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

type eventDetail = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  registered: number;
  color: string;
};

type EventDetailProps = {
  event: eventDetail;
  key: number;
};

const EventCard = ({ event }: EventDetailProps) => {
  const { title, date, startTime, endTime, address, registered, color } = event;
  const [liked, setLiked] = useState(false);
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const LikeComponent = liked ? FilledLikeIcon : LikeIcon;

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "230px",
        borderRadius: "0.8rem",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        marginBottom: "1rem",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          width: "20%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "150px",
            height: "150px",
            backgroundColor: "#D9D9D9",
            borderRadius: "75px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Image</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          padding: "1rem 3rem 0 1rem",
          // paddingTop: "1rem",
          // paddingRight: "3rem",
        }}
      >
        <Typography variant="h2" fontWeight="bold" fontSize="1.5rem">
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <Typography
            variant="body1"
            fontWeight="regular"
            fontSize="0.7rem"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CalendarIcon sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }} />
            {date}
          </Typography>
          <Typography
            variant="body1"
            fontWeight="regular"
            fontSize="0.7rem"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ClockIcon sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }} />
            {startTime} - {endTime}
          </Typography>
          <Typography
            variant="body1"
            fontWeight="regular"
            fontSize="0.7rem"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocationIcon sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }} />
            {address}
          </Typography>
          <Typography
            variant="body1"
            fontWeight="regular"
            fontSize="0.7rem"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <RegisteredIcon
              sx={{ fontSize: "1.2rem", marginRight: "0.2rem" }}
            />
            {registered} Registered
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "50%",
            borderRadius: "0.8rem",
          }}
        >
          <Typography variant="caption" fontWeight="medium">
            Description
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem" }}>
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
          top: -85,
          right: 50,
          height: "100%",
          width: "2rem",
          cursor: "pointer",
          color: "#E91A1A",
        }}
        onClick={handleLikeClick}
      />
    </Paper>
  );
};

export default EventCard;
