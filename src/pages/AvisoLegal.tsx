import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AvisoLegal() {
  return (
    <div className="min-h-screen text-white px-6 py-16 relative" style={{ background: '#060b18' }}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Aviso Legal</h1>
        <p className="text-white/30 text-sm mb-12">Última actualización: abril 2025</p>

        <div className="space-y-10 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">1. Datos identificativos del titular</h2>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se informa:</p>
            <ul className="mt-3 space-y-1 pl-4 border-l border-white/10">
              <li><strong className="text-white/80">Titular:</strong> Jesús Piazuelo Roca</li>
              <li><strong className="text-white/80">Email de contacto:</strong> jhuspi2@gmail.com</li>
              <li><strong className="text-white/80">Actividad:</strong> Herramienta web de consulta de precios de carburantes en España</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">2. Objeto y ámbito de aplicación</h2>
            <p>GasTracker es una herramienta web gratuita que permite consultar precios de carburantes en gasolineras de España, obtenidos de la API pública del Ministerio de Transición Ecológica y Reto Demográfico del Gobierno de España. No tiene carácter comercial ni implica relación contractual con el usuario.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">3. Propiedad intelectual e industrial</h2>
            <p>Todos los contenidos del sitio web, incluyendo textos, diseño, código fuente, logotipos e imágenes, son propiedad del titular o se utilizan bajo licencia. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.</p>
            <p className="mt-2">Los datos de precios de carburantes son propiedad del Ministerio de Transición Ecológica y Reto Demográfico del Gobierno de España y se utilizan bajo los términos de su API pública.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">4. Exclusión de responsabilidad</h2>
            <p>GasTracker muestra datos obtenidos de fuentes oficiales del Gobierno de España. No se garantiza que los precios mostrados sean exactos en todo momento, ya que dependen de la disponibilidad y actualización de la API oficial. El titular no se hace responsable de las decisiones que el usuario tome basándose en la información mostrada.</p>
          </section>

          <section>
            <h2 className="text-white font-black uppercase tracking-tight text-base mb-3">5. Legislación aplicable y jurisdicción</h2>
            <p>El presente aviso legal se rige por la legislación española. Para la resolución de cualquier controversia serán competentes los Juzgados y Tribunales del domicilio del usuario, de conformidad con lo establecido en la normativa aplicable.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-xs text-white/25 font-bold uppercase tracking-widest">
          <Link to="/privacidad" className="hover:text-white/50 transition-colors">Política de Privacidad</Link>
          <Link to="/cookies" className="hover:text-white/50 transition-colors">Política de Cookies</Link>
          <Link to="/" className="hover:text-white/50 transition-colors">GasTracker</Link>
        </div>
      </div>
    </div>
  );
}
