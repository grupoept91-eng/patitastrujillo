// ── Íconos ────────────────────────────────────────────────────────────────────
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const IconPaw = () => (
  <svg viewBox="0 0 40 40" fill="currentColor" className="w-5 h-5">
    <ellipse cx="8"  cy="14" rx="3.5" ry="5" />
    <ellipse cx="15" cy="9"  rx="3.5" ry="5" />
    <ellipse cx="25" cy="9"  rx="3.5" ry="5" />
    <ellipse cx="32" cy="14" rx="3.5" ry="5" />
    <path d="M20 17c-7 0-12 4-12 10.5C8 33 11.5 36 20 36s12-3 12-8.5C32 21 27 17 20 17z" />
  </svg>
);

// ── Props ─────────────────────────────────────────────────────────────────────
// pet      : objeto con { name, shelter, phone, email, contactName }
// onClose  : función para cerrar el modal

export default function ContactModal({ pet, onClose }) {
  if (!pet) return null;

  const rows = [
    { Icon: IconUser,  label: "Contacto",  value: pet.contactName ?? "Equipo de adopciones" },
    { Icon: IconPhone, label: "Teléfono",   value: pet.phone },
    { Icon: IconMail,  label: "Correo",     value: pet.email ?? "adopciones@patitastrujillo.pe" },
  ];

  return (
    /* Overlay — toca fuera para cerrar */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      {/* Sheet — evita que el click se propague al overlay */}
      <div
        className="bg-white w-full max-w-sm rounded-t-3xl px-6 pt-5 pb-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mb-5" />

        {/* Encabezado */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[#A0BCD0] text-xs font-bold uppercase tracking-widest mb-0.5">
              Información de contacto
            </p>
            <h2 className="text-[#0D2B45] font-black text-xl leading-tight">
              Adoptar a {pet.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[#4A9FD4]">
                <IconPaw />
              </span>
              <p className="text-[#4A9FD4] text-xs font-bold">{pet.shelter}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F0F7FC] flex items-center justify-center text-[#6B8FA8] hover:bg-[#D8EAF5] transition-colors active:scale-95"
          >
            <IconX />
          </button>
        </div>

        {/* Separador */}
        <div className="h-px bg-[#E8F0F8] mb-5" />

        {/* Datos de contacto */}
        <div className="flex flex-col gap-4 mb-6">
          {rows.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#EBF4FF] flex items-center justify-center text-[#4A9FD4] shrink-0">
                <Icon />
              </div>
              <div className="min-w-0">
                <p className="text-[#A0BCD0] text-[10px] font-bold uppercase tracking-wider leading-none mb-0.5">
                  {label}
                </p>
                <p className="text-[#0D2B45] font-bold text-sm truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <a
            href={`tel:${pet.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#4A9FD4] text-white font-black text-sm py-3.5 rounded-2xl active:scale-[0.98] transition-transform"
          >
            <IconPhone />
            Llamar
          </a>
          <a
            href={`mailto:${pet.email ?? "adopciones@patitastrujillo.pe"}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#EBF4FF] text-[#4A9FD4] font-black text-sm py-3.5 rounded-2xl border-2 border-[#C5DFEE] active:scale-[0.98] transition-transform"
          >
            <IconMail />
            Escribir
          </a>
        </div>
      </div>
    </div>
  );
}