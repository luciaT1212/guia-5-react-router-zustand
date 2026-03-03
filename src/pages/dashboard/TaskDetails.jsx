import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskById, updateTask } from "../../services/taskService";
import { CATEGORIES, PRIORITIES } from "../../utils/constants";
import { formatDateTime, getDueDateLabel, isOverdue } from "../../utils/dateHelpers";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import TaskForm from "../../components/tasks/TaskForm";

const categoryStyles = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  gray: "bg-gray-100 text-gray-800",
};

const priorityStyles = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  red: "bg-red-100 text-red-800",
};

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadTask = async () => {
    setLoading(true);
    const result = await getTaskById(id);

    if (result.success) setTask(result.task);
    else navigate("/dashboard");

    setLoading(false);
  };

  const handleToggleComplete = async () => {
    const result = await updateTask(id, { completed: !task.completed });
    if (result.success) {
      setTask((currentTask) => ({
        ...currentTask,
        completed: !currentTask.completed,
      }));
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Estas segura de eliminar esta tarea?")) {
      const result = await deleteTask(id);
      if (result.success) navigate("/dashboard");
    }
  };

  const handleCloseEdit = async () => {
    setEditing(false);
    await loadTask();
  };

  if (loading) return <LoadingSpinner />;
  if (!task) return null;

  const category = CATEGORIES.find((item) => item.id === task.category);
  const priority = PRIORITIES.find((item) => item.id === task.priority);
  const overdue = isOverdue(task.dueDate, task.completed);

  if (editing) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button onClick={() => setEditing(false)} className="btn-secondary" type="button">
            Cancelar edición
          </button>
        </div>
        <div className="card">
          <TaskForm onClose={handleCloseEdit} taskToEdit={task} />
        </div>
      </div>
    );
  }

  const statusChip = task.completed
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";

  const dueChip = overdue ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/dashboard" className="btn-secondary w-fit">
          ← Volver al dashboard
        </Link>

        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="btn-secondary" type="button">
            Editar
          </button>
          <button onClick={handleDelete} className="btn-danger" type="button">
            Eliminar
          </button>
        </div>
      </div>

      {/* Header card */}
      <section className="card">
        <div className="flex flex-col gap-5">
          <div>
            <div className="surface-chip bg-[var(--primary-soft)] text-[var(--primary-strong)] mb-4">
              Detalle de tarea
            </div>

            <h1 className="section-title text-4xl font-bold">
              {task.title || "Sin título"}
            </h1>

            <p className="subtle-text mt-3 max-w-3xl">
              Revisa la información, el estado y las fechas. Desde aquí puedes editar o marcar como completada.
            </p>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {category && (
              <span
                className={`surface-chip ${categoryStyles[category.color] || categoryStyles.gray}`}
              >
                {category.label}
              </span>
            )}

            {priority && (
              <span
                className={`surface-chip ${priorityStyles[priority.color] || priorityStyles.green}`}
              >
                Prioridad: {priority.label}
              </span>
            )}

            <span className={`surface-chip ${statusChip}`}>
              {task.completed ? "Completada" : "Pendiente"}
            </span>

            {task.dueDate && (
              <span className={`surface-chip ${dueChip}`}>
                Vence: {getDueDateLabel(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <section className="card lg:col-span-2">
          <h2 className="section-title text-xl font-semibold">Descripción</h2>
          <p className="subtle-text mt-3 whitespace-pre-wrap">
            {task.description || "Sin descripción"}
          </p>
        </section>

        {/* Side info */}
        <aside className="card">
          <h2 className="section-title text-xl font-semibold">Información</h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)]/70 p-4">
              <p className="text-xs uppercase tracking-[0.22em] subtle-text">Creada</p>
              <p className="mt-2 font-semibold">{formatDateTime(task.createdAt) || "N/A"}</p>
            </div>

            {task.dueDate && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)]/70 p-4">
                <p className="text-xs uppercase tracking-[0.22em] subtle-text">
                  Fecha de vencimiento
                </p>
                <p className="mt-2 font-semibold">{formatDateTime(task.dueDate)}</p>
                {overdue && !task.completed && (
                  <p className="mt-2 text-sm font-semibold text-red-500">
                    ⚠️ Esta tarea está vencida
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleToggleComplete}
              className={`${task.completed ? "btn-secondary" : "btn-primary"} w-full`}
              type="button"
            >
              {task.completed ? "Marcar pendiente" : "Marcar completada"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}