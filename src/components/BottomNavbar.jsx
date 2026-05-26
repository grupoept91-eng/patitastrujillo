import { useNavigate, useLocation } from "react-router-dom";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V20a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9.5" />
  </svg>
);

const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <ellipse cx="6.5"  cy="7.5" rx="1.5" ry="2.2" />
    <ellipse cx="10.5" cy="5.5" rx="1.5" ry="2.2" />
    <ellipse cx="14.5" cy="5.5" rx="1.5" ry="2.2" />
    <ellipse cx="18"   cy="7.5" rx="1.5" ry="2.2" />
    <path d="M8.5 11.5c-2.5 0-4.5 1.8-4.5 4.5 0 2.5 1.8 4 6 4s6-1.5 6-4c0-2.7-2-4.5-4.5-4.5h-3z" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <rect x="2" y="8" width="20" height="13" rx="2.5" />
    <circle cx="12" cy="14.5" r="3.5" />
    <path d="M8 8V6.5A1.5 1.5 0 019.5 5h5A1.5 1.5 0 0116 6.5V8" />
    <circle cx="18" cy="11.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M6 10a6 6 0 0112 0c0 4.5 2 6.5 2 6.5H4s2-2 2-6.5z" />
    <path d="M10.3 21a2 2 0 003.4 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="12" cy="12" r="3" />
    <path strokeWidth="2" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const NAV_ITEMS = [
  { id: "home",     route: "/dashboard", Icon: HomeIcon     },
  { id: "paw",      route: "/donate",    Icon: PawIcon      },
  { id: "camera",   route: "/camera",    Icon: CameraIcon   },
  { id: "bell",     route: "/alerts",    Icon: BellIcon     },
  { id: "settings", route: "/settings",  Icon: SettingsIcon },
];

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeId = NAV_ITEMS.find((item) =>
    location.pathname === item.route
  )?.id ?? "home";

  return (
    <>
      {/* Espaciador para que el contenido no quede tapado */}
      <div className="h-16 shrink-0" />

      {/* Navbar fijo al fondo */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center px-4 py-3 max-w-sm mx-auto"
        style={{
          background:   "white",
          borderTop:    "1px solid #D8ECF8",
          boxShadow:    "0 -2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {NAV_ITEMS.map(({ id, route, Icon }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => navigate(route)}
              className="flex-1 flex justify-center items-center py-1"
            >
              <span className={isActive ? "text-[#1E6FAD]" : "text-[#B0CCDF]"}>
                <Icon />
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}