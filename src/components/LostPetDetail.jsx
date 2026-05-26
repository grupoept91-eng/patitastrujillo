import dogImg from "../assets/pet/dog.png";
import catImg  from "../assets/pet/cat.png";

// ── Íconos ────────────────────────────────────────────────────────────────────
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const IconWhatsapp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.1 1.523 5.824L.057 23.428a.75.75 0 00.921.921l5.604-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.964-1.361l-.355-.212-3.683.964.983-3.596-.232-.371A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const IconShare = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
);
const IconMedal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <circle cx="12" cy="14" r="6" />
    <path d="M9 2l1.5 4.5M15 2l-1.5 4.5M9 2h6" />
    <path d="M10 14l1.5 1.5L14 12" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const PawSmall = () => (
  <svg viewBox="0 0 40 40" fill="currentColor" className="w-4 h-4">
    <ellipse cx="8" cy="14" rx="3.5" ry="5" />
    <ellipse cx="15" cy="9" rx="3.5" ry="5" />
    <ellipse cx="25" cy="9" rx="3.5" ry="5" />
    <ellipse cx="32" cy="14" rx="3.5" ry="5" />
    <path d="M20 17c-7 0-12 4-12 10.5C8 33 11.5 36 20 36s12-3 12-8.5C32 21 27 17 20 17z" />
  </svg>
);

// Mini mapa estático
const MiniMap = ({ location }) => (
  <div
    className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center relative"
    style={{ background: "#E8F0E8", minHeight: "70px", border: "1.5px solid #C8D8C8" }}
  >
    <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full opacity-30">
      <line x1="0" y1="23" x2="100" y2="23" stroke="#4A7A4A" strokeWidth="3"/>
      <line x1="0" y1="46" x2="100" y2="46" stroke="#4A7A4A" strokeWidth="2"/>
      <line x1="33" y1="0"  x2="33" y2="70"  stroke="#4A7A4A" strokeWidth="2"/>
      <line x1="66" y1="0"  x2="66" y2="70"  stroke="#4A7A4A" strokeWidth="3"/>
      <rect x="34" y="0"  width="32" height="22" fill="#6AAA6A" opacity="0.4"/>
      <rect x="0"  y="24" width="32" height="21" fill="#6AAA6A" opacity="0.4"/>
      <rect x="67" y="47" width="33" height="23" fill="#6AAA6A" opacity="0.4"/>
    </svg>
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-7 h-7 rounded-full bg-[#E74C3C] flex items-center justify-center shadow-md">
        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <span className="text-[8px] font-bold text-[#2C4A2C] mt-0.5 bg-white/80 px-1 rounded">{location}</span>
    </div>
  </div>
);

// ── Props ─────────────────────────────────────────────────────────────────────
// pet     : objeto con datos (null = cerrado)
// onClose : cierra el modal
// onFound : (pet) => void — marca la mascota como encontrada (opcional)

export default function LostPetDetail({ pet, onClose, onFound }) {
  if (!pet) return null;
  const isDog = pet.type === "dog";

  const imgSrc = pet.fotoUrl
    ? pet.fotoUrl
    : isDog ? dogImg : catImg;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FDF8F4] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm active:opacity-70 transition-opacity"
            style={{ background: "#F5E6D0", color: "#8B6500", border: "1.5px solid #C8960A" }}
          >
            <IconArrowLeft />
            Volver
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#5A5A5A] active:opacity-70"
          >
            <IconX />
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="overflow-y-auto flex-1 px-5 pb-5">

          {/* Imagen */}
          <div
            className="w-full rounded-2xl overflow-hidden flex items-end justify-center mb-4"
            style={{ background: pet.avatarBg ?? "#F5E6D8", height: "200px" }}
          >
            <img
              src={imgSrc}
              alt={pet.name}
              className="h-full w-full object-contain object-bottom"
              onError={(e) => { e.target.src = isDog ? dogImg : catImg; }}
            />
          </div>

          {/* Badge + nombre */}
          <div className="text-center mb-4">
            <p className="font-black text-lg tracking-widest" style={{ color: "#E8967A" }}>
              PERDIDO/A
            </p>
            <h2 className="font-black leading-none" style={{ fontSize: "2rem", color: "#2C1A0E" }}>
              {pet.name.toUpperCase()}
            </h2>
          </div>

          {/* Datos */}
          <div className="flex flex-col gap-2 mb-4 text-sm" style={{ color: "#2C1A0E" }}>
            <p><span className="font-black">Lugar: </span>{pet.location}</p>
            <p><span className="font-black">Fecha: </span>{pet.date}</p>
            <p><span className="font-black">Descripción: </span>{pet.desc}</p>
          </div>

          {/* Recompensa */}
          {pet.reward && (
            <div
              className="rounded-2xl p-4 mb-3 flex items-start gap-3"
              style={{ background: "#FEF3DC", border: "1.5px solid #C8960A" }}
            >
              <div style={{ color: "#C8960A" }} className="shrink-0 mt-0.5"><IconMedal /></div>
              <div>
                <p className="font-black text-sm" style={{ color: "#2C1A0E" }}>¡RECOMPENSA OFRECIDA!</p>
                <p className="font-black text-sm" style={{ color: "#8B6500" }}>S/ {pet.reward}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B4A00" }}>
                  Por información verídica que lleve a su paradero.
                </p>
              </div>
            </div>
          )}

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${pet.phone?.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl mb-3 active:scale-[0.98] transition-transform"
            style={{ background: "#2C1A0E", color: "#F5E6D0" }}
          >
            <IconWhatsapp />
            <div className="text-center">
              <p className="font-black text-sm tracking-wide">CONTACTAR POR WHATSAPP</p>
              <p className="text-xs opacity-80">{pet.phone}</p>
            </div>
          </a>

          {/* Llamar + Mapa */}
          <div className="flex gap-3 mb-3" style={{ height: "70px" }}>
            <a
              href={`tel:${pet.phone}`}
              className="flex items-center justify-center gap-2 rounded-2xl font-black text-sm active:scale-[0.98] transition-transform"
              style={{
                width: "45%",
                background: "white",
                border: "1.5px solid #D0C8C0",
                color: "#2C1A0E",
              }}
            >
              <IconPhone />
              Llamar
            </a>
            <MiniMap location={pet.location} />
          </div>

          {/* Compartir */}
          <button
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-black text-sm active:scale-[0.98] transition-transform mb-3"
            style={{ background: "white", border: "1.5px solid #D0C8C0", color: "#2C1A0E" }}
          >
            <IconShare />
            Compartir Ficha
          </button>

          {/* Marcar como encontrada */}
          {onFound && (
            <button
              onClick={() => onFound(pet)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-black text-sm active:scale-[0.98] transition-transform"
              style={{ background: "#EEFAF4", border: "1.5px solid #27AE60", color: "#1E8A4A" }}
            >
              <IconCheck />
              ¡Ya la encontré! Marcar como encontrada
            </button>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-center gap-2 py-3 shrink-0"
          style={{ borderTop: "1px solid #EAE0D8" }}
        >
          <span style={{ color: "#C8960A" }}><PawSmall /></span>
          <span className="text-xs font-semibold" style={{ color: "#8B6500" }}>
            Patitas Trujillo App
          </span>
        </div>
      </div>
    </div>
  );
}