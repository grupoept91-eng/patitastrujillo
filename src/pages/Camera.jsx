import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { supabase } from "../lib/supabase";
import useAuth from "../hooks/useAuth";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <rect x="2" y="7" width="20" height="14" rx="2.5" />
    <circle cx="12" cy="14" r="3.5" />
    <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7" />
  </svg>
);

const IconGallery = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const IconReport = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <path d="M17 21v-8H7v8M7 3v5h8" />
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ── Modal reporte rápido ──────────────────────────────────────────────────────
function QuickReportModal({ photoUrl, onClose, onSend }) {
  const [form,    setForm]    = useState({ ubicacion: "", telefono: "", situacion: "" });
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.ubicacion.trim()) e.ubicacion = "Requerido";
    if (!form.telefono.trim())  e.telefono  = "Requerido";
    if (!form.situacion.trim()) e.situacion = "Requerido";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await onSend({ ...form, photoUrl });
    setLoading(false);
  };

  const inputCls = "w-full px-4 py-3 rounded-2xl border-2 border-[#D8E8F0] bg-[#F5FAFF] text-[#0D2B45] text-sm placeholder:text-[#A0BCD0] focus:outline-none focus:border-[#C8960A] transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-t-3xl shadow-2xl flex flex-col"
        style={{ maxHeight: "88vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mt-4 shrink-0" />

        <div className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
          <div>
            <p className="font-black text-lg text-[#0D2B45]">Reporte Rápido</p>
            <p className="text-xs text-[#9ABCCE]">Con la foto tomada</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9ABCCE]"
            style={{ background: "#F0F7FC" }}
          >
            <IconX />
          </button>
        </div>

        <div className="h-px mx-5 shrink-0" style={{ background: "#EBF4FF" }} />

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {/* Preview foto */}
          <div className="w-full h-40 rounded-2xl overflow-hidden" style={{ border: "1.5px solid #D8E8F0" }}>
            <img src={photoUrl} alt="evidencia" className="w-full h-full object-cover" />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-xs font-black text-[#7A9BB5] uppercase tracking-wider mb-1.5">Dirección / Ubicación *</label>
            <input
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              placeholder="Ej: Jr. Los Pinos 123, El Porvenir"
              className={inputCls}
              style={{ borderColor: errors.ubicacion ? "#E74C3C" : undefined }}
            />
            {errors.ubicacion && <p className="text-red-500 text-xs mt-1">{errors.ubicacion}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs font-black text-[#7A9BB5] uppercase tracking-wider mb-1.5">Tu teléfono / WhatsApp *</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="+51 999 999 999"
              className={inputCls}
              style={{ borderColor: errors.telefono ? "#E74C3C" : undefined }}
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>

          {/* Situación */}
          <div>
            <label className="block text-xs font-black text-[#7A9BB5] uppercase tracking-wider mb-1.5">Situación del animal *</label>
            <textarea
              name="situacion"
              value={form.situacion}
              onChange={handleChange}
              placeholder="Describe brevemente lo que observas..."
              rows={3}
              className={inputCls}
              style={{ borderRadius: "1rem", resize: "none", borderColor: errors.situacion ? "#E74C3C" : undefined }}
            />
            {errors.situacion && <p className="text-red-500 text-xs mt-1">{errors.situacion}</p>}
          </div>
        </div>

        <div className="px-5 py-4 shrink-0" style={{ borderTop: "1px solid #EBF4FF" }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-sm text-white active:scale-[0.98] transition-all disabled:opacity-60"
            style={{ background: "#C8960A" }}
          >
            {loading ? "Enviando..." : "Enviar Reporte Rápido 🐾"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Pantalla principal ────────────────────────────────────────────────────────
export default function CameraPage() {
  const { session }   = useAuth();
  const [photo,         setPhoto]         = useState(null);
  const [savedMsg,      setSavedMsg]      = useState(false);
  const [showReport,    setShowReport]    = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality:      90,
        allowEditing: false,
        resultType:   CameraResultType.DataUrl,
        source:       CameraSource.Camera,
      });
      setPhoto(image.dataUrl);
      setSavedMsg(false);
      setReportSuccess(false);
    } catch (err) {
      console.log("Cámara cancelada:", err);
    }
  };

  const pickFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality:      90,
        allowEditing: false,
        resultType:   CameraResultType.DataUrl,
        source:       CameraSource.Photos,
      });
      setPhoto(image.dataUrl);
      setSavedMsg(false);
      setReportSuccess(false);
    } catch (err) {
      console.log("Galería cancelada:", err);
    }
  };

  const savePhoto = async () => {
    if (!photo) return;
    try {
      const fileName = `patitas_${Date.now()}.jpeg`;
      await Filesystem.writeFile({
        path:      fileName,
        data:      photo,
        directory: Directory.Documents,
      });
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const handleSendReport = async ({ ubicacion, telefono, situacion }) => {
    try {
      await supabase.from("reportes_maltrato").insert({
        ubicacion,
        descripcion:   `${situacion} | Tel: ${telefono}`,
        nombre_animal: "Sin identificar",
        fecha_hora:    new Date().toLocaleString("es-PE"),
        estado:        "pendiente",
        reportado_por: session?.user?.id ?? null,
      });
      setShowReport(false);
      setReportSuccess(true);
    } catch (err) {
      console.error("Error reporte:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#0D2B45" }}
    >
      <TopNavbar backRoute="/dashboard" />

      <main className="flex-1 flex flex-col items-center justify-between px-4 py-6 gap-4">

        <h1 className="text-white font-black text-lg uppercase tracking-wide self-start">
          Cámara de Evidencias
        </h1>

        {/* Vista previa */}
        <div
          className="w-full flex-1 rounded-3xl overflow-hidden flex items-center justify-center relative"
          style={{
            background: photo ? "transparent" : "#1A3A55",
            border:     "2px solid #2A5070",
            minHeight:  "300px",
            maxHeight:  "420px",
          }}
        >
          {photo ? (
            <img src={photo} alt="foto tomada" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center px-8">
              <span className="text-white/30"><IconCamera /></span>
              <p className="text-white/50 text-sm font-semibold">
                Toca el botón para abrir la cámara
              </p>
            </div>
          )}

          {savedMsg && (
            <div
              className="absolute top-3 left-3 right-3 py-2 px-4 rounded-2xl text-center font-black text-sm text-white"
              style={{ background: "#27AE60" }}
            >
              ✅ Foto guardada en tu dispositivo
            </div>
          )}

          {reportSuccess && (
            <div
              className="absolute top-3 left-3 right-3 py-2 px-4 rounded-2xl text-center font-black text-sm text-white"
              style={{ background: "#C8960A" }}
            >
              🐾 ¡Reporte enviado correctamente!
            </div>
          )}
        </div>

        {/* Acciones cuando hay foto */}
        {photo && (
          <div className="w-full flex gap-3">
            <button
              onClick={savePhoto}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm active:scale-95 transition-transform"
              style={{ background: "#1A3A55", border: "1.5px solid #2A5070", color: "white" }}
            >
              <IconSave />
              Guardar
            </button>
            <button
              onClick={() => setShowReport(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm active:scale-95 transition-transform"
              style={{ background: "#C8960A", color: "white" }}
            >
              <IconReport />
              Reportar
            </button>
          </div>
        )}

        {/* Controles cámara */}
        <div className="w-full flex items-center gap-4">
          <button
            onClick={pickFromGallery}
            className="w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: "#1A3A55", border: "1.5px solid #2A5070", color: "white" }}
          >
            <IconGallery />
          </button>

          <button
            onClick={takePhoto}
            className="flex-1 h-16 rounded-3xl flex items-center justify-center gap-3 font-black text-base active:scale-95 transition-transform"
            style={{ background: "#4A9FD4", color: "white" }}
          >
            <IconCamera />
            Tomar foto
          </button>

          {photo && (
            <button
              onClick={() => { setPhoto(null); setReportSuccess(false); }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: "#E74C3C22", border: "1.5px solid #E74C3C55", color: "#E74C3C" }}
            >
              <IconX />
            </button>
          )}
        </div>

      </main>

      <BottomNavbar />

      {showReport && (
        <QuickReportModal
          photoUrl={photo}
          onClose={() => setShowReport(false)}
          onSend={handleSendReport}
        />
      )}
    </div>
  );
}