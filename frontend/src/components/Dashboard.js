import React from "react";
import { Box, Typography, Button, Grid, Paper, Avatar } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupIcon from "@mui/icons-material/Group";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Accounts",
    description: "View and manage your bank accounts",
    icon: <AccountBalanceIcon sx={{ fontSize: 36, color: "#1976d2" }} />,
    iconBg: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
    route: "/accounts",
    btn: "GO TO ACCOUNTS",
  },
  {
    title: "Customers",
    description: "Manage customer details",
    icon: <GroupIcon sx={{ fontSize: 36, color: "#43a047" }} />,
    iconBg: "linear-gradient(135deg, #e8f5e9, #a5d6a7)",
    route: "/customers",
    btn: "GO TO CUSTOMERS",
  },
  {
    title: "Transactions",
    description: "View and transfer funds",
    icon: <SwapHorizIcon sx={{ fontSize: 36, color: "#ff7043" }} />,
    iconBg: "linear-gradient(135deg, #fff3e0, #ffccbc)",
    route: "/transactions",
    btn: "GO TO TRANSACTIONS",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", px: { xs: 1, md: 4 }, py: { xs: 1, md: 4 } }}>
      <Typography variant="h4" fontWeight={700} mb={3} sx={{ color: "#212121" }}>
        Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="flex-start" alignItems="stretch">
        {features.map((item, i) => (
          <Grid key={item.title} item xs={12} md={4} sm={6}>
            <Paper
              elevation={8}
              sx={{
                borderRadius: 4,
                height: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 8px 30px rgba(30,80,180,0.05)",
                transition: "box-shadow 0.25s, transform 0.22s",
                "&:hover": {
                  boxShadow:
                    "0px 18px 44px 0px #4286f433, 0px 1.5px 7px #eeeeee34",
                  transform: "translateY(-6px) scale(1.03)",
                },
              }}
            >
              <Avatar
                sx={{
                  background: item.iconBg,
                  width: 72,
                  height: 72,
                  mb: 2,
                  boxShadow: "0 4px 18px #1976d244"
                }}
                variant="rounded"
              >
                {item.icon}
              </Avatar>
              <Typography variant="h6" fontWeight={600} mb={1} color="text.primary">
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, minHeight: 38, color: "#616161" }}
              >
                {item.description}
              </Typography>
              <Button
                size="medium"
                variant="outlined"
                onClick={() => navigate(item.route)}
                sx={{
                  borderRadius: 40,
                  fontWeight: 600,
                  px: 3,
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  letterSpacing: 1.1,
                  transition: "background 0.21s, color 0.21s",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1976d2 20%, #2196f3 95%)",
                    color: "#fff",
                    borderColor: "#1976d2"
                  }
                }}
              >
                {item.btn}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
