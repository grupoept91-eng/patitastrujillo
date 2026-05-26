import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import AuthContext from "./AuthContext";

// Solo exporta el componente — Fast Refresh happy
export default function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = cargando
  const [perfil,  setPerfil]  = useState(null);

  const cargarPerfil = async (userId) => {
    const { data } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", userId)
      .single();
    setPerfil(data ?? null);
  };

  useEffect(() => {
    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) cargarPerfil(session.user.id);
    });

    // Escucha cambios (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) cargarPerfil(session.user.id);
      else setPerfil(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, perfil, setPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}