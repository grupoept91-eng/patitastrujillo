import { useNavigate } from "react-router-dom";
import TopNavbar    from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

// ── Íconos de los pasos ───────────────────────────────────────────────────────
const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#8B6500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="2" y="7" width="20" height="14" rx="2.5" />
    <circle cx="12" cy="14" r="3.5" />
    <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7" />
    <circle cx="18" cy="10.5" r="0.8" fill="#8B6500" stroke="none" />
  </svg>
);

const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#C0785A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
    {/* Mapa base */}
    <path d="M3 20 Q7 17 12 19 Q17 21 21 18" stroke="#8B6500" strokeWidth="1" opacity="0.5" />
  </svg>
);

const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#8B6500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 7h8M8 11h8M8 15h5" />
  </svg>
);

const IconOfficer = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Gorra */}
    <path d="M7 9h10" stroke="#4A7AB5" strokeWidth="2" />
    <path d="M8 9 Q12 6 16 9" fill="#4A7AB5" stroke="#4A7AB5" />
    {/* Cabeza */}
    <circle cx="12" cy="13" r="4" fill="#F5CBA7" stroke="#D4956A" strokeWidth="1" />
    {/* Cuerpo uniforme */}
    <path d="M6 22 Q6 18 12 18 Q18 18 18 22" fill="#4A7AB5" stroke="#4A7AB5" strokeWidth="1" />
    {/* Insignia */}
    <circle cx="12" cy="20" r="1.2" fill="#F5A623" stroke="none" />
  </svg>
);

const STEPS = [
  { n: 1, Icon: IconCamera,  title: "Recopila Evidencias", desc: "Fotos y videos claros."               },
  { n: 2, Icon: IconMapPin,  title: "Ubicación Precisa",   desc: "Dirección exacta en Trujillo."        },
  { n: 3, Icon: IconDoc,     title: "Describe los Hechos", desc: "Relato detallado de lo ocurrido."     },
  { n: 4, Icon: IconOfficer, title: "Acude a la Comisaría",desc: "Presenta tu denuncia formal."         },
];

const COMISARIAS = ["Comisaría El Porvenir", "Comisaría Florencia de Mora"];

// ── Pantalla ──────────────────────────────────────────────────────────────────
export default function Report() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#EBF4FF" }}
    >
      <TopNavbar backRoute="/dashboard" />

      <main className="flex-1 px-5 pt-5 pb-6 overflow-y-auto flex flex-col gap-5">

        {/* Título */}
        <h1
          className="font-black text-center leading-tight"
          style={{ fontSize: "1.3rem", color: "#0D2B45", textTransform: "uppercase" }}
        >
          Reporte de Maltrato -{"\n"}Paso a Paso
        </h1>

        {/* Pasos */}
        <div className="flex flex-col gap-4">
          {STEPS.map(({ n, Icon, title, desc }) => (
            <div key={n} className="flex items-center gap-4">
              {/* Número + ícono */}
              <div className="relative shrink-0">
                {/* Círculo número */}
                <div
                  className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full flex items-center justify-center font-black text-xs z-10"
                  style={{ background: "#FDF3DC", border: "1.5px solid #C8960A", color: "#8B6500" }}
                >
                  {n}
                </div>
                {/* Cuadro ícono */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "#FDF3DC", border: "1.5px solid #E8D090" }}
                >
                  <Icon />
                </div>
              </div>

              {/* Texto */}
              <div>
                <p className="font-black text-lg" style={{ color: "#0D2B45" }}>{title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B8FA8" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ley */}
        <p className="text-center text-sm" style={{ color: "#3A3A3A" }}>
          Estás protegido por la{" "}
          <span className="font-black">LEY Nº 30407</span>
          {"\n"}(Protección y Bienestar Animal).
        </p>

        {/* Comisarías */}
        <div className="text-center">
          <p className="font-black text-sm mb-1" style={{ color: "#0D2B45" }}>
            Comisarías sugeridas:
          </p>
          {COMISARIAS.map((c) => (
            <p key={c} className="text-sm" style={{ color: "#3A3A3A" }}>{c}</p>
          ))}
        </div>

        {/* Botón llenar formulario */}
        <button
          onClick={() => navigate("/report/form")}
          className="w-full py-4 rounded-2xl font-black text-sm tracking-wide active:scale-[0.98] transition-transform"
          style={{
            background:  "transparent",
            border:      "2px solid #C8960A",
            color:       "#8B6500",
            letterSpacing: "0.05em",
          }}
        >
          LLENAR FORMULARIO CONFIDENCIAL
        </button>
      </main>

      <BottomNavbar />
    </div>
  );
}