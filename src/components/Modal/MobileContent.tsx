import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography/Typography";

//icon
import LikeIcon from "@mui/icons-material/FavoriteBorder";
import FilledLikeIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import ClockIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import RegisteredIcon from "@mui/icons-material/AccountBoxOutlined";

//type
import { EventType } from "@/app/mentor/event/eventType";
import Tag from "../Button/Tag";

//method
import { formatTime } from "../Card/EventCard";

type MobileContentProps = {
  event: EventType;
};

const MobileContent = ({ event }: MobileContentProps) => {
  const { name, date, startTime, endTime, address, registeredUsersCount } =
    event;

  const formattedStart = formatTime(startTime);
  const formattedEnd = formatTime(endTime);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <Typography
        sx={{ fontWeight: "medium", fontSize: "14px", marginTop: "1rem" }}
      >
        {name}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            gap: "0.2rem",
            alignItems: "center",
          }}
        >
          <CalendarIcon sx={{ fontSize: "14px" }} />
          <Typography sx={{ fontSize: "12px", whiteSpace: "nowrap" }}>
            {date}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.2rem",
            alignItems: "center",
          }}
        >
          <ClockIcon sx={{ fontSize: "14px" }} />
          <Typography sx={{ fontSize: "12px" }}>
            {formattedStart}-{formattedEnd}
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.2rem",
            alignItems: "center",
          }}
        >
          <RegisteredIcon sx={{ fontSize: "14px" }} />
          <Typography sx={{ fontSize: "12px" }}>
            {registeredUsersCount} registered
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.2rem",
            alignItems: "center",
          }}
        >
          <LocationIcon sx={{ fontSize: "14px" }} />
          <Typography sx={{ fontSize: "12px" }}>{address}</Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "0.5rem",
          alignItems: "center",
          gap: "0.2rem",
        }}
      >
        <Tag content="#Tag1" />
        <Tag content="#Tag2" />
        <Tag content="#Tag3" />
      </Box>
    </Box>
  );
};

export default MobileContent;
