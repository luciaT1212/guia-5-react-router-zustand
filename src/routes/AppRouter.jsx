import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import TaskDetails from "../pages/dashboard/TaskDetails";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}