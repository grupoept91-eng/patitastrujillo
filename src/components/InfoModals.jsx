// ── Componente base de modal ──────────────────────────────────────────────────
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const PawPrint = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor">
    <ellipse cx="8"  cy="14" rx="3.5" ry="5"/><ellipse cx="15" cy="9" rx="3.5" ry="5"/>
    <ellipse cx="25" cy="9" rx="3.5" ry="5"/><ellipse cx="32" cy="14" rx="3.5" ry="5"/>
    <path d="M20 17c-7 0-12 4-12 10.5C8 33 11.5 36 20 36s12-3 12-8.5C32 21 27 17 20 17z"/>
  </svg>
);

function BaseModal({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-t-3xl shadow-2xl flex flex-col"
        style={{ maxHeight: "88vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// Sección con título y párrafo
function Section({ title, children }) {
  return (
    <div className="mb-4">
      <p className="font-black text-sm mb-1.5" style={{ color: "#0D2B45" }}>{title}</p>
      <div className="text-xs leading-relaxed" style={{ color: "#5A7A8A" }}>{children}</div>
    </div>
  );
}

// ── MODAL: Sobre Patitas Trujillo ─────────────────────────────────────────────
export function AboutModal({ onClose }) {
  return (
    <BaseModal onClose={onClose}>
      {/* Handle */}
      <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mt-4 mb-0 shrink-0" />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#4A9FD4" }}>
            <PawPrint className="w-7 h-7 text-[#D4A847]" />
          </div>
          <div>
            <p className="font-black text-lg leading-none" style={{ color: "#0D2B45" }}>Patitas Trujillo</p>
            <p className="text-xs mt-0.5" style={{ color: "#9ABCCE" }}>Versión 1.0.0</p>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#9ABCCE] active:opacity-70" style={{ background: "#F0F7FC" }}>
          <IconX />
        </button>
      </div>

      <div className="h-px mx-5 shrink-0" style={{ background: "#EBF4FF" }} />

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-4">

        {/* Misión */}
        <div className="rounded-2xl p-4 mb-4 text-center" style={{ background: "#EBF4FF" }}>
          <p className="text-2xl mb-2">🐾</p>
          <p className="font-black text-sm" style={{ color: "#0D2B45" }}>
            "Cuidamos a quienes no tienen voz"
          </p>
          <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#5A7A8A" }}>
            Somos una plataforma digital dedicada al bienestar animal en la ciudad de Trujillo, La Libertad.
          </p>
        </div>

        <Section title="¿Qué es Patitas Trujillo?">
          Patitas Trujillo es una aplicación móvil creada para conectar a la comunidad con refugios locales, facilitar la adopción responsable, reportar casos de maltrato animal y ayudar a encontrar mascotas perdidas.
        </Section>

        <Section title="Nuestra Misión">
          Promover el bienestar animal en Trujillo mediante la tecnología, educando a la comunidad y brindando herramientas para actuar ante situaciones de vulnerabilidad animal.
        </Section>

        <Section title="¿Qué puedes hacer con la app?">
          <ul className="flex flex-col gap-1.5 mt-1">
            {[
              "🏠 Adoptar mascotas de refugios registrados",
              "🔍 Reportar y encontrar mascotas perdidas",
              "📢 Denunciar casos de maltrato animal",
              "💊 Acceder a guías de salud y bienestar",
              "💛 Donar para apoyar a los refugios",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Contacto">
          <div className="flex flex-col gap-1 mt-1">
            <p>📧 contacto@patitastrujillo.pe</p>
            <p>📱 +51 999 000 111</p>
            <p>📍 Trujillo, La Libertad, Perú</p>
          </div>
        </Section>

        <Section title="Desarrollado con">
          <p>Con ❤️ por y para la comunidad trujillana. Esta aplicación es un proyecto sin fines de lucro orientado a mejorar la calidad de vida de los animales en nuestra región.</p>
        </Section>

        <div className="rounded-2xl p-3 mt-2 text-center" style={{ background: "#FDF3DC", border: "1.5px solid #C8960A" }}>
          <p className="text-xs font-bold" style={{ color: "#8B6500" }}>
            🐶 ¡Juntos hacemos la diferencia por los animales de Trujillo!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 shrink-0" style={{ borderTop: "1px solid #EBF4FF" }}>
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-black text-sm text-white active:scale-[0.98] transition-transform"
          style={{ background: "#4A9FD4" }}
        >
          Cerrar
        </button>
      </div>
    </BaseModal>
  );
}

// ── MODAL: Política de Privacidad ─────────────────────────────────────────────
export function PrivacyModal({ onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mt-4 shrink-0" />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0">
        <div>
          <p className="font-black text-lg" style={{ color: "#0D2B45" }}>Política de Privacidad</p>
          <p className="text-xs" style={{ color: "#9ABCCE" }}>Última actualización: Mayo 2026</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#9ABCCE] active:opacity-70" style={{ background: "#F0F7FC" }}>
          <IconX />
        </button>
      </div>

      <div className="h-px mx-5 shrink-0" style={{ background: "#EBF4FF" }} />

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-5 py-4">

        <div className="rounded-2xl p-3 mb-4" style={{ background: "#EEFAF4", border: "1.5px solid #B8E4CB" }}>
          <p className="text-xs font-bold" style={{ color: "#1E8A4A" }}>
            🔒 Tu privacidad es nuestra prioridad. Nunca vendemos ni compartimos tu información personal con terceros.
          </p>
        </div>

        <Section title="1. Información que recopilamos">
          Al usar Patitas Trujillo, podemos recopilar: nombre completo, correo electrónico, número de teléfono (opcional), ubicación aproximada al reportar una mascota, y fotos o videos cargados voluntariamente como evidencia.
        </Section>

        <Section title="2. ¿Para qué usamos tu información?">
          <ul className="flex flex-col gap-1 mt-1">
            {[
              "Gestionar tu cuenta y autenticación.",
              "Procesar reportes de maltrato o mascotas perdidas.",
              "Facilitar el contacto entre adoptantes y refugios.",
              "Enviar notificaciones relevantes sobre la app.",
              "Mejorar la experiencia del usuario.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <span className="shrink-0 mt-0.5">•</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. Almacenamiento de datos">
          Tus datos se almacenan de forma segura en Supabase, con cifrado en tránsito (HTTPS) y en reposo. Los reportes de maltrato son confidenciales y solo accesibles por administradores autorizados.
        </Section>

        <Section title="4. Reportes de maltrato">
          Los formularios de denuncia son <span className="font-bold">completamente confidenciales</span>. Tu identidad no será revelada a terceros y los datos solo serán compartidos con autoridades competentes cuando sea requerido por ley.
        </Section>

        <Section title="5. Cookies y almacenamiento local">
          Usamos almacenamiento local únicamente para mantener tu sesión activa. No utilizamos cookies de rastreo ni publicidad.
        </Section>

        <Section title="6. Tus derechos">
          Puedes solicitar la eliminación de tu cuenta y datos personales en cualquier momento escribiendo a privacidad@patitastrujillo.pe. Procesaremos tu solicitud en un plazo máximo de 7 días hábiles.
        </Section>

        <Section title="7. Cambios a esta política">
          Notificaremos cualquier cambio importante a través de la aplicación. El uso continuado de la app implica aceptación de la política actualizada.
        </Section>

        <Section title="8. Contacto">
          Para consultas sobre privacidad: privacidad@patitastrujillo.pe
        </Section>
      </div>

      <div className="px-5 py-4 shrink-0" style={{ borderTop: "1px solid #EBF4FF" }}>
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-black text-sm text-white active:scale-[0.98] transition-transform"
          style={{ background: "#4A9FD4" }}
        >
          Entendido
        </button>
      </div>
    </BaseModal>
  );
}

// ── MODAL: Términos y Condiciones ─────────────────────────────────────────────
export function TermsModal({ onClose }) {
  return (
    <BaseModal onClose={onClose}>
      <div className="w-10 h-1 bg-[#D8E8F0] rounded-full mx-auto mt-4 shrink-0" />

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0">
        <div>
          <p className="font-black text-lg" style={{ color: "#0D2B45" }}>Términos y Condiciones</p>
          <p className="text-xs" style={{ color: "#9ABCCE" }}>Última actualización: Mayo 2026</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#9ABCCE] active:opacity-70" style={{ background: "#F0F7FC" }}>
          <IconX />
        </button>
      </div>

      <div className="h-px mx-5 shrink-0" style={{ background: "#EBF4FF" }} />

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-5 py-4">

        <div className="rounded-2xl p-3 mb-4" style={{ background: "#EBF4FF", border: "1.5px solid #C5DFEE" }}>
          <p className="text-xs font-bold" style={{ color: "#1E6FAD" }}>
            📋 Al usar Patitas Trujillo aceptas estos términos. Léelos con atención.
          </p>
        </div>

        <Section title="1. Aceptación">
          Al registrarte y usar Patitas Trujillo aceptas cumplir estos términos. Si no estás de acuerdo, no uses la aplicación.
        </Section>

        <Section title="2. Uso permitido">
          <ul className="flex flex-col gap-1 mt-1">
            {[
              "Usar la app para adoptar, reportar y encontrar mascotas.",
              "Publicar información verídica sobre mascotas.",
              "Realizar donaciones de forma voluntaria.",
              "Denunciar casos reales de maltrato animal.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <span className="text-green-500 shrink-0">✓</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="3. Uso prohibido">
          <ul className="flex flex-col gap-1 mt-1">
            {[
              "Publicar información falsa o engañosa.",
              "Usar la app con fines comerciales no autorizados.",
              "Acosar, amenazar o difamar a otros usuarios.",
              "Realizar denuncias falsas de maltrato.",
              "Intentar acceder a datos de otros usuarios.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <span className="text-red-400 shrink-0">✗</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="4. Responsabilidad de contenido">
          Eres responsable de la información que publicas. Patitas Trujillo no se hace responsable por datos incorrectos publicados por usuarios. Nos reservamos el derecho de eliminar contenido que viole estos términos.
        </Section>

        <Section title="5. Reportes de maltrato">
          Los reportes deben ser verídicos. Realizar denuncias falsas puede constituir un delito según la legislación peruana. Patitas Trujillo colaborará con las autoridades competentes cuando sea necesario.
        </Section>

        <Section title="6. Adopciones">
          Patitas Trujillo actúa como intermediario entre adoptantes y refugios. No somos responsables por acuerdos o compromisos establecidos directamente entre las partes.
        </Section>

        <Section title="7. Donaciones">
          Las donaciones son voluntarias e irrevocables. Se destinarán al bienestar animal según lo descrito en la sección de donaciones. No emitimos recibos fiscales.
        </Section>

        <Section title="8. Modificaciones">
          Podemos modificar estos términos en cualquier momento. Notificaremos cambios importantes a través de la aplicación.
        </Section>

        <Section title="9. Contacto">
          Consultas: legal@patitastrujillo.pe
        </Section>
      </div>

      <div className="px-5 py-4 shrink-0" style={{ borderTop: "1px solid #EBF4FF" }}>
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-black text-sm text-white active:scale-[0.98] transition-transform"
          style={{ background: "#4A9FD4" }}
        >
          Aceptar y cerrar
        </button>
      </div>
    </BaseModal>
  );
}