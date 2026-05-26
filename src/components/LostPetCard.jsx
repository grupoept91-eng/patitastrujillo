import dogImg from "../assets/pet/dog.png";
import catImg  from "../assets/pet/cat.png";

// Props:
// pet      : objeto con datos de la mascota perdida
// onDetail : función que recibe el pet para abrir detalle

export default function LostPetCard({ pet, onDetail }) {
  const isDog  = pet.type === "dog";
  const imgSrc = pet.fotoUrl ?? (isDog ? dogImg : catImg);

  return (
    <div
      className="bg-white flex flex-col overflow-hidden"
      style={{
        border:       "1.5px solid #1A1A1A",
        borderRadius: "1rem",
      }}
    >
      {/* ── Imagen ── */}
      <div
        className="w-full flex items-end justify-center"
        style={{
          background:   pet.avatarBg ?? "#D6EAC8",
          borderRadius: "0.75rem",
          margin:       "6px",
          width:        "calc(100% - 12px)",
          overflow:     "hidden",
          height:       "120px",
        }}
      >
        <img
          src={imgSrc}
          alt={pet.name}
          // Si la foto de Supabase falla, cae al placeholder local
          onError={(e) => {
            if (e.target.src !== (isDog ? dogImg : catImg)) {
              e.target.src = isDog ? dogImg : catImg;
            }
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Info ── */}
      <div className="px-3 pb-3 flex flex-col gap-1.5">
        {/* Badge */}
        <span
          className="font-black text-xs text-center"
          style={{ color: "#0D2B45", letterSpacing: "0.05em" }}
        >
          PERDIDO/A
        </span>

        {/* Nombre + ubicación */}
        <p className="text-xs text-center leading-tight" style={{ color: "#3A3A3A" }}>
          <span className="font-black">{pet.name}</span>
          {" "}- Perdido en{" "}
          <span className="font-semibold">{pet.location}</span>,{" "}
          {pet.date}
        </p>

        {/* Botón pill */}
        <button
          onClick={() => onDetail(pet)}
          className="mt-1 active:scale-95 transition-transform mx-auto"
          style={{
            padding:      "5px 14px",
            borderRadius: "999px",
            border:       "1.5px solid #C8960A",
            background:   "transparent",
            color:        "#8B6500",
            fontSize:     "0.7rem",
            fontWeight:   800,
            cursor:       "pointer",
            whiteSpace:   "nowrap",
          }}
        >
          Ver más detalles
        </button>
      </div>
    </div>
  );
}