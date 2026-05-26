import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useAuth from "../hooks/useAuth";
import TopNavbar    from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import { AboutModal, PrivacyModal, TermsModal } from "../components/InfoModals";

// ── Íconos ────────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const PawPrint = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor">
    <ellipse cx="8" cy="14" rx="3.5" ry="5"/><ellipse cx="15" cy="9" rx="3.5" ry="5"/>
    <ellipse cx="25" cy="9" rx="3.5" ry="5"/><ellipse cx="32" cy="14" rx="3.5" ry="5"/>
    <path d="M20 17c-7 0-12 4-12 10.5C8 33 11.5 36 20 36s12-3 12-8.5C32 21 27 17 20 17z"/>
  </svg>
);

// ── Fila de ajuste ────────────────────────────────────────────────────────────
function SettingRow({ Icon, label, sublabel, iconBg, iconColor, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-70 transition-opacity"
    >
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: iconBg, color: iconColor }}>
        <Icon />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="font-bold text-sm" style={{ color: danger ? "#E74C3C" : "#0D2B45" }}>{label}</p>
        {sublabel && (
          <p className="text-xs mt-0.5 truncate" style={{ color: "#9ABCCE" }}>{sublabel}</p>
        )}
      </div>
      <span style={{ color: danger ? "#E74C3C" : "#BFCFDA" }}>
        <IconChevron />
      </span>
    </button>
  );
}

// ── Modal editar perfil ───────────────────────────────────────────────────────
function EditProfileModal({ user, onClose, onSave }) {
  const [form,    setForm]    = useState({ nombre: user.nombre, telefono: user.telefono ?? "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const { error: updateError } = await supabase
        .from("perfiles")
        .update({ nombre: form.nombre.trim(), telefono: form.telefono.trim() || null })
        .eq("id", user.id);
      if (updateError) throw updateError;
      onSave({ nombre: form.nombre.trim(), telefono: form.telefono.trim() || null });
      onClose();
    } catch (err) {
      setError("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-2xl border-2 border-[#D4E6F5] bg-[#F5FAFF] text-[#0D2B45] text-sm outline-none focus:border-[#4A9FD4] transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full max-w-sm rounded-t-3xl px-6 pt-5 pb-10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mb-5" />

        <div className="flex items-center justify-between mb-5">
          <p className="font-black text-lg text-[#0D2B45]">Editar perfil</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#9ABCCE]" style={{ background: "#F0F7FC" }}>
            <IconX />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-[#7A9BB5] uppercase tracking-wider mb-1.5">Nombre completo</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
              placeholder="Tu nombre"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#7A9BB5] uppercase tracking-wider mb-1.5">Teléfono</label>
            <input
              value={form.telefono}
              onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
              placeholder="+51 999 999 999"
              className={inputCls}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-2xl border-2 border-[#D4E6F5] font-black text-sm text-[#7A9BB5]">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl font-black text-sm text-white disabled:opacity-60"
            style={{ background: "#4A9FD4" }}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Modal cerrar sesión ───────────────────────────────────────────────────────
function LogoutModal({ onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6" onClick={onClose}>
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3 text-red-400">
            <IconLogout />
          </div>
          <h2 className="font-black text-xl text-[#0D2B45] mb-1">¿Cerrar sesión?</h2>
          <p className="text-sm text-[#7A9BB5]">Podrás volver a ingresar en cualquier momento.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-2xl border-2 border-[#D4E6F5] font-black text-sm text-[#7A9BB5]">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl font-black text-sm text-white disabled:opacity-60"
            style={{ background: "#E74C3C" }}
          >
            {loading ? "Saliendo..." : "Cerrar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Pantalla ──────────────────────────────────────────────────────────────────
export default function Settings() {
  const navigate        = useNavigate();
  const { session, setPerfil } = useAuth();

  const [user,         setUser]         = useState(null);
  const [loadingUser,  setLoadingUser]  = useState(true);
  const [modal,        setModal]        = useState(null);
  const [loggingOut,   setLoggingOut]   = useState(false);

  // Cargar perfil desde Supabase
  useEffect(() => {
    const cargar = async () => {
      if (!session?.user?.id) return;
      setLoadingUser(true);
      const { data } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      setUser(data ?? {
        id:       session.user.id,
        nombre:   session.user.user_metadata?.nombre ?? "Usuario",
        telefono: null,
      });
      setLoadingUser(false);
    };
    cargar();
  }, [session]);

  const handleSaveProfile = (updated) => {
    setUser((prev) => ({ ...prev, ...updated }));
    if (setPerfil) setPerfil((prev) => ({ ...prev, ...updated }));
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    setLoggingOut(false);
    navigate("/login");
  };

  const PROFILE_ROWS = [
    {
      Icon:     IconUser,
      label:    "Nombre",
      sublabel: user?.nombre ?? "—",
      iconBg:   "#EBF4FF",
      iconColor:"#4A9FD4",
      action:   "edit",
    },
    {
      Icon:     IconMail,
      label:    "Correo",
      sublabel: session?.user?.email ?? "—",
      iconBg:   "#EBF4FF",
      iconColor:"#4A9FD4",
      action:   null,
    },
    {
      Icon:     IconPhone,
      label:    "Teléfono",
      sublabel: user?.telefono ?? "No registrado",
      iconBg:   "#EBF4FF",
      iconColor:"#4A9FD4",
      action:   "edit",
    },
  ];

  const ABOUT_ROWS = [
    { Icon: IconInfo,   label: "Sobre Patitas Trujillo", sublabel: "Versión 1.0.0",          iconBg: "#EEFAF4", iconColor: "#27AE60", action: "about"   },
    { Icon: IconShield, label: "Política de privacidad", sublabel: "Tus datos están seguros", iconBg: "#EEFAF4", iconColor: "#27AE60", action: "privacy" },
    { Icon: IconDoc,    label: "Términos y condiciones",  sublabel: "Condiciones de uso",      iconBg: "#EEFAF4", iconColor: "#27AE60", action: "terms"   },
  ];

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBF4FF]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-[#4A9FD4]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z"/>
          </svg>
          <p className="text-[#4A9FD4] font-bold text-sm">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto" style={{ background: "#EBF4FF" }}>
      <TopNavbar backRoute="/dashboard" />

      <main className="flex-1 px-4 pt-5 pb-6 overflow-y-auto flex flex-col gap-4">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="w-20 h-20 rounded-full flex items-center justify-center relative" style={{ background: "#4A9FD4" }}>
            <PawPrint className="w-10 h-10 text-white" />
            <button
              onClick={() => setModal("edit")}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white"
              style={{ background: "#C8960A" }}
            >
              <IconEdit />
            </button>
          </div>
          <p className="font-black text-lg text-[#0D2B45]">{user?.nombre ?? "Usuario"}</p>
          <p className="text-xs text-[#9ABCCE]">{session?.user?.email ?? ""}</p>
        </div>

        {/* Perfil */}
        <div>
          <p className="text-xs font-black text-[#9ABCCE] uppercase tracking-widest px-1 mb-2">Mi Perfil</p>
          <div className="bg-white rounded-3xl overflow-hidden" style={{ border: "1.5px solid #D8E8F0" }}>
            {PROFILE_ROWS.map((row, i) => (
              <div key={row.label}>
                <SettingRow
                  {...row}
                  onClick={() => row.action ? setModal(row.action) : null}
                />
                {i < PROFILE_ROWS.length - 1 && (
                  <div className="h-px mx-4" style={{ background: "#F0F7FC" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sobre la app */}
        <div>
          <p className="text-xs font-black text-[#9ABCCE] uppercase tracking-widest px-1 mb-2">Sobre la Aplicación</p>
          <div className="bg-white rounded-3xl overflow-hidden" style={{ border: "1.5px solid #D8E8F0" }}>
            {ABOUT_ROWS.map((row, i) => (
              <div key={row.label}>
                <SettingRow {...row} onClick={() => setModal(row.action)} />
                {i < ABOUT_ROWS.length - 1 && (
                  <div className="h-px mx-4" style={{ background: "#F0F7FC" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cerrar sesión */}
        <div className="bg-white rounded-3xl overflow-hidden" style={{ border: "1.5px solid #F0C5C0" }}>
          <SettingRow
            Icon={IconLogout}
            label="Cerrar sesión"
            sublabel="Salir de tu cuenta"
            iconBg="#FEF0EE"
            iconColor="#E74C3C"
            danger
            onClick={() => setModal("logout")}
          />
        </div>

        <p className="text-center text-xs text-[#BFCFDA] pb-2">
          Patitas Trujillo v1.0.0 · Bienestar animal en La Libertad
        </p>
      </main>

      <BottomNavbar />

      {/* Modales */}
      {modal === "edit" && user && (
        <EditProfileModal
          user={user}
          onClose={() => setModal(null)}
          onSave={handleSaveProfile}
        />
      )}
      {modal === "logout" && (
        <LogoutModal
          onClose={() => setModal(null)}
          onConfirm={handleLogout}
          loading={loggingOut}
        />
      )}
      {modal === "about"   && <AboutModal   onClose={() => setModal(null)} />}
      {modal === "privacy" && <PrivacyModal  onClose={() => setModal(null)} />}
      {modal === "terms"   && <TermsModal    onClose={() => setModal(null)} />}
    </div>
  );
}