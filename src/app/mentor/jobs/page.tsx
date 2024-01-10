import React from "react";
import Typography from "@mui/material/Typography/Typography";

import SearchBar from "@/components/Jobs/Search";
import JobList from "@/components/Jobs/JobList";
import JobDetails from "@/components/Jobs/JobDetails";
import DetailModal from "@/components/Jobs/DetailModal";
import { JobDataProvider } from "@/app/mentor/jobs/JobDataContext";

const mentorJobs = () => {
  return (
    <>
      <JobDataProvider>
        <Typography variant="h5" fontWeight="bold" align="left">
          Jobs
        </Typography>
        <SearchBar />
        <JobList />
        <DetailModal />
      </JobDataProvider>
    </>
  );
};

export default mentorJobs;
