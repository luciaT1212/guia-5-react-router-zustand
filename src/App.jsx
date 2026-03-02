import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth?.();
    return () => unsubscribe?.();
  }, [initializeAuth]);

  return <AppRouter />;
}