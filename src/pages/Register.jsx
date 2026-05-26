import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const PawPrint = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor">
    <ellipse cx="8" cy="14" rx="3.5" ry="5"/><ellipse cx="15" cy="9" rx="3.5" ry="5"/>
    <ellipse cx="25" cy="9" rx="3.5" ry="5"/><ellipse cx="32" cy="14" rx="3.5" ry="5"/>
    <path d="M20 17c-7 0-12 4-12 10.5C8 33 11.5 36 20 36s12-3 12-8.5C32 21 27 17 20 17z"/>
  </svg>
);

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", password: "", confirmar: "", terms: false });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim())       e.nombre    = "Ingresa tu nombre.";
    if (!form.email.trim())        e.email     = "Ingresa tu correo.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo no válido.";
    if (!form.password)            e.password  = "Ingresa una contraseña.";
    else if (form.password.length < 8)          e.password = "Mínimo 8 caracteres.";
    if (form.password !== form.confirmar)        e.confirmar = "Las contraseñas no coinciden.";
    if (!form.terms)               e.terms     = "Debes aceptar los términos.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email:    form.email.trim(),
        password: form.password,
        options:  { data: { nombre: form.nombre.trim() } },
      });
      if (error) throw error;

      // Actualiza teléfono en perfil si lo ingresó
      if (form.telefono) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("perfiles")
            .update({ telefono: form.telefono })
            .eq("id", user.id);
        }
      }

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        general: err.message === "User already registered"
          ? "Este correo ya tiene una cuenta. Intenta iniciar sesión."
          : "Error al crear la cuenta. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const passStrength = (() => {
    const p = form.password;
    if (!p) return null;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    if (s <= 1) return { label: "Débil",   color: "bg-red-400",   w: "w-1/4" };
    if (s === 2) return { label: "Regular", color: "bg-yellow-400",w: "w-2/4" };
    if (s === 3) return { label: "Buena",   color: "bg-blue-400",  w: "w-3/4" };
    return            { label: "Fuerte",  color: "bg-green-400", w: "w-full" };
  })();

  return (
    <div className="min-h-screen bg-[#EBF4FF] flex flex-col items-center justify-center px-5 py-8 font-['Nunito',sans-serif]">
      <div className="w-full max-w-sm mb-5 flex items-center gap-3">
        <Link to="/login" className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#1E6FAD] font-black text-lg hover:bg-[#D4E6F5] transition-colors">←</Link>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#1E6FAD] flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-[#F5A623]" />
          </div>
          <div>
            <p className="text-base font-black text-[#0D3B6E] leading-none">PATITAS TRUJILLO</p>
            <p className="text-xs text-[#7A9BB5]">Crear cuenta</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-7">
        <h2 className="text-xl font-black text-[#0D3B6E] mb-1">Únete a la comunidad</h2>
        <p className="text-xs text-[#7A9BB5] mb-5">Ayuda a las mascotas de Trujillo</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">

          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold text-[#5A8AB0] mb-1.5 uppercase tracking-wider">Nombre completo</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan Pérez"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-[#F5FAFF] text-[#0D3B6E] text-sm placeholder:text-[#AACCE0] focus:outline-none transition-colors ${errors.nombre ? "border-red-300" : "border-[#D4E6F5] focus:border-[#1E6FAD]"}`}/>
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-[#5A8AB0] mb-1.5 uppercase tracking-wider">Correo electrónico</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tucorreo@email.com"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-[#F5FAFF] text-[#0D3B6E] text-sm placeholder:text-[#AACCE0] focus:outline-none transition-colors ${errors.email ? "border-red-300" : "border-[#D4E6F5] focus:border-[#1E6FAD]"}`}/>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs font-bold text-[#5A8AB0] mb-1.5 uppercase tracking-wider">Teléfono (opcional)</label>
            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+51 999 999 999"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#D4E6F5] bg-[#F5FAFF] text-[#0D3B6E] text-sm placeholder:text-[#AACCE0] focus:outline-none focus:border-[#1E6FAD] transition-colors"/>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#5A8AB0] mb-1.5 uppercase tracking-wider">Contraseña</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-[#F5FAFF] text-[#0D3B6E] text-sm placeholder:text-[#AACCE0] focus:outline-none transition-colors pr-11 ${errors.password ? "border-red-300" : "border-[#D4E6F5] focus:border-[#1E6FAD]"}`}/>
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AACCE0] text-lg">{showPass ? "🙈" : "👁️"}</button>
            </div>
            {passStrength && (
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#E4EFF8] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${passStrength.color} ${passStrength.w}`}/>
                </div>
                <span className="text-xs text-[#7A9BB5] font-semibold">{passStrength.label}</span>
              </div>
            )}
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirmar */}
          <div>
            <label className="block text-xs font-bold text-[#5A8AB0] mb-1.5 uppercase tracking-wider">Confirmar contraseña</label>
            <div className="relative">
              <input type={showConfirm ? "text" : "password"} name="confirmar" value={form.confirmar} onChange={handleChange} placeholder="Repite tu contraseña"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-[#F5FAFF] text-[#0D3B6E] text-sm placeholder:text-[#AACCE0] focus:outline-none transition-colors pr-11 ${errors.confirmar ? "border-red-300" : form.confirmar && form.password === form.confirmar ? "border-green-300" : "border-[#D4E6F5] focus:border-[#1E6FAD]"}`}/>
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AACCE0] text-lg">{showConfirm ? "🙈" : "👁️"}</button>
            </div>
            {form.confirmar && form.password === form.confirmar && <p className="text-green-500 text-xs mt-1 font-semibold">✓ Las contraseñas coinciden</p>}
            {errors.confirmar && <p className="text-red-500 text-xs mt-1">{errors.confirmar}</p>}
          </div>

          {/* Términos */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-0.5 w-4 h-4 accent-[#1E6FAD] cursor-pointer"/>
              <span className="text-xs text-[#5A8AB0] leading-relaxed">
                Acepto los <Link to="/terms" className="text-[#1E6FAD] font-bold hover:underline">términos</Link> y la <Link to="/privacy" className="text-[#1E6FAD] font-bold hover:underline">política de privacidad</Link>
              </span>
            </label>
            {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-600 text-xs font-semibold">⚠️ {errors.general}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#1E6FAD] text-white font-black text-sm shadow-md hover:bg-[#185F96] active:scale-[0.98] transition-all disabled:opacity-60 mt-1">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z"/>
                </svg>
                Creando cuenta...
              </span>
            ) : "Crear mi cuenta 🐾"}
          </button>
        </form>

        <p className="text-center text-xs text-[#7A9BB5] mt-5">
          ¿Ya tienes cuenta? <Link to="/login" className="text-[#1E6FAD] font-black hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}