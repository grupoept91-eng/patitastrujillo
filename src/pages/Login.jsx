import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const PawPrint = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor">
    <ellipse cx="8"  cy="14" rx="3.5" ry="5"/><ellipse cx="15" cy="9" rx="3.5" ry="5"/>
    <ellipse cx="25" cy="9" rx="3.5" ry="5"/><ellipse cx="32" cy="14" rx="3.5" ry="5"/>
    <path d="M20 17c-7 0-12 4-12 10.5C8 33 11.5 36 20 36s12-3 12-8.5C32 21 27 17 20 17z"/>
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <path d="M1 1l22 22"/>
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#AACCE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#AACCE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [form,     setForm]    = useState({ email: "", password: "" });
  const [loading,  setLoading] = useState(false);
  const [error,    setError]   = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Completa todos los campos."); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(), password: form.password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message === "Invalid login credentials"
          ? "Correo o contraseña incorrectos."
          : "Error al iniciar sesión. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full pl-9 pr-4 py-3 rounded-xl border-2 border-[#D4E6F5] bg-[#F5FAFF] text-[#0D3B6E] text-sm placeholder:text-[#AACCE0] focus:outline-none focus:border-[#1E6FAD] transition-colors";

  return (
    <div className="min-h-screen bg-[#EBF4FF] flex flex-col items-center justify-center px-5 py-8 font-['Nunito',sans-serif]">

      {/* Logo */}
      <div className="w-full max-w-sm mb-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 rounded-3xl bg-[#1E6FAD] flex items-center justify-center shadow-lg shadow-blue-300/50">
            <PawPrint className="w-11 h-11 text-[#F5A623]" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-[#0D3B6E] tracking-wide">PATITAS</h1>
        <p className="text-sm font-bold text-[#F5A623] tracking-[0.25em] -mt-1">TRUJILLO</p>
        <p className="text-xs text-[#5A8AB0] mt-2">Cuidamos a quienes no tienen voz</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-7">
        <h2 className="text-xl font-black text-[#0D3B6E] mb-1">Bienvenido/a</h2>
        <p className="text-xs text-[#7A9BB5] mb-6">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-[#5A8AB0] mb-1.5 uppercase tracking-wider">
              Correo electrónico
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><IconMail /></span>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="tucorreo@email.com"
                className={inputCls}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-xs font-bold text-[#5A8AB0] mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><IconLock /></span>
              <input
                type={showPass ? "text" : "password"} name="password" value={form.password}
                onChange={handleChange} placeholder="••••••••"
                className={inputCls + " pr-11"}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AACCE0] hover:text-[#1E6FAD] transition-colors"
              >
                {showPass ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-600 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          <div className="text-right -mt-1">
            <Link to="/forgot-password" className="text-xs text-[#1E6FAD] font-bold hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#1E6FAD] text-white font-black text-sm shadow-md hover:bg-[#185F96] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z"/>
                </svg>
                Ingresando...
              </span>
            ) : "Iniciar sesión"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#E4EFF8]"/>
          <span className="text-xs text-[#AACCE0] font-semibold">o</span>
          <div className="flex-1 h-px bg-[#E4EFF8]"/>
        </div>

        <Link
          to="/register"
          className="flex items-center justify-center w-full py-3.5 rounded-2xl border-2 border-[#1E6FAD] text-[#1E6FAD] font-black text-sm hover:bg-[#EBF4FF] active:scale-[0.98] transition-all"
        >
          Crear cuenta nueva
        </Link>
      </div>
    </div>
  );
}