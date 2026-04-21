import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'cookie_consent';

export type ConsentValue = 'all' | 'necessary' | null;

export function getConsent(): ConsentValue {
  try { return localStorage.getItem(STORAGE_KEY) as ConsentValue; } catch { return null; }
}

export default function CookieBanner({ onConsent }: { onConsent?: (v: ConsentValue) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function accept(value: 'all' | 'necessary') {
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* noop */ }
    setVisible(false);
    onConsent?.(value);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 260 }}
          className="fixed bottom-0 left-0 right-0 z-[300] px-4 pb-4 md:px-6 md:pb-6"
        >
          <div className="max-w-4xl mx-auto rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
            style={{ background: 'rgba(10,15,30,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', boxShadow: '0 -4px 40px rgba(0,0,0,0.5)' }}>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase tracking-widest text-white/90 mb-1">🍪 Cookies</p>
              <p className="text-xs text-white/45 leading-relaxed">
                Usamos cookies técnicas (necesarias) y de publicidad de{' '}
                <strong className="text-white/60">Google AdSense</strong> (opcionales).
                Consulta nuestra{' '}
                <Link to="/cookies" className="text-blue-400 hover:text-blue-300 underline">Política de Cookies</Link>
                {' '}y{' '}
                <Link to="/privacidad" className="text-blue-400 hover:text-blue-300 underline">Privacidad</Link>.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => accept('necessary')}
                className="flex-1 md:flex-initial text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}>
                Solo necesarias
              </button>
              <button
                onClick={() => accept('all')}
                className="flex-1 md:flex-initial text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-105"
                style={{ boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
                Aceptar todas
              </button>
              <button
                onClick={() => accept('necessary')}
                className="p-2 rounded-xl transition-colors hover:bg-white/5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                aria-label="Cerrar">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
