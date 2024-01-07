import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

interface MentorProfile {
  name: string;
  phone: string;
  employer: string;
  email: string;
  union: string;
  mentorPeriod: string;
  avatar: string;
}

export default async function MentorProfile({ data }: { data: MentorProfile }) {
  const profile = data;

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
      {/* mentor avatar */}
      <Box sx={{ flexBasis: 0, padding: "0 4em", textAlign: "center" }}>
        <Avatar
          alt="Avatar"
          src={profile.avatar}
          sx={{
            margin: "auto",
            width: { xs: "10rem", md: "18rem" },
            height: { xs: "10rem", md: "18rem" },
          }}
        />
        <Typography
          component="h3"
          sx={{
            // 19pt, 14pt, light
            fontSize: { xs: "19px", md: "25px" },
            fontWeight: 500,
          }}
        >
          {profile.name}
        </Typography>
      </Box>
      {/* mentor bio */}
      <Box sx={{ display: "flex", flexFlow: "row wrap", flexGrow: 1 }}>
        <BioItem title={"Phone:"} content={profile.phone} />
        <BioItem title={"Email:"} content={profile.email} />
        <BioItem title={"Employer:"} content={profile.employer} />
        <BioItem title={"Union:"} content={profile.union} />
        <BioItem title={"Mentor period:"} content={profile.mentorPeriod} />
      </Box>
    </Box>
  );
}

function BioItem({ title, content }: { title: string; content: string }) {
  return (
    <Box sx={{ width: "50%" }}>
      <Typography
        component="p"
        sx={{
          // 14pt, 12pt, light
          fontSize: { xs: "16px", md: "19px" },
          fontWeight: 300,
        }}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        // 17pt, 14pt, regular
        sx={{
          fontSize: { xs: "19px", md: "23px" },
          fontWeight: 400,
        }}
      >
        {content}
      </Typography>
    </Box>
  );
}
