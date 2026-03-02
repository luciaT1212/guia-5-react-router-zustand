import { useParams } from "react-router-dom";

export default function TaskDetails() {
  const { id } = useParams();
  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Task Details</h1>
      <p className="text-gray-600">ID: {id}</p>
    </div>
  );
}