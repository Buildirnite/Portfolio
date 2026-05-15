import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ─── data ─────────────────────────────────────────────────────────────────────

const bio = [
  'Soy un desarrollador full-stack enfocado en la construcción de aplicaciones end-to-end con Laravel, React, Vue y TypeScript. Cuento con experiencia práctica desarrollando módulos completos desde el modelo de datos y APIs REST hasta la UI final, aplicando patrones como Service Layer, Form Requests y Route Model Binding.',
  'Mi perfil se complementa con manejo de MySQL, contenedores Docker y flujo Gitflow con code review.',
  'Actualmente me desempeño como practicante full-stack en el Ministerio del Medio Ambiente, construyendo módulos del Sistema de Compensación de Emisiones bajo metodología Scrum.',
];

const techTags = [
  'React', 'Laravel', 'Python', 'Docker',
  'React Native', 'FastAPI', 'MySQL', 'Claude AI',
];

const timeline: {
  year: string;
  role: string;
  company: string;
  description: string;
  isCurrent?: boolean;
}[] = [
  {
    year: '2026 (Mar – Abr)',
    role: 'Práctica Profesional — Desarrollador Full-Stack',
    company: 'Subsecretaría del Medio Ambiente — SCE',
    description: 'Implementé mejoras en el backend Laravel/PHP, construí la vista de documentación del sistema SCE, rediseñé modales con Vue 3 + TypeScript y corregí bugs en producción.',
    isCurrent: true,
  },
  {
    year: '2026',
    role: 'Portafolio Full Stack',
    company: 'Proyecto personal',
    description: '5 proyectos que cubren web, mobile, IA y data analytics.',
  },
  {
    year: '2025',
    role: 'Integración de IA en productos',
    company: 'LegalAI Chile',
    description: 'Primer proyecto integrando LLMs en una aplicación real con FastAPI.',
  },
  {
    year: '2024',
    role: 'Full Stack con Laravel + React',
    company: 'BarberBook & Tienda Admin',
    description: 'Dominio del stack Laravel + React con autenticación y Docker.',
  },
  {
    year: 'En curso',
    role: 'Ingeniería en Informática',
    company: 'Universidad Mayor',
    description: 'Formación en sistemas, algoritmos y arquitectura de software.',
    isCurrent: true,
  },
];

// ─── TimelineItem ─────────────────────────────────────────────────────────────

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof timeline)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '0px 0px -40px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.12, ease: 'easeOut' }}
      className="relative flex gap-5"
    >
      {/* Dot + connecting line */}
      <div className="relative flex flex-col items-center shrink-0">
        <div
          className={`w-3 h-3 rounded-full border-2 mt-1 z-10 shrink-0 transition-colors duration-300 ${
            item.isCurrent
              ? 'bg-emerald-500 border-emerald-300'
              : 'bg-violet-600 dark:bg-violet-500 border-violet-300 dark:border-violet-700'
          }`}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-zinc-200 dark:bg-[#2a2040] mt-1.5" />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-0.5 ${isLast ? 'pb-0' : 'pb-8'}`}>
        <span
          className={`font-mono text-xs font-semibold tracking-wider ${
            item.isCurrent ? 'text-emerald-600' : 'text-violet-600 dark:text-violet-400'
          }`}
        >
          {item.year}
        </span>
        <p className="font-heading font-bold text-zinc-900 dark:text-[#f0f0f0] text-[15px] leading-snug mt-0.5">
          {item.role}
        </p>
        <p className="font-mono text-zinc-400 dark:text-[#606070] text-xs tracking-wide">
          {item.company}
        </p>
        <p className="text-zinc-500 dark:text-[#a0a0b0] text-sm leading-relaxed mt-1.5">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="sobre-mi" className="py-24 bg-[#f5f3ff] dark:bg-[#0f0a1e]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest">
              // sobre mí
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-[#f0f0f0] mt-3 tracking-tight">
              Hola, soy Ronald Trejo
              <span
                className="text-violet-600 dark:text-violet-400 ml-0.5"
                style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.08s' }}
                aria-hidden="true"
              >
                _
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── LEFT: bio ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">

            {/* Paragraphs */}
            <div className="flex flex-col gap-5">
              {bio.map((paragraph, i) => (
                <ScrollReveal key={i} direction="right" delay={i * 0.1}>
                  <p className="text-zinc-600 dark:text-[#a0a0b0] text-[1.05rem] leading-relaxed">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Tech tags */}
            <ScrollReveal direction="right" delay={0.35}>
              <div className="flex flex-col gap-3 pt-2">
                <span className="font-mono text-zinc-400 dark:text-[#606070] text-[11px] uppercase tracking-widest">
                  // stack principal
                </span>
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border border-violet-200/80 dark:border-violet-800/50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── RIGHT: timeline ─────────────────────────────────────── */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex flex-col gap-0">
              <span className="font-mono text-zinc-400 dark:text-[#606070] text-[11px] uppercase tracking-widest mb-7">
                // trayectoria
              </span>

              <div>
                {timeline.map((item, i) => (
                  <TimelineItem
                    key={item.year}
                    item={item}
                    index={i}
                    isLast={i === timeline.length - 1}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
