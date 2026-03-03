import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

export default function TaskList({ tasks }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Tareas ({tasks.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary" type="button">
          + Nueva Tarea
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <TaskForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {!tasks.length ? (
        <div className="card">
          <p className="text-gray-600">No hay tareas para mostrar.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
