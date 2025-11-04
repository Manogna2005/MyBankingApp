import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import AdminPage from "./components/AdminPage";
import Accounts from "./components/Accounts";
import Customers from "./components/Customers";
import Transactions from "./components/Transactions";
import AdminLogin from "./components/AdminLogin";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CustomerById from "./CustomerById";
import { AdminRoute, CustomerRoute } from "./RouteGuards";
import AdminAccounts from "./AdminAccounts";
import AdminTransactions from './components/AdminTransactions';

import AppLayout from "./AppLayout";

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-page" element={<AdminPage />} />

          {/* ADMIN AUTH & DASHBOARD */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/admin-page" element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } />

          {/* ADMIN FEATURE ROUTES (only accessible after logging in) */}
          <Route path="/admin/customers" element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          } />
          <Route path="/admin/accounts" element={
            <AdminRoute>
              <AdminAccounts />
            </AdminRoute>
          } />
          <Route path="/admin/transactions" element={
            <AdminRoute>
              <AdminTransactions />
            </AdminRoute>
          } />

          {/* CUSTOMER ROUTES */}
          <Route path="/customers" element={
            <CustomerRoute>
              <CustomerById />
            </CustomerRoute>
          } />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />

          {/* PUBLIC LOGIN/SIGNUP */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
