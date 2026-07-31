import { motion } from "framer-motion";
import { MapPin, Terminal, Network, ShieldCheck, Server } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";
import { Logo } from "./Logo";

/** The path so far, in his own words — no invented milestones. */
const TIMELINE = [
  {
    when: "Aos 11 anos",
    what: "Primeiro contato com programação, em Python. Durou algumas semanas e acabou ficando pra trás.",
  },
  {
    when: "Abril de 2025",
    what: "Depois de conhecer um amigo que já era desenvolvedor, a paixão por programação e tecnologia despertou de novo.",
  },
  {
    when: "Desde então",
    what: "Construindo base de verdade: dos fundamentos da programação a redes, Linux e administração de servidores.",
  },
];

const FOUNDATIONS = [
  {
    icon: Terminal,
    label: "Fundamentos de programação",
    desc: "A base que sustenta o resto — lógica, estruturas e prática constante.",
  },
  {
    icon: ShieldCheck,
    label: "Cybersegurança",
    desc: "Curso básico concluído: princípios de segurança e boas práticas.",
  },
  {
    icon: Terminal,
    label: "Linux",
    desc: "Linha de comando, permissões e o dia a dia de um sistema Unix.",
  },
  {
    icon: Network,
    label: "Redes",
    desc: "Como as máquinas conversam: endereçamento, serviços e diagnóstico.",
  },
  {
    icon: Server,
    label: "Windows Server",
    desc: "Administração na prática — incluindo a criação do meu próprio domínio.",
  },
];

export function IntroSection() {
  return (
    <SectionShell id="intro" className="py-28">
      <Wash background="radial-gradient(ellipse 58% 50% at 72% 30%, rgb(var(--rgb-violet) / var(--wash-3)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 46% 42% at 18% 72%, rgb(var(--rgb-fuchsia) / var(--wash-2)), transparent 76%)" />

      <Column>
        <div className="grid gap-14 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium text-violet-400"
            >
              Quem eu sou
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display mt-2 text-4xl font-semibold text-white sm:text-5xl"
            >
              Nicolas Caraffa
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 inline-flex items-center gap-2 text-sm text-white/45"
            >
              <MapPin size={14} className="text-violet-300" />
              Corumbá, Mato Grosso do Sul
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-7 space-y-4 text-white/60"
            >
              <p>
                Desde pequeno, sempre tive uma certa paixão por jogos e
                computadores. Aos 11 anos tive meu primeiro contato com
                programação em Python — algo que durou algumas semanas, mas
                acabou ficando pra trás.
              </p>
              <p>
                Em meados de abril de 2025, depois de conhecer um amigo que já
                era desenvolvedor, essa paixão por programação e tecnologia
                despertou de novo. Desde então venho desenvolvendo minhas
                habilidades na área — e dessa vez para valer.
              </p>
            </motion.div>
          </div>

          {/* The mark, given room to actually be seen. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-first flex justify-center sm:order-last sm:justify-end"
          >
            <Logo className="h-20 sm:h-28" glow="opacity-90" />
          </motion.div>
        </div>

        {/* Journey */}
        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-violet-400/35 to-transparent"
          />
          <ol className="space-y-8">
            {TIMELINE.map((step, i) => (
              <motion.li
                key={step.when}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border border-violet-300/60 bg-violet-400/25 shadow-[0_0_12px_2px_rgb(var(--rgb-violet)/0.45)]"
                />
                <span className="font-display text-sm font-semibold text-violet-200">
                  {step.when}
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  {step.what}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Foundations */}
        <div className="mt-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-6 block text-xs font-medium uppercase tracking-[0.18em] text-white/35"
          >
            Base técnica
          </motion.span>

          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: 1000 }}
          >
            {FOUNDATIONS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -4, rotateX: 1.5, rotateY: -1.5 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-violet-400/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_-8px_rgb(var(--rgb-violet)/0.4)]"
              >
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-400/10">
                  <Icon size={16} className="text-violet-300" />
                </span>
                <h3 className="font-display text-sm font-semibold text-white">
                  {label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Column>
    </SectionShell>
  );
}
