import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Paper, Typography, TextField, Button, Select, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  InputLabel, FormControl, Grid, Stack, Box, IconButton, Tooltip
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";

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

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    accountId: "",
    customerId: "",
    accountNumber: "",
    aadharNumber: "",
    ifscCode: "",
    phoneNumberLinked: "",
    amount: "",
    bankName: "",
    nameOnAccount: "",
    status: "ACTIVE",
    createdAt: [],
    modifiedAt: []
  });
  const [editingNumber, setEditingNumber] = useState(null);
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterAccountNo, setFilterAccountNo] = useState("");
  const [formOpen, setFormOpen] = useState(true);

  useEffect(() => { fetchAccounts(); }, []);

  function fetchAccounts(customerId, accountNumber) {
    let url = "/accounts";
    if (accountNumber) {
      url = `/accounts/${accountNumber}`;
    } else if (customerId) {
      url = `/accounts/customer/${customerId}`;
    }
    api.get(url)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        setAccounts(data);
      })
      .catch(() => setAccounts([]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editingNumber
      ? api.put(`/accounts/${editingNumber}`, form)
      : api.post("/accounts", form);
    action.then(() => fetchAccounts(filterCustomer, filterAccountNo)).then(() => {
      setEditingNumber(null);
      setForm({
        accountId: "",
        customerId: "",
        accountNumber: "",
        aadharNumber: "",
        ifscCode: "",
        phoneNumberLinked: "",
        amount: "",
        bankName: "",
        nameOnAccount: "",
        status: "ACTIVE",
        createdAt: [],
        modifiedAt: []
      });
    });
  };

  const startEdit = (a) => {
    setFormOpen(true);
    setEditingNumber(a.accountNumber);
    setForm({
      accountId: a.accountId ?? "",
      customerId: a.customerId ?? "",
      accountNumber: a.accountNumber ?? "",
      aadharNumber: a.aadharNumber ?? "",
      ifscCode: a.ifscCode ?? "",
      phoneNumberLinked: a.phoneNumberLinked ?? "",
      amount: a.amount ?? "",
      bankName: a.bankName ?? "",
      nameOnAccount: a.nameOnAccount ?? "",
      status: a.status ?? "ACTIVE",
      createdAt: a.createdAt ?? [],
      modifiedAt: a.modifiedAt ?? []
    });
  };

  const deleteAccount = (number) => {
    api.delete(`/accounts/${number}`)
      .then(() => fetchAccounts(filterCustomer, filterAccountNo));
  };

  return (
    <Box
      sx={{
        px: { xs: 1, md: 4 }, py: 2,
        background: "linear-gradient(120deg,#f6f8fe 70%,#f3e6ff 100%)",
        minHeight: "100vh"
      }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#222", letterSpacing: ".5px" }}>
        Accounts Management
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Button
          variant={formOpen ? "outlined" : "contained"}
          color="primary"
          sx={{
            mb: 1, borderRadius: 3, px: 2.5, py: 1.2, fontWeight: 600,
            background: formOpen ? "" : "linear-gradient(90deg, #1976d2, #64b5f6)"
          }}
          size="large"
          startIcon={formOpen ? <ClearIcon /> : <AddCircleOutlineIcon />}
          onClick={() => setFormOpen(f => !f)}
        >
          {formOpen ? "Hide Form" : "Add Account"}
        </Button>
      </Box>
      {formOpen && (
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, md: 3 }, borderRadius: 4, mb: 3,
            boxShadow: "0 8px 30px 0 #b39ddb33",
            background: "rgba(255,255,255,0.97)",
            transition: "box-shadow 0.4s",
            "&:hover": { boxShadow: "0 10px 44px 0 #1976d233" }
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "#1769aa", fontWeight: 700 }}>
            {editingNumber ? "Update Account" : "Create New Account"}
          </Typography>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}><TextField label="Account ID" fullWidth value={form.accountId} onChange={e => setForm({ ...form, accountId: e.target.value })} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Customer ID" fullWidth required value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Account Number" fullWidth value={form.accountNumber} onChange={e => setForm({ ...form, accountNumber: e.target.value })} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Aadhar Number" fullWidth value={form.aadharNumber} onChange={e => setForm({ ...form, aadharNumber: e.target.value })} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="IFSC Code" fullWidth value={form.ifscCode} onChange={e => setForm({ ...form, ifscCode: e.target.value })} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Phone Linked" fullWidth value={form.phoneNumberLinked} onChange={e => setForm({ ...form, phoneNumberLinked: e.target.value })} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Amount" fullWidth value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></Grid>
              <Grid item xs={12} sm={3}><TextField label="Bank Name" fullWidth value={form.bankName} onChange={e => setForm({ ...form, bankName: e.target.value })} /></Grid>
              <Grid item xs={12} sm={3}><TextField label="Name on Account" fullWidth value={form.nameOnAccount} onChange={e => setForm({ ...form, nameOnAccount: e.target.value })} /></Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={form.status} label="Status" onChange={e => setForm({ ...form, status: e.target.value })}>
                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={editingNumber ? <SaveIcon /> : <DoneIcon />}
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      background: "linear-gradient(90deg, #1976d2, #64b5f6)",
                      boxShadow: "0 3px 12px #1976d222",
                      transition: "transform 0.18s",
                      "&:hover": { background: "linear-gradient(90deg, #1769aa, #2196f3)", transform: "scale(1.05)" }
                    }}
                    type="submit"
                  >
                    {editingNumber ? "Update" : "Create"} Account
                  </Button>
                  {editingNumber &&
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setEditingNumber(null);
                        setForm({
                          accountId: "",
                          customerId: "",
                          accountNumber: "",
                          aadharNumber: "",
                          ifscCode: "",
                          phoneNumberLinked: "",
                          amount: "",
                          bankName: "",
                          nameOnAccount: "",
                          status: "ACTIVE",
                          createdAt: [],
                          modifiedAt: []
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  }
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      <Paper
        elevation={1}
        sx={{
          p: 2, mb: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap",
          borderRadius: 4, boxShadow: "0 2px 12px #1976d212"
        }}
      >
        <TextField label="Filter by Customer ID" value={filterCustomer}
          onChange={e => setFilterCustomer(e.target.value)}
          size="small" sx={{ minWidth: 160 }} />
        <TextField label="Filter by Account Number" value={filterAccountNo}
          onChange={e => setFilterAccountNo(e.target.value)}
          size="small" sx={{ minWidth: 170 }} />
        <Tooltip title="Filter List">
          <IconButton
            color="primary"
            sx={{ ml: 1 }}
            onClick={() => fetchAccounts(filterCustomer, filterAccountNo)}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear All">
          <IconButton
            color="error"
            onClick={() => { setFilterCustomer(""); setFilterAccountNo(""); fetchAccounts(); }}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Paper>

      <Paper elevation={2} sx={{ p: 0, borderRadius: 4, background: "white" }}>
        <TableContainer sx={{ maxHeight: 430 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Account ID", "Customer ID", "Account Number", "Aadhar Number", "IFSC Code", "Phone Linked", "Amount", "Bank Name", "Name On Account", "Status", "Created At", "Modified At", "Actions"].map(col => (
                  <TableCell key={col} sx={{ fontWeight: 700, fontSize: ".98rem", background: "#f3f7ff" }}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map(a => (
                <TableRow
                  key={a.accountId}
                  hover
                  sx={{
                    transition: "background 0.18s",
                    "&:hover": { background: "#e3f2fd33" }
                  }}
                >
                  <TableCell>{a.accountId}</TableCell>
                  <TableCell>{a.customerId}</TableCell>
                  <TableCell>{a.accountNumber}</TableCell>
                  <TableCell>{a.aadharNumber}</TableCell>
                  <TableCell>{a.ifscCode}</TableCell>
                  <TableCell>{a.phoneNumberLinked}</TableCell>
                  <TableCell>{a.amount}</TableCell>
                  <TableCell>{a.bankName}</TableCell>
                  <TableCell>{a.nameOnAccount}</TableCell>
                  <TableCell>
                    <span style={{ color: a.status === "ACTIVE" ? "#1976d2" : "#bdbdbd", fontWeight: 600 }}>
                      {a.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatTimestamp(a.createdAt)}</TableCell>
                  <TableCell>{formatTimestamp(a.modifiedAt)}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary" onClick={() => startEdit(a)}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => deleteAccount(a.accountNumber)}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
