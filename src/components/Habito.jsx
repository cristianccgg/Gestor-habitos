import { Trash2, Check } from "lucide-react";

const Habito = ({
  habito,
  fechaHoy,
  onCompletar,
  onEliminar,
  calcularRacha,
}) => {
  const completadoHoy = habito.fechasCompletado.includes(fechaHoy);
  const rachaActual = calcularRacha(habito.fechasCompletado);
  return (
    <div
      className={`flex justify-between items-center border rounded-xl p-4 shadow-lg transition-colors ${
        completadoHoy
          ? "bg-slate-800/50 border-slate-800"
          : "bg-slate-800 border-slate-700"
      }`}
    >
      <div className="flex flex-col gap-1">
        <h2
          className={`font-semibold ${
            completadoHoy ? "text-slate-500 line-through" : "text-slate-100"
          }`}
        >
          {habito.titulo}
        </h2>
        <p className="text-sm text-slate-400">{habito.descripcion}</p>
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
          onClick={() => onEliminar(habito.id)}
          type="button"
          className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default Habito;
