import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import useAuthStore from "./store/authStore";
import { useUIStore } from "./store/uiStore";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const unsubscribe = initializeAuth?.();
    return () => unsubscribe?.();
  }, [initializeAuth]);

  return (
    <div className={`app-shell ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <AppRouter />
    </div>
  );
}
