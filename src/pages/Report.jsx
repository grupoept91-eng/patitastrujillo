import { useNavigate } from "react-router-dom";
import TopNavbar    from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

import ImgCamara    from "../assets/img/camara.png";
import ImgUbicacion from "../assets/img/ubicacion.png";
import ImgDocumento from "../assets/img/documento.png";
import ImgPolicia   from "../assets/img/policia.png";

const STEPS = [
  { n: 1, img: ImgCamara,    title: "Recopila Evidencias", desc: "Fotos y videos claros."           },
  { n: 2, img: ImgUbicacion, title: "Ubicación Precisa",   desc: "Dirección exacta en Trujillo."    },
  { n: 3, img: ImgDocumento, title: "Describe los Hechos", desc: "Relato detallado de lo ocurrido." },
  { n: 4, img: ImgPolicia,   title: "Acude a la Comisaría",desc: "Presenta tu denuncia formal."     },
];

const COMISARIAS = ["Comisaría El Porvenir", "Comisaría Florencia de Mora"];

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
        <div className="flex flex-col gap-3">
          {STEPS.map(({ n, img, title, desc }) => (
            <div key={n} className="flex items-center gap-3">

              {/* Número */}
              <div
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs"
                style={{
                  background: "#FDF3DC",
                  border:     "1.5px solid #C8960A",
                  color:      "#8B6500",
                }}
              >
                {n}
              </div>

              {/* Ícono PNG sin cuadro */}
              <img
                src={img}
                alt={title}
                className="shrink-0 object-contain"
                style={{ width: "52px", height: "52px" }}
              />

              {/* Texto */}
              <div className="flex flex-col">
                <p className="font-black text-base leading-tight" style={{ color: "#0D2B45" }}>
                  {title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#6B8FA8" }}>
                  {desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Separador */}
        <div className="h-px" style={{ background: "#D8E8F0" }} />

        {/* Ley */}
        <p className="text-sm text-center" style={{ color: "#3A3A3A", lineHeight: 1.7 }}>
          Estás protegido por la{" "}
          <span className="font-black" style={{ color: "#0D2B45" }}>LEY Nº 30407</span>
          <br />
          (Protección y Bienestar Animal).
        </p>

        {/* Comisarías */}
        <div className="text-center -mt-2">
          <p className="font-black text-sm mb-1" style={{ color: "#0D2B45" }}>
            Comisarías sugeridas:
          </p>
          {COMISARIAS.map((c) => (
            <p key={c} className="text-sm" style={{ color: "#3A3A3A" }}>
              {c}
            </p>
          ))}
        </div>

        {/* Botón formulario — fondo amarillo relleno */}
        <button
          onClick={() => navigate("/report/form")}
          className="w-full py-4 rounded-2xl font-black text-sm tracking-wide active:scale-[0.98] transition-transform"
          style={{
            background:    "#C8960A",
            border:        "none",
            color:         "white",
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