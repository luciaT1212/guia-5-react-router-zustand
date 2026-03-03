import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";
import { subscribeToTasks } from "../services/taskService";

export default function useTasks() {
  const user = useAuthStore((state) => state.user);
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLoading = useTaskStore((state) => state.setLoading);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToTasks(user.uid, (tasks) => {
      setTasks(tasks);
    });

    return () => {
      unsubscribe();
    };
  }, [user, setTasks, setLoading]);
}
