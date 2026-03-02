import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) return setError("Escribe tu nombre.");
    if (!form.email.trim()) return setError("Escribe tu email.");
    if (form.password.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres.");
    if (form.password !== form.confirmPassword)
      return setError("Las contraseñas no coinciden.");

    try {
      setLoading(true);
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message ?? "Error al crear cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Register</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <label>
          Nombre
          <input name="name" value={form.name} onChange={onChange} />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />
        </label>

        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={onChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}