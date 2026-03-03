import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthStore from "../../store/authStore";

export default function Login() {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const authError = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (data) => {
    await login(data.email.trim(), data.password);
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 py-10">
      <div className="card w-full max-w-md">
        <div className="mb-6">
          <div className="surface-chip mb-3">Bienvenida</div>
          <h1 className="section-title text-3xl font-bold">Inicia sesion</h1>
          <p className="subtle-text mt-2">
            Accede a tu panel para revisar tareas, prioridades y progreso.
          </p>
        </div>

        {authError && (
          <div className="mb-5 rounded-2xl border border-red-200/70 bg-red-50/70 p-4 text-red-700">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">Correo electronico</label>
            <input
              className="input-field"
              placeholder="tu@email.com"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Contrasena</label>
            <input
              type="password"
              className="input-field"
              placeholder="********"
              {...register("password", { required: "La contrasena es obligatoria" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar al panel"}
          </button>
        </form>

        <div className="mt-6 border-t border-[var(--border)] pt-5">
          <p className="subtle-text text-center text-sm">
            No tienes cuenta?{" "}
            <Link className="font-semibold text-[var(--primary)]" to="/register">
              Crear una ahora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
