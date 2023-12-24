'use client'
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

import { filterCard } from "@/components/List/MenteeDataContext";

const CardList = () => {
  const { filteredMenteeData, highlightedCard, setHighlightedCard} = filterCard();

  const handleCardClick = (menteeId: string) => {
    setHighlightedCard(menteeId);
  };
  const isDesktop = useMediaQuery("(min-width: 769px)");

  return (
    <div style={{ maxHeight: isDesktop ? "500px":"auto", overflowY: "auto" }}>
      {filteredMenteeData &&
        filteredMenteeData.map((mentee) => (
          <Card
            key={mentee.username} 
            onClick={() => handleCardClick(mentee.username)}
            style={{
              width: "100%", height:"auto",
              backgroundColor: isDesktop ? highlightedCard === mentee.username ? "#EBF4FF" : "transparent" : "transparent",
              borderLeft: isDesktop ? highlightedCard === mentee.username ? "4px solid #024761" : "none" : "none",
              borderBottom: !isDesktop? "1px solid #6C757D": "none",
               boxShadow: "none",
            }}
          >
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 32, height: 32,
                    bgcolor: highlightedCard === mentee.username ? "#C8AFF0" : "#D9D9D9",
                    color: highlightedCard === mentee.username ? "#000000" : "#024761",
                    fontWeight: "bold", fontSize: 12, marginRight: 1,
                  }}
                >
                  {mentee.name.split(" ").map((name) => name.charAt(0)).join("")}
                </Avatar>
                <div style={{ marginLeft: "8px" }}>
                  <Typography fontSize="17">{mentee.name}</Typography>
                  <Typography fontSize= "14" color="#024761">Registered: {mentee.joined_at}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default CardList;
