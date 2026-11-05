import { useRef, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Code2, Bot, Rocket, Check } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";
import { useT } from "../i18n";

/* ── Headline that "lights up" word by word as you scroll ─────────────── */

function Word({ children, p, at, span, className }: { children: string; p: MotionValue<number>; at: number; span: number; className: string }) {
  const opacity = useTransform(p, [at, at + span], [0.12, 1]);
  const y = useTransform(p, [at, at + span], [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block whitespace-pre ${className}`}>
      {children}
    </motion.span>
  );
}

function ScrollHeadline({ lines }: { lines: { text: string; className: string }[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = lines.flatMap((l, li) => l.text.split(" ").map((w) => ({ w, li })));
  const span = 1 / words.length;

  return (
    <h2 ref={ref} className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {words.map((x, i) =>
            x.li !== li ? null : reduce ? (
              <span key={i} className={line.className}>{x.w} </span>
            ) : (
              <Word key={i} p={scrollYProgress} at={i * span} span={span * 1.6} className={line.className}>
                {x.w + " "}
              </Word>
            ),
          )}
        </span>
      ))}
    </h2>
  );
}

/* ── Bento tile with a cursor-following spotlight ─────────────────────── */

function Tile({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      onPointerMove={onMove}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-7 sm:p-9 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--rgb-violet) / 0.16), transparent 70%)" }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

function TileHead({ icon: Icon, title, desc }: { icon: typeof Code2; title: string; desc: string }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-400/10">
          <Icon size={22} className="text-violet-300" />
        </span>
        <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">{desc}</p>
    </div>
  );
}

/* ── Visuals ──────────────────────────────────────────────────────────── */

/** Three aligned layers drop into place, then a pulse travels through them. */
type Layer = { name: string; desc: string; tech: string[] };

function StackVisual({ layers }: { layers: Layer[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mt-8 flex flex-1 flex-col justify-end gap-3">
      {layers.map((l, i) => (
        <motion.div
          key={l.name}
          initial={{ opacity: 0, y: -30, rotateX: 40 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-[2rem_1fr] items-center gap-x-4 gap-y-3 overflow-hidden rounded-xl border border-violet-300/20 bg-violet-400/[0.07] px-5 py-4 sm:grid-cols-[2rem_minmax(0,1fr)_auto]"
        >
          <span className="font-mono text-xs text-violet-300/60">0{i + 1}</span>
          <div className="min-w-0">
            <div className="font-mono text-sm font-semibold text-violet-100">{l.name}</div>
            <div className="mt-0.5 text-sm text-white/50">{l.desc}</div>
          </div>
          <div className="col-start-2 flex flex-wrap gap-1.5 sm:col-start-3 sm:justify-end">
            {l.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[11px] text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-violet-300/20 to-transparent"
              animate={{ x: ["-120%", "900%"] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 + i * 0.35, ease: "easeInOut", repeatDelay: 1.6 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/** A small terminal whose lines type in one after another, on a loop. */
function AgentTerminal({ lines }: { lines: { text: string; done?: boolean }[] }) {
  const reduce = useReducedMotion();
  const cycle = lines.length * 0.9 + 2.5;
  return (
    <div className="mt-8 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40 font-mono text-[13px]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-indigo-400/60" />
        <span className="ml-2 text-[11px] text-white/35">agent.log</span>
      </div>
      <div className="space-y-2.5 p-4">
        {lines.map((l, i) => {
          const start = (i * 0.9) / cycle;
          const shown = (i * 0.9 + 0.5) / cycle;
          return (
            <motion.div
              key={l.text}
              className={`flex items-center gap-2 ${l.done ? "text-emerald-300/90" : "text-white/70"}`}
              initial={reduce ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              whileInView={
                reduce
                  ? undefined
                  : {
                      opacity: [0, 1, 1, 0],
                      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"],
                    }
              }
              transition={{ duration: cycle, times: [start, shown, 0.92, 1], repeat: Infinity, ease: "linear" }}
            >
              <span className="text-violet-300">{l.done ? "✓" : "›"}</span>
              {l.text}
            </motion.div>
          );
        })}
        {!reduce && (
          <motion.span
            aria-hidden
            className="inline-block h-4 w-2 bg-violet-300/80"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

/** Build → Test → Deploy: a progress beam runs the pipeline, steps light up. */
function Pipeline({ steps }: { steps: string[] }) {
  const reduce = useReducedMotion();
  const dur = 4.5;
  return (
    <div className="relative mt-10 flex flex-1 items-center">
      {/* Lines sit at the circles' centre line (h-12 → 24px), not the row's. */}
      <div className="relative flex w-full justify-between">
        <div className="absolute left-6 right-6 top-6 h-px -translate-y-1/2 bg-white/10" />
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute left-6 right-6 top-6 h-[2px] origin-left -translate-y-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-400 shadow-[0_0_14px_2px_rgb(var(--rgb-violet)/0.6)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: [0, 1, 1] }}
            transition={{ duration: dur, times: [0, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {steps.map((s, i) => {
          const at = (i / (steps.length - 1)) * 0.75;
          return (
            <div key={s} className="relative flex w-12 flex-col items-center gap-3">
              <motion.span
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink"
                initial={false}
                whileInView={
                  reduce
                    ? undefined
                    : {
                        borderColor: ["rgba(255,255,255,0.15)", "rgba(196,181,253,0.8)", "rgba(196,181,253,0.8)", "rgba(255,255,255,0.15)"],
                        boxShadow: ["0 0 0 0 rgba(139,92,246,0)", "0 0 24px 4px rgba(139,92,246,0.45)", "0 0 24px 4px rgba(139,92,246,0.45)", "0 0 0 0 rgba(139,92,246,0)"],
                      }
                }
                transition={{ duration: dur, times: [Math.max(0, at - 0.01), at + 0.02, 0.95, 1], repeat: Infinity }}
              >
                {i === steps.length - 1 ? (
                  <Rocket size={18} className="text-violet-200" />
                ) : (
                  <Check size={18} className="text-violet-200" />
                )}
              </motion.span>
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-white/50">{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export function AboutSection() {
  const t = useT();

  return (
    <SectionShell id="sobre" className="py-40">
      {/* Carries the hero -> about handoff. */}
      <Wash
        className="atmo--bridge"
        background="linear-gradient(to bottom, rgb(var(--rgb-violet) / 0) 0%, rgb(var(--rgb-violet) / calc(var(--wash-1) * 0.28)) 18%, rgb(var(--rgb-violet) / calc(var(--wash-1) * 0.7)) 34%, rgb(var(--rgb-violet) / var(--wash-2)) 52%, rgb(var(--rgb-violet) / var(--wash-3)) 72%, rgb(var(--rgb-violet) / calc(var(--wash-2) * 0.6)) 88%, rgb(var(--rgb-violet) / 0) 100%)"
      />
      <Wash background="radial-gradient(ellipse 62% 54% at 26% 34%, rgb(var(--rgb-violet) / var(--wash-3)), transparent 72%)" />
      <Wash background="radial-gradient(ellipse 48% 44% at 82% 68%, rgb(var(--rgb-indigo) / var(--wash-2)), transparent 74%)" />

      <Column>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mb-5 block text-sm font-medium text-violet-400"
            >
              {t("Como eu trabalho", "How I work")}
            </motion.span>
            <ScrollHeadline
              lines={[
                { text: t("Mais que código,", "More than code,"), className: "text-white" },
                {
                  text: t("construção real.", "real building."),
                  className: "bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent",
                },
              ]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 text-lg leading-relaxed text-white/60"
          >
            <p>
              {t(
                "Trabalho na interseção entre desenvolvimento de software e automação inteligente — desde e-commerces completos até assistentes de IA que rodam tarefas reais no dia a dia.",
                "I work where software development meets intelligent automation — from complete e-commerce stores to AI assistants that run real, everyday tasks.",
              )}
            </p>
            <p>
              {t(
                "Gosto de resolver problemas de ponta a ponta: arquitetura, backend, interface e a experiência que sobra depois que o código funciona.",
                "I like solving problems end to end: architecture, backend, interface and the experience that remains once the code works.",
              )}
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-6">
          <Tile className="lg:col-span-4">
            <TileHead
              icon={Code2}
              title="Full-stack"
              desc={t(
                "React, Next.js, Node.js e Supabase — do banco de dados à interface.",
                "React, Next.js, Node.js and Supabase — from the database to the interface.",
              )}
            />
            <StackVisual
              layers={[
                {
                  name: "Interface",
                  desc: t("Telas rápidas, responsivas e animadas", "Fast, responsive, animated screens"),
                  tech: ["React", "Next.js", "Tailwind"],
                },
                {
                  name: "API",
                  desc: t("Regras de negócio, rotas e pagamentos", "Business logic, routes and payments"),
                  tech: ["Node.js", "TypeScript", "Mercado Pago"],
                },
                {
                  name: t("Banco de dados", "Database"),
                  desc: t("Dados, autenticação e arquivos", "Data, auth and file storage"),
                  tech: ["SQL", "PostgreSQL", "Supabase", "Appwrite"],
                },
              ]}
            />
          </Tile>

          <Tile className="lg:col-span-2 lg:row-span-2" delay={0.12}>
            <TileHead
              icon={Bot}
              title={t("Agentes de IA", "AI agents")}
              desc={t(
                "Automação e assistentes que rodam tarefas reais, não só demos.",
                "Automation and assistants that run real tasks, not just demos.",
              )}
            />
            <AgentTerminal
              lines={[
                { text: t("ler mensagens", "read messages") },
                { text: t("entender o pedido", "understand the request") },
                { text: t("executar a tarefa", "run the task") },
                { text: t("avisar quando terminar", "report back when done") },
                { text: t("concluído", "done"), done: true },
              ]}
            />
          </Tile>

          <Tile className="lg:col-span-4" delay={0.06}>
            <TileHead
              icon={Rocket}
              title={t("Deploy rápido", "Fast deploys")}
              desc={t(
                "Da ideia ao ar sem enrolação: entrega contínua e boas práticas.",
                "From idea to live without the fuss: continuous delivery and good practices.",
              )}
            />
            <Pipeline steps={["Build", t("Teste", "Test"), "Deploy"]} />
          </Tile>
        </div>
      </Column>
    </SectionShell>
  );
}
