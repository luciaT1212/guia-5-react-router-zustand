import { create } from "zustand";

const useUIStore = create((set) => ({
  loading: false,
  error: null,
  toast: null, // { type: "success" | "error" | "info", message: string }

  setLoading: (value) => set({ loading: value }),
  setError: (message) => set({ error: message }),
  clearError: () => set({ error: null }),

  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}));

export default useUIStore;