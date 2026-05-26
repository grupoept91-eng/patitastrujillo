import { useNavigate } from "react-router-dom";
import bannerTop from "../assets/img/bannertop.png";

const IconArrowLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

// Props:
// backRoute : ruta al presionar ← (default "/dashboard")
// hideBack  : oculta la flecha (para el Dashboard)

export default function TopNavbar({ backRoute = "/dashboard", hideBack = false }) {
  const navigate = useNavigate();

  return (
    <header
      className="w-full shrink-0 flex items-center px-4 pt-10 pb-3"
      style={{
        background:              "#4A9FD4",
        borderBottomLeftRadius:  "1.5rem",
        borderBottomRightRadius: "1.5rem",
      }}
    >
      {/* Columna izquierda — flecha */}
      <div className="w-10 shrink-0">
        {!hideBack && (
          <button
            onClick={() => navigate(backRoute)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 text-white active:bg-white/40 transition-colors"
            aria-label="Volver"
          >
            <IconArrowLeft />
          </button>
        )}
      </div>

      {/* Centro — imagen del banner */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={bannerTop}
          alt="Patitas Trujillo"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Columna derecha — equilibra la flecha */}
      <div className="w-10 shrink-0" />
    </header>
  );
}