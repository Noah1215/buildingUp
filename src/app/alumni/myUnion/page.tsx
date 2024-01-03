import Grid from "@mui/material/Unstable_Grid2";

export default function MyUnion() {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        padding: {
          md: 6,
        },
      }}
    >
      <Grid xs={12} order={1}>
        My Union - replace with typography
      </Grid>
      <Grid xs={12} md={6} order={2}>
        <div>Local97</div>
      </Grid>
      <Grid xs={12} md={6} order={3}>
        <div>News</div>
      </Grid>
      <Grid xs={12} md={6} order={4}>
        <div>Someone who belongs</div>
      </Grid>
    </Grid>
  );
}
