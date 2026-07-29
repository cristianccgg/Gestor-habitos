import { Trash2, Check, SquarePen } from "lucide-react";
import { useState } from "react";

const Habito = ({
  habito,
  fechaHoy,
  onCompletar,
  onEliminar,
  calcularRacha,
  onEditar,
}) => {
  const completadoHoy = habito.fechasCompletado.includes(fechaHoy);
  const rachaActual = calcularRacha(habito.fechasCompletado);
  const [abrirEditor, setAbrirEditor] = useState(false);
  const [tituloEditar, setTituloEditar] = useState("");
  const [descripcionEditar, setDescripcionEditar] = useState("");
  const [abrirConfirmacion, setAbrirConfirmacion] = useState(false);

  return (
    <div
      className={`flex justify-between items-center border rounded-xl p-4 shadow-lg transition-colors ${
        completadoHoy
          ? "bg-slate-800/50 border-slate-800"
          : "bg-slate-800 border-slate-700"
      }`}
    >
      <div className="flex flex-col gap-1">
        {!abrirEditor && (
          <div>
            <h2
              className={`font-semibold ${
                completadoHoy ? "text-slate-500 line-through" : "text-slate-100"
              }`}
            >
              {habito.titulo}
            </h2>
            <p className="text-sm text-slate-400">{habito.descripcion}</p>
          </div>
        )}

        {abrirEditor && (
          <div className="flex flex-col gap-2 min-w-55">
            <input
              value={tituloEditar}
              onChange={(e) => setTituloEditar(e.target.value)}
              type="text"
              className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              value={descripcionEditar}
              onChange={(e) => setDescripcionEditar(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
            <div className="flex gap-2 self-end">
              <button
                onClick={() => setAbrirEditor(false)}
                type="button"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onEditar(habito.id, tituloEditar, descripcionEditar);
                  setAbrirEditor(false);
                }}
                type="button"
                className="bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-md px-3 py-1.5 text-sm font-medium text-white"
              >
                Actualizar
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-slate-500">
            {habito.fechasCompletado.length} días totales
          </p>
          {rachaActual > 0 && (
            <p className="text-xs font-medium text-orange-400 animate-pulse">
              🔥 {rachaActual} {rachaActual === 1 ? "día" : "días"} de racha
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onCompletar(habito.id)}
          type="button"
          aria-pressed={completadoHoy}
          title={
            completadoHoy ? "Marcar como pendiente" : "Marcar como completado"
          }
          className={`p-2 rounded-full border transition-colors ${
            completadoHoy
              ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-400"
              : "bg-transparent border-slate-600 text-slate-500 hover:border-emerald-400 hover:text-emerald-400"
          }`}
        >
          <Check size={18} />
        </button>
        <button
          onClick={() => {
            setAbrirEditor(true);
            setDescripcionEditar(habito.descripcion);
            setTituloEditar(habito.titulo);
          }}
          type="button"
          className="p-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
        >
          <SquarePen size={18} />
        </button>
        <button
          onClick={() => setAbrirConfirmacion(true)}
          type="button"
          className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
      {abrirConfirmacion && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold text-slate-100">
              Eliminar hábito
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setAbrirConfirmacion(false)}
                type="button"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  onEliminar(habito.id);
                  setAbrirConfirmacion(false);
                }}
                type="button"
                className="bg-red-600 hover:bg-red-500 transition-colors rounded-md px-3 py-1.5 text-sm font-medium text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habito;
