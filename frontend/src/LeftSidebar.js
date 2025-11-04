import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const loggedInUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "https://i.pravatar.cc/100",
};

export default function LeftSidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid #ddd",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Avatar
        src={loggedInUser.avatarUrl}
        alt={loggedInUser.name}
        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      />
      <Typography variant="h6" align="center">
        {loggedInUser.name}
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
        {loggedInUser.email}
      </Typography>
      {/* Add more user info or navigation links here if needed */}
    </Box>
  );
}
