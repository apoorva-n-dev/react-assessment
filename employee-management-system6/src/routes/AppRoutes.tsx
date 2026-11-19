import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeDetails from "../pages/EmployeeDetails";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  // Temporary demo authentication.
  // Connect this to your real authentication context when available.
  const isAuthenticated = true;
  const userRole = "admin";

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={
        <ProtectedRoute isAuthenticated={isAuthenticated} />
      }>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />

          <Route element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              requiredRole="admin"
              userRole={userRole}
            />
          }>
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;