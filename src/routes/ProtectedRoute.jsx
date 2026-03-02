import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function ProtectedRoute() {
  const { user, loading } = useAuthStore();

  if (loading) return <LoadingSpinner />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}