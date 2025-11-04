import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username && form.password) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: form.username,
          role: form.username === "admin" ? "admin" : "customer",
        })
      );
      window.location.href = "/dashboard";
    } else {
      setError("Please enter both username and password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(130deg, #e5e9f7 0%, #f8e7ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadein 0.9s"
      }}
    >
      <Paper
        elevation={8}
        sx={{
          px: { xs: 2, sm: 6 },
          pt: 5,
          pb: 4,
          borderRadius: 4,
          minWidth: { xs: 290, sm: 380 },
          maxWidth: "98vw",
          textAlign: "center",
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 8px 40px 0 #b39ddb44"
        }}
      >
        <LoginIcon color="primary" sx={{
          fontSize: 54, mb: 1,
          animation: "popUp .5s"
        }} />
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
          sx={{ fontFamily: "Montserrat,Roboto,sans-serif", color: "#212121" }}>
          User Login
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Username"
            name="username"
            required
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                borderRadius: 2
              }
            }}
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            required
            fullWidth
            autoComplete="off"
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                borderRadius: 2
              }
            }}
            value={form.password}
            onChange={handleChange}
          />
          {!!error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              py: 1.5,
              mt: 1,
              borderRadius: 2,
              boxShadow: "0 4px 16px #64b5f644",
              transition: "transform 0.13s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.04)",
                boxShadow: "0 6px 24px #1976d244"
              }
            }}
          >
            LOGIN
          </Button>
        </form>
      </Paper>
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: scale(.98);}
            to { opacity: 1; transform: scale(1);}
          }
          @keyframes popUp {
            0% { transform: scale(0.6);}
            80% { transform: scale(1.1);}
            100% { transform: scale(1);}
          }
        `}
      </style>
    </Box>
  );
}
