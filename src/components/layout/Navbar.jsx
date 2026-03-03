import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useUIStore } from "../../store/uiStore";
import { logoutUser } from "../../services/authService";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser();

    if (result.success) {
      clearUser();
      navigate("/login");
    }
  };

  return (
    <nav className="nav-shell sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[4.75rem] flex flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white grid place-items-center font-bold shadow-lg">
              TM
            </div>
            <div>
              <Link to="/dashboard" className="brand-mark text-2xl font-bold text-blue-600">
                Task Manager Pro
              </Link>
              <p className="text-sm subtle-text">Organiza tu trabajo con foco</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="btn-secondary" type="button">
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </button>
            <div className="hidden sm:flex items-center gap-3 rounded-2xl px-3 py-2 bg-white/60 border border-slate-200/60">
              <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-700 grid place-items-center font-bold">
                {(user?.displayName || user?.email || "U").slice(0, 1).toUpperCase()}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.displayName || "Usuario"}
                </p>
                <p className="text-xs subtle-text">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-danger" type="button">
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
