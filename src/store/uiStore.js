import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUIStore = create(
  persist(
    (set) => ({
      theme: "light",
      sidebarOpen: true,
      loading: false,
      error: null,
      toast: null,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setLoading: (value) => set({ loading: value }),
      setError: (message) => set({ error: message }),
      clearError: () => set({ error: null }),
      showToast: (toast) => set({ toast }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: "ui-preferences",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

export default useUIStore;
