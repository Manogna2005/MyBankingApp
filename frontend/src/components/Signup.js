import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // Add user registration logic here
    window.location.href = "/login";
  };

  return (
    <Box sx={{ height: "100vh", bgcolor: "#f5f5fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 5, minWidth: 350 }}>
        <Stack alignItems="center" spacing={2}>
          <PersonAddAlt1Icon sx={{ fontSize: 50 }} color="success" />
          <Typography variant="h5" fontWeight={600}>User Signup</Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username" name="username" required fullWidth sx={{ mt: 2 }}
            value={form.username} onChange={handleChange} autoFocus
          />
          <TextField
            label="Email" name="email" type="email" required fullWidth sx={{ my: 2 }}
            value={form.email} onChange={handleChange}
          />
          <TextField
            label="Password" name="password" type="password" required fullWidth sx={{ mb: 2 }}
            value={form.password} onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="success" fullWidth>
            Signup
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
