// CardList.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const CardList = ({ mentees, highlightedCard, handleCardClick }) => {
  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      {mentees &&
        mentees.map((mentee) => (
          <Card
            key={mentee.name}
            onClick={() => handleCardClick(mentee.name)}
            style={{
              width: "300px", height: "70px",
              backgroundColor: highlightedCard === mentee.name ? "#EBF4FF" : "transparent",
              borderLeft: highlightedCard === mentee.name ? "4px solid #024761" : "none",
              border: "none", boxShadow: "none",
            }}
          >
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 32, height: 32,
                    bgcolor: highlightedCard === mentee.name ? "#C8AFF0" : "#D9D9D9",
                    color: highlightedCard === mentee.name ? "#000000" : "#024761",
                    fontWeight: "bold", fontSize: 12, marginRight: 1,
                  }}
                >
                  {mentee.name .split(" ") .map((name) => name.charAt(0)) .join("")}
                </Avatar>
                <div style={{ marginLeft: "8px" }}>
                  <Typography fontSize="17">{mentee.name}</Typography>
                  <Typography style={{ fontSize: 14 }} color="#024761"> Registered: {mentee.joined_at} </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default CardList;
