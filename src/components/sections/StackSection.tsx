import { motion } from 'motion/react';
import { skills } from '@/data/skills';
import type { Skill } from '@/data/skills';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ─── skill card ───────────────────────────────────────────────────────────────

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="
        group flex flex-col items-center gap-3 p-4
        bg-white dark:bg-[#1e1535]
        border border-zinc-200 dark:border-[#2a2040]
        rounded-2xl cursor-default
        hover:border-violet-500 dark:hover:border-violet-500
        transition-colors duration-200
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        hover:shadow-[0_4px_6px_rgba(0,0,0,0.1)]
      "
    >
      <Icon
        size={32}
        className="text-violet-600 dark:text-violet-400 shrink-0"
        aria-hidden="true"
      />
      <span className="text-xs font-semibold text-zinc-700 dark:text-[#c0b8d8] text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─── category column ──────────────────────────────────────────────────────────

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
          <span
            className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 shrink-0"
            aria-hidden="true"
          />
          <span className="font-mono text-violet-600 dark:text-violet-400 text-xs font-semibold uppercase tracking-[0.18em]">
            {label}
          </span>
        </div>

        {/* Cards grid: 3 cols desktop, 2 cols mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categorySkills.map((skill, i) => (
            <ScrollReveal key={skill.name} direction="up" delay={colIndex * 0.08 + i * 0.06}>
              <SkillCard skill={skill} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

export default function StackSection() {
  return (
    <section id="stack" className="py-24 bg-zinc-50/60 dark:bg-[#1a1030]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16 text-center">
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest">
              // stack técnico
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-[#f0f0f0] mt-3 tracking-tight">
              Herramientas que domino
            </h2>
          </ScrollReveal>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {CATEGORIES.map(({ key, label }, i) => (
            <SkillColumn key={key} category={key} label={label} colIndex={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
