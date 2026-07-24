import { useEffect, useState } from "react";
import "./App.css";
import { Trash2, Check } from "lucide-react";

function App() {
  const [habitos, setHabitos] = useState(() => {
    const guardados = localStorage.getItem("habitos");

    if (guardados) {
      return JSON.parse(guardados);
    } else {
      return [];
    }
  });
  const [formularioHabito, setFormularioHabito] = useState({
    titulo: "",
    descripcion: "",
  });

  useEffect(() => {
    localStorage.setItem("habitos", JSON.stringify(habitos));
  }, [habitos]);

  const crearHabito = (datosFormulario) => {
    if (datosFormulario.titulo.trim() !== "") {
      const habitoNuevo = {
        id: crypto.randomUUID(),
        titulo: datosFormulario.titulo.trim(),
        descripcion: datosFormulario.descripcion.trim(),
        completadoHoy: false,
      };
      setHabitos((prevHabitos) => [...prevHabitos, habitoNuevo]);
      setFormularioHabito({
        titulo: "",
        descripcion: "",
      });
    }
  };

  const eliminarHabito = (id) => {
    setHabitos((prevHabitos) =>
      prevHabitos.filter((habito) => habito.id !== id),
    );
  };

  const marcarCompletado = (id) => {
    setHabitos((prevHabitos) =>
      prevHabitos.map((habito) =>
        habito.id === id
          ? { ...habito, completadoHoy: !habito.completadoHoy }
          : habito,
      ),
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-slate-100">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crearHabito(formularioHabito);
          }}
          className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-3 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-slate-100">
            Agregar habito
          </h2>
          <input
            value={formularioHabito.titulo}
            onChange={(e) =>
              setFormularioHabito((prev) => ({
                ...prev,
                titulo: e.target.value,
              }))
            }
            type="text"
            placeholder="Título"
            className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            value={formularioHabito.descripcion}
            onChange={(e) =>
              setFormularioHabito((prev) => ({
                ...prev,
                descripcion: e.target.value,
              }))
            }
            placeholder="Descripción"
            className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
          <button
            disabled={formularioHabito.titulo.trim() === ""}
            type="submit"
            className="self-end bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
          >
            Agregar
          </button>
        </form>
      </div>
      <h1 className="text-2xl font-bold mt-10 mb-4 text-slate-100">
        Mis habitos
      </h1>
      <div className="flex flex-col gap-3">
        {habitos.map((habito) => (
          <div
            key={habito.id}
            className={`flex justify-between items-center border rounded-xl p-4 shadow-lg transition-colors ${
              habito.completadoHoy
                ? "bg-slate-800/50 border-slate-800"
                : "bg-slate-800 border-slate-700"
            }`}
          >
            <div className="flex flex-col gap-1">
              <h2
                className={`font-semibold ${
                  habito.completadoHoy
                    ? "text-slate-500 line-through"
                    : "text-slate-100"
                }`}
              >
                {habito.titulo}
              </h2>
              <p className="text-sm text-slate-400">{habito.descripcion}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => marcarCompletado(habito.id)}
                type="button"
                aria-pressed={habito.completadoHoy}
                title={
                  habito.completadoHoy
                    ? "Marcar como pendiente"
                    : "Marcar como completado"
                }
                className={`p-2 rounded-full border transition-colors ${
                  habito.completadoHoy
                    ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-400"
                    : "bg-transparent border-slate-600 text-slate-500 hover:border-emerald-400 hover:text-emerald-400"
                }`}
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => eliminarHabito(habito.id)}
                type="button"
                className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
