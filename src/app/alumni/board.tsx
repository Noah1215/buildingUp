"use client";
// MUI
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";

interface Props {
  title: string;
  data: Content[];
}

interface Content {
  title: string;
  date: string;
}

export default function Board({ title, data }: Props) {
  return (
    <>
      <h2>{title}</h2>
      <Divider style={{ marginBottom: "1em", backgroundColor: "#024761" }} />
      <div style={{ backgroundColor: "#D9D9D9" }}>
        <List>
          <ListItem>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={5}>
                <Grid xs={8}>
                  <Typography>Title</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>Date</Typography>
                </Grid>
              </Grid>
            </Box>
          </ListItem>
          {data.map((content) => (
            <ListItem key={content.title}>
              <ListItemButton style={{ padding: 0 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={5}>
                    <Grid xs={8}>
                      <Typography>{content.title}</Typography>
                    </Grid>
                    <Grid xs={4}>
                      <Typography>{content.date}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
