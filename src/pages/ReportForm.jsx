import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useAuth from "../hooks/useAuth";
import TopNavbar from "../components/TopNavbar";

// ── Estilos base ──────────────────────────────────────────────────────────────
const inputCls = {
  width:        "100%",
  padding:      "12px 14px",
  borderRadius: "12px",
  border:       "1.5px solid #C8D8E8",
  background:   "white",
  fontSize:     "0.85rem",
  color:        "#0D2B45",
  outline:      "none",
  boxSizing:    "border-box",
};

const textareaCls = {
  ...inputCls,
  resize:    "none",
  minHeight: "110px",
};

const sectionLabelCls = {
  fontWeight:    900,
  fontSize:      "0.8rem",
  color:         "#0D2B45",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom:  "8px",
  display:       "block",
};

// ── Subir un archivo al bucket privado "maltrato" ─────────────────────────────
async function uploadEvidencia(file, userId) {
  const ext      = file.name.split(".").pop();
  const filename = `${userId ?? "anon"}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("maltrato")
    .upload(filename, file, { upsert: false });

  if (error) throw error;
  return filename; // ruta dentro del bucket (privado, solo admins la ven)
}

// ── Componente ────────────────────────────────────────────────────────────────
export default function ReportForm() {
  const navigate    = useNavigate();
  const { session } = useAuth();

  const [form, setForm] = useState({
    location:     "",
    animalName:   "",
    datetime:     "",
    reporterName: "",
    reporterAddr: "",
    description:  "",
  });

  const [files,    setFiles]    = useState([]);   // File[]
  const [previews, setPreviews] = useState([]);   // ObjectURL[]
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files).slice(0, 5);
    // revocar URLs anteriores para evitar memory leaks
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const removeFile = (i) => {
    URL.revokeObjectURL(previews[i]);
    setFiles((prev)    => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const validate = () => {
    const e = {};
    if (!form.location.trim())    e.location    = "Requerido";
    if (!form.animalName.trim())  e.animalName  = "Requerido";
    if (!form.datetime.trim())    e.datetime    = "Requerido";
    if (!form.description.trim()) e.description = "Requerido";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);

    try {
      // 1. Subir cada archivo y recopilar rutas
      const evidencias = [];
      for (const file of files) {
        const path = await uploadEvidencia(file, session?.user?.id);
        evidencias.push(path);
      }

      // 2. Insertar reporte con el array de rutas
      const { error: insertError } = await supabase
        .from("reportes_maltrato")
        .insert({
          ubicacion:         form.location.trim(),
          nombre_animal:     form.animalName.trim(),
          fecha_hora:        form.datetime.trim(),
          nombre_reportante: form.reporterName.trim() || null,
          dir_reportante:    form.reporterAddr.trim()  || null,
          descripcion:       form.description.trim(),
          estado:            "pendiente",
          reportado_por:     session?.user?.id ?? null,
          evidencias,          // ← array text[] en Supabase
        });

      if (insertError) throw insertError;

      setSuccess(true);
    } catch (err) {
      setErrors({ general: `Error al enviar: ${err.message}` });
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
            Nuestro equipo revisará tu reporte y lo derivará a las comisarías
            correspondientes dentro de las próximas 24 horas.
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
        <div className="flex flex-col gap-2">
          <span style={sectionLabelCls}>Ubicación y Detalles del Hecho</span>

          <textarea
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Ubicación y Dirección (Describe donde ocurrió)"
            style={{ ...textareaCls, minHeight: "80px", borderColor: errors.location ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.location && <p className="text-xs text-red-500 -mt-1 px-1">{errors.location}</p>}

          <input
            name="animalName"
            value={form.animalName}
            onChange={handleChange}
            placeholder="Nombre del Animal / Tipo"
            style={{ ...inputCls, borderColor: errors.animalName ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.animalName && <p className="text-xs text-red-500 -mt-1 px-1">{errors.animalName}</p>}

          <input
            name="datetime"
            value={form.datetime}
            onChange={handleChange}
            placeholder="Fecha / Hora / Situación del animal"
            style={{ ...inputCls, borderColor: errors.datetime ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.datetime && <p className="text-xs text-red-500 -mt-1 px-1">{errors.datetime}</p>}
        </div>

        {/* ── Sección 2 ── */}
        <div className="flex flex-col gap-2">
          <span style={sectionLabelCls}>Datos Clave (Opcional):</span>
          <p className="text-xs -mt-2" style={{ color: "#6B8FA8" }}>
            Nombre del reportante · Dirección del reportante
          </p>
          <input
            name="reporterName"
            value={form.reporterName}
            onChange={handleChange}
            placeholder="Nombre del reportante (opcional)"
            style={inputCls}
          />
          <input
            name="reporterAddr"
            value={form.reporterAddr}
            onChange={handleChange}
            placeholder="Dirección del reportante (opcional)"
            style={inputCls}
          />
        </div>

        {/* ── Sección 3 ── */}
        <div className="flex flex-col gap-2">
          <span style={sectionLabelCls}>
            Descripción Detallada de los Hechos y Observaciones
          </span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe con detalle lo que observaste..."
            style={{ ...textareaCls, minHeight: "120px", borderColor: errors.description ? "#E74C3C" : "#C8D8E8" }}
          />
          {errors.description && <p className="text-xs text-red-500 -mt-1 px-1">{errors.description}</p>}
        </div>

        {/* ── Botón subir fotos ── */}
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFiles}
          />
          <div
            className="w-full py-4 rounded-2xl font-black text-sm text-center active:scale-[0.98] transition-transform"
            style={{
              background:    "#FDF3DC",
              border:        "2px solid #C8960A",
              color:         "#8B6500",
              letterSpacing: "0.04em",
            }}
          >
            SUBIR FOTOS O VIDEOS (EVIDENCIA)
            {files.length > 0 && (
              <span className="ml-2 font-bold text-xs">
                ({files.length} archivo{files.length > 1 ? "s" : ""})
              </span>
            )}
          </div>
        </label>

        {/* ── Previsualización ── */}
        {previews.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wider" style={{ color: "#7A9BB5" }}>
              Evidencias seleccionadas
            </p>
            <div className="flex flex-wrap gap-2">
              {previews.map((src, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden"
                  style={{ width: "80px", height: "80px", border: "1.5px solid #C8D8E8" }}
                >
                  <img
                    src={src}
                    alt={`evidencia-${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Botón quitar */}
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center font-black text-xs text-white leading-none"
                    style={{ background: "#E74C3C" }}
                  >
                    ×
                  </button>
                  {/* Número */}
                  <div
                    className="absolute bottom-1 left-1 w-4 h-4 rounded-full flex items-center justify-center font-black text-[9px] text-white"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error general */}
        {errors.general && (
          <div
            className="rounded-xl px-4 py-3 text-xs font-semibold text-red-600"
            style={{ background: "#FEF0EE", border: "1px solid #F0C5C0" }}
          >
            ⚠️ {errors.general}
          </div>
        )}

        {/* ── Botón enviar ── */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-sm active:scale-[0.98] transition-transform disabled:opacity-60"
          style={{ background: "#C8960A", color: "white", letterSpacing: "0.04em" }}
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