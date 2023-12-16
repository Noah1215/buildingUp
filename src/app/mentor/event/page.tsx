import React from "react";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

//components
import SearchBar from "@/components/SearchBar";
import LightButton from "@/components/Button/LightButton";
import Tag from "@/components/Button/Tag";

const mentorEvent = () => {
  const imageUrl = "";

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
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: "230px",
            borderRadius: "0.8rem",
            display: "flex",
            position: "relative",
            overflow: "hidden",
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
              Career consulting Seminar
            </Typography>
            <Box sx={{ display: "flex", gap: "5rem" }}>
              <Typography variant="body1" fontWeight="light" fontSize="0.7rem">
                11/01/2023
              </Typography>
              <Typography variant="body1" fontWeight="light" fontSize="0.7rem">
                09:00Am - 11:00Am
              </Typography>
              <Typography variant="body1" fontWeight="light" fontSize="0.7rem">
                123 ABC Ave
              </Typography>
              <Typography variant="body1" fontWeight="light" fontSize="0.7rem">
                114 Registered
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
              <Tag content="#Seminar" />
              <Tag content="#Friendly" />
              <Tag content="#Anyone" />
            </Box>
          </Box>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "2rem",
              backgroundColor: "#ED6C02",
            }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default mentorEvent;
