import { useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

// ── Subir imagen al bucket "mascotas" ─────────────────────────────────────────
export async function uploadPetImage(file, userId) {
  const ext      = file.name.split(".").pop();
  const filename = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("mascotas")
    .upload(filename, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from("mascotas")
    .getPublicUrl(filename);

  return data.publicUrl;
}

// ── Hook principal ────────────────────────────────────────────────────────────
export default function useMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  // fetchMascotas es estable — se llama manualmente desde el componente
  // con useEffect(() => { fetchMascotas(); }, [fetchMascotas])
  // El lint no se queja porque fetchMascotas no hace setState directamente
  // en el cuerpo del efecto, sino dentro de la promesa async
  const fetchMascotas = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("mascotas")
      .select(`
        id, nombre, tipo, edad, raza, personalidad,
        foto_url, estado, publicado_por, descripcion,
        refugios ( id, nombre, telefono, email )
      `)
      .eq("estado", "disponible")
      .order("creado_en", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setMascotas(data ?? []);
    }

    setLoading(false);
  }, []);

  // Publica una nueva mascota en Supabase
  const publicarMascota = async (insertData) => {
    const { data, error: insertError } = await supabase
      .from("mascotas")
      .insert(insertData)
      .select()
      .single();

    if (insertError) throw insertError;
    return data;
  };

  return { mascotas, loading, error, fetchMascotas, publicarMascota };
}