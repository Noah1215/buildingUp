import React from 'react';
import Container from "@mui/material/Container";
import { MenteeDataProvider } from "@/components/List/MenteeDataContext";
import MenteeContent from '@/components/List/Content';

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
