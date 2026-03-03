import { Navigate, Route, Routes } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Layout from "../components/layout/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import TaskDetails from "../pages/dashboard/TaskDetails";
import useAuthStore from "../store/authStore";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  const user = useAuthStore((state) => state.user);
  const checkingAuth = useAuthStore((state) => state.checkingAuth);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <Register />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
