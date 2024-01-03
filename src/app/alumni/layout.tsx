// Supabase
import { getUser, getUserName, getUserRole } from "@/app/supabase-server";
// Next
import { redirect, notFound } from "next/navigation";
// Components
import Header from "@/app/alumni/(components)/ui/Header";
import SideNavigation from "@/app/alumni/(components)/ui/SideNavigation";
import BottomNavigation from "@/app/alumni/(components)/ui/BottomNavigation";
// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const DESKTOP_HEADER_HEIGHT = "64px";
const MOBILE_HEADER_HEIGHT = "56px";
const SIDE_NAV_BAR_WIDTH = "220px";
const BOTTOM_NAV_BAR_HEIGHT = "80px";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, userName] = await Promise.all([
    getUserRole(),
    getUserName(),
  ]);

  if (userRole !== "alumni") {
    return notFound();
  }

  return (
    <Box className="page-wrapper">
      <Box
        className="sticky-header-container"
        sx={{
          height: { xs: MOBILE_HEADER_HEIGHT, md: DESKTOP_HEADER_HEIGHT },
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Header userName={userName} />
      </Box>

      <Box
        className="main-wrapper"
        sx={{
          display: { sx: "flex", md: "grid" },
          gridTemplateColumns: {
            sx: "none",
            md: `${SIDE_NAV_BAR_WIDTH} auto`,
          },
        }}
      >
        <Box
          className="sidebar-container"
          sx={{
            width: SIDE_NAV_BAR_WIDTH,
            minHeight: `calc(100vh - ${DESKTOP_HEADER_HEIGHT})`,
            position: "sticky",
            zIndex: 0,
            display: { xs: "none", md: "block" },
            boxSizing: "border-box",
            backgroundColor: "#024761",
          }}
        >
          <SideNavigation />
        </Box>

        <Container
          className="main-content"
          component="main"
          maxWidth="lg"
          sx={{ padding: { xs: "1rem", md: "2rem" } }}
        >
          {children}
        </Container>
      </Box>

      <Box className="sticky-footer-container">
        <BottomNavigation />
      </Box>
    </Box>
  );
}