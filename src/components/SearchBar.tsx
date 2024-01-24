import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

//icon
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@mui/material";

type SearchBarProps = {
  onSearch: (searchText: string) => void;
  isFilter: Boolean;
  popoverContent: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  onFilterClick: React.MouseEventHandler<HTMLElement>;
};

const SearchBar = ({
  onSearch,
  isFilter,
  popoverContent,
  setSelectedCategory,
  selectedCategory,
  onFilterClick
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    onSearch(newSearchText);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedCategory: string) => {
    setAnchorEl(null);
    setSelectedCategory(selectedCategory);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#EBF4FF",
            },
          }}
        >
          <SearchIcon
            sx={{
              color: "#606B85",
              fontSize: "1.2rem",
            }}
            onClick={handleSearch}
          />
        </Box>
        <TextField
          size="small"
          placeholder="Search"
          inputProps={{ style: { paddingLeft: 0 } }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{
            width: "87.5%",
            "& .MuiInputBase-root": {
              borderRadius: 0,
              paddingLeft: { md: "8px" },
            },
            "& fieldset": { border: "none" },
            backgroundColor: { xs: "#EBF4FF", md: "transparent" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onFilterClick}
                  sx={{
                    display: { xs: "flex", md: isFilter ? "flex" : "none" },
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <FilterListIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => handleClose(selectedCategory)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{ textAlign: "center", display: { xs: "flex", lg: "none" } }}
        >
          {popoverContent.map((content, index) => (
            <Typography
              key={index}
              sx={{
                padding: "5px",
                "&:hover": { backgroundColor: "#EBF4FF", cursor: "pointer" },
                fontSize: "14px",
              }}
              onClick={() => handleClose(content)}
            >
              {content}
            </Typography>
          ))}
        </Popover>
      </Box>
    </>
  );
};

export default SearchBar;
