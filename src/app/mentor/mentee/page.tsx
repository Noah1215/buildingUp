import React from 'react';
import Container from "@mui/material/Container";
import { MenteeDataProvider } from "@/app/mentor/mentee/MenteeDataContext";
import MenteeContent from '@/app/mentor/mentee/MenteeContent';

const Mentee: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <MenteeDataProvider>
        <MenteeContent />
      </MenteeDataProvider>
    </Container>
  );
};

export default Mentee;
