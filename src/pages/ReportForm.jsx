import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";

// ── Estilos base reutilizables ────────────────────────────────────────────────
const inputBase = {
  width:        "100%",
  padding:      "12px 14px",
  borderRadius: "999px",
  border:       "1.5px solid #C8D8E8",
  background:   "white",
  fontSize:     "0.85rem",
  color:        "#0D2B45",
  outline:      "none",
  boxSizing:    "border-box",
};

const textareaBase = {
  ...inputBase,
  borderRadius: "1rem",
  resize:       "none",
  minHeight:    "100px",
};

const sectionLabel = {
  fontWeight:    900,
  fontSize:      "0.8rem",
  color:         "#0D2B45",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom:  "8px",
  display:       "block",
};

// ── Pantalla ──────────────────────────────────────────────────────────────────
export default function ReportForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    location:    "",
    animalName:  "",
    datetime:    "",
    reporterName:"",
    reporterAddr:"",
    description: "",
  });
  const [files,   setFiles]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors,  setErrors]  = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.location)    e.location    = "Requerido";
    if (!form.animalName)  e.animalName  = "Requerido";
    if (!form.datetime)    e.datetime    = "Requerido";
    if (!form.description) e.description = "Requerido";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      // TODO: guardar en Supabase tabla "reportes_maltrato" + subir archivos a Storage
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess(true);
    } catch {
      setErrors({ general: "Error al enviar. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  // ── Pantalla de éxito ──────────────────────────────────────────────────────
  if (success) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-8 text-center font-['Nunito',sans-serif] max-w-sm mx-auto"
        style={{ background: "#EBF4FF" }}
      >
        <div className="text-6xl mb-4">✅</div>
        <h2 className="font-black text-xl mb-2" style={{ color: "#0D2B45" }}>
          ¡Reporte enviado!
        </h2>
        <p className="text-sm mb-6" style={{ color: "#6B8FA8", lineHeight: 1.6 }}>
          Tu denuncia fue registrada de forma confidencial. Las autoridades serán notificadas a la brevedad.
        </p>
        <div
          className="w-full rounded-2xl p-4 mb-8 text-left"
          style={{ background: "#EEFAF4", border: "1.5px solid #B8E4CB" }}
        >
          <p className="font-black text-sm mb-1" style={{ color: "#1E8A4A" }}>¿Qué sigue?</p>
          <p className="text-xs" style={{ color: "#27AE60", lineHeight: 1.5 }}>
            Nuestro equipo revisará tu reporte y lo derivará a las comisarías correspondientes dentro de las próximas 24 horas.
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-4 rounded-2xl font-black text-sm text-white active:scale-[0.98] transition-transform"
          style={{ background: "#4A9FD4" }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // ── Formulario ─────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#EBF4FF" }}
    >
      <TopNavbar backRoute="/report" />

      <main className="flex-1 px-5 pt-5 pb-8 overflow-y-auto flex flex-col gap-5">

        {/* Título */}
        <h1
          className="font-black text-center leading-tight"
          style={{ fontSize: "1.2rem", color: "#0D2B45", textTransform: "uppercase" }}
        >
          Reporte de Maltrato -{"\n"}Formulario Completo
        </h1>

        {/* ── Sección 1 ── */}
        <div>
          <span style={sectionLabel}>Ubicación y Detalles del Hecho</span>

          {/* Ubicación — textarea redondeado */}
          <textarea
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Ubicación y Dirección (Describe donde ocurrió)"
            style={{ ...textareaBase, minHeight: "80px", marginBottom: "10px",
              borderColor: errors.location ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.location && <p className="text-xs text-red-500 -mt-2 mb-2 px-2">{errors.location}</p>}

          <input
            name="animalName"
            value={form.animalName}
            onChange={handleChange}
            placeholder="Nombre del Animal / Tipo"
            style={{ ...inputBase, marginBottom: "10px",
              borderColor: errors.animalName ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.animalName && <p className="text-xs text-red-500 -mt-2 mb-2 px-2">{errors.animalName}</p>}

          <input
            name="datetime"
            value={form.datetime}
            onChange={handleChange}
            placeholder="Fecha / Hora / Situación del animal"
            style={{ ...inputBase, borderColor: errors.datetime ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.datetime && <p className="text-xs text-red-500 mt-1 px-2">{errors.datetime}</p>}
        </div>

        {/* ── Sección 2 ── */}
        <div>
          <span style={sectionLabel}>Datos Clave (Opcional):</span>
          <p className="text-xs mb-3" style={{ color: "#6B8FA8", marginTop: "-4px" }}>
            Nombre del reportante{"\n"}Dirección del reportante
          </p>

          <input
            name="reporterName"
            value={form.reporterName}
            onChange={handleChange}
            placeholder="Nombre del reportante (opcional)"
            style={{ ...inputBase, marginBottom: "10px" }}
          />

          <input
            name="reporterAddr"
            value={form.reporterAddr}
            onChange={handleChange}
            placeholder="Dirección del reportante (opcional)"
            style={inputBase}
          />
        </div>

        {/* ── Sección 3 ── */}
        <div>
          <span style={sectionLabel}>
            Descripción Detallada de los{"\n"}Hechos y Observaciones
          </span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe con detalle lo que observaste..."
            style={{ ...textareaBase, minHeight: "120px",
              borderColor: errors.description ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.description && <p className="text-xs text-red-500 mt-1 px-2">{errors.description}</p>}
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="rounded-xl px-4 py-3 text-xs font-semibold text-red-600"
            style={{ background: "#FEF0EE", border: "1px solid #F0C5C0" }}>
            ⚠️ {errors.general}
          </div>
        )}

        {/* ── Botón subir fotos ── */}
        <label>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 5))}
          />
          <div
            className="w-full py-4 rounded-2xl font-black text-sm text-center cursor-pointer active:scale-[0.98] transition-transform"
            style={{
              background:    "transparent",
              border:        "2px solid #C8960A",
              color:         "#8B6500",
              letterSpacing: "0.04em",
            }}
          >
            SUBIR FOTOS O VIDEOS (EVIDENCIA)
          </div>
        </label>

        {/* Archivos seleccionados */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 -mt-2">
            {files.map((f, i) => (
              <span
                key={i}
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "#FDF3DC", color: "#8B6500", border: "1px solid #C8960A" }}
              >
                📎 {f.name.length > 16 ? f.name.slice(0, 16) + "…" : f.name}
              </span>
            ))}
          </div>
        )}

        {/* ── Botón enviar ── */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-sm active:scale-[0.98] transition-transform disabled:opacity-60"
          style={{
            background:    "#C8960A",
            color:         "white",
            letterSpacing: "0.04em",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z"/>
              </svg>
              Enviando...
            </span>
          ) : "ENVIAR REPORTE OFICIAL"}
        </button>

      </main>
    </div>
  );
}