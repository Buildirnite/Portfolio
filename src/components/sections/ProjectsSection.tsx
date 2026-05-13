import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { projects } from '@/data/projects';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ─── derive filters from project types ───────────────────────────────────────

const ALL = 'Todos';

const FILTERS: string[] = [
  ALL,
  ...Array.from(new Set(projects.map((p) => p.type))),
];

// ─── project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      className="
        group flex flex-col gap-4 p-6
        bg-white dark:bg-[#1a1030]
        border border-zinc-200 dark:border-[#2a2040]
        rounded-2xl
        hover:border-violet-500/60 dark:hover:border-violet-500/60
        hover:shadow-[0_8px_24px_rgba(109,40,217,0.10)]
        transition-all duration-200
        shadow-[0_1px_3px_rgba(0,0,0,0.06)]
      "
    >
      {/* Type badge */}
      <span className="self-start px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200/60 dark:border-violet-800/50 capitalize">
        {project.type}
      </span>

      {/* Name + description */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading font-bold text-zinc-900 dark:text-[#f0f0f0] text-lg leading-snug">
          {project.name}
        </h3>
        <p className="text-zinc-500 dark:text-[#a0a0b0] text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[11px] font-medium bg-zinc-50 dark:bg-[#241840] text-zinc-500 dark:text-[#a0a0b0] border border-zinc-200 dark:border-[#2a2040] rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-1">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-[#c0b8d8] hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-150 cursor-pointer"
          aria-label={`Ver código de ${project.name} en GitHub`}
        >
          <SiGithub size={14} aria-hidden="true" />
          Código
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-[#c0b8d8] hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-150 cursor-pointer"
            aria-label={`Ver demo de ${project.name}`}
          >
            <ExternalLink size={14} aria-hidden="true" />
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [active, setActive] = useState<string>(ALL);

  const filtered =
    active === ALL ? projects : projects.filter((p) => p.type === active);

  return (
    <section id="proyectos" className="py-24 bg-[#f5f3ff] dark:bg-[#0f0a1e]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12">
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest">
              // proyectos
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-[#f0f0f0] mt-3 tracking-tight">
              Lo que he construido
            </h2>
          </ScrollReveal>
        </div>

        {/* Filter bar */}
        <ScrollReveal direction="up" delay={0.18}>
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar proyectos">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-semibold capitalize
                  border transition-all duration-200 cursor-pointer
                  focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2
                  ${
                    active === filter
                      ? 'bg-violet-600 text-white border-violet-600 dark:bg-violet-500 dark:border-violet-500'
                      : 'bg-transparent text-zinc-600 dark:text-[#a0a0b0] border-zinc-300 dark:border-[#2a2040] hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400'
                  }
                `}
                aria-pressed={active === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
