'use client'
import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import useMediaQuery from '@mui/material/useMediaQuery';
import ListHeader from '@/components/List/ListHeader';
import CardList from '@/components/List/CardList';
import Details from '@/components/List/Details';
import MobileDetails from '@/components/List/MobileDetails';
import { filterCard } from "@/components/List/MenteeDataContext";

const MenteeContent: React.FC = () => {
  const { highlightedCard } = filterCard();
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const isDesktop = useMediaQuery('(min-width:769px)');XMLHttpRequest

  useEffect(() => {
    if (highlightedCard && !isDesktop) {
      setShowMobileDetails(true);
    } else {
      setShowMobileDetails(false);
    }
  }, [highlightedCard, isDesktop]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={4} sx={{ display: showMobileDetails ? 'none' : 'block' }}>
        <ListHeader />
        <CardList />
      </Grid>
      <Divider orientation="vertical" sx={{ height: "800px", margin: "0 10px", display: { xs: "none", lg: "flex" } }} />
      <Grid item lg={7} sx={{ display: { xs: 'none', lg: 'block' } }}>
        {isDesktop && <Details />}
      </Grid>
      <Grid item xs={12} sx={{ display: { xs: showMobileDetails ? 'block' : 'none', lg: 'none' } }}>
        {showMobileDetails && <MobileDetails />}
      </Grid>
    </Grid>
  );
};

export default MenteeContent;
