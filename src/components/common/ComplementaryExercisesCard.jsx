import { useUIStore } from "../../store/uiStore";

export default function ComplementaryExercisesCard() {
  const theme = useUIStore((state) => state.theme);
  const isDark = theme === "dark";

  const exercises = [
    {
      number: 1,
      icon: "🌗",
      title: "Modo oscuro en el navbar",
      description:
        "Refina la experiencia visual con un switch elegante para alternar entre tema claro y oscuro.",
      badgeClass: isDark ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-white",
      lineClass: "from-slate-700 to-slate-500",
    },
    {
      number: 2,
      icon: "🔎",
      title: "Busqueda de tareas",
      description:
        "Filtra por titulo o descripcion en tiempo real para encontrar pendientes sin perder foco.",
      badgeClass: "bg-blue-600 text-white",
      lineClass: "from-blue-500 to-indigo-500",
    },
    {
      number: 3,
      icon: "📊",
      title: "Estadisticas del dashboard",
      description:
        "Muestra resumenes de total, completadas, pendientes, vencidas y porcentaje de avance.",
      badgeClass: "bg-emerald-500 text-white",
      lineClass: "from-emerald-400 to-teal-500",
    },
    {
      number: 4,
      icon: "🔔",
      title: "Notificaciones toast",
      description:
        "Agrega mensajes breves y claros cuando se creen, editen o eliminen tareas.",
      badgeClass: "bg-fuchsia-500 text-white",
      lineClass: "from-fuchsia-500 to-pink-500",
    },
  ];

  const hints = [
    "Anade el input de busqueda en TaskFilters.jsx.",
    "Crea el estado searchQuery dentro de taskStore.",
    "Extiende el filtrado en Dashboard.jsx para incluir titulo y descripcion.",
    "Si luego quieres notificaciones, puedes conectarlas a uiStore o usar react-hot-toast.",
  ];

  return (
    <section
      className={`mt-10 ${
        isDark ? "text-slate-100" : "text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div
          className={`overflow-hidden rounded-[2rem] shadow-lg ring-1 ${
            isDark
              ? "bg-slate-900/85 ring-slate-800"
              : "bg-white ring-slate-200/70"
          }`}
        >
          <div
            className={`px-6 py-8 sm:px-8 ${
              isDark
                ? "bg-gradient-to-r from-indigo-500/15 via-sky-500/10 to-cyan-500/10"
                : "bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-cyan-500/10"
            }`}
          >
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] ${
                isDark
                  ? "bg-indigo-500/15 text-indigo-200"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              VI. EJERCICIOS COMPLEMENTARIOS
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Mejora final del proyecto
            </h2>
            <p
              className={`mt-3 max-w-2xl text-sm sm:text-base ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Esta seccion resume ideas para llevar la app a una estetica mas pulida,
              util y cercana a un dashboard SaaS moderno.
            </p>
          </div>

          <div className="space-y-6 px-6 py-8 sm:px-8">
            <div className="grid gap-4">
              {exercises.map((item) => (
                <article
                  key={item.number}
                  className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                    isDark
                      ? "border-slate-800 bg-slate-900/60"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${item.badgeClass}`}
                    >
                      {item.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <h3 className="text-base font-semibold tracking-wide sm:text-lg">
                          {item.title}
                        </h3>
                      </div>

                      <p
                        className={`mt-2 text-sm leading-6 ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {item.description}
                      </p>

                      <div
                        className={`mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r ${item.lineClass} transition-all duration-300 group-hover:w-36`}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div
              className={`rounded-2xl p-6 ${
                isDark ? "bg-indigo-500/10" : "bg-indigo-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">💡</span>
                <h3
                  className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                    isDark ? "text-indigo-200" : "text-indigo-700"
                  }`}
                >
                  Pistas
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                {hints.map((hint, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 rounded-xl p-4 transition-all duration-300 ${
                      isDark
                        ? "bg-slate-900/60 hover:bg-slate-900/80"
                        : "bg-white/80 hover:bg-white"
                    }`}
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p
                      className={`text-sm leading-6 ${
                        isDark ? "text-slate-200" : "text-slate-700"
                      }`}
                    >
                      {hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
