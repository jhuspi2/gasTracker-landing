import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Cookies() {
  return (
    <div className="min-h-screen text-white px-6 py-16 relative" style={{ background: '#060b18' }}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Política de Cookies</h1>
        <p className="text-white/30 text-sm mb-12">Última actualización: abril 2025</p>

        <div className="space-y-10 text-white/60 text-sm leading-relaxed">
          <section>
            <p>En cumplimiento con la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSICE) y el Reglamento General de Protección de Datos (RGPD), te informamos sobre el uso de cookies en este sitio web.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde tus preferencias y funcionamiento entre visitas.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">Cookies que utilizamos</h2>

            <div className="mt-4 space-y-4">
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Técnicas · Necesarias</span>
                </div>
                <p className="text-white/50 text-xs mt-2">Cookies propias estrictamente necesarias para el funcionamiento de la aplicación. Almacenan preferencias del usuario (favoritos, ajustes) de forma local. <strong className="text-white/70">No requieren consentimiento.</strong></p>
                <table className="w-full mt-3 text-xs">
                  <thead><tr className="text-white/30"><th className="text-left pb-1">Cookie</th><th className="text-left pb-1">Finalidad</th><th className="text-left pb-1">Duración</th></tr></thead>
                  <tbody className="text-white/50">
                    <tr><td className="py-1 pr-4 font-mono">localStorage</td><td className="py-1 pr-4">Favoritos y preferencias</td><td className="py-1">Persistente</td></tr>
                    <tr><td className="py-1 pr-4 font-mono">cookie_consent</td><td className="py-1 pr-4">Guardar tu elección de cookies</td><td className="py-1">1 año</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">Publicidad · Terceros</span>
                </div>
                <p className="text-white/50 text-xs mt-2">Cookies de <strong className="text-white/70">Google AdSense</strong> utilizadas para mostrar anuncios relevantes. Google puede usar estas cookies para personalizar la publicidad según tus intereses y medir su rendimiento. <strong className="text-white/70">Requieren tu consentimiento.</strong></p>
                <table className="w-full mt-3 text-xs">
                  <thead><tr className="text-white/30"><th className="text-left pb-1">Proveedor</th><th className="text-left pb-1">Finalidad</th><th className="text-left pb-1">Más info</th></tr></thead>
                  <tbody className="text-white/50">
                    <tr>
                      <td className="py-1 pr-4">Google AdSense</td>
                      <td className="py-1 pr-4">Publicidad personalizada</td>
                      <td className="py-1"><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Ver política</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">Cómo gestionar las cookies</h2>
            <p>Puedes retirar tu consentimiento en cualquier momento desde el banner de cookies que aparece al pie de la página. También puedes configurar tu navegador para bloquear o eliminar cookies:</p>
            <ul className="mt-3 space-y-1 pl-4 border-l border-white/10">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Microsoft Edge</a></li>
            </ul>
            <p className="mt-3">Ten en cuenta que desactivar cookies puede afectar al funcionamiento de algunas partes del sitio.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">Más información</h2>
            <p>Para cualquier consulta sobre el uso de cookies: <a href="mailto:jhuspi2@gmail.com" className="text-blue-400 hover:text-blue-300">jhuspi2@gmail.com</a></p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-xs text-white/25 font-bold uppercase tracking-widest">
          <Link to="/aviso-legal" className="hover:text-white/50 transition-colors">Aviso Legal</Link>
          <Link to="/privacidad" className="hover:text-white/50 transition-colors">Política de Privacidad</Link>
          <Link to="/" className="hover:text-white/50 transition-colors">GasTracker</Link>
        </div>
      </div>
    </div>
  );
}
