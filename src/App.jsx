import { useEffect, useState } from "react";
import "./App.css";
import { Trash2, Check } from "lucide-react";
import Habito from "./components/Habito";

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
        fechasCompletado: [],
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

  const fechaHoy = new Date().toISOString().split("T")[0];

  const marcarCompletado = (id) => {
    setHabitos((prevHabitos) =>
      prevHabitos.map((habito) =>
        habito.id === id
          ? {
              ...habito,
              fechasCompletado: habito.fechasCompletado.includes(fechaHoy)
                ? habito.fechasCompletado.filter((fecha) => fecha !== fechaHoy)
                : [...habito.fechasCompletado, fechaHoy],
            }
          : habito,
      ),
    );
  };

  const editarHabito = (idHabito, tituloNuevo, descripcionNueva) => {
    setHabitos((prevHabitos) =>
      prevHabitos.map((habito) =>
        habito.id === idHabito
          ? { ...habito, titulo: tituloNuevo, descripcion: descripcionNueva }
          : habito,
      ),
    );
  };

  const calcularRacha = (fechasCompletado) => {
    let racha = 0;
    let fechaEvaluar = new Date();
    let fechaString = fechaEvaluar.toISOString().split("T")[0];

    if (!fechasCompletado.includes(fechaString)) {
      fechaEvaluar.setDate(fechaEvaluar.getDate() - 1);
      fechaString = fechaEvaluar.toISOString().split("T")[0];
    }

    while (fechasCompletado.includes(fechaString)) {
      racha++;
      fechaEvaluar.setDate(fechaEvaluar.getDate() - 1);
      fechaString = fechaEvaluar.toISOString().split("T")[0];
    }
    return racha;
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
            Agregar hábito
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
        Mis hábitos
      </h1>
      <div className="flex flex-col gap-3">
        {habitos.map((habito) => (
          <Habito
            key={habito.id}
            habito={habito}
            fechaHoy={fechaHoy}
            onCompletar={marcarCompletado}
            onEliminar={eliminarHabito}
            onEditar={editarHabito}
            calcularRacha={calcularRacha}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
