import React, { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl, IconButton, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import api from "./api";
import {
  Paper, Typography, TextField, Button, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Grid, Stack, Box
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

export default function CustomerByAadhaar() {
  const [inputAadhaar, setInputAadhaar] = useState("");
  const [customer, setCustomer] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "", phoneNumber: "", email: "", address: "", aadharNumber: "", dob: "", status: "",
  });
  const [createForm, setCreateForm] = useState({
    name: "", phoneNumber: "", email: "", address: "", aadharNumber: "", customerPin: "", dob: "", status: "",
  });
  const [error, setError] = useState("");

  const resetEditForm = () => setEditForm({
    name: "", phoneNumber: "", email: "", address: "", aadharNumber: "", dob: "", status: "",
  });

  const clearAll = () => {
    setInputAadhaar("");
    setCustomer(null);
    setEditing(false);
    resetEditForm();
    setError("");
  };

  const fetchCustomer = () => {
    if (!inputAadhaar) return;
    api.get(`/customers/aadhar/${inputAadhaar}`)
      .then((res) => {
        setCustomer(res.data);
        setEditForm({
          name: res.data.name || "",
          phoneNumber: res.data.phoneNumber || "",
          email: res.data.email || "",
          address: res.data.address || "",
          aadharNumber: res.data.aadharNumber || "",
          dob: res.data.dob || "",
          status: res.data.status || "",
        });
        setEditing(false);
        setError("");
      })
      .catch(() => {
        setCustomer(null);
        setEditing(false);
        resetEditForm();
        setError("No customer record found");
      });
  };

  const handleDelete = () => {
    if (!inputAadhaar) return;
    api.delete(`/customers/aadhar/${inputAadhaar}`).then(() => { clearAll(); });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!inputAadhaar) return;
    api.put(`/customers/aadhar/${inputAadhaar}`, editForm).then(() => {
      setEditing(false);
      fetchCustomer();
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    api.post("/customers", { ...createForm })
      .then((res) => {
        setCustomer(res.data);
        setInputAadhaar(res.data.aadharNumber);
        setError("");
      })
      .catch(() => setError("Could not create customer"));
    setCreateForm({
      name: "", phoneNumber: "", email: "", address: "", aadharNumber: "", customerPin: "", dob: "", status: "",
    });
  };

  return (
    <Box sx={{ px: { xs: 1, md: 4 }, py: 2, background: "linear-gradient(120deg,#f6f8fe 70%,#f3e6ff 100%)", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Customer Profile
      </Typography>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, mb: 3, boxShadow: "0 4px 30px #6a1b9a13" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchCustomer();
          }}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Aadhaar Number"
              value={inputAadhaar}
              onChange={(e) => setInputAadhaar(e.target.value)}
              required
              sx={{ width: 210 }}
            />
            <Button type="submit" variant="contained" startIcon={<SearchIcon />} sx={{
              bgcolor: "#1565c0",
              "&:hover": { bgcolor: "#303f9f" }
            }}>
              Search
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ClearIcon />}
              onClick={clearAll}
              sx={{
                bgcolor: "#fafafa", color: "#7b1fa2", borderColor: "#ce93d8",
                "&:hover": { bgcolor: "#f3e6ff", color: "#6a1b9a" }
              }}
            >
              Clear
            </Button>
          </Stack>
        </form>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {customer && !editing && (
        <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Aadhaar</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.aadharNumber}</TableCell>
                  <TableCell>{formatDate(customer.dob)}</TableCell>
                  <TableCell><span style={{
                    fontWeight: 600,
                    color: (customer.status || "").toLowerCase() === "active" ? "#1976d2" : "#bdbdbd"
                  }}>{customer.status}</span></TableCell>
                  <TableCell>
                    <Tooltip title="Edit Customer">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => setEditing(true)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Customer">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={handleDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {editing && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mb: 2, boxShadow: "0 4px 28px #388e3c22" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#1565c0" }}>
            Update Customer
          </Typography>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Name" value={editForm.name} fullWidth required onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Phone Number" value={editForm.phoneNumber} fullWidth required onChange={e => setEditForm({ ...editForm, phoneNumber: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Email" value={editForm.email} fullWidth required onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Address" value={editForm.address} fullWidth onChange={e => setEditForm({ ...editForm, address: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Aadhaar Number" value={editForm.aadharNumber} fullWidth onChange={e => setEditForm({ ...editForm, aadharNumber: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField label="DOB" value={editForm.dob} fullWidth onChange={e => setEditForm({ ...editForm, dob: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={editForm.status} label="Status" onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" type="submit" startIcon={<SaveAltIcon />}>Update</Button>
              <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </Stack>
          </form>
        </Paper>
      )}

      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 4, boxShadow: "0 4px 30px #1976d233" }}>
        <Typography variant="h6" sx={{ color: "#6a1b9a" }}><PersonAddIcon sx={{ mb: -0.6, mr: 1 }} />Create New Customer</Typography>
        <form onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="Name" value={createForm.name} fullWidth required onChange={e => setCreateForm({ ...createForm, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="Phone Number" value={createForm.phoneNumber} fullWidth required onChange={e => setCreateForm({ ...createForm, phoneNumber: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="Email" value={createForm.email} fullWidth required onChange={e => setCreateForm({ ...createForm, email: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="Address" value={createForm.address} fullWidth onChange={e => setCreateForm({ ...createForm, address: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="Aadhaar Number" value={createForm.aadharNumber} fullWidth onChange={e => setCreateForm({ ...createForm, aadharNumber: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="Customer PIN" value={createForm.customerPin} fullWidth required onChange={e => setCreateForm({ ...createForm, customerPin: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField label="DOB" value={createForm.dob} fullWidth onChange={e => setCreateForm({ ...createForm, dob: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={createForm.status} label="Status" onChange={e => setCreateForm({ ...createForm, status: e.target.value })}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<PersonAddIcon />}
              disabled={!!customer}
            >
              Create Customer
            </Button>
          </Stack>
        </form>
        {customer && (
          <Typography sx={{ color: "orange", mt: 1 }}>
            A customer with this Aadhaar number exists. Use Clear or change Aadhaar to create a new one.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
