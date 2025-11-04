import React, { useState } from "react";
import api from "../api";
import {
  Paper, Typography, TextField, Button, Table, TableHead, TableRow, TableCell,
  TableBody, TableContainer, Stack, Box, Chip, Tooltip, Snackbar, Alert
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

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

export default function Transactions() {
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate performing a transaction and show alert (replace with your transfer/new transaction logic)
  const performTransaction = () => {
    // Simulate API call, on success:
    setShowSuccess(true);
    // Optionally, also refresh transactions if needed
    // fetchTransactions();
  };

  const fetchTransactions = () => {
    if (!accountNumber) return;
    api.get(`/transactions/${accountNumber}`)
      .then(res => setTransactions(res.data))
      .catch(() => setTransactions([]));
    setDownloadUrl(`http://localhost:8080/banksimulator/transactions/${accountNumber}`);
  };

  const downloadExcel = () => {
    fetch(downloadUrl, {
      headers: {
        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transaction-history.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 950,
        mx: "auto",
        mt: 4,
        pb: 6,
        minHeight: "100vh",
        background: "linear-gradient(125deg,#f8fcff 80%,#e3f0fc 100%)"
      }}
    >
      {/* Transaction success alert */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2500}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Transaction successful!
        </Alert>
      </Snackbar>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Transactions Admin Console
      </Typography>
      <Paper sx={{
        p: 3, mb: 4, borderRadius: 4,
        boxShadow: "0 4px 24px #1976d214",
        background: "linear-gradient(120deg,#ffffff 80%,#e3f2fd 100%)"
      }} elevation={3}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
          <TextField
            label="Enter Account Number"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            size="small"
            sx={{ minWidth: 240 }}
          />
          <Button variant="contained"
            onClick={fetchTransactions}
            sx={{
              fontWeight: 600, background: "linear-gradient(90deg,#1976d2,#42a5f5)",
              boxShadow: "0 1.5px 8px #1976d222"
            }}>
            Get Transactions
          </Button>
          {transactions.length > 0 && (
            <Tooltip title="Download as Excel">
              <Button
                variant="outlined"
                onClick={downloadExcel}
                startIcon={<CloudDownloadIcon />}
                sx={{
                  fontWeight: 600,
                  borderRadius: 3,
                  borderColor: "#90caf9",
                  color: "#1565c0",
                  "&:hover": { borderColor: "#1976d2", background: "#e3f2fd" }
                }}
              >
                Download Excel
              </Button>
            </Tooltip>
          )}
          {/* Example button to test success alert */}
          <Button variant="contained" color="success" onClick={performTransaction}>
            Simulate Success
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 0, borderRadius: 4, boxShadow: "0 3px 16px #bcbcbc18" }}>
        <TableContainer sx={{ maxHeight: "54vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ background: "#e3f2fd", fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ background: "#e3f2fd", fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ background: "#e3f2fd", fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ background: "#e3f2fd", fontWeight: 700 }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: "#999", py: 4, letterSpacing: 0.2 }}>
                    <span style={{ opacity: 0.62, fontWeight: 600, fontSize: "1.04em" }}>
                      No transactions found.
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((t, i) => (
                  <TableRow
                    key={t.transactionId}
                    hover
                    sx={{
                      background: i % 2 === 0 ? "#f3e5f580" : "#fff",
                      transition: "background 0.16s"
                    }}>
                    <TableCell>{t.transactionId}</TableCell>
                    <TableCell>{formatTimestamp(t.transactionDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={t.transactionType}
                        color={t.transactionType === "CREDIT" ? "success" : "warning"}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          background: t.transactionType === "CREDIT" ? "#e8f5e9" : "#fff3e0",
                          color: t.transactionType === "CREDIT" ? "#388e3c" : "#f57c00"
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <span style={{
                        color: t.transactionType === "CREDIT" ? "#388e3c" : "#f57c00",
                        fontWeight: 700,
                        fontSize: "1.05em"
                      }}>{t.amount}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
