import useAuthStore from "../../store/authStore";
import useTaskStore from "../../store/taskStore";
import useTasks from "../../hooks/useTasks";
import TaskFilters from "../../components/tasks/TaskFilters";
import TaskList from "../../components/tasks/TaskList";
import TaskStats from "../../components/tasks/TaskStats";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ComplementaryExercisesCard from "../../components/common/ComplementaryExercisesCard";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const tasks = useTaskStore((state) => state.tasks);
  const currentFilter = useTaskStore((state) => state.currentFilter);
  const currentCategory = useTaskStore((state) => state.currentCategory);
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const loading = useTaskStore((state) => state.loading);

  useTasks();

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed" && !task.completed) {
      return false;
    }

    if (currentFilter === "pending" && task.completed) {
      return false;
    }

    if (currentCategory !== "all" && task.category !== currentCategory) {
      return false;
    }

    if (normalizedQuery) {
      const haystack = `${task.title || ""} ${task.description || ""}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="surface-chip bg-blue-100 text-blue-700 mb-4">Panel principal</div>
            <h1 className="section-title text-4xl font-bold text-slate-900">
              Hola, {user?.displayName || "Usuario"}
            </h1>
            <p className="subtle-text mt-3 max-w-2xl">
              Manten el control de tus pendientes, encuentra prioridades rapido y revisa tu
              progreso desde un panel mas claro.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-blue-600 px-4 py-4 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Pendientes</p>
              <p className="mt-2 text-3xl font-bold">
                {tasks.filter((task) => !task.completed).length}
              </p>
            </div>
            <div className="rounded-3xl bg-white px-4 py-4 border border-slate-200/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{tasks.length}</p>
            </div>
            <div className="rounded-3xl bg-white px-4 py-4 border border-slate-200/70 col-span-2 sm:col-span-1">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mostrando</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{filteredTasks.length}</p>
            </div>
          </div>
        </div>
      </section>

      <TaskStats tasks={tasks} />
      <TaskFilters />
      <TaskList tasks={filteredTasks} />
      <ComplementaryExercisesCard />
    </div>
  );
}
