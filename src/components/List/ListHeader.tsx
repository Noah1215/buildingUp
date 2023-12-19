'use client'

import React,{useState,useEffect} from "react";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Autocomplete from '@mui/material/Autocomplete';

import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

import { filterCard, Mentee } from "@/components/List/MenteeDataContext";

const ListHeader = () => {
  const { menteeData, setFilteredMenteeData } = filterCard();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = useState(""); 
  const [jobFilter, setJobFilter] = useState(""); 

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  
  const handleSortBy = (criteria:string) => {
    setSortBy(criteria);
  };

  const jobs = Array.from(new Set(menteeData?.map(mentee => mentee.current_trade))); 

  useEffect(() => {
    let filteredData: Mentee[] = menteeData ?? [];
    // Filter by name
    if (searchQuery) {
      filteredData = filteredData?.filter(mentee =>
        mentee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Sort by name
    if (sortBy === "Name") {
      filteredData = [...(filteredData || [])].sort((a, b) => a.name.localeCompare(b.name));
    }
    // Sort by cohort
    if (sortBy === "Cohort") {
      filteredData = [...(filteredData || [])].sort((a, b) => {
        const getCohortNumber = (cohort: string) => parseInt(cohort.split('Skills')[1], 10);
        return getCohortNumber(a.cohort) - getCohortNumber(b.cohort);
      });
    }
    // Filter by job
    if (jobFilter) {
      filteredData = filteredData?.filter(mentee =>
        mentee.current_trade === jobFilter
      );
    }

    setFilteredMenteeData(filteredData);
  }, [searchQuery, sortBy, jobFilter, menteeData, setFilteredMenteeData]);

  return (
    <>
      <Typography variant="h5" fontWeight="bold" align="left">
        Mentee List
      </Typography>
      <Typography fontSize="17" align="left" style={{ marginTop: "5px" }}>
        Total: {menteeData? menteeData.length:0}
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        style={{ width: "300px", marginTop: "20px", marginBottom: "10px" }}
        InputProps={{
          startAdornment: <SearchIcon />,
          endAdornment: (
            <Tooltip title="Filter">
              <div onClick={handleFilterClick}>
                <FilterListIcon />
              </div>
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
          <Autocomplete
            options={jobs}
            style={{ width: 200,maxHeight: "200px", overflowY: "auto" }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Job" variant="outlined" onKeyDown={(event) => event.stopPropagation()}/>}
            value={jobFilter}
            onChange={(event, newValue) => setJobFilter(newValue ?? '')}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ListHeader;
