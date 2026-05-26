import { useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadPetImage } from "../hooks/useMascotas";
import useAuth from "../hooks/useAuth";

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="7" width="20" height="14" rx="2.5"/>
    <circle cx="12" cy="14" r="3.5"/>
    <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7"/>
  </svg>
);

const TIPOS  = ["perro", "gato", "otro"];
const EDADES = ["Menos de 1 año", "1 año", "2 años", "3 años", "4 años", "5+ años"];
const TRAITS = ["Juguetón/a", "Tranquilo/a", "Cariñoso/a", "Tímido/a", "Activo/a", "Leal"];

const inputCls = "w-full px-4 py-3 rounded-2xl border-2 border-[#D8E8F0] bg-[#F5FAFF] text-[#0D2B45] text-sm placeholder:text-[#A0BCD0] focus:outline-none focus:border-[#4A9FD4] transition-colors";
const labelCls = "block text-xs font-black text-[#7A9BB5] uppercase tracking-wider mb-1.5";

export default function PublishPetModal({ onClose, onSuccess }) {
  const { session } = useAuth();

  const [form, setForm] = useState({
    nombre: "", tipo: "perro", edad: "", raza: "",
    personalidad: "", contacto_nombre: "", contacto_telefono: "", contacto_email: "",
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
    if (!form.nombre.trim())            e.nombre            = "Requerido";
    if (!form.edad)                     e.edad              = "Requerido";
    if (!form.raza.trim())              e.raza              = "Requerido";
    if (!form.personalidad)             e.personalidad      = "Requerido";
    if (!form.contacto_telefono.trim()) e.contacto_telefono = "Requerido";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);

    try {
      let foto_url = null;

      // 1. Subir imagen si hay una
      if (imageFile && session?.user?.id) {
        foto_url = await uploadPetImage(imageFile, session.user.id);
      }

      // 2. Insertar en Supabase
      const { error: insertError } = await supabase
        .from("mascotas")
        .insert({
          nombre:        form.nombre.trim(),
          tipo:          form.tipo,
          edad:          form.edad,
          raza:          form.raza.trim(),
          personalidad:  form.personalidad,
          foto_url,
          estado:        "disponible",
          publicado_por: session?.user?.id ?? null,
          descripcion:   JSON.stringify({
            contacto_nombre:   form.contacto_nombre.trim(),
            contacto_telefono: form.contacto_telefono.trim(),
            contacto_email:    form.contacto_email.trim(),
          }),
        });

      if (insertError) throw insertError;

      onSuccess?.();
      onClose();
    } catch (insertError) {
      setErrors({ general: `Error al publicar: ${insertError.message}` });
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
        <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mt-4 shrink-0"/>

        {/* Header */}
        <div className="px-5 pt-3 pb-3 flex items-center justify-between shrink-0">
          <div>
            <p className="font-black text-lg text-[#0D2B45]">Publicar mascota</p>
            <p className="text-xs text-[#9ABCCE]">Para dar en adopción</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#9ABCCE]" style={{ background: "#F0F7FC" }}>
            <IconX/>
          </button>
        </div>

        <div className="h-px mx-5 shrink-0" style={{ background: "#EBF4FF" }}/>

        {/* Formulario scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

          {/* Foto */}
          <div>
            <label className={labelCls}>Foto de la mascota</label>
            <label className="cursor-pointer block">
              <input type="file" accept="image/*" onChange={handleImage} className="hidden"/>
              <div
                className="w-full h-36 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors overflow-hidden"
                style={{
                  borderColor: imagePreview ? "#4A9FD4" : "#C8DDE8",
                  background:  imagePreview ? "transparent" : "#F5FAFF",
                }}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover"/>
                ) : (
                  <>
                    <span className="text-[#A0BCD0]"><IconCamera/></span>
                    <p className="text-xs font-bold text-[#A0BCD0]">Toca para subir una foto</p>
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
                <button key={t} type="button"
                  onClick={() => setForm((p) => ({ ...p, tipo: t }))}
                  className="flex-1 py-2.5 rounded-2xl text-xs font-black border-2 transition-all capitalize"
                  style={{
                    background:  form.tipo === t ? "#4A9FD4" : "white",
                    borderColor: form.tipo === t ? "#4A9FD4" : "#D8E8F0",
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
            <label className={labelCls}>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Canuto"
              className={inputCls} style={{ borderColor: errors.nombre ? "#E74C3C" : undefined }}/>
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          {/* Edad */}
          <div>
            <label className={labelCls}>Edad</label>
            <select name="edad" value={form.edad} onChange={handleChange}
              className={inputCls} style={{ borderColor: errors.edad ? "#E74C3C" : undefined }}>
              <option value="">Selecciona la edad</option>
              {EDADES.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad}</p>}
          </div>

          {/* Raza */}
          <div>
            <label className={labelCls}>Raza</label>
            <input name="raza" value={form.raza} onChange={handleChange} placeholder="Ej: Mestizo, Labrador..."
              className={inputCls} style={{ borderColor: errors.raza ? "#E74C3C" : undefined }}/>
            {errors.raza && <p className="text-red-500 text-xs mt-1">{errors.raza}</p>}
          </div>

          {/* Personalidad */}
          <div>
            <label className={labelCls}>Personalidad</label>
            <div className="flex flex-wrap gap-2">
              {TRAITS.map((t) => (
                <button key={t} type="button"
                  onClick={() => { setForm((p) => ({ ...p, personalidad: t })); setErrors((p) => ({ ...p, personalidad: "" })); }}
                  className="px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all"
                  style={{
                    background:  form.personalidad === t ? "#FDF3DC" : "white",
                    borderColor: form.personalidad === t ? "#C8960A" : "#D8E8F0",
                    color:       form.personalidad === t ? "#8B6500" : "#7A9BB5",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.personalidad && <p className="text-red-500 text-xs mt-1">{errors.personalidad}</p>}
          </div>

          {/* Separador */}
          <div className="h-px" style={{ background: "#EBF4FF" }}/>
          <p className="text-xs font-black text-[#9ABCCE] uppercase tracking-wider -mb-1">Datos de contacto</p>

          {/* Nombre contacto */}
          <div>
            <label className={labelCls}>Tu nombre</label>
            <input name="contacto_nombre" value={form.contacto_nombre} onChange={handleChange}
              placeholder="Nombre del responsable" className={inputCls}/>
          </div>

          {/* Teléfono */}
          <div>
            <label className={labelCls}>Teléfono / WhatsApp *</label>
            <input name="contacto_telefono" value={form.contacto_telefono} onChange={handleChange}
              placeholder="+51 999 999 999" className={inputCls}
              style={{ borderColor: errors.contacto_telefono ? "#E74C3C" : undefined }}/>
            {errors.contacto_telefono && <p className="text-red-500 text-xs mt-1">{errors.contacto_telefono}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={labelCls}>Correo (opcional)</label>
            <input name="contacto_email" value={form.contacto_email} onChange={handleChange}
              placeholder="tucorreo@email.com" className={inputCls}/>
          </div>

          {errors.general && (
            <div className="rounded-xl px-4 py-3 text-xs font-semibold text-red-600"
              style={{ background: "#FEF0EE", border: "1px solid #F0C5C0" }}>
              ⚠️ {errors.general}
            </div>
          )}
        </div>

        {/* Botón publicar */}
        <div className="px-5 py-4 shrink-0" style={{ borderTop: "1px solid #EBF4FF" }}>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-sm text-white active:scale-[0.98] transition-all disabled:opacity-60"
            style={{ background: "#4A9FD4" }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z"/>
                </svg>
                Publicando...
              </span>
            ) : "Publicar mascota 🐾"}
          </button>
        </div>
      </div>
    </div>
  );
}