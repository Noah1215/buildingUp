// Supabase
import { getUser, getUserName, getUserRole } from "@/app/supabase-server";
// Next
import { redirect, notFound } from "next/navigation";
// Components
import Header from "@/app/alumni/components/layout/Header";
import Sidebar from "@/app/alumni/components/layout/Sidebar";
import BottomNavigation from "@/app/alumni/components/layout/BottomNavigation";
// MUI
import Box from "@mui/material/Box";

const HEADER_HEIGHT_DESKTOP = "64px";
const HEADER_HEIGHT_MOBILE = "56px";
const SIDEBAR_WIDTH_DESKTOP = "220px";
const FOOTER_HEIGHT_MOBILE = "80px";

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
    <Box
      className="page-wrapper"
      sx={{
        height: "100%",
        overflow: "auto",
      }}
    >
      <Box
        component="header"
        sx={{
          height: { xs: HEADER_HEIGHT_MOBILE, md: HEADER_HEIGHT_DESKTOP },
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: "2000",
        }}
      >
        <Header userName={userName} />
      </Box>
      <Box
        component="aside"
        className="sidebar-container"
        sx={{
          display: { xs: "none", md: "block" },
          width: SIDEBAR_WIDTH_DESKTOP,
          position: "fixed",
          top: HEADER_HEIGHT_DESKTOP,
          left: 0,
          bottom: 0,
          zIndex: "auto",
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: {
            xs: "none",
            md: `calc(100% - ${HEADER_HEIGHT_DESKTOP})`,
          },
          margin: {
            xs: `${HEADER_HEIGHT_MOBILE} 0 ${FOOTER_HEIGHT_MOBILE} 0`,
            md: `${HEADER_HEIGHT_DESKTOP} 0 0 ${SIDEBAR_WIDTH_DESKTOP}`,
          },
          padding: { xs: "1rem", md: "2rem" },
        }}
      >
        {children}
      </Box>

      <Box
        component="nav"
        sx={{
          display: { sx: "block", md: "none" },
          height: FOOTER_HEIGHT_MOBILE,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: "2000",
        }}
      >
        <BottomNavigation />
      </Box>
    </Box>
  );
}
