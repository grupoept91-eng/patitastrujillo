import { useState, useEffect } from "react";
import TopNavbar             from "../components/TopNavbar";
import BottomNavbar          from "../components/BottomNavbar";
import LostPetCard           from "../components/LostPetCard";
import LostPetDetail         from "../components/LostPetDetail";
import LostPetForm           from "../components/LostPetForm";
import useMascotasPerdidas   from "../hooks/useMascotasPerdidas";
import dogImg                from "../assets/pet/dog.png";
import catImg                from "../assets/pet/cat.png";

// Convierte fila de Supabase al formato que esperan LostPetCard / LostPetDetail
const mapPerdida = (row) => {
  const fecha = row.fecha_perdida
    ? new Date(row.fecha_perdida + "T00:00:00").toLocaleDateString("es-PE", {
        day:   "numeric",
        month: "short",
      })
    : "—";

  const bgMap = { perro: "#D6EAC8", gato: "#F5E6EA", otro: "#DDE8F5" };

  return {
    id:       row.id,
    name:     row.nombre,
    type:     row.tipo === "perro" ? "dog" : row.tipo === "gato" ? "cat" : "other",
    location: row.ubicacion,
    date:     fecha,
    desc:     row.descripcion ?? "Sin descripción",
    phone:    row.telefono,
    reward:   row.recompensa ?? null,
    fotoUrl:  row.foto_url   ?? null,
    avatarBg: bgMap[row.tipo] ?? "#EDE8F5",
    estado:   row.estado,
  };
};

export default function LostPets() {
  const { perdidas, loading, error, fetchPerdidas, marcarEncontrado } =
    useMascotasPerdidas();

  const [selectedPet,  setSelectedPet]  = useState(null);
  const [showForm,     setShowForm]      = useState(false);
  const [successMsg,   setSuccessMsg]    = useState(false);

  useEffect(() => {
    fetchPerdidas();
  }, [fetchPerdidas]);

  const pets = perdidas.map(mapPerdida);

  const handleSuccess = () => {
    fetchPerdidas();
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  // Cierra el detalle y marca encontrada (opcional desde el modal)
  const handleFoundFromDetail = async (pet) => {
    await marcarEncontrado(pet.id);
    setSelectedPet(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#EBF4FF" }}
    >
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

      {/* Banner éxito */}
      {successMsg && (
        <div
          className="mx-4 mb-2 px-4 py-3 rounded-2xl text-sm font-bold text-white flex items-center gap-2"
          style={{ background: "#C8960A" }}
        >
          🐾 ¡Reporte publicado! Ya aparece en la lista.
        </div>
      )}

      {/* Contenido */}
      <main className="flex-1 px-4 pb-24 overflow-y-auto">

        {/* Cargando */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg className="animate-spin w-8 h-8 text-[#C8960A]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z" />
            </svg>
            <p className="text-sm text-[#9ABCCE] font-semibold">Cargando reportes...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="mt-4 px-4 py-3 rounded-2xl text-xs font-semibold text-red-600"
            style={{ background: "#FEF0EE", border: "1px solid #F0C5C0" }}
          >
            ⚠️ Error: {error}
            <button onClick={fetchPerdidas} className="ml-2 underline font-black">
              Reintentar
            </button>
          </div>
        )}

        {/* Vacío */}
        {!loading && !error && pets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-3">🔍</span>
            <p className="text-[#0D2B45] font-black">No hay reportes activos</p>
            <p className="text-[#6B8FA8] text-sm mt-1">
              ¿Perdiste a tu mascota? Repórtala con el botón +
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && pets.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {pets.map((pet) => (
              <LostPetCard
                key={pet.id}
                pet={pet}
                dogImg={dogImg}
                catImg={catImg}
                onDetail={(p) => setSelectedPet(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        className="fixed bottom-20 right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-40"
        style={{ background: "#C8960A" }}
        onClick={() => setShowForm(true)}
        aria-label="Reportar mascota perdida"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-7 h-7">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <BottomNavbar />

      {/* Modales */}
      <LostPetDetail
        pet={selectedPet}
        onClose={() => setSelectedPet(null)}
        onFound={handleFoundFromDetail}
      />

      {showForm && (
        <LostPetForm
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}