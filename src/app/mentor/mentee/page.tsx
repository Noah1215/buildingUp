'use client'
import { createClient } from "@/lib/supabase/client";

import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Details from "@/components/List/details";
import CardList from "@/components/List/cardList";
import ListHeader from "@/components/List/listHeader";

const supabase = createClient();

const Mentee = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [highlightedCard, setHighlightedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menteeData, setMenteeData] = useState(null);
  const [filteredMenteeData, setFilteredMenteeData] = useState(null);
  const [sortBy, setSortBy] = useState(""); 
  const [jobFilter, setJobFilter] = useState(""); 

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = (menteeId) => {
    setHighlightedCard((prev) => (prev === menteeId ? null : menteeId));
  };
  
  const handleSortBy = (criteria) => {
    setSortBy(criteria);
  };

  const handleJobFilterChange = (event) => {
    setJobFilter(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('mentees').select('email,phone,name,joined_at,current_trade,current_employer,current_wage,last_wage,raise,cohort,notes');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setMenteeData(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMenteeData(menteeData);
    } else {
      const filteredMentees = menteeData.filter((mentee) =>
        mentee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMenteeData(filteredMentees);
    }
  }, [searchQuery, menteeData]); 

  useEffect(() => {
    const dataToFilter = Array.isArray(menteeData) ? menteeData : [];

    let filteredMentees = dataToFilter;

    // based on search query
    if (searchQuery.trim() !== "") {
      filteredMentees = filteredMentees.filter((mentee) =>
        mentee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (jobFilter) {
      filteredMentees = filteredMentees.filter(
        (mentee) => mentee.current_trade.toLowerCase() === jobFilter.toLowerCase()
      );
    }    

    if (sortBy === "Name") {
      filteredMentees.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Cohort") {
      filteredMentees.sort((a, b) => {
        const getNum = (cohort) => parseInt(cohort.replace(/\D/g, ''), 10);
        const num1 = getNum(a.cohort);
        const num2 = getNum(b.cohort);

        return num1 - num2;
      });
    }
    setFilteredMenteeData(filteredMentees);
  }, [searchQuery, menteeData, jobFilter, sortBy]);
  
  
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} >
        {/* Mentee List */}
        <Grid item xs={12} lg={4} style={{overflow:'hidden'}}>
          <ListHeader
              totalMentees={menteeData ? menteeData.length : 0}
              handleFilterClick={handleFilterClick}
              handleFilterClose={handleFilterClose}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSortBy={handleSortBy}
              handleJobFilterChange={handleJobFilterChange}
              jobFilter={jobFilter}
              anchorEl={anchorEl}
            /> 

            {/* List of Mentees Cards */}
            <CardList
            mentees={filteredMenteeData}
            highlightedCard={highlightedCard}
            handleCardClick={handleCardClick}
          />
        </Grid> 
      
        <Divider orientation="vertical" style={{ height: "800px", margin: "0 10px",}} />

        {/* Details */}
        <Grid item xs={12} lg={7}>
          <Details menteeData={menteeData} selectedMentee={highlightedCard}/>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Mentee;