import dogImg from "../assets/pet/dog.png";
import catImg  from "../assets/pet/cat.png";

// Props:
// pet       : objeto con datos de la mascota
// onContact : función que recibe el pet para abrir el modal

export default function PetCard({ pet, onContact }) {
  const isDog = pet.type === "dog";

  // Si hay foto real de Supabase la usa, si no cae al SVG local
  const imgSrc = pet.fotoUrl
    ? pet.fotoUrl
    : isDog ? dogImg : catImg;

  return (
    <div
      className="bg-white flex overflow-hidden"
      style={{ border: "1.5px solid #1A1A1A", borderRadius: "1rem" }}
    >
      {/* Avatar */}
      <div
        className="shrink-0 flex items-end justify-center overflow-hidden"
        style={{
          width:        "100px",
          background:   pet.avatarBg ?? "#D6EAC8",
          borderRadius: "0.75rem",
          margin:       "6px",
          minHeight:    "100px",
        }}
      >
        <img
          src={imgSrc}
          alt={pet.name}
          className="w-full object-contain object-bottom"
          style={{ maxHeight: "100px" }}
          // Si la imagen de Supabase falla, cae al SVG local
          onError={(e) => { e.target.src = isDog ? dogImg : catImg; }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 px-3 py-3 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-black leading-tight" style={{ fontSize: "1.1rem", color: "#0D2B45" }}>
            {pet.name}
          </h3>
          <p className="text-xs mt-0.5 leading-snug" style={{ color: "#6B8FA8" }}>
            {pet.age}, {pet.breed}, {pet.trait}
          </p>
          <p className="text-xs mt-0.5 leading-snug" style={{ color: "#6B8FA8" }}>
            Refugio <span style={{ color: "#0D2B45", fontWeight: 700 }}>'{pet.shelter}'</span>
          </p>
        </div>

        <button
          onClick={() => onContact(pet)}
          className="mt-2.5 active:scale-95 transition-transform w-full"
          style={{
            padding:      "6px 10px",
            borderRadius: "999px",
            border:       "1.5px solid #C8960A",
            background:   "transparent",
            color:        "#8B6500",
            fontSize:     "0.7rem",
            fontWeight:   800,
            cursor:       "pointer",
            whiteSpace:   "nowrap",
            overflow:     "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Contáctanos para adoptar
        </button>
      </div>
    </div>
  );
}