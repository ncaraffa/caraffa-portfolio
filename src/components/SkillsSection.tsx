import { useEffect, useRef, type PointerEvent } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Code2, Server, Bot } from "lucide-react";
import { SectionShell, Wash } from "./Section";
import { useT, type Txt } from "../i18n";

/** Each skill points at real projects where it was used. */
const SKILL_GROUPS = [
  {
    icon: Code2,
    label: { pt: "Frontend", en: "Frontend" },
    skills: [
      { name: "React / TypeScript", level: 92, used: ["Natty Store", "CaraffaStore", { pt: "Este portfólio", en: "This portfolio" }] },
      { name: "UI/UX & Design Systems", level: 80, used: ["NISHLAM Project", "NCImóveis"] },
    ],
  },
  {
    icon: Server,
    label: { pt: "Backend & dados", en: "Backend & data" },
    skills: [
      { name: "Node.js / APIs", level: 88, used: ["CaraffaStore", "Natty Store"] },
      { name: "Next.js / Supabase", level: 85, used: ["Natty Store", "CaraffaStore"] },
    ],
  },
  {
    icon: Bot,
    label: { pt: "IA, automação & scripts", en: "AI, automation & scripts" },
    skills: [
      { name: { pt: "Automação & Agentes de IA", en: "Automation & AI agents" }, level: 90, used: [{ pt: "Júnior — assistente pessoal", en: "Júnior — personal assistant" }] },
      { name: "Python", level: 78, used: ["NISHLAM Project"] },
    ],
  },
];

/** Logos from Simple Icons (CC0), tinted with each brand's colour via CSS mask. */
const LOGOS = [
  { id: "react", name: "React", color: "#61DAFB" },
  { id: "typescript", name: "TypeScript", color: "#3178C6" },
  { id: "nextdotjs", name: "Next.js", color: "#FFFFFF" },
  { id: "tailwindcss", name: "Tailwind", color: "#38BDF8" },
  { id: "nodedotjs", name: "Node.js", color: "#5FA04E" },
  { id: "javascript", name: "JavaScript", color: "#F7DF1E" },
  { id: "supabase", name: "Supabase", color: "#3FCF8E" },
  { id: "postgresql", name: "PostgreSQL", color: "#699EEA" },
  { id: "python", name: "Python", color: "#FFD43B" },
  { id: "appwrite", name: "Appwrite", color: "#FD366E" },
  { id: "git", name: "Git", color: "#F05032" },
];

const RING_TEXT = "REACT • TYPESCRIPT • NEXT.JS • TAILWIND • NODE.JS • SQL • SUPABASE • PYTHON • ";
const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Codex's "instrument panel" meter: mono readout, graduated track with a
 * glowing head, real projects as evidence. Number and bar share one 0→1
 * progress so the % counts up exactly as the bar fills.
 */
function SkillMeter({ name, level, used, delay }: { name: string | Txt; level: number; used: (string | Txt)[]; delay: number }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const value = useTransform(progress, (p) => Math.round(p * level));
  const scaleX = useTransform(progress, (p) => (p * level) / 100);
  const headLeft = useTransform(progress, (p) => `${p * level}%`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return progress.set(1);
    const c = animate(progress, 1, { duration: 1.4, delay, ease: EASE });
    return () => c.stop();
  }, [inView, reduce, delay, progress]);

  return (
    <div ref={ref}>
      <div className="flex items-end justify-between gap-3">
        <span className="pb-1 text-sm font-medium text-white/90">{t(name)}</span>
        <span className="font-mono text-4xl font-semibold leading-none tabular-nums text-white">
          <motion.span>{value}</motion.span>
          <span className="ml-0.5 text-base text-violet-300/70">%</span>
        </span>
      </div>

      <div className="relative mt-4 h-1.5 rounded-full bg-white/[0.07]">
        <motion.div
          style={{ scaleX }}
          className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#7c3aed] via-violet-400 to-[#c4b5fd] shadow-[0_0_16px_0_rgb(var(--rgb-violet)/0.7)]"
        />
        <motion.span
          aria-hidden
          style={{ left: headLeft }}
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#c4b5fd] bg-ink shadow-[0_0_14px_3px_rgb(var(--rgb-violet)/0.8)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-2.5 h-1.5"
          style={{ backgroundImage: "repeating-linear-gradient(to right, rgb(255 255 255 / 0.18) 0 1px, transparent 1px 10%)" }}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">{t("usado em", "used in")}</span>
        {used.map((u) => (
          <span
            key={t(u)}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/60 transition-colors group-hover:border-violet-400/25"
          >
            {t(u)}
          </span>
        ))}
      </div>
    </div>
  );
}

function Logo({ id, name, color, size }: { id: string; name: string; color: string; size: string }) {
  return (
    <div
      className={`flex items-center justify-center border border-white/10 ${size}`}
      style={{ background: `radial-gradient(circle, ${color}22, transparent 65%), #111018` }}
      title={name}
    >
      <span
        role="img"
        aria-label={name}
        className="block h-1/2 w-1/2"
        style={{
          backgroundColor: color,
          mask: `url(/logos/${id}.svg) center / contain no-repeat`,
          WebkitMask: `url(/logos/${id}.svg) center / contain no-repeat`,
        }}
      />
    </div>
  );
}

/*
 * A glass circle (on xl+) holding the three skill modules, with the tech
 * logos slowly orbiting just outside its rim and a ring of text turning the
 * other way between them. Below xl the circle can't fit three modules, so it
 * relaxes into a rounded glass panel with the logos as a row on top.
 *
 * Perf: the orbit and ring are pure CSS rotations on their own layers and sit
 * OUTSIDE the glass, so the backdrop blur never has moving content behind it.
 */
export function SkillsSection() {
  const t = useT();
  const step = 360 / LOGOS.length;
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <SectionShell id="skills" className="py-32 xl:py-24">
      <Wash background="radial-gradient(circle at 50% 50%, rgb(var(--rgb-violet) / var(--wash-4)) 0%, rgb(var(--rgb-violet) / var(--wash-2)) 32%, transparent 62%)" />
      <Wash background="radial-gradient(ellipse 44% 40% at 14% 80%, rgb(var(--rgb-indigo) / var(--wash-2)), transparent 76%)" />

      <div
        className="relative mx-auto flex w-full max-w-[1400px] items-center justify-center px-6 sm:px-10 xl:h-[calc(var(--D)+260px)]"
        style={{ ["--D" as string]: "min(1080px, 80vw)" }}
      >
        {/* Orbit + ring (xl only) */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 hidden xl:block">
          <svg
            viewBox="0 0 1000 1000"
            className="absolute left-0 top-0 w-[calc(var(--D)+64px)] -translate-x-1/2 -translate-y-1/2 animate-[spin_180s_linear_infinite] [animation-direction:reverse] will-change-transform motion-reduce:animate-none"
          >
            <defs>
              <path id="skills-ring" d="M500,500 m-482,0 a482,482 0 1,1 964,0 a482,482 0 1,1 -964,0" />
            </defs>
            <text fontSize="15" fontWeight="600" letterSpacing="6" fill="rgb(196 181 253 / 0.35)">
              <textPath href="#skills-ring">{RING_TEXT.repeat(4)}</textPath>
            </text>
          </svg>

          <div className="absolute left-0 top-0 h-0 w-0 animate-[spin_110s_linear_infinite] will-change-transform motion-reduce:animate-none">
            {LOGOS.map((l, i) => (
              <div
                key={l.id}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${i * step}deg) translateY(calc(var(--D) / -2 - 92px))` }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <Logo {...l} size="h-[84px] w-[84px] rounded-[26px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The glass circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/[0.12] xl:flex xl:aspect-square xl:w-[var(--D)] xl:items-center xl:justify-center xl:rounded-full"
          style={{
            background:
              "linear-gradient(150deg, rgb(255 255 255 / 0.09) 0%, rgb(255 255 255 / 0.025) 38%, rgb(var(--rgb-violet) / 0.07) 100%)",
            boxShadow:
              "inset 0 1px 0 rgb(255 255 255 / 0.14), inset 0 0 120px rgb(var(--rgb-violet) / 0.14), 0 50px 140px -50px rgb(0 0 0 / 0.9)",
          }}
        >
          {/* Instrument dial inside the rim (xl): fine ticks + major ticks and a
              slow light travelling round. Masked to the top and bottom arcs,
              where the circle would otherwise sit empty. Pure decoration. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[3.5%] hidden xl:block"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 16%, transparent 30%, transparent 70%, black 84%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 16%, transparent 30%, transparent 70%, black 84%, black 100%)",
            }}
          >
            <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full">
              <circle cx="500" cy="500" r="490" fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="10" strokeDasharray="1 11.83" />
              <circle cx="500" cy="500" r="486" fill="none" stroke="rgb(196 181 253 / 0.35)" strokeWidth="18" strokeDasharray="1.5 126.8" />
              <circle cx="500" cy="500" r="462" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="1" />
              <circle cx="500" cy="500" r="440" fill="none" stroke="rgb(255 255 255 / 0.04)" strokeWidth="1" strokeDasharray="4 8" />
            </svg>
            <div className="absolute inset-0 animate-[spin_48s_linear_infinite] will-change-transform motion-reduce:animate-none">
              <span className="absolute left-1/2 top-[2.2%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#c4b5fd] shadow-[0_0_14px_4px_rgb(var(--rgb-violet)/0.8)]" />
            </div>
            <div className="absolute inset-[7.5%] animate-[spin_70s_linear_infinite] [animation-direction:reverse] will-change-transform motion-reduce:animate-none">
              <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fuchsia-300/80 shadow-[0_0_10px_3px_rgb(var(--rgb-fuchsia)/0.6)]" />
            </div>
          </div>

          {/* Specular highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 40% at 30% 8%, rgb(255 255 255 / 0.09), transparent 70%)" }}
          />

          <div className="relative w-full px-6 py-12 sm:px-10 xl:max-w-[900px] xl:-translate-y-6 xl:px-0 xl:py-0">
            {/* Logos row (below xl) */}
            <div className="mb-10 flex flex-wrap justify-center gap-2.5 xl:hidden">
              {LOGOS.map((l) => (
                <Logo key={l.id} {...l} size="h-12 w-12 rounded-2xl" />
              ))}
            </div>

            <div className="text-center">
              <span className="text-sm font-medium text-violet-400">{t("Habilidades", "Skills")}</span>
              <h2 className="font-display mt-1 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                {t("Minhas habilidades", "My skills")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
                {t(
                  "Cada habilidade aponta para os projetos reais onde ela foi usada.",
                  "Each skill points to the real projects where it was used.",
                )}
              </p>
            </div>

            {/* No box: a soft, edgeless tint so the three columns read as part of the circle. */}
            <div
              className="mt-8 grid divide-y divide-white/[0.07] lg:grid-cols-3 lg:divide-x lg:divide-y-0"
              style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgb(255 255 255 / 0.035), transparent 75%)" }}
            >
              {SKILL_GROUPS.map(({ icon: Icon, label, skills }, g) => (
                <motion.div
                  key={label.pt}
                  onPointerMove={onMove}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: 0.2 + g * 0.08, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative p-6 sm:p-8 xl:py-9"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--rgb-violet) / 0.12), transparent 70%)",
                      // Feather the column edges so the hover glow never shows its rectangle.
                      maskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 55%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 55%, transparent 100%)",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-8 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-400/10">
                        <Icon size={18} className="text-violet-300" />
                      </span>
                      <span className="font-display text-lg font-semibold text-white">{t(label)}</span>
                    </div>
                    <div className="flex flex-col gap-9">
                      {skills.map((s, i) => (
                        <SkillMeter key={t(s.name)} {...s} delay={0.3 + g * 0.08 + i * 0.15} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
