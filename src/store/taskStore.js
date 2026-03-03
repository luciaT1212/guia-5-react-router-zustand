import { create } from "zustand";
import {
  createTask,
  deleteTask,
  getTaskById,
  subscribeToTasks,
  updateTask,
} from "../services/taskService";

const useTaskStore = create((set, get) => ({
  tasks: [],
  currentFilter: "all",
  currentCategory: "all",
  searchQuery: "",
  selectedTask: null,
  loading: false,
  error: null,
  _unsubscribe: null,

  setTasks: (tasks) => set({ tasks, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setFilter: (filter) => set({ currentFilter: filter }),
  setCategory: (category) => set({ currentCategory: category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  clearError: () => set({ error: null }),

  initializeTasks: (userId) => {
    const existingUnsubscribe = get()._unsubscribe;

    if (existingUnsubscribe) {
      existingUnsubscribe();
    }

    if (!userId) {
      set({ tasks: [], _unsubscribe: null, loading: false });
      return () => {};
    }

    set({ loading: true, error: null });

    const unsubscribe = subscribeToTasks(userId, (tasks) => {
      set({
        tasks,
        loading: false,
        error: null,
      });
    });

    set({ _unsubscribe: unsubscribe });

    return () => {
      unsubscribe();
      set({ _unsubscribe: null });
    };
  },

  createTask: async (userId, taskData) => {
    set({ error: null });
    const result = await createTask(userId, taskData);

    if (!result.success) {
      set({ error: result.error });
    }

    return result;
  },

  updateTask: async (taskId, updates) => {
    set({ error: null });
    const result = await updateTask(taskId, updates);

    if (!result.success) {
      set({ error: result.error });
    }

    return result;
  },

  deleteTask: async (taskId) => {
    set({ error: null });
    const result = await deleteTask(taskId);

    if (!result.success) {
      set({ error: result.error });
    }

    return result;
  },

  fetchTaskById: async (taskId) => {
    set({ error: null, loading: true });
    const result = await getTaskById(taskId);

    if (result.success) {
      set({ selectedTask: result.task, loading: false });
    } else {
      set({ error: result.error, loading: false });
    }

    return result;
  },
}));

export default useTaskStore;
