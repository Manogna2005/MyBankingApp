import React, { useState } from "react";
import api from "../api";
import {
  Paper, Typography, TextField, Button, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Stack, Grid, Box,
  IconButton, Tooltip, Snackbar, Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import DownloadIcon from "@mui/icons-material/Download";

export default function Transactions() {
  const [accountNumber, setAccountNumber] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transfer, setTransfer] = useState({
    senderAccountNumber: "",
    receiverAccountNumber: "",
    transferAmount: "",
    pin: ""
  });
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Fetch transactions for an account
  const fetchTransactions = () => {
    if (!accountNumber) return;
    setLoading(true);
    api.get(`/transactions/${accountNumber}`)
      .then(res => setTransactions(res.data))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
    setDownloadUrl(`http://localhost:8080/banksimulator/transactions/${accountNumber}`);
  };

  // Handle transfer form submit
  const doTransfer = (e) => {
    e.preventDefault();
    api.post("/transactions/transfer", transfer)
      .then(() => {
        setTransfer({
          senderAccountNumber: "",
          receiverAccountNumber: "",
          transferAmount: "",
          pin: ""
        });
        setAlertOpen(true); // <-- open the Snackbar!
        if (
          transfer.senderAccountNumber === accountNumber ||
          transfer.receiverAccountNumber === accountNumber
        ) {
          fetchTransactions();
        }
      });
  };

  // Download Excel
  const downloadExcel = () => {
    fetch(`${downloadUrl}`, {
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
    <Box sx={{ maxWidth: 1030, mx: "auto", mt: 4, px: { xs: 1, sm: 2 } }}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: "100%" }}>
          Transfer successful!
        </Alert>
      </Snackbar>

      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.4 }}>Transactions</Typography>
      {/* ...rest of your component... */}

      <Paper sx={{
        p: { xs: 2, md: 3 },
        mb: 2,
        borderRadius: 4,
        boxShadow: "0 8px 32px #1565c022"
      }} elevation={4}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="flex-start">
          <TextField
            label="Enter Account Number"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            size="small"
            sx={{ minWidth: 235, bgcolor: "white", borderRadius: 2 }}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={fetchTransactions}
            sx={{
              background: "linear-gradient(93deg,#1976d2,#42a5f5)",
              color: "#fff",
              fontWeight: 600,
              boxShadow: "0 2px 10px #1976d222",
              borderRadius: 2,
              px: 3,
              "&:hover": { background: "linear-gradient(93deg,#16418b,#1769aa)" }
            }}
          >
            Get Transactions
          </Button>
          {!!transactions.length && (
            <Tooltip title="Download Excel">
              <IconButton onClick={downloadExcel} color="primary" size="large" sx={{
                bgcolor: "#f3e6ff", ml: 1, "&:hover": { bgcolor: "#e1bee7" }
              }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Paper>

      {/* Transfer Form */}
      <Paper sx={{
        p: { xs: 2, md: 3 },
        mb: 2,
        borderRadius: 4,
        boxShadow: "0 8px 32px #388e3c18"
      }} elevation={3}>
        <form onSubmit={doTransfer}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                label="Sender Account"
                value={transfer.senderAccountNumber}
                onChange={e => setTransfer({ ...transfer, senderAccountNumber: e.target.value })}
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Receiver Account"
                value={transfer.receiverAccountNumber}
                onChange={e => setTransfer({ ...transfer, receiverAccountNumber: e.target.value })}
                size="small"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Amount"
                type="number"
                value={transfer.transferAmount}
                onChange={e => setTransfer({ ...transfer, transferAmount: e.target.value })}
                size="small"
                required
                fullWidth
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Sender PIN"
                value={transfer.pin}
                onChange={e => setTransfer({ ...transfer, pin: e.target.value })}
                size="small"
                required
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Tooltip title="Transfer Amount">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<SyncAltIcon />}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    background: "linear-gradient(90deg,#42a5f5,#1976d2)",
                    boxShadow: "0 2px 8px #1976d211",
                    "&:hover": { background: "linear-gradient(90deg,#1976d2,#1565c0)" }
                  }}
                >
                  Transfer
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Transactions Table */}
      <Paper sx={{
        p: 0,
        borderRadius: 4,
        boxShadow: "0 2px 12px #2e7d3214"
      }} elevation={2}>
        <TableContainer sx={{ maxHeight: 420 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, background: "#e3f0fa" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700, background: "#e3f0fa" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700, background: "#e3f0fa" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700, background: "#e3f0fa" }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <span style={{ color: "#1976d2", fontWeight: 500 }}>Loading...</span>
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: "#bbb" }}>
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map(t => (
                  <TableRow key={t.transactionId}
                    hover
                    sx={{
                      background: t.transactionType === "CREDIT" ? "#e8f5e9" : (t.transactionType === "DEBIT" ? "#fffde7" : ""),
                      transition: "background 0.18s"
                    }}>
                    <TableCell>{t.transactionId}</TableCell>
                    <TableCell>{t.transactionDate}</TableCell>
                    <TableCell>
                      {t.transactionType === "CREDIT" ? (
                        <span style={{ color: "#388e3c", fontWeight: 600 }}>
                          <ArrowDownwardIcon fontSize="small" sx={{ mb: "-3px" }} /> CREDIT
                        </span>
                      ) : t.transactionType === "DEBIT" ? (
                        <span style={{ color: "#f57c00", fontWeight: 600 }}>
                          <ArrowUpwardIcon fontSize="small" sx={{ mb: "-3px" }} /> DEBIT
                        </span>
                      ) : (
                        t.transactionType
                      )}
                    </TableCell>
                    <TableCell>
                      <span style={{
                        color: t.transactionType === "CREDIT" ? "#388e3c" : (t.transactionType === "DEBIT" ? "#f57c00" : "#111"),
                        fontWeight: 600
                      }}>
                        ₹ {t.amount}
                      </span>
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
