'use client'
import React,{useState,useEffect} from "react";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import Typography from "@mui/material/Typography/Typography";
import Divider from "@mui/material/Divider/Divider";

import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box/Box";

import {sortCard, Jobs} from "@/app/mentor/jobs/JobDataContext";

const Search = () =>{
    const {jobData, setSortedJobData} = sortCard();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortCriteria, setSortCriteria] = useState<string>(''); 
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
      setAnchorEl(null);
    };

    const handleFilter = (criteria: string) => {
      setSortCriteria(criteria);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
  };

  useEffect(() => {
    let sortedCard = jobData ? [...jobData] : [];
    if (sortCriteria === 'date') {
      sortedCard.sort((a, b) => {
          let dateA = new Date(a.posted);
          let dateB = new Date(b.posted);
          return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      });
    } else if (sortCriteria === 'company') {
        sortedCard.sort((a, b) => {
          let companyA = a.company.toLowerCase();
          let companyB = b.company.toLowerCase();
          return companyA.localeCompare(companyB) * (sortOrder === 'asc' ? 1 : -1);
        });
    }

    setSortedJobData(sortedCard);
}, [sortCriteria, sortOrder, jobData, setSortedJobData]);

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
          InputProps={{
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
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        <Typography fontSize="12" align="center">
          Sort By
        </Typography>
        <Divider />
        <MenuItem sx={{ fontSize: 14 }} onClick={() => handleFilter('date')}>
            Date {sortCriteria === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </MenuItem>
        <MenuItem sx={{ fontSize: 14 }} onClick={() => handleFilter('company')}>
            Company {sortCriteria === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
        </MenuItem>
    </Menu>
    </>
    )
}

export default Search;