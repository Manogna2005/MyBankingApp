import React from "react";
import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #e3f0ff 0%, #f9e7ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadein 1s"
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, sm: 5 },
          borderRadius: 4,
          minWidth: { xs: 310, sm: 410 },
          maxWidth: "94vw",
          background: "rgba(255,255,255,0.95)",
          transition: "box-shadow 0.3s",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
          sx={{
            fontFamily: "Montserrat,Roboto,sans-serif",
            color: "#222",
          }}
        >
          Welcome to <span style={{ color: "#1976d2" }}>BankSimulator</span>
        </Typography>
        <Stack direction="column" gap={2} alignItems="stretch">
          <Button
            startIcon={<LoginIcon />}
            variant="contained"
            size="large"
            sx={{
              background:
                "linear-gradient(90deg, #1976d2 40%, #2196f3 93%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.09rem",
              boxShadow: "0 2px 10px #1976d222",
              borderRadius: 2,
              transition: "transform 0.13s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 18px #1976d244",
                background:
                  "linear-gradient(90deg, #1565c0 20%, #2979ff 100%)",
              },
            }}
            onClick={() => navigate("/login")}
          >
            USER LOGIN
          </Button>
          <Button
            startIcon={<GroupAddIcon />}
            variant="outlined"
            size="large"
            sx={{
              fontWeight: 600,
              borderColor: "#43a047",
              color: "#388e3c",
              fontSize: "1.07rem",
              background: "#f5fff6",
              borderRadius: 2,
              transition: "transform 0.13s, box-shadow 0.3s",
              "&:hover": {
                background: "linear-gradient(90deg, #81c784 12%, #43a047 98%)",
                color: "#fff",
                borderColor: "#388e3c",
                transform: "scale(1.05)",
                boxShadow: "0 4px 18px #43a04722"
              }
            }}
            onClick={() => navigate("/signup")}
          >
            USER SIGNUP
          </Button>
          <Button
            startIcon={<AdminPanelSettingsIcon />}
            variant="contained"
            size="large"
            sx={{
              background:
                "linear-gradient(90deg, #8e24aa 25%, #d500f9 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.09rem",
              borderRadius: 2,
              transition: "transform 0.13s, box-shadow 0.3s",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #6d1b7b 20%, #c51162 100%)",
                transform: "scale(1.05)",
                boxShadow: "0 4px 18px #a878d822",
              },
            }}
            onClick={() => navigate("/admin")}
          >
            ADMIN LOGIN
          </Button>
        </Stack>
      </Paper>
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </Box>
  );
}
