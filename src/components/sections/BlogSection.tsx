import { motion } from 'motion/react';
import { ArrowRight, Clock, CalendarDays } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import type { BlogPost } from '@/data/blog';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ─── BlogCard ─────────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <motion.article
        whileHover={{
          boxShadow: '0 10px 15px rgba(0,0,0,0.08)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="group flex flex-col h-full bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-violet-600 focus-within:ring-offset-2"
      >
        {/* Top accent line — animates violet on hover */}
        <div className="h-[3px] bg-zinc-100 group-hover:bg-violet-600 transition-colors duration-250" />

        <div className="flex flex-col flex-1 p-6">
          {/* Date + read time */}
          <div className="flex items-center gap-3 text-zinc-400 text-xs mb-4">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} aria-hidden="true" />
              {post.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" />
              {post.readTime} de lectura
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-zinc-900 text-[1.05rem] leading-snug mb-3">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-5">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[11px] font-medium text-violet-700 bg-violet-50 border border-violet-200/70 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Leer más */}
          <a
            href={`/blog/${post.slug}`}
            aria-label={`Leer: ${post.title}`}
            className="inline-flex items-center gap-1.5 text-violet-600 text-sm font-semibold hover:text-violet-800 transition-colors duration-150 cursor-pointer focus-visible:outline-none rounded-sm mt-auto self-start"
          >
            Leer más
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </motion.article>
    </ScrollReveal>
  );
}

// ─── ComingSoonCard ───────────────────────────────────────────────────────────

function ComingSoonCard() {
  return (
    <ScrollReveal direction="up" delay={blogPosts.length * 0.1}>
      <div className="flex items-center justify-center min-h-[260px] h-full rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/40 p-6">
        <div className="text-center flex flex-col gap-1.5">
          <p className="font-mono text-zinc-400 text-[11px] uppercase tracking-widest">
            // próximamente
          </p>
          <p className="text-zinc-400 text-sm font-medium">
            Más artículos en camino
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ─── section ─────────────────────────────────────────────────────────────────

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-zinc-50/60">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-14">
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 text-sm font-medium tracking-widest">
              // blog
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-zinc-900 mt-3 tracking-tight">
              Lo que escribo
            </h2>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
          <ComingSoonCard />
        </div>

      </div>
    </section>
  );
}
