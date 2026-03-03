import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">404 - Página no encontrada</h1>
      <Link className="text-blue-600 underline" to="/login">
        Ir al login
      </Link>
    </div>
  );
}
