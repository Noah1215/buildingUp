import React from 'react';

import JobContent from './JobContent';
import { JobDataProvider } from '@/app/mentor/jobs/JobDataContext';

const MentorJobs = () => {
  return (
    <>
      <JobDataProvider>
        <JobContent />
      </JobDataProvider>
    </>
  );
};

export default MentorJobs;
