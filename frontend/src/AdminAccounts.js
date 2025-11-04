import React, { useState } from "react";
import api from "./api";
import {
  Paper, Typography, TextField, Button, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Stack, Box, Chip
} from "@mui/material";

function formatTimestamp(ts) {
  if (!ts) return "";
  if (Array.isArray(ts) && ts.length >= 6) {
    const pad = (x) => (x < 10 ? "0" + x : x);
    return `${ts[0]}-${pad(ts[1])}-${pad(ts[2])} ${pad(ts[3])}:${pad(ts[4])}:${pad(ts[5])}`;
  }
  if (typeof ts === "string" && ts.length === 14) {
    return `${ts.substr(0,4)}-${ts.substr(4,2)}-${ts.substr(6,2)} `
         + `${ts.substr(8,2)}:${ts.substr(10,2)}:${ts.substr(12,2)}`;
  }
  return ts.toString();
}

export default function AdminAccounts() {
  const [inputAccountId, setInputAccountId] = useState("");
  const [inputCustomerId, setInputCustomerId] = useState("");
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [accountsList, setAccountsList] = useState([]);

  const fetchAccount = () => {
    if (!inputAccountId) return;
    api.get(`/accounts/${inputAccountId}`)
      .then((res) => {
        setAccount(res.data);
        setAccountsList([]);
        setError("");
      })
      .catch(() => {
        setAccount(null);
        setAccountsList([]);
        setError("No account record found");
      });
  };

  const fetchAccountsByCustomerId = () => {
    if (!inputCustomerId) return;
    api.get(`/accounts/customer/${inputCustomerId}`)
      .then(res => {
        setAccountsList(res.data);
        setAccount(null);
        setError("");
      })
      .catch(() => {
        setAccountsList([]);
        setAccount(null);
        setError("No accounts found for this customer");
      });
  };

  const clearAll = () => {
    setInputAccountId("");
    setInputCustomerId("");
    setAccount(null);
    setAccountsList([]);
    setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        background: "linear-gradient(120deg,#e3f0fc 70%,#ede7f6 100%)",
        borderRadius: 0,
        px: { xs: 1, sm: 3, md: 6 }
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: .5 }}>
        Accounts Admin Console
      </Typography>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, md: 4 },
          mb: 4,
          borderRadius: 4,
          maxWidth: 490,
          mx: "auto",
          background: "linear-gradient(135deg,#ffffff 50%,#f3e5f5 100%)",
          boxShadow: "0 8px 36px #7e57c233",
          transition: "box-shadow .18s,transform .14s",
          "&:hover": { boxShadow: "0 12px 40px #651fff29", transform: "scale(1.012)" }
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Account Number"
              value={inputAccountId}
              onChange={e => setInputAccountId(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" onClick={fetchAccount} sx={{
              fontWeight: 600, boxShadow: "0 2px 8px #1976d222",
              background: "linear-gradient(90deg,#1976d2,#42a5f5)"
            }}>
              Search by Account
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Customer ID"
              value={inputCustomerId}
              onChange={e => setInputCustomerId(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={fetchAccountsByCustomerId}
              sx={{
                fontWeight: 600, background: "linear-gradient(90deg,#8e24aa,#ce93d8)"
              }}
            >
              Search by Customer
            </Button>
          </Stack>
          <Button variant="outlined" color="error" onClick={clearAll} sx={{ mt: 1, fontWeight: 600 }}>
            Clear
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 4, maxWidth: 490, mx: "auto" }}>
          <Typography color="error" sx={{ fontWeight: 500, textAlign: "center" }}>
            {error}
          </Typography>
        </Paper>
      )}

      {account && (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 4, background: "#e3f2fd" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Account ID</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Aadhar Number</TableCell>
                  <TableCell>IFSC Code</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Name on Account</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Modified At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover sx={{ background: "#f3e5f5" }}>
                  <TableCell>{account.accountId}</TableCell>
                  <TableCell>{account.customerId}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>
                    <span style={{
                      background: "#ede7f6", borderRadius: 7, padding: "3px 8px",
                      fontFamily: "monospace", fontSize: ".97rem"
                    }}>{account.aadharNumber}</span>
                  </TableCell>
                  <TableCell>{account.ifscCode}</TableCell>
                  <TableCell>{account.phoneNumberLinked}</TableCell>
                  <TableCell>₹{account.amount}</TableCell>
                  <TableCell>{account.bankName}</TableCell>
                  <TableCell>{account.nameOnAccount}</TableCell>
                  <TableCell>
                    <Chip label={account.status}
                      color={account.status === "ACTIVE" ? "success" : "default"}
                      size="small"
                      sx={{
                        fontWeight: 700, borderRadius: 2, background: account.status === "ACTIVE" ? "#43a04722" : "#bdbdbd22",
                        color: account.status === "ACTIVE" ? "#388e3c" : "#555"
                      }}
                    />
                  </TableCell>
                  <TableCell>{formatTimestamp(account.createdAt)}</TableCell>
                  <TableCell>{formatTimestamp(account.modifiedAt)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {accountsList.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 4, background: "#f3e5f5" }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, letterSpacing: .3 }}>Accounts List</Typography>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Account ID</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Aadhar Number</TableCell>
                  <TableCell>IFSC Code</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Name on Account</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Modified At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountsList.map((acct, i) => (
                  <TableRow key={acct.accountId}
                    hover
                    sx={{
                      background: i % 2 === 0 ? "#f8bbd022" : "#fff",
                      transition: "background 0.19s"
                    }}>
                    <TableCell>{acct.accountId}</TableCell>
                    <TableCell>{acct.customerId}</TableCell>
                    <TableCell>{acct.accountNumber}</TableCell>
                    <TableCell>
                      <span style={{
                        background: "#ede7f6", borderRadius: 7, padding: "2px 8px",
                        fontFamily: "monospace", fontSize: ".98rem"
                      }}>{acct.aadharNumber}</span>
                    </TableCell>
                    <TableCell>{acct.ifscCode}</TableCell>
                    <TableCell>{acct.phoneNumberLinked}</TableCell>
                    <TableCell>₹{acct.amount}</TableCell>
                    <TableCell>{acct.bankName}</TableCell>
                    <TableCell>{acct.nameOnAccount}</TableCell>
                    <TableCell>
                      <Chip label={acct.status}
                        color={acct.status === "ACTIVE" ? "success" : "default"}
                        size="small"
                        sx={{
                          fontWeight: 700, borderRadius: 2, background: acct.status === "ACTIVE" ? "#43a04722" : "#bdbdbd22",
                          color: acct.status === "ACTIVE" ? "#388e3c" : "#555"
                        }}
                      />
                    </TableCell>
                    <TableCell>{formatTimestamp(acct.createdAt)}</TableCell>
                    <TableCell>{formatTimestamp(acct.modifiedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
