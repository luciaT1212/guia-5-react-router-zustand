import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { loginUser, logoutUser, registerUser } from "../services/authService";

const useAuthStore = create((set, get) => ({
  user: null,
  checkingAuth: true,

  initAuthListener: () => {
    if (get()._unsub) return;

    const unsub = onAuthStateChanged(auth, (user) => {
      set({ user: user ?? null, checkingAuth: false });
    });

    set({ _unsub: unsub });
  },

  register: async (payload) => {
    const user = await registerUser(payload);
    set({ user });
    return user;
  },

  login: async (payload) => {
    const user = await loginUser(payload);
    set({ user });
    return user;
  },

  logout: async () => {
    await logoutUser();
    set({ user: null });
  },

  _unsub: null,
}));

export default useAuthStore;