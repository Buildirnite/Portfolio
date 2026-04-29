import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Stack', href: '#stack' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Blog', href: '#blog' },
];

export default function Navbar() {
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
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
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
          className="font-bold text-xl text-zinc-900 tracking-tight cursor-pointer select-none"
          aria-label="Ir al inicio"
        >
          RT
          <span className="text-violet-600 border-b-2 border-violet-600 pb-px">_</span>
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
                      ? 'text-violet-600'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#contacto')}
            className="hidden md:inline-flex items-center px-5 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-violet-700 hover:-translate-y-px cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2"
          >
            Contactar
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-zinc-700 hover:text-zinc-900 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-md"
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
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-zinc-100"
          >
            <ul className="px-6 py-5 flex flex-col gap-4 list-none m-0 p-0 px-6 py-5" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`text-base font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-sm ${
                        isActive
                          ? 'text-violet-600'
                          : 'text-zinc-700 hover:text-zinc-900'
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
                  className="w-full py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2"
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
