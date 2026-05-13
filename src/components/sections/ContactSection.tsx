import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, ExternalLink, Send, CheckCircle, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ─── schema ───────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  nombre: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  email: z.string().email({ message: 'Ingresa un email válido' }),
  asunto: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
  mensaje: z.string().min(20, { message: 'Mínimo 20 caracteres' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── inline SVG brand icons ───────────────────────────────────────────────────

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── contact info data ────────────────────────────────────────────────────────

const contactCards = [
  {
    label: '// email',
    value: 'Ronald.trejoes@gmail.com',
    href: 'mailto:Ronald.trejoes@gmail.com',
    Icon: Mail,
    external: false,
  },
  {
    label: '// github',
    value: 'github.com/Buildirnite',
    href: 'https://github.com/Buildirnite',
    CustomIcon: GithubIcon,
    external: true,
  },
  {
    label: '// linkedin',
    value: 'linkedin.com/in/ronald-trejo',
    href: 'https://linkedin.com/in/ronald-trejo',
    CustomIcon: LinkedinIcon,
    external: true,
  },
  {
    label: '// ubicación',
    value: 'Santiago de Chile — Disponible remote',
    href: null,
    Icon: MapPin,
    external: false,
  },
] as const;

// ─── FormField ────────────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700 dark:text-[#a0a0b0]">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-xs text-red-500 font-medium"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  'w-full px-4 py-3 text-sm text-zinc-900 dark:text-[#f0f0f0] bg-white dark:bg-[#241840] border rounded-lg font-sans transition-colors duration-200 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-[#606070]';
const inputNormal =
  'border-zinc-200 dark:border-[#2a2040] focus:border-violet-600 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-600/15 dark:focus:ring-violet-400/15';
const inputError =
  'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15';

// ─── ContactForm ──────────────────────────────────────────────────────────────

function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setSent(true);
    reset();
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center gap-4 py-16 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center">
            <CheckCircle size={28} className="text-emerald-500" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-heading font-bold text-zinc-900 dark:text-[#f0f0f0] text-lg">
              ¡Mensaje enviado!
            </p>
            <p className="text-zinc-500 dark:text-[#a0a0b0] text-sm">
              Mensaje enviado, te respondo pronto.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-sm"
          >
            Enviar otro mensaje
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Nombre */}
          <FormField label="Nombre" error={errors.nombre?.message}>
            <input
              {...register('nombre')}
              type="text"
              placeholder="Tu nombre"
              autoComplete="name"
              className={`${inputBase} ${errors.nombre ? inputError : inputNormal}`}
            />
          </FormField>

          {/* Email */}
          <FormField label="Email" error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
            />
          </FormField>

          {/* Asunto */}
          <FormField label="Asunto" error={errors.asunto?.message}>
            <input
              {...register('asunto')}
              type="text"
              placeholder="¿De qué se trata?"
              className={`${inputBase} ${errors.asunto ? inputError : inputNormal}`}
            />
          </FormField>

          {/* Mensaje */}
          <FormField label="Mensaje" error={errors.mensaje?.message}>
            <textarea
              {...register('mensaje')}
              rows={5}
              placeholder="Cuéntame sobre tu proyecto o consulta..."
              className={`${inputBase} resize-none ${errors.mensaje ? inputError : inputNormal}`}
            />
          </FormField>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-violet-600 dark:bg-violet-500 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 dark:hover:bg-violet-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 mt-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Enviando...
              </>
            ) : (
              <>
                Enviar mensaje
                <Send size={15} aria-hidden="true" />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ─── section ─────────────────────────────────────────────────────────────────

export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-[#f5f3ff] dark:bg-[#0f0a1e]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-14">
          <ScrollReveal direction="up" delay={0}>
            <span className="font-mono text-violet-600 dark:text-violet-400 text-sm font-medium tracking-widest">
              // contacto
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-[#f0f0f0] mt-3 tracking-tight">
              Hablemos
            </h2>
          </ScrollReveal>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: form ──────────────────────────────────────────── */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="bg-zinc-50/60 dark:bg-[#1a1030] border border-zinc-200 dark:border-[#2a2040] rounded-2xl p-8">
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* ── RIGHT: contact info cards ────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {contactCards.map((card, i) => {
              const iconEl =
                'CustomIcon' in card ? (
                  <card.CustomIcon size={18} />
                ) : (
                  <card.Icon size={18} aria-hidden="true" />
                );

              const inner = (
                <motion.div
                  whileHover={{ boxShadow: '0 10px 15px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-5 bg-white dark:bg-[#1a1030] rounded-xl border border-zinc-200 dark:border-[#2a2040] border-l-4 border-l-violet-600 dark:border-l-violet-500 shadow-sm cursor-pointer"
                >
                  <div className="mt-0.5 text-violet-600 dark:text-violet-400 shrink-0">{iconEl}</div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-mono text-violet-600 dark:text-violet-400 text-[11px] font-semibold uppercase tracking-widest">
                      {card.label}
                    </span>
                    <span className="text-zinc-800 dark:text-[#f0f0f0] text-sm font-medium truncate">
                      {card.value}
                    </span>
                  </div>
                  {card.external && (
                    <ExternalLink
                      size={14}
                      className="text-zinc-300 dark:text-[#2a2040] shrink-0 ml-auto mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              );

              return (
                <ScrollReveal key={card.label} direction="left" delay={i * 0.09}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.external ? '_blank' : undefined}
                      rel={card.external ? 'noopener noreferrer' : undefined}
                      aria-label={card.value}
                      className="block focus-visible:outline-2 focus-visible:outline-violet-600 focus-visible:outline-offset-2 rounded-xl"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div>{inner}</div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
