import { useState } from "react";
import TopNavbar    from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

// ── Íconos ────────────────────────────────────────────────────────────────────
const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

// ── Logo Yape (círculo morado con Y) ──────────────────────────────────────────
const YapeLogo = () => (
  <svg viewBox="0 0 40 40" className="w-9 h-9">
    <circle cx="20" cy="20" r="20" fill="#6B2D8B"/>
    <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Arial">Y</text>
  </svg>
);

// ── Logo Plin (círculo verde con P) ───────────────────────────────────────────
const PlinLogo = () => (
  <svg viewBox="0 0 40 40" className="w-9 h-9">
    <circle cx="20" cy="20" r="20" fill="#00B14F"/>
    <text x="20" y="26" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Arial">P</text>
  </svg>
);

// ── Logo BCP ──────────────────────────────────────────────────────────────────
const BcpLogo = () => (
  <svg viewBox="0 0 40 40" className="w-9 h-9">
    <rect width="40" height="40" rx="8" fill="#003087"/>
    <text x="20" y="26" textAnchor="middle" fill="#F5A623" fontSize="11" fontWeight="900" fontFamily="Arial">BCP</text>
  </svg>
);

// ── Tarjeta de método de pago ─────────────────────────────────────────────────
function PaymentCard({ Logo, name, number, holder, cardBg, extra }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bg-white overflow-hidden"
      style={{ border: "1.5px solid #1A1A1A", borderRadius: "1rem" }}
    >
      {/* Header de color */}
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{ background: cardBg }}
      >
        <Logo />
        <div>
          <p className="font-black text-sm" style={{ color: "#0D2B45" }}>{name}</p>
          <p className="text-xs" style={{ color: "#6B8FA8" }}>{holder}</p>
        </div>
      </div>

      {/* Número */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#9ABCCE" }}>
            {extra ?? "Número"}
          </p>
          <p className="font-black text-base" style={{ color: "#0D2B45", letterSpacing: "0.05em" }}>
            {number}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs active:scale-95 transition-all"
          style={{
            background:   copied ? "#EEFAF4" : "#FDF3DC",
            border:       `1.5px solid ${copied ? "#27AE60" : "#C8960A"}`,
            color:        copied ? "#27AE60" : "#8B6500",
          }}
        >
          {copied ? <IconCheck /> : <IconCopy />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
}

// ── Pantalla ──────────────────────────────────────────────────────────────────
export default function Donations() {
  const METHODS = [
    {
      Logo:        YapeLogo,
      name:        "Yape",
      number:      "999 123 456",
      holder:      "Patitas Trujillo",
      cardBg:      "#F3EAF9",
      accentColor: "#6B2D8B",
      extra:       "Número de celular",
    },
    {
      Logo:        PlinLogo,
      name:        "Plin",
      number:      "999 654 321",
      holder:      "Patitas Trujillo",
      cardBg:      "#E8F8EE",
      accentColor: "#00B14F",
      extra:       "Número de celular",
    },
    {
      Logo:        BcpLogo,
      name:        "BCP — Cuenta de Ahorros",
      number:      "191-12345678-0-12",
      holder:      "Asociación Patitas Trujillo",
      cardBg:      "#E8EEF8",
      accentColor: "#003087",
      extra:       "Número de cuenta",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#EBF4FF" }}
    >
      <TopNavbar backRoute="/dashboard" />

      <main className="flex-1 px-4 pt-5 pb-6 overflow-y-auto flex flex-col gap-4">

        {/* Hero */}
        <div
          className="rounded-3xl p-5 flex flex-col items-center text-center gap-2"
          style={{ background: "#4A9FD4" }}
        >
          <h1 className="text-white font-black text-xl leading-tight">
            Tu donación salva vidas
          </h1>
          <p className="text-white/80 text-xs leading-relaxed">
            Cada sol que donas se destina directamente a alimentación, atención veterinaria y rescate de mascotas en Trujillo.
          </p>
        </div>

        {/* ¿En qué se usa? */}
        <div
          className="bg-white rounded-3xl p-4"
          style={{ border: "1.5px solid #D8E8F0" }}
        >
          <p className="font-black text-sm text-[#0D2B45] mb-3">¿En qué se usa tu donación?</p>
          {[
            { emoji: "🍖", label: "Alimentación para mascotas en refugios" },
            { emoji: "💉", label: "Vacunas y atención veterinaria"          },
            { emoji: "🏠", label: "Mantenimiento de refugios temporales"    },
            { emoji: "🚗", label: "Transporte para rescates de emergencia"  },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid #F0F7FC" }}>
              <span className="text-xl">{item.emoji}</span>
              <p className="text-xs font-semibold text-[#3A3A3A]">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Métodos de pago */}
        <div>
          <p className="text-xs font-black text-[#9ABCCE] uppercase tracking-widest px-1 mb-2">
            Métodos de donación
          </p>
          <div className="flex flex-col gap-3">
            {METHODS.map((m) => (
              <PaymentCard key={m.name} {...m} />
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div
          className="rounded-3xl p-4"
          style={{ background: "#FDF3DC", border: "1.5px solid #C8960A" }}
        >
          <p className="font-black text-sm text-[#8B6500] mb-2">📋 ¿Cómo donar?</p>
          {[
            "Elige Yape, Plin o transferencia bancaria.",
            "Copia el número y realiza el envío.",
            "Agrega en el concepto tu nombre y 'Donación Patitas'.",
            "¡Listo! Tu aporte llegará directamente a los animales.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white font-black text-[10px] shrink-0 mt-0.5"
                style={{ background: "#C8960A" }}
              >
                {i + 1}
              </span>
              <p className="text-xs text-[#6B4A00] leading-snug">{step}</p>
            </div>
          ))}
        </div>

        {/* Gracias */}
        <p className="text-center text-xs text-[#9ABCCE] pb-2">
          🐾 Gracias por tu amor hacia los animales de Trujillo
        </p>
      </main>

      <BottomNavbar />
    </div>
  );
}