import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "adminpass") {
      localStorage.setItem("user", JSON.stringify({
        username: form.username,
        role: "admin"
      }));
      window.location.href = "/admin/admin-page";
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <Box sx={{ height: "100vh", bgcolor: "#f4f5fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 5, minWidth: 350 }}>
        <Stack alignItems="center" spacing={2}>
          <AdminPanelSettingsIcon sx={{ fontSize: 50 }} color="secondary" />
          <Typography variant="h5" fontWeight={600}>Admin Login</Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username" name="username" required fullWidth sx={{ my: 2 }}
            value={form.username} onChange={handleChange} autoFocus
          />
          <TextField
            label="Password" name="password" type="password" required fullWidth sx={{ mb: 2 }}
            value={form.password} onChange={handleChange}
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
