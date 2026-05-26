import { useNavigate } from "react-router-dom";
 import BottomNavbar from "../components/BottomNavbar";

import BannerPrincipal from "../assets/img/banner.png";
import IconoAdopta from "../assets/img/adopta.png";
import IconoDenuncia from "../assets/img/denuncia.png";
import IconoPerdidos from "../assets/img/perdidas.png";
import IconoSalud from "../assets/img/consejos.png";


function Card({ bg, title, desc, onClick, imageSrc }) {
  return (
    <button
      onClick={onClick}
      className={`${bg} border-[2.5px] border-[#1a3a5c] rounded-[45px] p-5 flex flex-col items-center text-center gap-2 active:scale-95 transition-transform w-full shadow-sm`}
    >
      <div className="flex items-center justify-center h-20 w-full mb-1">
        <img src={imageSrc} alt={title} className="w-16 h-16 object-contain" />
      </div>
      <p className="text-[#0D3B6E] font-black text-[13px] leading-tight uppercase">
        {title}
      </p>
      <p className="text-[#546E7A] text-[10px] leading-tight font-bold">
        {desc}
      </p>
    </button>
  );
}

// --- DASHBOARD PRINCIPAL ---
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Quicksand',sans-serif] relative">
      {/* SECCIÓN 2: TU IMAGEN DE PROYECTO (BANNER) */}
      <div className="px-6 my-2">
        <div className="w-full h-auto min-h-[80px] rounded-2xl overflow-hidden">
          <img 
            src={BannerPrincipal}
            alt="Banner Patitas" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* SECCIÓN 3: CUADRÍCULA DE TARJETAS */}
      <main className="flex-1 px-6 pb-10 pt-2">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Card 
            bg="bg-[#E8F4FB]" 
            title={"ADOPTA &\nREFUGIOS"} 
            desc="Encuentra mascotas en refugios y dales un hogar"
            onClick={() => navigate("/adoption")}
            imageSrc={IconoAdopta}
          />

          <Card 
            bg="bg-[#FDEEE8]" 
            title={"DENUNCIA\nMALTRATO"} 
            desc="Reporta casos de maltrato de forma confidencial"
            onClick={() => navigate("/report")}
            imageSrc={IconoDenuncia}
          />

          <Card 
            bg="bg-[#FEF6E0]" 
            title={"MASCOTAS\nPÉRDIDAS"} 
            desc="Ayuda a encontrar a las mascotas extraviadas"
            onClick={() => navigate("/lost")}
            imageSrc={IconoPerdidos}
          />

          <Card 
            bg="bg-[#EAF6EC]" 
            title={"CONSEJOS\n& SALUD"} 
            desc="Cuidado, vacunas y tips para tu mascota"
            onClick={() => navigate("/tips")}
            imageSrc={IconoSalud}
          />
        </div>
      </main>
      <BottomNavbar />

    </div>
  );
}
