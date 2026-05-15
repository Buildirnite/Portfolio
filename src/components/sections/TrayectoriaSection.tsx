import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import ScrollReveal from '@/components/animations/ScrollReveal';

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

export default function TrayectoriaSection() {
  return (
    <section id="trayectoria" className="py-24 bg-white dark:bg-[#0d0820]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest">
              // trayectoria
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-[#f0f0f0] mt-3 tracking-tight">
              Mi recorrido
            </h2>
          </ScrollReveal>
        </div>

        <div className="max-w-2xl">
          <ScrollReveal direction="up" delay={0.05}>
            <span className="font-mono text-zinc-400 dark:text-[#606070] text-[11px] uppercase tracking-widest block mb-7">
              // experiencia & formación
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
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
