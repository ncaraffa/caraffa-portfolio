import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useT } from "../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/*
 * Poster hero: a giant condensed word fills the width behind the cut-out
 * portrait, the name sits bottom-left in front of it, and a short line plus
 * two real facts sit on the right. Pure DOM/CSS — no WebGL up here.
 */
export function Hero() {
  const t = useT();

  return (
    <section className="relative isolate overflow-hidden">
      {/* Ambient light (no background of its own — see .app-root in index.css) */}
      <div aria-hidden className="hero-ambient-fade pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_30%,rgb(var(--rgb-violet)/0.30),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_10%_85%,rgb(var(--rgb-fuchsia)/0.14),transparent_72%)]" />
      </div>

      {/* Giant word behind everything */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="hero-poster-word pointer-events-none absolute inset-x-0 top-[14svh] select-none text-center sm:top-[11svh]"
      >
        {t("PORTFÓLIO", "PORTFOLIO")}
      </motion.div>

      {/* Full-bleed floor: a band that returns to zero at BOTH ends, so it never
          draws the edge of a box (sides) or of the section (bottom). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[40%] sm:h-[65%] bg-[linear-gradient(to_top,rgb(6_6_10/0)_0%,rgb(6_6_10/0.05)_8%,rgb(6_6_10/0.16)_18%,rgb(6_6_10/0.34)_30%,rgb(6_6_10/0.55)_46%,rgb(6_6_10/0.6)_62%,rgb(6_6_10/0.3)_82%,rgb(6_6_10/0)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-end px-6 pb-10 pt-28 sm:px-10 lg:px-16 lg:pb-14">
        {/* Portrait, centred, in front of the word */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          className="hero-portrait-wrap pointer-events-none relative z-[1] -mb-[16svh] self-center h-[58svh] sm:absolute sm:bottom-0 sm:left-1/2 sm:z-auto sm:mb-0 sm:h-[80svh] sm:-translate-x-1/2 lg:h-[min(88svh,940px)]"
        >
          <picture className="hero-portrait block h-full">
            <source srcSet="/photos/nicolas-hero-cutout.webp" type="image/webp" />
            <img
              src="/photos/nicolas-hero-cutout.png"
              alt="Nicolas Caraffa"
              width={1229}
              height={1370}
              fetchPriority="high"
              decoding="async"
              className="h-full w-auto max-w-none select-none object-contain"
            />
          </picture>
        </motion.div>

        <div className="relative z-[2]">
          {/* Name block — bottom left */}
          <div>
            <motion.p {...rise(0.45)} className="font-script text-4xl text-violet-200 sm:text-5xl">
              {t("Olá, eu sou", "Hello, I'm")}
            </motion.p>
            <motion.h1
              {...rise(0.55)}
              className="font-poster mt-1 text-[clamp(56px,8vw,118px)] leading-[0.88] text-white"
            >
              NICOLAS
              <br />
              CARAFFA
            </motion.h1>
            <motion.p
              {...rise(0.65)}
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-violet-300 sm:text-sm sm:tracking-[0.22em]"
            >
              {t("Desenvolvedor full-stack & agentes de IA", "Full-stack developer & AI agents")}
            </motion.p>
            <motion.p {...rise(0.72)} className="mt-4 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
              {t(
                "Construo produtos digitais e agentes de IA — da ideia ao deploy, com código que resolve problema real.",
                "I build digital products and AI agents — from idea to deploy, with code that solves real problems.",
              )}
            </motion.p>
            <motion.div {...rise(0.8)} className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#projetos"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 hover:shadow-[0_0_28px_2px_rgba(167,139,250,0.35)] active:scale-[0.97]"
              >
                {t("Ver projetos", "See projects")}
                <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-6 py-3 text-sm font-medium text-white/85 transition hover:border-violet-300/40 hover:text-white active:scale-[0.97]"
              >
                {t("Falar comigo", "Get in touch")}
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
