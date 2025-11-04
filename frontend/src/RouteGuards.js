import { Navigate } from "react-router-dom";

export function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin" ? children : <Navigate to="/admin-login" replace />;
}

export function CustomerRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "customer" ? children : <Navigate to="/login" replace />;
}
