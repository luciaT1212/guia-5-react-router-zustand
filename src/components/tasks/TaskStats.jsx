import { isOverdue } from "../../utils/dateHelpers";

export default function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter((task) => isOverdue(task.dueDate, task.completed)).length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total", value: total, tone: "bg-white text-slate-900" },
    { label: "Completadas", value: completed, tone: "bg-emerald-50 text-emerald-700" },
    { label: "Pendientes", value: pending, tone: "bg-amber-50 text-amber-700" },
    { label: "Vencidas", value: overdue, tone: "bg-rose-50 text-rose-700" },
    { label: "Completitud", value: `${completionRate}%`, tone: "bg-blue-50 text-blue-700" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-5 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className={`card ${stat.tone}`}>
          <p className="text-xs uppercase tracking-[0.2em] opacity-70">{stat.label}</p>
          <p className="text-3xl font-bold mt-3">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
