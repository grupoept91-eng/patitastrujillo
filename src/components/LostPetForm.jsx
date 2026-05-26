import { useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadLostPetImage } from "../hooks/useMascotasPerdidas";
import useAuth from "../hooks/useAuth";

// ── Íconos ────────────────────────────────────────────────────────────────────
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="7" width="20" height="14" rx="2.5" />
    <circle cx="12" cy="14" r="3.5" />
    <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7" />
  </svg>
);

const TIPOS   = ["perro", "gato", "otro"];
const HOY     = new Date().toISOString().split("T")[0];

const inputCls = "w-full px-4 py-3 rounded-2xl border-2 border-[#D8E8F0] bg-[#F5FAFF] text-[#0D2B45] text-sm placeholder:text-[#A0BCD0] focus:outline-none focus:border-[#4A9FD4] transition-colors";
const labelCls = "block text-xs font-black text-[#7A9BB5] uppercase tracking-wider mb-1.5";

export default function LostPetForm({ onClose, onSuccess }) {
  const { session } = useAuth();

  const [form, setForm] = useState({
    nombre:        "",
    tipo:          "perro",
    ubicacion:     "",
    fecha_perdida: HOY,
    descripcion:   "",
    telefono:      "",
    recompensa:    "",
  });
  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [errors,       setErrors]       = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim())        e.nombre        = "Requerido";
    if (!form.ubicacion.trim())     e.ubicacion     = "Requerido";
    if (!form.fecha_perdida)        e.fecha_perdida = "Requerido";
    if (!form.descripcion.trim())   e.descripcion   = "Requerido";
    if (!form.telefono.trim())      e.telefono      = "Requerido";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);

    try {
      let foto_url = null;

      if (imageFile) {
        foto_url = await uploadLostPetImage(imageFile, session?.user?.id);
      }

      const { error: insertError } = await supabase
        .from("mascotas_perdidas")
        .insert({
          nombre:        form.nombre.trim(),
          tipo:          form.tipo,
          ubicacion:     form.ubicacion.trim(),
          fecha_perdida: form.fecha_perdida,
          descripcion:   form.descripcion.trim(),
          telefono:      form.telefono.trim(),
          recompensa:    form.recompensa.trim() || null,
          foto_url,
          estado:        "perdido",
          reportado_por: session?.user?.id ?? null,
        });

      if (insertError) throw insertError;

      onSuccess?.();
      onClose();
    } catch (err) {
      setErrors({ general: `Error al publicar: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-t-3xl shadow-2xl flex flex-col"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mt-4 shrink-0" />

        {/* Header */}
        <div className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
          <div>
            <p className="font-black text-lg text-[#0D2B45]">Reportar mascota perdida</p>
            <p className="text-xs text-[#9ABCCE]">Se publicará en el mapa comunitario</p>
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

        {/* Formulario */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

          {/* Foto */}
          <div>
            <label className={labelCls}>Foto de la mascota</label>
            <label className="cursor-pointer block">
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              <div
                className="w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 overflow-hidden transition-colors"
                style={{
                  borderColor: imagePreview ? "#C8960A" : "#C8DDE8",
                  background:  imagePreview ? "transparent" : "#FFFBF0",
                }}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-[#C8960A]"><IconCamera /></span>
                    <p className="text-xs font-bold text-[#C8960A]">Toca para subir una foto</p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Tipo */}
          <div>
            <label className={labelCls}>Tipo de mascota</label>
            <div className="flex gap-2">
              {TIPOS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, tipo: t }))}
                  className="flex-1 py-2.5 rounded-2xl text-xs font-black border-2 transition-all capitalize"
                  style={{
                    background:  form.tipo === t ? "#C8960A" : "white",
                    borderColor: form.tipo === t ? "#C8960A" : "#D8E8F0",
                    color:       form.tipo === t ? "white"   : "#7A9BB5",
                  }}
                >
                  {t === "perro" ? "🐶 Perro" : t === "gato" ? "🐱 Gato" : "🐾 Otro"}
                </button>
              ))}
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className={labelCls}>Nombre de la mascota</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Canuto"
              className={inputCls}
              style={{ borderColor: errors.nombre ? "#E74C3C" : undefined }}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          {/* Ubicación */}
          <div>
            <label className={labelCls}>Lugar donde se perdió</label>
            <input
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              placeholder="Ej: Urb. California, Trujillo"
              className={inputCls}
              style={{ borderColor: errors.ubicacion ? "#E74C3C" : undefined }}
            />
            {errors.ubicacion && <p className="text-red-500 text-xs mt-1">{errors.ubicacion}</p>}
          </div>

          {/* Fecha */}
          <div>
            <label className={labelCls}>Fecha en que se perdió</label>
            <input
              type="date"
              name="fecha_perdida"
              value={form.fecha_perdida}
              onChange={handleChange}
              max={HOY}
              className={inputCls}
              style={{ borderColor: errors.fecha_perdida ? "#E74C3C" : undefined }}
            />
            {errors.fecha_perdida && <p className="text-red-500 text-xs mt-1">{errors.fecha_perdida}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label className={labelCls}>Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Color, tamaño, señas particulares, collar, chip..."
              rows={3}
              className={inputCls}
              style={{
                borderRadius: "1rem",
                resize: "none",
                borderColor: errors.descripcion ? "#E74C3C" : undefined,
              }}
            />
            {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className={labelCls}>Teléfono / WhatsApp de contacto</label>
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

          {/* Recompensa */}
          <div>
            <label className={labelCls}>Recompensa (opcional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-[#C8960A]">S/</span>
              <input
                name="recompensa"
                value={form.recompensa}
                onChange={handleChange}
                placeholder="0"
                type="number"
                min="0"
                className={inputCls}
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </div>

          {errors.general && (
            <div
              className="rounded-xl px-4 py-3 text-xs font-semibold text-red-600"
              style={{ background: "#FEF0EE", border: "1px solid #F0C5C0" }}
            >
              ⚠️ {errors.general}
            </div>
          )}
        </div>

        {/* Botón publicar */}
        <div className="px-5 py-4 shrink-0" style={{ borderTop: "1px solid #EBF4FF" }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-sm text-white active:scale-[0.98] transition-all disabled:opacity-60"
            style={{ background: "#C8960A" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z" />
                </svg>
                Publicando...
              </span>
            ) : "Publicar reporte 🐾"}
          </button>
        </div>
      </div>
    </div>
  );
}