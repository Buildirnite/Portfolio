import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useThemeContext } from '@/context/ThemeContext';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Stack', href: '#stack' },
  { label: 'Sobre mí', href: '#sobre-mi' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useThemeContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const ioMap = new Map<string, IntersectionObserver>();

    const tryObserve = (id: string) => {
      if (ioMap.has(id)) return;
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-15% 0px -70% 0px' }
      );
      io.observe(el);
      ioMap.set(id, io);
    };

    // Intento inicial (secciones ya en DOM)
    sectionIds.forEach(tryObserve);

    // Vigila el DOM para secciones lazy que aún no existen
    const mo = new MutationObserver(() => {
      sectionIds.forEach(tryObserve);
      if (ioMap.size === sectionIds.length) mo.disconnect();
    });

    if (ioMap.size < sectionIds.length) {
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      ioMap.forEach((io) => io.disconnect());
      mo.disconnect();
    };
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const id = href.slice(1);
    if (menuOpen) {
      setMenuOpen(false);
      // Wait for the menu close animation (280ms) before scrolling so the
      // layout reflow doesn't corrupt the scroll target position.
      setTimeout(() => scrollToId(id), 300);
    } else {
      scrollToId(id);
    }
  }, [menuOpen, scrollToId]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f5f3ff]/80 dark:bg-[#0f0a1e]/80 backdrop-blur-md shadow-sm dark:shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#inicio');
          }}
          className="font-bold text-xl text-zinc-900 dark:text-[#f0f0f0] tracking-tight cursor-pointer select-none"
          aria-label="Ir al inicio"
        >
          RT
          <span className="text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400 pb-px">_</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-sm ${
                    isActive
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-zinc-600 dark:text-[#a0a0b0] hover:text-zinc-900 dark:hover:text-[#f0f0f0]'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA + theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="p-2 text-zinc-600 dark:text-[#a0a0b0] hover:text-zinc-900 dark:hover:text-[#f0f0f0] cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-md"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <button
            onClick={() => handleNavClick('#contacto')}
            className="hidden md:inline-flex items-center px-5 py-2 bg-violet-600 dark:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-violet-700 dark:hover:bg-violet-600 hover:-translate-y-px cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2"
          >
            Contactar
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-zinc-700 dark:text-[#a0a0b0] hover:text-zinc-900 dark:hover:text-[#f0f0f0] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-md"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden bg-[#f5f3ff]/95 dark:bg-[#0f0a1e]/95 backdrop-blur-md border-t border-violet-100 dark:border-[#2a2040]"
          >
            <ul className="px-6 py-5 flex flex-col gap-4 list-none" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`text-base font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-sm ${
                        isActive
                          ? 'text-violet-600 dark:text-violet-400'
                          : 'text-zinc-700 dark:text-[#a0a0b0] hover:text-zinc-900 dark:hover:text-[#f0f0f0]'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
              <li className="pt-1">
                <button
                  onClick={() => handleNavClick('#contacto')}
                  className="w-full py-2.5 bg-violet-600 dark:bg-violet-500 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2"
                >
                  Contactar
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
