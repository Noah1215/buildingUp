import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import ListHeader from "@/components/List/ListHeader";
import CardList from "@/components/List/CardList";
import Details from "@/components/List/Details";

import {CardProvider} from "@/components/List/MenteeDataContext";

const Mentee = () => {
  return (
    <Container maxWidth="lg">
      <CardProvider>
        <Grid container spacing={3} >
          <Grid item xs={12} lg={4} style={{overflow:'hidden'}}>
            <ListHeader /> 
              <CardList />
          </Grid> 
          <Divider orientation="vertical" style={{ height: "800px", margin: "0 10px",}} />
          <Grid item xs={12} lg={7}>
            <Details />
          </Grid>
        </Grid>
      </CardProvider>
    </Container>
  );
};

export default Mentee;