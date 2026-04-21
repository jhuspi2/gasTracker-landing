import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  MapPin, Bell, Route as RouteIcon, Star, ChevronDown,
  Fuel, Brain, Navigation, ShieldCheck, Smartphone, ExternalLink,
  Menu, X, ArrowRight, CheckCircle2, Zap,
} from 'lucide-react';
import CookieBanner from './components/CookieBanner';
import AvisoLegal from './pages/AvisoLegal';
import Privacidad from './pages/Privacidad';
import CookiesPage from './pages/Cookies';

const APP_URL = 'https://gas-tracker-esp.vercel.app';

// ─── Types ───────────────────────────────────────────────
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
  glow: string;
  image?: string;
}

// ─── Animated counter ────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || typeof target !== 'number') return;
    const steps = 60;
    const step = target / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(cur));
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{typeof target === 'number' ? count.toLocaleString('es-ES') : target}{suffix}</span>;
}

// ─── Background orbs ─────────────────────────────────────
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="orb-1 absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
      <div className="orb-2 absolute top-[30%] right-[-200px] w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
      <div className="orb-3 absolute bottom-[-100px] left-[20%] w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
    </div>
  );
}

// ─── Ticker ──────────────────────────────────────────────
const TICKER_ITEMS = [
  '⛽ Gasolina 95', '🛢️ Diesel A', '⚡ Precio más bajo', '🗺️ Mapa tiempo real',
  '🤖 IA predictiva', '📍 Geolocalización', '❤️ Favoritos', '🔔 Alertas de precio',
  '🛣️ Planificador ruta', '📊 Tendencias mercado', '⛽ Gasolina 98', '💚 Sin registro',
  '🔵 GLP', '🚗 Diesel Plus',
];
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden py-3 border-y border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="ticker-track flex gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="text-xs font-black uppercase tracking-widest text-white/30 flex-shrink-0">{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Feature modal ───────────────────────────────────────
function FeatureModal({ feature, onClose }: { feature: Feature | null; onClose: () => void }) {
  useEffect(() => {
    if (!feature) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [feature, onClose]);

  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-2xl" />
          <motion.div
            className="relative z-10 w-full max-w-[360px] rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #111827, #0f172a)', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh' }}
            initial={{ y: 60, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <X className="w-4 h-4 text-white/70" />
            </button>

            {/* Screenshot only */}
            <div className="overflow-y-auto" style={{ maxHeight: '85vh' }}>
              {feature.image ? (
                <img src={feature.image} alt={feature.title} className="w-full block" />
              ) : (
                <div className="w-full h-64 flex flex-col items-center justify-center gap-3"
                  style={{ background: `${feature.bg.replace('bg-', 'rgba(').replace('/10', ',0.1)')}` }}>
                  <feature.icon className={`w-12 h-12 ${feature.color} opacity-40`} />
                  <p className="text-xs text-white/20 font-bold uppercase tracking-widest">Captura próximamente</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Data ─────────────────────────────────────────────────
const FEATURES: Feature[] = [
  {
    icon: MapPin, title: 'Mapa en tiempo real',
    description: 'Visualiza más de 11.000 gasolineras en España con precios actualizados directamente del Ministerio de Energía.',
    color: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'rgba(59,130,246,0.3)', image: '/tiempo_real.png',
  },
  {
    icon: Brain, title: 'Previsión IA 3 días',
    description: 'Inteligencia Artificial avanzada analiza el mercado del petróleo y predice si el precio subirá o bajará en los próximos 3 días.',
    color: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'rgba(139,92,246,0.3)', image: '/prevision.png',
  },
  {
    icon: RouteIcon, title: 'Planificador de ruta',
    description: 'Calcula tu trayecto y encuentra las gasolineras más baratas a lo largo del camino para ahorrar al máximo.',
    color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'rgba(52,211,153,0.3)', image: '/planificador_2.png',
  },
  {
    icon: Bell, title: 'Alertas de mercado',
    description: 'Recibe notificaciones push cuando el precio del barril haya alcanzado una alta variación en el mercado.',
    color: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'rgba(251,146,60,0.3)', image: '/alerta.png',
  },
  {
    icon: Navigation, title: 'Geolocalización precisa',
    description: 'Detecta automáticamente tu posición GPS y muestra las gasolineras más cercanas ordenadas por precio.',
    color: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'rgba(34,211,238,0.3)', image: '/geolocalizacion.png',
  },
  {
    icon: Star, title: 'Favoritos y filtros',
    description: 'Guarda tus gasolineras favoritas y filtra por tipo de combustible, lavado de coches, tienda, café y más.',
    color: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'rgba(250,204,21,0.3)', image: '/filtros.png',
  },
];

const FUEL_TYPES = [
  { label: 'Gasolina 95', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', emoji: '⛽' },
  { label: 'Gasolina 98', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', emoji: '⛽' },
  { label: 'Diésel A', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', emoji: '🛢️' },
  { label: 'Diésel Plus', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', emoji: '🛢️' },
  { label: 'GLP', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', emoji: '🔵' },
];

const STATS = [
  { value: 11000, suffix: '+', label: 'Gasolineras en España', color: 'text-blue-400' },
  { value: '100%', suffix: '', label: 'Gratis · Sin registro', color: 'text-emerald-400' },
  { value: 3, suffix: ' días', label: 'Previsión con IA', color: 'text-purple-400' },
  { value: '24/7', suffix: '', label: 'Datos actualizados', color: 'text-orange-400' },
];

const PERKS = ['Sin publicidad intrusiva', 'Sin crear cuenta', 'Datos oficiales del Gobierno', 'Instálala en tu móvil'];

const FAQS = [
  { q: '¿De dónde vienen los precios?', a: 'Los precios se obtienen en tiempo real de la API oficial del Ministerio de Transición Ecológica y Reto Demográfico del Gobierno de España. Son datos oficiales, públicos y actualizados cada 30 minutos.' },
  { q: '¿Cómo funciona la previsión de precios?', a: 'GasTracker utiliza Inteligencia Artificial para analizar el precio del barril de Brent y las tendencias del mercado energético global, generando una predicción fiable para los próximos 3 días.' },
  { q: '¿Qué combustibles puedo consultar?', a: 'Puedes consultar precios de Gasolina 95, Gasolina 98, Diésel A, Diésel Plus y GLP en todas las gasolineras de España.' },
  { q: '¿Necesito crear una cuenta?', a: 'No. GasTracker funciona completamente sin registro. Tus favoritos, historial y preferencias se guardan de forma local en tu dispositivo.' },
  { q: '¿Cómo la instalo en mi móvil?', a: 'En Chrome (Android) pulsa el menú ⋮ y "Añadir a pantalla de inicio". En iPhone con Safari pulsa el botón Compartir y "En pantalla de inicio". Se instala al instante, sin pasar por ninguna tienda.' },
  { q: '¿Los datos del Ministerio son fiables?', a: 'Sí. La API del Ministerio de Energía es la fuente oficial del Gobierno de España para precios de carburantes. GasTracker es una herramienta independiente que accede a estos datos públicos.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="font-bold text-white/90 pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="px-6 pb-5 text-sm text-white/55 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Routes>
      <Route path="/aviso-legal" element={<AvisoLegal />} />
      <Route path="/privacidad" element={<Privacidad />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="*" element={<Landing activeFeature={activeFeature} setActiveFeature={setActiveFeature} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} />} />
    </Routes>
  );
}

function Landing({ activeFeature, setActiveFeature, menuOpen, setMenuOpen, scrolled }: {
  activeFeature: Feature | null;
  setActiveFeature: (f: Feature | null) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrolled: boolean;
}) {
  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ background: '#060b18' }}>
      <BackgroundOrbs />
      <CookieBanner />
      <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} />

      {/* ── Navbar ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-white/5' : ''}`}
        style={{ background: scrolled ? 'rgba(6,11,24,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-base shadow-lg shadow-blue-600/40">⛽</div>
            <span className="font-black text-lg tracking-tight uppercase">GasTracker</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[['#features', 'Funciones'], ['#combustibles', 'Combustibles'], ['#app', 'App'], ['#faq', 'FAQ']].map(([href, label]) => (
              <a key={href} href={href} className="text-xs font-black text-white/50 hover:text-white transition-colors uppercase tracking-widest">{label}</a>
            ))}
            <a href={APP_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-5 py-2.5 rounded-xl transition-all hover:scale-105 uppercase tracking-widest shadow-lg shadow-blue-600/30">
              Abrir App <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </nav>
          <button className="md:hidden text-white/50 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden border-t border-white/5 px-6 py-5 flex flex-col gap-5"
              style={{ background: 'rgba(6,11,24,0.95)', backdropFilter: 'blur(20px)' }}>
              {[['#features', 'Funciones'], ['#combustibles', 'Combustibles'], ['#app', 'App'], ['#faq', 'FAQ']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm font-bold text-white/60 hover:text-white uppercase tracking-widest">{label}</a>
              ))}
              <a href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white font-black text-sm px-5 py-3.5 rounded-xl text-center uppercase tracking-widest">
                Abrir App
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center px-6 pt-20 pb-10 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">

          {/* Left — copy */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-white/60">Datos oficiales · Ministerio de Transición Ecológica</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
              Ahorra en<br />
              <span className="gradient-text">cada repostaje</span>
            </h1>

            <p className="text-base md:text-lg text-white/50 mb-6 leading-relaxed max-w-md">
              Encuentra la gasolinera más barata cerca de ti en tiempo real.
              Con <strong className="text-white/80">previsión de precios por IA</strong> para los próximos <strong className="text-white/80">3 días</strong>.
            </p>

            {/* Fuel types pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FUEL_TYPES.map(f => (
                <span key={f.label}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }}>
                  {f.label}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="glow-btn inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm px-8 py-4 rounded-2xl transition-all hover:scale-105 uppercase tracking-widest">
                <Fuel className="w-5 h-5" />
                Usar gratis ahora
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#features"
                className="inline-flex items-center justify-center gap-2 text-white/50 hover:text-white border border-white/10 hover:border-white/20 font-black text-sm px-8 py-4 rounded-2xl transition-all uppercase tracking-widest"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                Ver funciones <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {PERKS.map(p => (
                <div key={p} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-white/40 font-bold">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="relative flex items-center justify-center py-8">

            {/* Glow blob behind phone */}
            <div className="absolute inset-0 blur-3xl scale-75 opacity-40"
              style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.45) 0%, rgba(124,58,237,0.2) 50%, transparent 70%)' }} />

            {/* Phone mockup */}
            <div className="phone-sway relative z-10"
              style={{ width: '230px', transform: 'perspective(900px) rotateY(6deg) rotateX(3deg) scale(0.88)', transformOrigin: 'center center' }}>
              <div className="phone-mockup relative overflow-hidden" style={{ paddingTop: '14px', paddingBottom: '14px' }}>
                {/* Screen with punch-hole camera */}
                <div className="mx-3 rounded-[22px] overflow-hidden relative"
                  style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <img src="/inicio.png" alt="GasTracker App" className="w-full block"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  {/* Punch-hole camera overlay */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                    style={{ background: '#060b18', boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }} />
                </div>
                {/* Home bar */}
                <div className="mt-3 mx-auto w-14 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
              </div>
              {/* Side buttons */}
              <div className="absolute top-[80px] -right-[3px] w-[3px] h-10 rounded-r-sm"
                style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div className="absolute top-[60px] -left-[3px] w-[3px] h-7 rounded-l-sm"
                style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div className="absolute top-[76px] -left-[3px] w-[3px] h-7 rounded-l-sm"
                style={{ background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, type: 'spring' }}
              className="absolute top-4 right-0 md:right-4 z-30"
              style={{ animation: 'float-y 3.5s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl shadow-2xl"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', backdropFilter: 'blur(12px)' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black text-emerald-300 uppercase tracking-widest whitespace-nowrap">Precio mínimo</span>
              </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.1, type: 'spring' }}
              className="absolute bottom-4 left-0 md:left-4 z-30"
              style={{ animation: 'float-y 4s ease-in-out infinite', animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl shadow-2xl"
                style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', backdropFilter: 'blur(12px)' }}>
                <span className="text-sm">🤖</span>
                <span className="text-xs font-black text-blue-300 uppercase tracking-widest whitespace-nowrap">IA · 3 días</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-5 h-5 text-white/20 animate-bounce" />
        </motion.div>
      </section>

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Stats ── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, suffix, label, color }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="stat-card rounded-2xl p-6 text-center">
              <div className={`text-3xl md:text-4xl font-black mb-1 ${color}`}>
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <p className="text-xs font-bold text-white/35 uppercase tracking-widest">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features (clickable) ── */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-6">
            <p className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Funcionalidades</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Todo lo que necesitas,<br /><span className="gradient-text">en una sola app</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Diseñada para ahorrar tiempo y dinero cada vez que repostes.</p>
          </motion.div>

          {/* Hint */}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-xs text-white/25 font-bold uppercase tracking-widest mb-10 flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 text-blue-400/50" />
            Pulsa cualquier función para ver una captura de la app
            <Zap className="w-3 h-3 text-blue-400/50" />
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.button
                key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => setActiveFeature(f)}
                className="glass-card rounded-2xl p-6 group text-left cursor-pointer relative overflow-hidden"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Tap hint glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${f.glow.replace(')', ', 0.06)')}, transparent 60%)` }} />

                <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110`}
                  style={{ boxShadow: `0 0 20px ${f.glow}` }}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-black text-base mb-2 uppercase tracking-tight">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">{f.description}</p>

                <div className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest ${f.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  Ver <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Combustibles ── */}
      <section id="combustibles" className="py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-6">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Combustibles compatibles</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2">
            {FUEL_TYPES.map((f, i) => (
              <motion.div key={f.label}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">{f.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── App live ── */}
      <section id="app" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-4">En vivo</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              GasTracker, <span className="gradient-text">ahora mismo</span>
            </h2>
            <p className="text-white/40 text-lg">La app completa funcionando en tiempo real.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="iframe-glow rounded-3xl overflow-hidden border border-white/8"
            style={{ height: '88vh', minHeight: '640px' }}>
            <iframe src={APP_URL} title="GasTracker App" className="w-full h-full" allow="geolocation" loading="lazy" />
          </motion.div>

          <div className="mt-6 flex justify-center">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-black text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">
              Abrir en pantalla completa <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Install ── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.1) 50%, rgba(16,185,129,0.08) 100%)', border: '1px solid rgba(37,99,235,0.2)' }}>
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: '0 0 30px rgba(59,130,246,0.3)' }}>
                <Smartphone className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Instálala en tu móvil</h2>
              <p className="text-white/50 text-base mb-10 max-w-lg mx-auto leading-relaxed">
                Sin App Store. Sin Google Play. <strong className="text-white/80">Gratis.</strong><br />
                Ábrela en el navegador y pulsa "Añadir a pantalla de inicio".
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                {[
                  { emoji: '🤖', os: 'Android', step: 'Chrome → Menú ⋮ → Añadir a inicio' },
                  { emoji: '', os: 'iPhone', step: 'Safari → Compartir → En pantalla de inicio' },
                ].map(({ emoji, os, step }) => (
                  <div key={os} className="flex items-center gap-4 rounded-2xl px-6 py-4 text-left"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/35 mb-0.5">{os}</p>
                      <p className="text-sm font-bold text-white/80">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer"
                className="glow-btn inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm px-10 py-4 rounded-2xl transition-all hover:scale-105 uppercase tracking-widest">
                <Fuel className="w-5 h-5" />Abrir GasTracker<ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust ── */}
      <div className="py-8 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
          style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '20px 32px' }}>
          <ShieldCheck className="w-10 h-10 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-black text-base uppercase tracking-tight mb-1">Datos 100% oficiales del Gobierno de España</p>
            <p className="text-white/40 text-sm">Precios obtenidos directamente de la API pública del Ministerio de Transición Ecológica y Reto Demográfico. GasTracker es una herramienta independiente.</p>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <p className="text-xs font-black text-orange-400 uppercase tracking-[0.3em] mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Preguntas <span className="gradient-text">frecuentes</span>
            </h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-28 px-6 text-center relative z-10">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center bottom, rgba(37,99,235,0.1) 0%, transparent 60%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto relative z-10">
          <div className="text-6xl mb-6">⛽</div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            ¿Listo para <span className="gradient-text">ahorrar?</span>
          </h2>
          <p className="text-white/40 text-lg mb-10">Gratis · Sin registro · Datos oficiales</p>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer"
            className="glow-btn inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-base px-12 py-5 rounded-2xl transition-all hover:scale-105 uppercase tracking-widest shadow-2xl">
            <Fuel className="w-6 h-6" />Usar GasTracker — Gratis<ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-sm">⛽</div>
            <span className="font-black text-sm uppercase tracking-widest">GasTracker</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-xs text-white/25 font-bold uppercase tracking-widest">
            <Link to="/aviso-legal" className="hover:text-white/50 transition-colors">Aviso Legal</Link>
            <Link to="/privacidad" className="hover:text-white/50 transition-colors">Privacidad</Link>
            <Link to="/cookies" className="hover:text-white/50 transition-colors">Cookies</Link>
          </div>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} GasTracker</p>
        </div>
      </footer>
    </div>
  );
}
