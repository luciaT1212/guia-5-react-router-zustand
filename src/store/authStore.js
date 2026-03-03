import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { loginUser, logoutUser, registerUser } from "../services/authService";

const mapFirebaseUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
  };
};

const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  checkingAuth: true,
  error: null,
  _unsubscribe: null,

  setUser: (user) =>
    set({
      user,
      loading: false,
      checkingAuth: false,
      error: null,
    }),

  clearUser: () =>
    set({
      user: null,
      loading: false,
      checkingAuth: false,
    }),

  clearError: () => set({ error: null }),

  initializeAuth: () => {
    const existingUnsubscribe = get()._unsubscribe;

    if (existingUnsubscribe) {
      return existingUnsubscribe;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({
        user: mapFirebaseUser(user),
        loading: false,
        checkingAuth: false,
        error: null,
      });
    });

    set({ _unsubscribe: unsubscribe });

    return () => {
      unsubscribe();
      set({ _unsubscribe: null });
    };
  },

  initializeAuthListener: () => get().initializeAuth(),

  register: async (payload) => {
    set({ error: null });

    const result = await registerUser(payload);

    if (!result.success) {
      set({ error: result.error });
      throw new Error(result.error);
    }

    set({
      user: result.user,
      loading: false,
      checkingAuth: false,
      error: null,
    });

    return result.user;
  },

  login: async (payload) => {
    set({ error: null });

    const result = await loginUser(payload);

    if (!result.success) {
      set({ error: result.error });
      throw new Error(result.error);
    }

    set({
      user: result.user,
      loading: false,
      checkingAuth: false,
      error: null,
    });

    return result.user;
  },

  logout: async () => {
    set({ error: null });

    const result = await logoutUser();

    if (!result.success) {
      set({ error: result.error });
      throw new Error(result.error);
    }

    set({
      user: null,
      loading: false,
      checkingAuth: false,
      error: null,
    });
  },
}));

export default useAuthStore;
