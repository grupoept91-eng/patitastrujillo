import { useState } from "react";
import TopNavbar      from "../components/TopNavbar";
import BottomNavbar   from "../components/BottomNavbar";
import LostPetCard    from "../components/LostPetCard";
import LostPetDetail  from "../components/LostPetDetail";

// ── Datos mock ─────────────────────────────────────────────────────────────────
// TODO: reemplazar con consulta a Supabase — tabla "mascotas_perdidas"
const LOST_PETS = [
  {
    id: 1, name: "Panchito", type: "dog",
    location: "Vista Alegre", date: "12 Oct",
    desc:  "Marrón claro, tamaño mediano. Collar azul.",
    phone: "+51 999 100 200",
    avatarBg: "#D6EAC8",
    reward: "100",
  },
  {
    id: 2, name: "Mishi", type: "cat",
    location: "Vista Alegre", date: "12 Oct",
    desc:  "Atigrada, ojos verdes. Muy asustadiza.",
    phone: "+51 999 300 400",
    avatarBg: "#F5E6EA",
  },
  {
    id: 3, name: "Bruno", type: "dog",
    location: "El Porvenir", date: "15 Oct",
    desc:  "Negro con manchas blancas. Talla grande.",
    phone: "+51 999 500 600",
    avatarBg: "#DDE8F5",
    reward: "50",
  },
  {
    id: 4, name: "Luna", type: "cat",
    location: "Florencia de Mora", date: "18 Oct",
    desc:  "Gris ceniza, pelaje largo. Muy cariñosa.",
    phone: "+51 999 700 800",
    avatarBg: "#EDE8F5",
  },
  {
    id: 5, name: "Max", type: "dog",
    location: "Urb. California", date: "20 Oct",
    desc:  "Beige, raza mediana. Le falta un colmillo.",
    phone: "+51 999 900 001",
    avatarBg: "#FEF3DC",
    reward: "200",
  },
];

// ── Pantalla ──────────────────────────────────────────────────────────────────
export default function LostPets() {
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#EBF4FF" }}
    >
      {/* Navbar superior */}
      <TopNavbar backRoute="/dashboard" />

      {/* Título */}
      <div className="px-4 pt-5 pb-3">
        <h1
          className="font-black text-center leading-tight"
          style={{ fontSize: "1.35rem", color: "#0D2B45", textTransform: "uppercase" }}
        >
          Mascotas Perdidas /{"\n"}Reportadas
        </h1>
      </div>

      {/* Grid 2 columnas */}
      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {LOST_PETS.map((pet) => (
            <LostPetCard
              key={pet.id}
              pet={pet}
              onDetail={(p) => setSelectedPet(p)}
            />
          ))}
        </div>
      </main>

      {/* FAB + */}
      <button
        className="fixed bottom-20 right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-40"
        style={{ background: "#C8960A" }}
        onClick={() => {/* TODO: navegar a formulario de reporte */}}
        aria-label="Reportar mascota perdida"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-7 h-7">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {/* Navbar inferior */}
      <BottomNavbar />

      {/* Modal detalle */}
      <LostPetDetail
        pet={selectedPet}
        onClose={() => setSelectedPet(null)}
      />
    </div>
  );
}