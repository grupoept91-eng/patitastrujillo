import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { session } = useAuth();

  // Cargando sesión inicial
  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBF4FF]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-10 h-10 text-[#4A9FD4]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 10h-2a8 8 0 01-8-8z"/>
          </svg>
          <p className="text-[#4A9FD4] font-bold text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  return children;
}