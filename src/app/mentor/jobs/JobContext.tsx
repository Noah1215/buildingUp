'use client'
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import JobSearch from '@/components/Jobs/JobSearch';
import JobList from '@/components/Jobs/JobList';
import JobDetails from '@/components/Jobs/JobDetails';
import DetailModal from '@/components/Jobs/DetailModal';
import { sortCard } from '@/app/mentor/jobs/JobDataContext';

const JobContext = () => {
  const { showMobileDetails } = sortCard();
  const isDesktop = useMediaQuery('(min-width:769px)');

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
          {isDesktop && <DetailModal />}
        </Grid>

        <Grid item xs={12} sx={{ display: { xs: showMobileDetails ? 'block' : 'none', lg: 'none' } }}>
          {!isDesktop && showMobileDetails && <JobDetails />}
        </Grid>
      </Grid>
    </>
  );
};

export default JobContext;
