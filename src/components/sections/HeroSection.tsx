import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ─── constants ───────────────────────────────────────────────────────────────

const TYPING_FULL_TEXT = 'Construyo software que resuelve';
const TYPING_SPEED_MS = 65;
const CURSOR_BLINK_MS = 530;

const techTags = ['React', 'Laravel', 'Python', 'Docker', 'React Native', 'FastAPI'];

const stats: { value: string; label: string }[] = [
  { value: '5', label: 'proyectos en portafolio' },
  { value: '4', label: 'tecnologías core' },
  { value: '∞', label: 'café consumido' },
];

// ─── component ───────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [particlesReady, setParticlesReady] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  useEffect(() => {
    if (displayText.length >= TYPING_FULL_TEXT.length) return;
    const t = setTimeout(
      () => setDisplayText(TYPING_FULL_TEXT.slice(0, displayText.length + 1)),
      TYPING_SPEED_MS
    );
    return () => clearTimeout(t);
  }, [displayText]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), CURSOR_BLINK_MS);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  };

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      detectRetina: true,
      fullScreen: { enable: false },
      particles: {
        number: { value: 55, density: { enable: true } },
        color: { value: '#7c3aed' },
        opacity: { value: { min: 0.06, max: 0.18 } },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          distance: 130,
          color: '#7c3aed',
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.55,
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
        },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'grab' } },
        modes: { grab: { distance: 160, links: { opacity: 0.38 } } },
      },
    }),
    []
  );

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f3ff] dark:bg-[#0f0a1e]"
    >
      {/* ── Particles background ─────────────────────────────────────── */}
      {particlesReady && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-0"
          options={particlesOptions}
        />
      )}

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Main grid ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-center">

        {/* ── LEFT: content ────────────────────────────────────────── */}
        <div className="flex flex-col gap-7">

          {/* Tagline */}
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest select-none">
              // desarrollador full-stack
            </span>
          </ScrollReveal>

          {/* Typing title */}
          <ScrollReveal direction="up" delay={0.15}>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[3.2rem] font-bold leading-tight text-zinc-900 dark:text-[#f0f0f0] tracking-tight">
              {displayText}
              <span
                className="inline-block ml-0.5 text-violet-600 dark:text-violet-400"
                style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.08s' }}
                aria-hidden="true"
              >
                _
              </span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-zinc-500 dark:text-[#a0a0b0] text-lg leading-relaxed max-w-[520px]">
              Egresado de Ingeniería en Informática (Universidad Mayor) con experiencia práctica en el
              Ministerio del Medio Ambiente. Construyo el stack completo: desde la API REST hasta la
              app móvil, pasando por la integración de IA.{' '}
              <span className="text-zinc-700 dark:text-[#f0f0f0] font-medium">
                Disponible para oportunidades en Santiago.
              </span>
            </p>
          </ScrollReveal>

          {/* CTA buttons */}
          <ScrollReveal direction="up" delay={0.45}>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('proyectos')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 dark:bg-violet-500 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 hover:-translate-y-px transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2"
              >
                Ver proyectos
                <ArrowRight size={15} aria-hidden="true" />
              </button>

              <button
                onClick={() => scrollTo('contacto')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-zinc-800 dark:text-[#f0f0f0] text-sm font-semibold rounded-lg border-2 border-zinc-300 dark:border-[#2a2040] hover:border-violet-600 dark:hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2"
              >
                Contactar
              </button>
            </div>
          </ScrollReveal>

          {/* Stats row */}
          <ScrollReveal direction="up" delay={0.6}>
            <div className="flex flex-wrap gap-4 sm:gap-8 pt-1 border-t border-zinc-100 dark:border-[#2a2040]">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5 pt-4">
                  <span className="font-heading text-2xl font-bold text-violet-600 dark:text-violet-400 leading-none">
                    {value}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-[#606070] uppercase tracking-wider leading-none mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── RIGHT: profile card ──────────────────────────────────── */}
        <div className="hidden lg:block">
        <ScrollReveal direction="left" delay={0.25}>
          <div className="relative max-w-[340px] mx-auto lg:mx-0 lg:ml-auto">

            {/* Floating wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Card */}
              <div className="bg-white dark:bg-[#1a1030] border border-zinc-200/80 dark:border-[#2a2040] rounded-2xl p-8 shadow-xl shadow-zinc-200/50 dark:shadow-violet-900/20">

                {/* Avatar + identity */}
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/30 border-2 border-violet-300/60 dark:border-violet-700/40 flex items-center justify-center shadow-md shadow-violet-200/50 dark:shadow-violet-900/30">
                      <span className="font-heading text-violet-700 dark:text-violet-400 font-bold text-2xl tracking-tight">
                        RT
                      </span>
                    </div>
                    {/* Available dot */}
                    <span
                      className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1a1030]"
                      aria-label="Disponible"
                    />
                  </div>

                  <div className="text-center">
                    <p className="font-heading text-zinc-900 dark:text-[#f0f0f0] font-bold text-xl">Ronald Trejo</p>
                    <p className="font-mono text-violet-600 dark:text-violet-400 text-[13px] mt-0.5">
                      // ingeniero en informática
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-[#2a2040] to-transparent mb-5" />

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] font-medium bg-zinc-50 dark:bg-[#241840] text-zinc-600 dark:text-[#a0a0b0] border border-zinc-200 dark:border-[#2a2040] rounded-full tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Status line */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span className="text-xs text-zinc-400 dark:text-[#606070]">Disponible para proyectos</span>
                </div>
              </div>
            </motion.div>

            {/* Ambient glow behind card */}
            <div
              className="absolute -inset-4 rounded-3xl bg-violet-500/8 blur-2xl -z-10 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
