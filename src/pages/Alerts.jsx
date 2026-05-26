import { useState, useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { supabase } from "../lib/supabase";
import useAuth from "../hooks/useAuth";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

// ── Solicitar permisos al montar ──────────────────────────────────────────────
async function requestNotifPermission() {
  try {
    const { display } = await LocalNotifications.requestPermissions();
    return display === "granted";
  } catch {
    return false;
  }
}

// ── Disparar notificación local ───────────────────────────────────────────────
async function sendLocalNotif(title, body) {
  try {
    await LocalNotifications.schedule({
      notifications: [{
        id:    Math.floor(Math.random() * 100000),
        title,
        body,
        schedule: { at: new Date(Date.now() + 500) },
        sound:    null,
        smallIcon: "ic_launcher",
      }],
    });
  } catch (err) {
    console.log("Notif error:", err);
  }
}

const MOCK_ALERTS = [
  {
    id:      1,
    type:    "adoption",
    title:   "Interés en adoptar a Canuto",
    body:    "Alguien quiere contactarte sobre tu publicación de Canuto.",
    time:    "Hace 5 min",
    read:    false,
    color:   "#4A9FD4",
    emoji:   "🐶",
  },
  {
    id:      2,
    type:    "lost",
    title:   "Avistamiento de Kira",
    body:    "Un usuario reportó ver a una mascota similar a Kira en Vista Alegre.",
    time:    "Hace 23 min",
    read:    false,
    color:   "#C8960A",
    emoji:   "🔍",
  },
  {
    id:      3,
    type:    "adoption",
    title:   "Consulta sobre Lola",
    body:    "Tienes una nueva consulta sobre la mascota Lola en adopción.",
    time:    "Hace 1 hora",
    read:    true,
    color:   "#4A9FD4",
    emoji:   "🐱",
  },
  {
    id:      4,
    type:    "lost",
    title:   "Recompensa reclamada",
    body:    "Alguien dice tener información sobre Bruno. Revisa tu WhatsApp.",
    time:    "Ayer",
    read:    true,
    color:   "#27AE60",
    emoji:   "💰",
  },
];

// ── Tarjeta de alerta ─────────────────────────────────────────────────────────
function AlertCard({ alert, onRead }) {
  return (
    <button
      onClick={() => onRead(alert.id)}
      className="w-full flex items-start gap-3 p-4 text-left active:opacity-80 transition-opacity bg-white rounded-2xl"
      style={{
        border:     `1.5px solid ${alert.read ? "#E8F0F8" : alert.color + "55"}`,
        background: alert.read ? "white" : alert.color + "0A",
      }}
    >
      {/* Emoji */}
      <div
        className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
        style={{ background: alert.color + "18" }}
      >
        {alert.emoji}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm leading-tight"
          style={{ color: "#0D2B45", fontWeight: alert.read ? 600 : 900 }}
        >
          {alert.title}
        </p>
        <p className="text-xs mt-1 leading-snug" style={{ color: "#6B8FA8" }}>
          {alert.body}
        </p>
        <p className="text-xs mt-1.5 font-bold" style={{ color: "#A0BCD0" }}>
          {alert.time}
        </p>
      </div>

      {/* Punto no leído */}
      {!alert.read && (
        <div
          className="shrink-0 w-2.5 h-2.5 rounded-full mt-1"
          style={{ background: alert.color }}
        />
      )}
    </button>
  );
}

// ── Pantalla ──────────────────────────────────────────────────────────────────
export default function Alerts() {
  const { session }   = useAuth();
  const [alerts, setAlerts]     = useState(MOCK_ALERTS);
  const [permGranted, setPermGranted] = useState(false);
  const [testSent,    setTestSent]    = useState(false);

  const unreadCount = alerts.filter((a) => !a.read).length;

  useEffect(() => {
    requestNotifPermission().then(setPermGranted);
  }, []);

  // Simula polling — en producción usar Supabase Realtime
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel("alertas-usuario")
      .on(
        "postgres_changes",
        {
          event:  "INSERT",
          schema: "public",
          table:  "mascotas_perdidas",
          // filter: `reportado_por=eq.${session.user.id}` -- cuando tengas RLS correcta
        },
        async (payload) => {
          const nueva = {
            id:    Date.now(),
            type:  "lost",
            title: "Nueva mascota perdida reportada",
            body:  `Se reportó: ${payload.new.nombre} en ${payload.new.ubicacion}`,
            time:  "Ahora",
            read:  false,
            color: "#C8960A",
            emoji: "🔍",
          };
          setAlerts((prev) => [nueva, ...prev]);
          await sendLocalNotif(nueva.title, nueva.body);
        }
      )
      .on(
        "postgres_changes",
        {
          event:  "INSERT",
          schema: "public",
          table:  "mascotas",
        },
        async (payload) => {
          const nueva = {
            id:    Date.now(),
            type:  "adoption",
            title: "Nueva mascota en adopción",
            body:  `${payload.new.nombre} está disponible para adopción.`,
            time:  "Ahora",
            read:  false,
            color: "#4A9FD4",
            emoji: "🐾",
          };
          setAlerts((prev) => [nueva, ...prev]);
          await sendLocalNotif(nueva.title, nueva.body);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [session]);

  const markRead = (id) =>
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a));

  const markAllRead = () =>
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));

  const sendTestNotif = async () => {
    await sendLocalNotif(
      "🐾 Patitas Trujillo",
      "¡Alguien está interesado en adoptar a tu mascota!"
    );
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Nunito',sans-serif] max-w-sm mx-auto"
      style={{ background: "#EBF4FF" }}
    >
      <TopNavbar backRoute="/dashboard" />

      <main className="flex-1 px-4 pt-5 pb-6 overflow-y-auto flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-black text-xl" style={{ color: "#0D2B45" }}>
              Notificaciones
              {unreadCount > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs text-white font-black"
                  style={{ background: "#E74C3C" }}
                >
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "#9ABCCE" }}>
              Actividad de tus publicaciones
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-black px-3 py-1.5 rounded-xl active:opacity-70"
              style={{ background: "#EBF4FF", color: "#4A9FD4", border: "1.5px solid #C5DFEE" }}
            >
              Leer todas
            </button>
          )}
        </div>

        {/* Banner permisos */}
        {!permGranted && (
          <div
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{ background: "#FEF3DC", border: "1.5px solid #C8960A" }}
          >
            <span className="text-xl shrink-0">🔔</span>
            <div>
              <p className="font-black text-sm" style={{ color: "#8B6500" }}>
                Activa las notificaciones
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#6B4A00" }}>
                Para recibir alertas cuando alguien responda a tus publicaciones.
              </p>
            </div>
          </div>
        )}

        {/* Botón prueba */}
        {permGranted && (
          <button
            onClick={sendTestNotif}
            className="w-full py-3 rounded-2xl font-black text-sm active:scale-[0.98] transition-transform"
            style={{
              background:  testSent ? "#EEFAF4" : "#EBF4FF",
              border:      `1.5px solid ${testSent ? "#27AE60" : "#C5DFEE"}`,
              color:       testSent ? "#1E8A4A" : "#4A9FD4",
            }}
          >
            {testSent ? "✅ Notificación enviada" : "🔔 Probar notificación"}
          </button>
        )}

        {/* Filtros */}
        <div className="flex gap-2">
          {["Todas", "Adopción", "Perdidas"].map((f) => (
            <button
              key={f}
              className="px-3 py-1.5 rounded-full text-xs font-black border-2 transition-all"
              style={{
                background:  f === "Todas" ? "#4A9FD4" : "white",
                borderColor: f === "Todas" ? "#4A9FD4" : "#D8E8F0",
                color:       f === "Todas" ? "white" : "#7A9BB5",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-3">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-5xl mb-3">🔔</span>
              <p className="font-black text-[#0D2B45]">Sin notificaciones</p>
              <p className="text-sm text-[#9ABCCE] mt-1">
                Te avisaremos cuando haya actividad en tus publicaciones
              </p>
            </div>
          ) : (
            alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onRead={markRead} />
            ))
          )}
        </div>

      </main>

      <BottomNavbar />
    </div>
  );
}