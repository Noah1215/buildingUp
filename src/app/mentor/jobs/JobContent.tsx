'use client'
import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import JobSearch from '@/components/Jobs/JobSearch';
import JobList from '@/components/Jobs/JobList';
import JobDetails from '@/components/Jobs/JobDetails';
import DetailModal from '@/components/Jobs/DetailModal';
import { sortCard } from '@/app/mentor/jobs/JobDataContext';

const JobContent= () => {
  const { showMobileDetails, setShowMobileDetails,highlightedCard } = sortCard();
  const isDesktop = useMediaQuery('(min-width:769px)');
  useEffect(() => {
    if (highlightedCard && !isDesktop) {
      setShowMobileDetails(true);
    } else {
      setShowMobileDetails(false);
    }
  }, [highlightedCard, isDesktop]);
  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ display: (!isDesktop && showMobileDetails) ? 'none' : 'block' }}>
            <Typography variant="h5" fontWeight="bold" align="left">
              Jobs
            </Typography>
            <JobSearch />
            <JobList />
        </Grid>

        <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'block' } }}>
          {isDesktop && highlightedCard !==0 && <DetailModal />}
        </Grid>

        <Grid item xs={12} sx={{ display: { xs: showMobileDetails ? 'block' : 'none', lg: 'none' } }}>
          {!isDesktop && showMobileDetails && highlightedCard !==0 && <JobDetails />}
        </Grid>
      </Grid>
    </>
  );
};

export default JobContent;
