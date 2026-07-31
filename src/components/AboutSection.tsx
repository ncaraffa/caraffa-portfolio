import { motion } from "framer-motion";
import { Code2, Bot, Rocket } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";

const CAPABILITIES = [
  {
    icon: Code2,
    label: "Full-stack",
    desc: "React, Next.js, Node.js e Supabase — do banco de dados à interface.",
  },
  {
    icon: Bot,
    label: "Agentes de IA",
    desc: "Automação e assistentes que rodam tarefas reais, não só demos.",
  },
  {
    icon: Rocket,
    label: "Deploy rápido",
    desc: "Da ideia ao ar sem enrolação: entrega contínua e boas práticas.",
  },
];

export function AboutSection() {
  return (
    <SectionShell id="sobre" className="py-28">
      {/* Carries the hero -> about handoff. Reaches far enough up that the
          ink->violet ramp is already underway inside the hero's lower third. */}
      <Wash
        className="atmo--bridge"
        background="linear-gradient(to bottom, rgb(var(--rgb-violet) / 0) 0%, rgb(var(--rgb-violet) / calc(var(--wash-1) * 0.28)) 18%, rgb(var(--rgb-violet) / calc(var(--wash-1) * 0.7)) 34%, rgb(var(--rgb-violet) / var(--wash-2)) 52%, rgb(var(--rgb-violet) / var(--wash-3)) 72%, rgb(var(--rgb-violet) / calc(var(--wash-2) * 0.6)) 88%, rgb(var(--rgb-violet) / 0) 100%)"
      />
      <Wash background="radial-gradient(ellipse 62% 54% at 26% 34%, rgb(var(--rgb-violet) / var(--wash-3)), transparent 72%)" />
      <Wash background="radial-gradient(ellipse 48% 44% at 82% 68%, rgb(var(--rgb-indigo) / var(--wash-2)), transparent 74%)" />

      <Column>
        <span className="pointer-events-none absolute -left-6 top-0 select-none font-display text-[180px] font-bold leading-none text-white/[0.03] sm:text-[260px]">
          01
        </span>

        <div className="relative grid gap-12 sm:grid-cols-[1.1fr_1fr] sm:items-center">
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-violet-400"
          >
            Como eu trabalho
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display mt-2 text-4xl font-semibold text-white sm:text-5xl"
          >
            Mais que código,
            <br />
            <span className="text-white/40">construção real.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 space-y-4 text-white/60"
          >
            <p>
              Trabalho na interseção entre desenvolvimento de software e
              automação inteligente — desde e-commerces completos até
              assistentes de IA que rodam tarefas reais no dia a dia.
            </p>
            <p>
              Gosto de resolver problemas de ponta a ponta: arquitetura,
              backend, interface e a experiência que sobra depois que o
              código funciona. Sempre testando ferramentas novas pra
              entregar mais rápido sem abrir mão de qualidade.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col gap-4" style={{ perspective: 1000 }}>
          {CAPABILITIES.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4, rotateX: 1.5, rotateY: -1.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-violet-400/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.35)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-400/10">
                  <Icon size={17} className="text-violet-300" />
                </span>
                <span className="font-display text-base font-semibold text-white">
                  {label}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{desc}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </Column>
    </SectionShell>
  );
}
