import { useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

// ── Subir imagen al bucket "perdidas" ─────────────────────────────────────────
export async function uploadLostPetImage(file, userId) {
  const ext      = file.name.split(".").pop();
  const filename = `${userId ?? "anon"}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("perdidas")
    .upload(filename, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from("perdidas")
    .getPublicUrl(filename);

  return data.publicUrl;
}

// ── Hook principal ────────────────────────────────────────────────────────────
export default function useMascotasPerdidas() {
  const [perdidas, setPerdidas] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const fetchPerdidas = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("mascotas_perdidas")
      .select("*")
      .eq("estado", "perdido")
      .order("creado_en", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setPerdidas(data ?? []);
    }

    setLoading(false);
  }, []);

  const reportarPerdida = async (insertData) => {
    const { data, error: insertError } = await supabase
      .from("mascotas_perdidas")
      .insert(insertData)
      .select()
      .single();

    if (insertError) throw insertError;
    return data;
  };

  const marcarEncontrado = async (id) => {
    const { error: updateError } = await supabase
      .from("mascotas_perdidas")
      .update({ estado: "encontrado" })
      .eq("id", id);

    if (updateError) throw updateError;
    setPerdidas((prev) => prev.filter((p) => p.id !== id));
  };

  return { perdidas, loading, error, fetchPerdidas, reportarPerdida, marcarEncontrado };
}