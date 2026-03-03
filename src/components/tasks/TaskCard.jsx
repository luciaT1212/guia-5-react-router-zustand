import { Link } from "react-router-dom";
import { updateTask, deleteTask } from "../../services/taskService";
import { CATEGORIES } from "../../utils/constants";
import { getDueDateLabel, isOverdue } from "../../utils/dateHelpers";

const categoryStyles = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  gray: "bg-gray-100 text-gray-800",
};

export default function TaskCard({ task }) {
  const category = CATEGORIES.find((item) => item.id === task.category);
  const dueDateLabel = getDueDateLabel(task.dueDate);
  const overdue = isOverdue(task.dueDate, task.completed);

  const handleToggleComplete = async (event) => {
    event.preventDefault();
    await updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (!window.confirm("Estas segura de eliminar esta tarea?")) return;
    await deleteTask(task.id);
  };

  const statusChip = task.completed
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";

  return (
    <Link to={`/tasks/${task.id}`} className="block group">
      <div
        className={[
          "card transition-all duration-200",
          "hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)]",
          overdue ? "border-red-300/70" : "",
          task.completed ? "opacity-75" : "",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-slate-900 truncate">
                {task.title || "Sin título"}
              </h3>

              {category && (
                <span
                  className={`surface-chip text-xs ${
                    categoryStyles[category.color] || categoryStyles.gray
                  }`}
                >
                  {category.label}
                </span>
              )}

              {overdue && !task.completed && (
                <span className="surface-chip text-xs bg-red-100 text-red-700">
                  Vencida
                </span>
              )}
            </div>

            {task.description && (
              <p className="subtle-text mt-3 text-sm leading-6 line-clamp-2">
                {task.description}
              </p>
            )}

            {dueDateLabel && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Vence
                </span>
                <span className={`text-sm font-semibold ${overdue ? "text-red-600" : "text-slate-700"}`}>
                  {dueDateLabel}
                </span>
              </div>
            )}
          </div>

          <span className={`surface-chip text-xs ${statusChip}`}>
            {task.completed ? "Completada" : "Pendiente"}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              className="btn-secondary"
              onClick={handleToggleComplete}
              type="button"
            >
              {task.completed ? "Marcar pendiente" : "Completar"}
            </button>

            <button className="btn-danger" onClick={handleDelete} type="button">
              Eliminar
            </button>
          </div>

          <span className="subtle-text text-xs">
            Click para ver detalles →
          </span>
        </div>
      </div>
    </Link>
  );
}