import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Sidebar should not appear on these routes
  const noSidebarRoutes = ["/", "/login", "/signup", "/admin"];
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  // Get user from localStorage
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  // Determine displayed name
  const getDisplayName = () => {
    if (!user) return "";
    if (user.username === "manogna") return "Manogna";
    if (user.role === "admin" || user.username === "admin") return "Admin";
    return user.username;
  };

  // Logout logic: Clear info and redirect to homepage
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {!hideSidebar && user && (
        <Box
          sx={{
            width: 220,
            height: "100vh",
            bgcolor: "background.paper",
            borderRight: "1px solid #ddd",
            p: 3,
            boxSizing: "border-box",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* Just a plain cartoon/profile icon */}
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
          <Typography variant="h6" align="center">{getDisplayName()}</Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      )}
      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Box>
  );
}
