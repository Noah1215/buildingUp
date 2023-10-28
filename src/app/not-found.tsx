import Link from "next/link";

import Box from "@mui/material/Box/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography/Typography";
import Divider from "@mui/material/Divider";
import { Height } from "@mui/icons-material";

export default function NotFound() {
  return (
    <Box height="100vh" display="flex" flexDirection="column" component="main">
      <Box
        component="nav"
        sx={{ padding: { xs: "0.8rem 0.8rem", md: "0.8rem 2rem" } }}
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        <Link href="/">
          <Image src="/img/logo.png" alt="logo" width={152} height={31} />
        </Link>
      </Box>
      <section
        style={{ display: "flex", height: "100%", flexDirection: "column" }}
      >
        <article
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            component="header"
            variant="h2"
            fontWeight="bold"
            color="#024761"
          >
            404
          </Typography>
          <Typography
            component="p"
            variant="h6"
            fontWeight="semibold"
            color="#024761"
          >
            PAGE NOT FOUND
          </Typography>
          <Typography component="p" marginBottom="1rem" variant="body1">
            The page you are looking for might be incorrect
          </Typography>
          <Divider variant="middle" sx={{ borderTop: "1px solid #000" }} />
          <Typography component="p" marginTop="1rem" variant="body2">
            Please check the URL
          </Typography>
          <Typography component="footer" variant="body2">
            Otherwise, <Link href="/">click here</Link> to be redirected to the
            homepage
          </Typography>
        </article>
      </section>
    </Box>
  );
}
