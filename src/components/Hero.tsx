import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Marquee } from "./Marquee";
import { TiltPhoto } from "./TiltPhoto";
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

  return (
    <section className="relative isolate overflow-hidden bg-[#050308]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_72%_38%,rgba(139,92,246,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_10%_85%,rgba(192,38,211,0.12),transparent_70%)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene3D />
        </Suspense>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-end gap-6 px-6 pb-12 pt-24 sm:gap-7 sm:px-10 sm:pb-12 lg:px-16">
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

          <motion.div
            ref={wrapRef}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
            style={marginRight !== null ? { marginRight } : undefined}
            className="hero-portrait-wrap col-start-1 row-start-1 flex h-full items-end justify-end"
          >
            <TiltPhoto alt="Nicolas Caraffa" className="h-full">
              <picture className="block h-full">
                <source srcSet="/photos/nicolas-hero-cutout.webp" type="image/webp" />
                <img
                  ref={imgRef}
                  src="/photos/nicolas-hero-cutout.png"
                  alt="Nicolas Caraffa"
                  width={1229}
                  height={1370}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-auto select-none object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.65)]"
                />
              </picture>
            </TiltPhoto>
          </motion.div>
        </div>

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
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.97]"
          >
            Ver projetos
            <ArrowUpRight
              size={16}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white active:scale-[0.97]"
          >
            Falar comigo
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="max-w-md"
        >
          <Marquee items={STACK_BADGES} />
        </motion.div>
      </div>
    </section>
  );
}
