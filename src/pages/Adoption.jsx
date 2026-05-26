import { useState, useEffect } from "react";
import TopNavbar       from "../components/TopNavbar";
import BottomNavbar    from "../components/BottomNavbar";
import PetCard         from "../components/PetCard";
import ContactModal    from "../components/ContactModal";
import PublishPetModal from "../components/PublishPetModal";
import useMascotas     from "../hooks/useMascotas";
import dogImg          from "../assets/pet/dog.png";
import catImg          from "../assets/pet/cat.png";

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#A0BCD0]">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

// Convierte fila de Supabase al formato que espera PetCard
const mapPet = (row) => {
  let contacto = {};
  try { contacto = JSON.parse(row.descripcion ?? "{}"); } catch { /* sin contacto extra */ }

  return {
    id:          row.id,
    name:        row.nombre,
    type:        row.tipo === "perro" ? "dog" : row.tipo === "gato" ? "cat" : "other",
    age:         row.edad          ?? "—",
    breed:       row.raza          ?? "—",
    trait:       row.personalidad  ?? "—",
    shelter:     row.refugios?.nombre ?? "Publicado por usuario",
    phone:       contacto.contacto_telefono ?? row.refugios?.telefono ?? "—",
    email:       contacto.contacto_email    ?? row.refugios?.email    ?? "—",
    contactName: contacto.contacto_nombre   ?? "Responsable",
    fotoUrl:     row.foto_url ?? null,
    avatarBg:    row.tipo === "perro" ? "#D6EAC8" : row.tipo === "gato" ? "#EDE8F5" : "#FEF3E2",
  };
};

export default function Adoption() {
  const { mascotas, loading, error, fetchMascotas } = useMascotas();
  const [search,      setSearch]      = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [showPublish, setShowPublish] = useState(false);
  const [successMsg,  setSuccessMsg]  = useState(false);

  // Carga inicial — llamada fuera del cuerpo del efecto para no disparar el warning
  useEffect(() => {
    fetchMascotas();
  }, [fetchMascotas]);

  const pets     = mascotas.map(mapPet);
  const filtered = pets.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.shelter.toLowerCase().includes(search.toLowerCase())
  );

  const handlePublishSuccess = () => {
    fetchMascotas();
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto">
      <TopNavbar backRoute="/dashboard"/>

      {/* Título y buscador */}
      <div className="px-4 pt-5 pb-3 bg-white">
        <h1 className="text-[#0D2B45] font-black text-[17px] uppercase tracking-wide mb-4 leading-tight">
          Adopta y Encuentra tu Refugio
        </h1>
        <div className="flex items-center gap-3 border border-[#C8DDE8] rounded-full px-4 py-2.5 bg-white">
          <IconSearch/>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar mascota o refugio..."
            className="flex-1 text-sm text-[#0D2B45] placeholder:text-[#A0BCD0] outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Banner éxito */}
      {successMsg && (
        <div className="mx-4 mb-2 px-4 py-3 rounded-2xl text-sm font-bold text-white flex items-center gap-2"
          style={{ background: "#27AE60" }}>
          ✅ ¡Mascota publicada! Ya aparece en la lista.
        </div>
      )}

      {/* Lista */}
      <main className="flex-1 px-4 pb-4 flex flex-col gap-3 overflow-y-auto">

        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-16 gap-3">
            <svg className="animate-spin w-8 h-8 text-[#4A9FD4]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z"/>
            </svg>
            <p className="text-sm text-[#9ABCCE] font-semibold">Cargando mascotas...</p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-4 px-4 py-3 rounded-2xl text-xs font-semibold text-red-600"
            style={{ background: "#FEF0EE", border: "1px solid #F0C5C0" }}>
            ⚠️ Error: {error}
            <button onClick={fetchMascotas} className="ml-2 underline font-black">Reintentar</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-3">🐾</span>
            <p className="text-[#0D2B45] font-black">
              {search ? "Sin resultados" : "Aún no hay mascotas publicadas"}
            </p>
            <p className="text-[#6B8FA8] text-sm mt-1">
              {search ? "Intenta con otra búsqueda" : "¡Sé el primero en publicar una!"}
            </p>
          </div>
        )}

        {!loading && !error && filtered.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            dogImg={dogImg}
            catImg={catImg}
            onContact={(p) => setSelectedPet(p)}
          />
        ))}
      </main>

      {/* FAB */}
      <button
        onClick={() => setShowPublish(true)}
        className="fixed bottom-20 right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-40"
        style={{ background: "#4A9FD4" }}
        aria-label="Publicar mascota en adopción"
      >
        <IconPlus/>
      </button>

      <BottomNavbar/>

      <ContactModal
        pet={selectedPet}
        onClose={() => setSelectedPet(null)}
      />

      {showPublish && (
        <PublishPetModal
          onClose={() => setShowPublish(false)}
          onSuccess={handlePublishSuccess}
        />
      )}
    </div>
  );
}