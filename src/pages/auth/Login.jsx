import { useForm } from "react-hook-form";
import { loginUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const user = await loginUser(data);
    setUser(user);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email requerido" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password requerido" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}