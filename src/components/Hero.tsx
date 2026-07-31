import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Marquee } from "./Marquee";
import { HeroPortrait } from "./HeroPortrait";
import { useHeroPortraitOffset } from "../hooks/useHeroPortraitOffset";

const HeroScene3D = lazy(() => import("./HeroScene3D"));

const STACK_BADGES = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "Supabase",
  "Tailwind",
  "shadcn/ui",
  "Framer Motion",
  "Git",
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero() {
  const { outlineRef, wrapRef, imgRef, marginRight } = useHeroPortraitOffset();

  // No background of its own — a second opaque `bg-ink` here was the other
  // occluder hiding the page-level ambient layer (see .app-root in index.css),
  // which is also why the app's own radial aimed at 50% -10% was wasted.
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="hero-ambient-fade pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_72%_38%,rgb(var(--rgb-violet)/0.26),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_10%_85%,rgb(var(--rgb-fuchsia)/0.15),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_14%_18%,rgb(var(--rgb-indigo)/0.13),transparent_72%)]" />
      </div>
      <div
        aria-hidden
        className="hero-ambient-fade pointer-events-none absolute inset-0"
      >
        <Suspense fallback={null}>
          <HeroScene3D />
        </Suspense>
      </div>
      {/*
        A BAND, not a ramp: alpha returns to zero at BOTH ends. Its only job is
        to sit behind the portrait's lower half; it must not still be veiling
        anything by the time it reaches the hero's bottom edge.

        This element was the last visible seam on the page. It used to peak at
        0.82 ink exactly at the hero's boundary and then stop dead — so the
        ambient purple was veiled 82% above the line and completely unveiled
        one pixel below it, which read as a hard horizontal division. The next
        section's washes already over-scan up past this boundary; they were
        simply being covered here. Decaying to zero uncovers them, and the
        handoff becomes one continuous gradient spanning both sections.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(to_top,rgb(6_6_10/0)_0%,rgb(6_6_10/0.34)_16%,rgb(6_6_10/0.66)_42%,rgb(6_6_10/0.52)_72%,rgb(6_6_10/0)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-end gap-5 px-6 pb-12 pt-24 sm:gap-6 sm:px-10 sm:pb-12 lg:px-16">
        <div className="flex flex-col gap-3">
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 text-sm text-violet-200"
          >
            <Sparkles size={14} />
            Disponível para novos projetos
          </motion.div>

          <motion.span
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="hero-eyebrow"
          >
            Sobre mim
          </motion.span>
        </div>

        <div className="hero-visual relative isolate grid grid-cols-1 grid-rows-1">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="hero-title col-start-1 row-start-1 self-center select-none"
          >
            <span className="hero-title-fill block">CARAFFA</span>
            <span ref={outlineRef} className="hero-title-outline">
              DEVELOPER
            </span>
          </motion.h1>

          <HeroPortrait wrapRef={wrapRef} imgRef={imgRef} marginRight={marginRight} />
        </div>

        <div className="flex flex-col gap-5">
          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="max-w-lg text-base text-white/60 sm:text-lg"
          >
            Desenvolvedor construindo produtos digitais e agentes de IA
            autônomos — da ideia ao deploy. Foco em automação, experiências
            rápidas e código que resolve problema real.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-[0_0_0_0_rgba(167,139,250,0)] transition hover:bg-white/90 hover:shadow-[0_0_28px_2px_rgba(167,139,250,0.35)] active:scale-[0.97]"
            >
              Ver projetos
              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-violet-300/40 hover:text-white hover:shadow-[0_0_24px_0_rgba(139,92,246,0.2)] active:scale-[0.97]"
            >
              Falar comigo
            </a>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="max-w-md border-t border-white/10 pt-5"
        >
          <span className="mb-3 block text-xs font-medium uppercase tracking-[0.18em] text-white/35">
            Stack
          </span>
          <Marquee items={STACK_BADGES} />
        </motion.div>
      </div>
    </section>
  );
}
