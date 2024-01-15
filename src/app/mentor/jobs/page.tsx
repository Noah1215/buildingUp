import React from 'react';

import JobContext from './JobContext';
import { JobDataProvider } from '@/app/mentor/jobs/JobDataContext';

const MentorJobs = () => {
  return (
    <>
      <JobDataProvider>
        <JobContext />
      </JobDataProvider>
    </>
  );
};

export default MentorJobs;
