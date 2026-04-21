import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacidad() {
  return (
    <div className="min-h-screen text-white px-6 py-16 relative" style={{ background: '#060b18' }}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Política de Privacidad</h1>
        <p className="text-white/30 text-sm mb-12">Última actualización: abril 2025</p>

        <div className="space-y-10 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">1. Responsable del tratamiento</h2>
            <ul className="space-y-1 pl-4 border-l border-white/10">
              <li><strong className="text-white/80">Identidad:</strong> Jesús Piazuelo Roca</li>
              <li><strong className="text-white/80">Email:</strong> jhuspi2@gmail.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">2. Datos que recogemos</h2>
            <p>GasTracker <strong className="text-white/80">no recoge datos personales identificativos</strong> de sus usuarios. No existe registro de usuarios, formulario de contacto ni sistema de autenticación.</p>
            <p className="mt-2">Los datos que el usuario introduce en la aplicación (favoritos, historial, preferencias) se almacenan <strong className="text-white/80">únicamente en el dispositivo del usuario</strong> mediante el almacenamiento local del navegador (localStorage). Nunca se transmiten a ningún servidor.</p>
            <p className="mt-2">La aplicación solicita acceso a la <strong className="text-white/80">geolocalización del dispositivo</strong> únicamente para mostrar gasolineras cercanas. Esta información no se registra ni se envía a ningún servidor.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">3. Cookies y tecnologías de seguimiento</h2>
            <p>Este sitio web utiliza cookies propias de carácter técnico, necesarias para el funcionamiento de la aplicación, y cookies de terceros con fines publicitarios a través de <strong className="text-white/80">Google AdSense</strong>.</p>
            <p className="mt-2">Para más información, consulta nuestra <Link to="/cookies" className="text-blue-400 hover:text-blue-300 underline">Política de Cookies</Link>.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">4. Servicios de terceros</h2>
            <p>GasTracker utiliza los siguientes servicios de terceros que pueden tratar datos con sus propias políticas:</p>
            <ul className="mt-3 space-y-2 pl-4 border-l border-white/10">
              <li><strong className="text-white/80">API del Ministerio de Transición Ecológica:</strong> Consulta de precios de carburantes. Datos públicos del Gobierno de España.</li>
              <li><strong className="text-white/80">Google AdSense:</strong> Publicidad contextual. Google puede usar cookies para personalizar anuncios. Consulta la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Política de Privacidad de Google</a>.</li>
              <li><strong className="text-white/80">OpenStreetMap / Leaflet:</strong> Mapas interactivos. No recoge datos personales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">5. Derechos del usuario</h2>
            <p>En virtud del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 (LOPD-GDD), tienes derecho a acceder, rectificar, suprimir, oponerte y limitar el tratamiento de tus datos. Dado que no tratamos datos personales identificativos, estos derechos se aplican principalmente a las cookies de terceros, que puedes gestionar desde tu navegador o desde el panel de configuración de cookies de este sitio.</p>
            <p className="mt-2">Para cualquier consulta: <a href="mailto:jhuspi2@gmail.com" className="text-blue-400 hover:text-blue-300">jhuspi2@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">6. Cambios en esta política</h2>
            <p>Nos reservamos el derecho a actualizar esta política. Los cambios se publicarán en esta misma página con la fecha de actualización. El uso continuado del sitio implica la aceptación de los cambios.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-xs text-white/25 font-bold uppercase tracking-widest">
          <Link to="/aviso-legal" className="hover:text-white/50 transition-colors">Aviso Legal</Link>
          <Link to="/cookies" className="hover:text-white/50 transition-colors">Política de Cookies</Link>
          <Link to="/" className="hover:text-white/50 transition-colors">GasTracker</Link>
        </div>
      </div>
    </div>
  );
}
