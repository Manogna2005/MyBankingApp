import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Box, CircularProgress, Chip
} from "@mui/material";

function formatDate(dob) {
  if (!dob) return "";
  if (Array.isArray(dob) && dob.length === 3) {
    const [yyyy, mm, dd] = dob;
    return `${yyyy}-${(mm+"").padStart(2,"0")}-${(dd+"").padStart(2,"0")}`;
  }
  if (typeof dob === "string" && dob.length >= 10) {
    return dob.substring(0, 10);
  }
  return dob.toString();
}

export default function Customers() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchCustomers(); }, []);

  function fetchCustomers() {
    setLoading(true);
    api.get("/customers")
      .then(res => setCustomers(res.data))
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  }

  if (!user || user.role !== "admin") {
    return <Typography color="error">Access Denied</Typography>;
  }

  return (
    <Box
      sx={{
        py: 2,
        px: { xs: 1, sm: 3, md: 5 },
        minHeight: "100vh",
        background: "linear-gradient(125deg,#f8fcff 75%,#ede7f6 100%)"
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "#222" }}>
        Customer Admin Console
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary" sx={{ mb: 3 }}>
        
      </Typography>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 4, boxShadow: "0 6px 24px #9575cd21" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: "66vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ background: "#ede7f6", fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ background: "#ede7f6", fontWeight: 700 }}>Phone</TableCell>
                  <TableCell sx={{ background: "#ede7f6", fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ background: "#ede7f6", fontWeight: 700 }}>Address</TableCell>
                  <TableCell sx={{ background: "#ede7f6", fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ background: "#ede7f6", fontWeight: 700 }}>Aadhaar</TableCell>
                  <TableCell sx={{ background: "#ede7f6", fontWeight: 700 }}>DOB</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((c, i) => (
                  <TableRow
                    key={c.customerId}
                    hover
                    sx={{
                      background: i % 2 === 0 ? "#f3e5f56b" : "#fff",
                      transition: "background .2s"
                    }}
                  >
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.phoneNumber}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.address}</TableCell>
                    <TableCell>
                      <Chip
                        label={c.status}
                        color={c.status === "active" ? "success" : "default"}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          borderRadius: 2,
                          background: c.status === "active" ? "#43a04722" : "#bdbdbd22",
                          color: c.status === "active" ? "#388e3c" : "#555"
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <span style={{
                        background: "#f3e5f5",
                        borderRadius: "7px",
                        padding: "2px 8px",
                        fontFamily: "monospace",
                        fontSize: ".99rem"
                      }}>{c.aadharNumber}</span>
                    </TableCell>
                    <TableCell>{formatDate(c.dob)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
