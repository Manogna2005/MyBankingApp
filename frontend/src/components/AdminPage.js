import React from "react";
import {
  Box, Card, CardContent, Typography, Grid, Button, Stack
} from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function AdminPage() {
  const gotoAccounts = () => { window.location.href = "/admin/accounts"; };
  const gotoCustomers = () => { window.location.href = "/admin/customers"; };
  const gotoTransactions = () => { window.location.href = "/admin/transactions"; };

  return (
    <Box sx={{
      maxWidth: 1000, mx: "auto", mt: 4,
      background: "linear-gradient(135deg,#f8fcff 70%,#f3e5f5 100%)",
      minHeight: "100vh", pb: 10
    }}>
      <Typography variant="h4" sx={{
        fontWeight: 800,
        mb: 3,
        letterSpacing: .6,
        textAlign: "center",
        color: "#222",
        textShadow: "0 2px 10px #e1bee71a"
      }}>
        Admin Console
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mb: 3 }}>
        {/* Customers */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={6}
            sx={{
              borderRadius: 4,
              height: "100%",
              p: 0,
              transition: "box-shadow .24s, transform .18s",
              "&:hover": {
                boxShadow: "0 8px 36px #1565c033",
                transform: "translateY(-3px) scale(1.025)"
              }
            }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "linear-gradient(120deg,#e3f2fd 70%,#bbdefb 100%)",
                  background: "linear-gradient(135deg,#e3f2fd,#bbdefb 90%)",
                  borderRadius: 2,
                  width: 60,
                  height: 60,
                  mr: 1
                }}>
                  <PeopleOutlineIcon sx={{ fontSize: 38, color: "#1565c0" }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Customers</Typography>
                  <Typography variant="body2" color="text.secondary">Manage all customer accounts</Typography>
                  <Button onClick={gotoCustomers} variant="contained"
                    sx={{
                      mt: 2, fontWeight: 600, letterSpacing: .4,
                      background: "linear-gradient(90deg,#1976d2,#42a5f5)",
                      boxShadow: "0 1.5px 8px #1976d222",
                      borderRadius: 3
                    }}
                  >View Customers</Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* Accounts */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={6}
            sx={{
              borderRadius: 4,
              height: "100%",
              p: 0,
              transition: "box-shadow .24s, transform .18s",
              "&:hover": {
                boxShadow: "0 8px 36px #43a04733",
                transform: "translateY(-3px) scale(1.025)"
              }
            }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg,#e8f5e9,#a5d6a7 80%)",
                  borderRadius: 2,
                  width: 60,
                  height: 60,
                  mr: 1
                }}>
                  <AccountBalanceIcon sx={{ fontSize: 38, color: "#2e7d32" }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Accounts</Typography>
                  <Typography variant="body2" color="text.secondary">Monitor and create accounts</Typography>
                  <Button onClick={gotoAccounts} variant="contained"
                    sx={{
                      mt: 2, fontWeight: 600, letterSpacing: .4,
                      background: "linear-gradient(90deg,#43a047,#66bb6a)",
                      boxShadow: "0 1.5px 8px #43a04722",
                      borderRadius: 3
                    }}
                  >View Accounts</Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* Transactions */}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={6}
            sx={{
              borderRadius: 4,
              height: "100%",
              p: 0,
              transition: "box-shadow .24s, transform .18s",
              "&:hover": {
                boxShadow: "0 8px 36px #ff704343",
                transform: "translateY(-3px) scale(1.025)"
              }
            }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg,#ffebee,#ffccbc 95%)",
                  borderRadius: 2,
                  width: 60,
                  height: 60,
                  mr: 1
                }}>
                  <SwapHorizIcon sx={{ fontSize: 38, color: "#ff6f00" }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Transactions</Typography>
                  <Typography variant="body2" color="text.secondary">View all transaction logs</Typography>
                  <Button onClick={gotoTransactions} variant="contained"
                    sx={{
                      mt: 2, fontWeight: 600, letterSpacing: .4,
                      background: "linear-gradient(90deg,#ffa726,#ff7043)",
                      boxShadow: "0 1.5px 8px #ff704322",
                      borderRadius: 3
                    }}
                  >View Transactions</Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* Welcome Info */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{
            mt: 6, borderRadius: 4,
            background: "linear-gradient(90deg,#f8bbd0 15%,#e1bee7 85%)",
            boxShadow: "0 3px 18px #6a1b9a18"
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <DashboardIcon color="action" sx={{ fontSize: 32 }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Welcome to the admin panel. Use the above options to quickly access all management functions.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
