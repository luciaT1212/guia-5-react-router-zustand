import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { logoutUser } from "../../services/authService";

export default function Navbar() {
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser();

    if (result?.success) {
      clearUser();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          Task Manager Pro
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.email || "Invitado"}</span>

          <button onClick={handleLogout} className="btn-secondary">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}