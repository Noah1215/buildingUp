'use client'
import React,{useState,useEffect} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography/Typography";
import Divider from "@mui/material/Divider/Divider";

import {sortCard} from "@/app/mentor/jobs/JobDataContext";
import SearchBar from "../SearchBar";

const JobSearch = () =>{
    const {jobData, setSortedJobData} = sortCard();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortCriteria, setSortCriteria] = useState<string>(''); 
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const popoverContent = ['Date', 'Company'];

    const handleSearch = (newSearchText: string) => {
      setSearchQuery(newSearchText);
    };

    const handleCategorySelection = (category: string) => {
      setSortCriteria(category.toLowerCase());
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleFilterIconClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
      setAnchorEl(null);
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
},  [sortCriteria, sortOrder, jobData]);

    return (
    <>

      <SearchBar
        onSearch={handleSearch}
        isFilter={true}
        popoverContent={popoverContent}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onFilterClick={handleFilterIconClick}
        />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        <Typography fontSize="12px" align="center">
          Sort By
        </Typography>
        <Divider />
        <MenuItem sx={{ fontSize: "14px" }} onClick={() => handleCategorySelection('date')}>
            Date {sortCriteria === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </MenuItem>
        <MenuItem sx={{ fontSize: "14px" }} onClick={() => handleCategorySelection('company')}>
            Company {sortCriteria === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
        </MenuItem>
      </Menu>
    </>
    )
}

export default JobSearch;