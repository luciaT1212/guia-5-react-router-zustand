import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/authService";
import useAuthStore from "../../store/authStore";

export default function Register() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", email: "", password: "", confirmPassword: "" } });

  const passwordValue = watch("password", "");

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    const result = await registerUser(data.email.trim(), data.password, data.name.trim());

    if (result.success) {
      setUser(result.user);
      navigate("/dashboard");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 py-10">
      <div className="card w-full max-w-md">
        <div className="mb-6">
          <div className="surface-chip mb-3">Nuevo acceso</div>
          <h1 className="section-title text-3xl font-bold">Crea tu cuenta</h1>
          <p className="subtle-text mt-2">
            Organiza tareas, prioridades y fechas limite desde un solo lugar.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200/70 bg-red-50/70 p-4 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">Nombre</label>
            <input
              type="text"
              className="input-field"
              placeholder="Tu nombre completo"
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Minimo 3 caracteres" },
              })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Correo electronico</label>
            <input
              type="email"
              className="input-field"
              placeholder="tu@email.com"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo invalido",
                },
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Contrasena</label>
            <input
              type="password"
              className="input-field"
              placeholder="********"
              {...register("password", {
                required: "La contrasena es obligatoria",
                minLength: { value: 6, message: "Minimo 6 caracteres" },
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Confirmar contrasena</label>
            <input
              type="password"
              className="input-field"
              placeholder="********"
              {...register("confirmPassword", {
                required: "Debes confirmar la contrasena",
                validate: (value) => value === passwordValue || "Las contrasenas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <div className="mt-6 border-t border-[var(--border)] pt-5">
          <p className="subtle-text text-center text-sm">
            Ya tienes cuenta?{" "}
            <Link className="font-semibold text-[var(--primary)]" to="/login">
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
