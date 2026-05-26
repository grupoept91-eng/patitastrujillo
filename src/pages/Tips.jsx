import { useState } from "react";
import TopNavbar    from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

import ImgVacuna        from "../assets/img/vacuna.png";
import ImgNutricion     from "../assets/img/nutricion.png";
import ImgComportamiento from "../assets/img/comportamiento.png";
import ImgBotiquin      from "../assets/img/botiquin.png";

const TIPS = [
  {
    id:       "vacunas",
    img:      ImgVacuna,
    bg:       "#FEF9EE",
    accent:   "#C8960A",
    category: "Vacunas y Parásitos:",
    title:    "Calendario Completo",
    bullets:  [
      "Quíntuple · Rabia acolina",
      "Rabia · Dúplex",
      "Dosis de desparasitación cada 3 meses",
    ],
    detail: "Consulta siempre con un veterinario de confianza el calendario exacto según la edad y peso de tu mascota. Los cachorros necesitan refuerzos cada 3-4 semanas hasta los 4 meses.",
  },
  {
    id:       "nutricion",
    img:      ImgNutricion,
    bg:       "#FEF6E0",
    accent:   "#C8960A",
    category: "Nutrición y Clima:",
    title:    "Dietas y Protección",
    bullets:  [
      "Croquetas para cachorros hasta los 12 meses",
      "Dieta adulto / senior según su talla",
      "Agua fresca disponible siempre",
      "Evitar chocolate, cebolla, uvas y aguacate",
    ],
    detail: "La cantidad diaria depende del peso y actividad. Divide la comida en 2-3 porciones. En verano protégelos del calor extremo y en invierno abriga a las razas de pelo corto.",
  },
  {
    id:       "comportamiento",
    img:      ImgComportamiento,
    bg:       "#F0F7EE",
    accent:   "#27AE60",
    category: "Comportamiento y Estrés:",
    title:    "Guía de Entrenamiento",
    bullets:  [
      "Refuerzo positivo: premio inmediato al buen comportamiento",
      "Socialización temprana con personas y otros animales",
      "Rutinas fijas reducen la ansiedad",
    ],
    detail: "Nunca uses castigo físico. La constancia es clave: sesiones cortas de 5-10 minutos son más efectivas que sesiones largas. Si hay agresividad consulta a un etólogo.",
  },
  {
    id:       "botiquin",
    img:      ImgBotiquin,
    bg:       "#EBF4FF",
    accent:   "#4A9FD4",
    category: "Botiquín de Emergencias:",
    title:    "Primeros Auxilios",
    bullets:  [
      "Vendas, gasas y agua oxigenada",
      "Ante envenenamiento: ir al veterinario YA",
      "Convulsiones: no sujetar, alejar objetos",
      "Heridas: limpiar y cubrir sin apretar",
    ],
    detail: "Ten siempre a mano el número de una clínica veterinaria de emergencias. No administres medicamentos humanos sin indicación veterinaria.",
  },
];

// ── Íconos ────────────────────────────────────────────────────────────────────
const IconChevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 shrink-0 transition-transform"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// ── Tarjeta ───────────────────────────────────────────────────────────────────
function TipCard({ tip }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white overflow-hidden"
      style={{ border: "1.5px solid #E0E8F0", borderRadius: "1.25rem" }}
    >
      {/* Fila principal — siempre visible */}
      <button
        className="w-full flex items-center gap-3 p-4 text-left active:opacity-80 transition-opacity"
        onClick={() => setOpen(!open)}
      >
        {/* Imagen */}
        <div
          className="shrink-0 rounded-xl flex items-center justify-center overflow-hidden"
          style={{ width: "72px", height: "72px", background: tip.bg }}
        >
          <img
            src={tip.img}
            alt={tip.title}
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Texto */}
        <div className="flex-1 min-w-0">
          <p className="text-xs leading-tight" style={{ color: "#6B8FA8" }}>
            {tip.category}
          </p>
          <p className="font-black text-base leading-tight mt-0.5" style={{ color: "#0D2B45" }}>
            {tip.title}
          </p>

          {/* Bullets siempre visibles */}
          <ul className="mt-2 flex flex-col gap-1">
            {tip.bullets.map((b) => (
              <li key={b} className="flex items-start gap-1.5">
                <span
                  className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                  style={{ background: tip.accent }}
                />
                <span className="text-xs leading-snug" style={{ color: "#4A4A4A" }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chevron */}
        <span style={{ color: tip.accent }}>
          <IconChevron open={open} />
        </span>
      </button>

      {/* Contenido expandido */}
      {open && (
        <div
          className="px-4 pb-4 flex flex-col gap-3"
          style={{ borderTop: `1.5px solid ${tip.bg}` }}
        >
          <p className="text-xs leading-relaxed pt-3" style={{ color: "#5A5A5A" }}>
            {tip.detail}
          </p>
          <button
            className="self-start px-4 py-2 rounded-full font-black text-xs active:scale-95 transition-transform"
            style={{
              background:  tip.bg,
              border:      `1.5px solid ${tip.accent}`,
              color:       tip.accent,
            }}
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

        {/* Banner intro */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: "white", border: "1.5px solid #D8E8F0" }}
        >
          <span className="text-2xl">🐾</span>
          <p className="text-xs leading-relaxed" style={{ color: "#5A7A8A" }}>
            Guías básicas de cuidado animal. Siempre consulta a tu veterinario de confianza.
          </p>
        </div>

        {/* Cards */}
        {TIPS.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}

      </main>

      <BottomNavbar />
    </div>
  );
}