import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Sidebar stays FIXED */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <TopBar />

        <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
