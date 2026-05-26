import { useState } from "react";
import TopNavbar    from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

// ── Ilustraciones SVG por categoría ──────────────────────────────────────────

const IlluVaccine = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
    {/* Perrito sentado */}
    <ellipse cx="24" cy="26" rx="5" ry="6" fill="#E8A87C"/>
    <ellipse cx="38" cy="26" rx="5" ry="6" fill="#E8A87C"/>
    <circle cx="31" cy="28" r="12" fill="#F5CBA7"/>
    <circle cx="27" cy="26" r="2" fill="#2C3E50"/><circle cx="27.8" cy="25.3" r="0.7" fill="white"/>
    <circle cx="35" cy="26" r="2" fill="#2C3E50"/><circle cx="35.8" cy="25.3" r="0.7" fill="white"/>
    <ellipse cx="31" cy="31" rx="3.5" ry="2" fill="#E8A87C"/>
    <path d="M28 33 Q31 36 34 33" stroke="#C0785A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* Cuerpo */}
    <ellipse cx="31" cy="45" rx="10" ry="9" fill="#F5CBA7"/>
    {/* Escudo vacuna */}
    <path d="M44 18 L44 26 Q44 31 48 33 Q52 31 52 26 L52 18 L48 16 Z" fill="#4A9FD4" opacity="0.9"/>
    <path d="M45.5 23 L47.5 25.5 L51 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* Jeringa */}
    <rect x="38" y="12" width="3" height="10" rx="1.5" fill="#C8D8E8" stroke="#7A9BB5" strokeWidth="0.8"/>
    <rect x="38.5" y="22" width="2" height="3" rx="0.5" fill="#7A9BB5"/>
    <line x1="39.5" y1="25" x2="39.5" y2="28" stroke="#7A9BB5" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="37" y1="15" x2="41" y2="15" stroke="#7A9BB5" strokeWidth="0.8"/>
    <line x1="37" y1="17" x2="41" y2="17" stroke="#7A9BB5" strokeWidth="0.8"/>
  </svg>
);

const IlluFood = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
    {/* Tazón */}
    <ellipse cx="32" cy="46" rx="18" ry="6" fill="#C8960A" opacity="0.3"/>
    <path d="M14 40 Q14 52 32 52 Q50 52 50 40 Z" fill="#E8A030"/>
    <ellipse cx="32" cy="40" rx="18" ry="5" fill="#F5B830"/>
    <ellipse cx="32" cy="40" rx="14" ry="3.5" fill="#FDD060"/>
    {/* Croquetas */}
    <circle cx="27" cy="39" r="2.5" fill="#C8780A"/>
    <circle cx="33" cy="38" r="2.5" fill="#C8780A"/>
    <circle cx="38" cy="40" r="2" fill="#C8780A"/>
    {/* Perrito */}
    <ellipse cx="20" cy="22" rx="4" ry="5" fill="#E8A87C"/>
    <ellipse cx="32" cy="22" rx="4" ry="5" fill="#E8A87C"/>
    <circle cx="26" cy="24" r="9" fill="#F5CBA7"/>
    <circle cx="23" cy="22" r="1.8" fill="#2C3E50"/><circle cx="23.6" cy="21.4" r="0.6" fill="white"/>
    <circle cx="29" cy="22" r="1.8" fill="#2C3E50"/><circle cx="29.6" cy="21.4" r="0.6" fill="white"/>
    <ellipse cx="26" cy="26" rx="3" ry="1.8" fill="#E8A87C"/>
  </svg>
);

const IlluBehavior = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
    {/* Perro grande */}
    <ellipse cx="18" cy="20" rx="4" ry="5" fill="#E8A87C"/>
    <ellipse cx="28" cy="20" rx="4" ry="5" fill="#E8A87C"/>
    <circle cx="23" cy="23" r="10" fill="#F5CBA7"/>
    <circle cx="20" cy="21" r="2" fill="#2C3E50"/><circle cx="20.7" cy="20.3" r="0.7" fill="white"/>
    <circle cx="26" cy="21" r="2" fill="#2C3E50"/><circle cx="26.7" cy="20.3" r="0.7" fill="white"/>
    <ellipse cx="23" cy="27" rx="3" ry="1.8" fill="#E8A87C"/>
    <path d="M20 29 Q23 32 26 29" stroke="#C0785A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <ellipse cx="23" cy="42" rx="11" ry="9" fill="#F5CBA7"/>
    {/* Gato chico */}
    <path d="M38 28 L35 22 L41 26 Z" fill="#F5A623"/>
    <path d="M48 28 L51 22 L45 26 Z" fill="#F5A623"/>
    <circle cx="43" cy="31" r="8" fill="#FAD7A0"/>
    <ellipse cx="40" cy="29" rx="2" ry="1.8" fill="#2C3E50"/><circle cx="40.6" cy="28.4" r="0.6" fill="white"/>
    <ellipse cx="46" cy="29" rx="2" ry="1.8" fill="#2C3E50"/><circle cx="46.6" cy="28.4" r="0.6" fill="white"/>
    <path d="M41 33 L43 31 L45 33 Q43 34.5 41 33Z" fill="#E8967A"/>
  </svg>
);

const IlluFirstAid = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
    {/* Botiquín */}
    <rect x="8" y="22" width="32" height="26" rx="4" fill="#E8F4FF" stroke="#4A9FD4" strokeWidth="1.5"/>
    <rect x="11" y="19" width="26" height="6" rx="2" fill="#C8E0F4" stroke="#4A9FD4" strokeWidth="1"/>
    {/* Cruz */}
    <rect x="20" y="30" width="12" height="4" rx="2" fill="#E74C3C"/>
    <rect x="22" y="28" width="8" height="8" rx="2" fill="#E74C3C"/>
    {/* Vendaje */}
    <rect x="36" y="38" width="20" height="8" rx="4" fill="#F5E6D8" stroke="#C0785A" strokeWidth="1"/>
    <line x1="40" y1="42" x2="52" y2="42" stroke="#C0785A" strokeWidth="1" strokeDasharray="2,2"/>
    {/* Pastilla */}
    <ellipse cx="50" cy="28" rx="7" ry="4" fill="#F5CBA7" stroke="#C0785A" strokeWidth="1" transform="rotate(-30 50 28)"/>
    <line x1="44" y1="24" x2="56" y2="32" stroke="#C0785A" strokeWidth="1" transform="rotate(-30 50 28)"/>
  </svg>
);

// ── Datos ─────────────────────────────────────────────────────────────────────
const TIPS = [
  {
    id: "vaccines",
    Illu: IlluVaccine,
    bg: "#FEF9EE",
    title: "Vacunas y Parásitos:",
    subtitle: "CALENDARIO COMPLETO",
    bullets: [
      "Vacunas esenciales:",
      "Quíntuple · Rabia acolina",
      "Rabia · Dúplex",
      "Dosis de desparasitación",
    ],
  },
  {
    id: "nutrition",
    Illu: IlluFood,
    bg: "#FEF6E0",
    title: "Nutrición y Clima:",
    subtitle: "DIETAS Y PROTECCIÓN",
    bullets: [
      "Cachorros / adultos",
      "Adultos / senior",
      "Cómo protegerlos del clima extremo (calor / frío)",
    ],
  },
  {
    id: "behavior",
    Illu: IlluBehavior,
    bg: "#F0F7EE",
    title: "Comportamiento y Estrés:",
    subtitle: "GUÍA DE ENTRENAMIENTO",
    bullets: [
      "Tipos de refuerzo positivo para ansiedad.",
      "Técnicas de entrenamiento y socialización.",
    ],
  },
  {
    id: "firstaid",
    Illu: IlluFirstAid,
    bg: "#EBF4FF",
    title: "Botiquín de Emergencias:",
    subtitle: "PRIMEROS AUXILIOS PASO A PASO",
    bullets: [
      "Cómo hacer un vendaje básico.",
      "Cómo actuar ante envenenamiento.",
      "Respuesta ante convulsiones.",
    ],
  },
];

// ── Tarjeta de tip ─────────────────────────────────────────────────────────────
function TipCard({ tip }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white overflow-hidden"
      style={{ border: "1.5px solid #1A1A1A", borderRadius: "1rem" }}
    >
      <button
        className="w-full flex items-start gap-3 p-4 text-left active:opacity-80 transition-opacity"
        onClick={() => setOpen(!open)}
      >
        {/* Ilustración */}
        <div
          className="shrink-0 flex items-center justify-center rounded-xl"
          style={{ width: "72px", height: "72px", background: tip.bg, border: "1px solid #E0D0C0" }}
        >
          <tip.Illu />
        </div>

        {/* Texto */}
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-sm leading-tight" style={{ color: "#3A3A3A" }}>
            <span className="font-bold">{tip.title}</span>
          </p>
          <p className="font-black text-sm leading-tight mt-0.5" style={{ color: "#0D2B45" }}>
            {tip.subtitle}
          </p>
          {/* Bullets siempre visibles */}
          <ul className="mt-2 flex flex-col gap-0.5">
            {tip.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: "#5A5A5A" }}>
                <span className="mt-0.5 shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chevron */}
        <span
          className="text-[#C8960A] shrink-0 mt-1 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", fontSize: "1rem" }}
        >
          ▾
        </span>
      </button>

      {/* Contenido expandido */}
      {open && (
        <div
          className="px-4 pb-4 text-xs leading-relaxed"
          style={{ color: "#5A5A5A", borderTop: "1px solid #F0E8D8" }}
        >
          <p className="pt-3">
            Consulta siempre con un veterinario de confianza antes de aplicar cualquier tratamiento. Esta guía es informativa y no reemplaza la atención profesional.
          </p>
          <button
            className="mt-3 px-4 py-2 rounded-full font-black text-xs active:scale-95 transition-transform"
            style={{ background: "transparent", border: "1.5px solid #C8960A", color: "#8B6500" }}
          >
            Ver guía completa →
          </button>
        </div>
      )}
    </div>
  );
}

// ── Pantalla ──────────────────────────────────────────────────────────────────
export default function Tips() {
  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#EBF4FF" }}
    >
      <TopNavbar backRoute="/dashboard" />

      <main className="flex-1 px-4 pt-5 pb-6 overflow-y-auto flex flex-col gap-4">
        <h1
          className="font-black text-center"
          style={{ fontSize: "1.3rem", color: "#0D2B45", textTransform: "uppercase" }}
        >
          Guías de Consejos y Salud
        </h1>

        {TIPS.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </main>

      <BottomNavbar />
    </div>
  );
}