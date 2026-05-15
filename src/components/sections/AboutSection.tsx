import { useState, useEffect } from 'react';
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

        <div className="max-w-2xl flex flex-col gap-8">

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
      </div>
    </section>
  );
}
