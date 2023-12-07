// ListHeader.jsx
import React from "react";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

const ListHeader = ({
  totalMentees,
  handleFilterClick,
  handleFilterClose,
  searchQuery,
  setSearchQuery,
  handleSortBy,
  handleJobFilterChange,
  jobFilter,
  anchorEl,
}) => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" align="left">
        Mentee List
      </Typography>
      <Typography fontSize="17" align="left" style={{ marginTop: "5px" }}>
        Total: {totalMentees}
      </Typography>
      {/* Search bar */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        style={{ width: "300px", marginTop: "20px", marginBottom: "10px" }}
        InputProps={{
          startAdornment: <SearchIcon />,
          endAdornment: (
            <Tooltip title="filter">
              <FilterListIcon onClick={handleFilterClick} />
            </Tooltip>
          ),
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filter Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        <Typography fontSize="12" align="center">
          Sort By
        </Typography>
        <Divider />
        <MenuItem sx={{ fontSize: 14 }} onClick={() => handleSortBy("Name")}>
          Name
        </MenuItem>
        <MenuItem sx={{ fontSize: 14 }} onClick={() => handleSortBy("Cohort")}>
          Cohort
        </MenuItem>
        <MenuItem>
          <TextField
            label="Job"
            value={jobFilter}
            onChange={handleJobFilterChange}
            variant="standard"
            size="small"
            style={{ width: "100px", height:"50px"}}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ListHeader;
