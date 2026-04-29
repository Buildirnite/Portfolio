import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { skills } from '@/data/skills';
import type { Skill } from '@/data/skills';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ─── sub-components ──────────────────────────────────────────────────────────

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  const rowDelay = index * 0.08;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: rowDelay, ease: 'easeOut' }}
      className="flex flex-col gap-1.5"
    >
      {/* Name + percentage */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-700">{skill.name}</span>
        <motion.span
          className="font-mono text-xs font-semibold text-violet-600"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25, delay: rowDelay + 0.35 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Progress track */}
      <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-violet-600 rounded-full"
          initial={{ width: '0%' }}
          animate={inView ? { width: `${skill.level}%` } : { width: '0%' }}
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.9,
            delay: rowDelay + 0.18,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES: { key: Skill['category']; label: string }[] = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'devops', label: 'DevOps & IA' },
];

function SkillColumn({
  category,
  label,
  colIndex,
}: {
  category: Skill['category'];
  label: string;
  colIndex: number;
}) {
  const categorySkills = skills.filter((s) => s.category === category);

  return (
    <ScrollReveal direction="up" delay={colIndex * 0.12}>
      <div className="flex flex-col gap-6">
        {/* Category label */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" aria-hidden="true" />
          <span className="font-mono text-violet-600 text-xs font-semibold uppercase tracking-[0.18em]">
            {label}
          </span>
        </div>

        {/* Skill rows */}
        <div className="flex flex-col gap-4">
          {categorySkills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── section ─────────────────────────────────────────────────────────────────

export default function StackSection() {
  return (
    <section id="stack" className="py-24 bg-zinc-50/60">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16 text-center">
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 text-sm font-medium tracking-widest">
              // stack técnico
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-zinc-900 mt-3 tracking-tight">
              Herramientas que domino
            </h2>
          </ScrollReveal>
        </div>

        {/* 3-column skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {CATEGORIES.map(({ key, label }, i) => (
            <SkillColumn key={key} category={key} label={label} colIndex={i} />
          ))}
        </div>

        {/* Tech cloud */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mt-16 pt-12 border-t border-zinc-200">
            <p className="font-mono text-zinc-400 text-[11px] uppercase tracking-widest text-center mb-6">
              // tech cloud
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {skills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  className="px-4 py-1.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-full cursor-pointer transition-all duration-200 hover:bg-violet-600 hover:text-white hover:border-violet-600 focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2"
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
