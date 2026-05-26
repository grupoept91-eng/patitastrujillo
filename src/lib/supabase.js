import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env");
}

// Supabase guarda la sesión en localStorage automáticamente.
// persistSession: true + detectSessionInUrl: false es suficiente para
// que la sesión sobreviva cierres de app en Capacitor/WebView Android.
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession:    true,   // guarda el token en localStorage
    detectSessionInUrl:false,  // no necesario en apps móviles
    autoRefreshToken:  true,   // renueva el token antes de que expire
  },
});