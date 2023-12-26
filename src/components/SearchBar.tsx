import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//icon
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", md: "320px" },
          height: { xs: "30px", md: "40px" },
          alignItems: "center",
          justifyContent: "center",
          marginTop: { xs: "0.5rem", md: "1rem" },
          border: { xs: "none", md: "1px solid #8891AA" },
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "12.5%",
            backgroundColor: { xs: "#EBF4FF", md: "#F4F4F6" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchIcon sx={{ color: "#606B85", fontSize: "1.2rem" }} />
        </Box>
        <TextField
          size="small"
          placeholder="Search"
          sx={{
            width: "87.5%",
            "& .MuiInputBase-root": {
              borderRadius: 0,
            },
            "& fieldset": { border: "none" },
            backgroundColor: { xs: "#EBF4FF", md: "transparent" },
          }}
        />
      </Box>
    </>
  );
};

export default SearchBar;
