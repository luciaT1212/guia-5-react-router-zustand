import useTaskStore from "../../store/taskStore";
import { FILTERS, CATEGORIES } from "../../utils/constants";

export default function TaskFilters() {
  const currentFilter = useTaskStore((state) => state.currentFilter);
  const currentCategory = useTaskStore((state) => state.currentCategory);
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setCategory = useTaskStore((state) => state.setCategory);
  const setSearchQuery = useTaskStore((state) => state.setSearchQuery);

  return (
    <section className="card mb-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="surface-chip bg-[var(--primary-soft)] text-[var(--primary-strong)] mb-3">
            Filtros inteligentes
          </div>
          <h2 className="section-title text-2xl font-bold">Encuentra lo que importa</h2>
          <p className="subtle-text mt-2">
            Filtra por texto, estado o categoría. Cambia en tiempo real ✨
          </p>
        </div>

        <div className="surface-chip bg-white/70 border border-[var(--border)] text-[var(--muted)]">
          Vista en tiempo real
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Search */}
        <div className="lg:col-span-7">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Buscar tarea
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔎
            </span>
            <input
              className="input-field pl-11"
              placeholder="Buscar por título o descripción"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          {searchQuery.trim() && (
            <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
              <span className="surface-chip bg-slate-100 text-slate-700">
                Buscando: <b className="ml-1">{searchQuery.trim()}</b>
              </span>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSearchQuery("")}
              >
                Limpiar
              </button>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="lg:col-span-5">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Categoría
          </label>
          <select
            value={currentCategory}
            onChange={(event) => setCategory(event.target.value)}
            className="input-field"
          >
            <option value="all">Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>

          <p className="subtle-text mt-2 text-sm">
            Tip: si no ves una tarea, revisa el filtro y la categoría 👀
          </p>
        </div>

        {/* Status buttons */}
        <div className="lg:col-span-12">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Estado
          </label>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const active = currentFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  onClick={() => setFilter(filter.id)}
                  type="button"
                  className={[
                    "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 font-semibold transition-all duration-200",
                    active
                      ? "text-white shadow-[var(--shadow-strong)]"
                      : "text-[var(--text)] border border-[var(--border)] bg-white/60 hover:bg-white/80",
                  ].join(" ")}
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg, var(--primary) 0%, var(--primary-strong) 100%)",
                        }
                      : undefined
                  }
                >
                  <span className="text-base">
                    {filter.id === "all"
                      ? "✨"
                      : filter.id === "pending"
                      ? "⏳"
                      : "✅"}
                  </span>
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}