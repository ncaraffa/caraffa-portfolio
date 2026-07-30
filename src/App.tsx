import { motion } from "framer-motion";
import { Code2, Rocket, Bot, Layers, Mail } from "lucide-react";
import { Hero } from "./components/Hero";
import { TiltPhoto } from "./components/TiltPhoto";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

const SKILLS = [
  { name: "React / TypeScript", level: 92 },
  { name: "Node.js / APIs", level: 88 },
  { name: "Next.js / Supabase", level: 85 },
  { name: "Automação & Agentes de IA", level: 90 },
  { name: "Python", level: 78 },
  { name: "UI/UX & Design Systems", level: 80 },
];

const PROJECTS = [
  {
    name: "Natty Store",
    desc: "Loja de itens digitais para Roblox, com Next.js, Supabase e pagamentos via Pix (Mercado Pago).",
    tags: ["Next.js", "Supabase", "Mercado Pago"],
  },
  {
    name: "Júnior — Assistente Pessoal IA",
    desc: "Agente autônomo rodando em OpenClaw: automação de tarefas, controle de dispositivos, monitoramento e integrações multi-canal.",
    tags: ["Agentes de IA", "Automação", "Node.js"],
  },
  {
    name: "Room Monitor",
    desc: "Sistema de monitoramento com detecção de movimento, captura de vídeo/foto e alertas em tempo real.",
    tags: ["Python", "Computer Vision", "IoT"],
  },
];

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-5xl px-6 ${className}`}>
      {children}
    </section>
  );
}

function GlowOrb({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className}`}
    />
  );
}

export default function App() {
  return (
    <div className="relative overflow-hidden bg-[#06060a]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(167,139,250,0.25),transparent)]" />
        <GlowOrb className="left-[-10%] top-[10%] h-96 w-96 bg-violet-600/30" />
        <GlowOrb className="right-[-10%] top-[40%] h-96 w-96 bg-fuchsia-600/20" />
        <GlowOrb className="left-[20%] bottom-[-10%] h-96 w-96 bg-indigo-600/20" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06060a]/70 backdrop-blur-xl">
        <Section className="flex h-16 items-center justify-between">
          <span className="font-display text-lg font-semibold text-white">
            Nicolas<span className="text-violet-400">.</span>Caraffa
          </span>
          <nav className="hidden gap-8 text-sm text-white/60 sm:flex">
            <a href="#sobre" className="transition hover:text-white">
              Sobre
            </a>
            <a href="#skills" className="transition hover:text-white">
              Skills
            </a>
            <a href="#projetos" className="transition hover:text-white">
              Projetos
            </a>
            <a href="#contato" className="transition hover:text-white">
              Contato
            </a>
          </nav>
        </Section>
      </header>

      <Hero />

      <Section id="sobre" className="relative overflow-hidden py-28">
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
              Sobre mim
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
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Code2, label: "Full-stack" },
                  { icon: Bot, label: "Agentes de IA" },
                  { icon: Rocket, label: "Deploy rápido" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                  >
                    <Icon size={20} className="text-violet-300" />
                    <span className="text-xs text-white/70">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex justify-center"
          >
            <div className="absolute h-[70%] w-[85%] rounded-full bg-gradient-to-tr from-violet-600/40 via-fuchsia-500/25 to-indigo-500/30 blur-[60px]" />
            <TiltPhoto
              src="/photos/nicolas-2-cutout.png"
              alt="Nicolas Caraffa ao lado de uma Ferrari"
              imgClassName="h-[46vh] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] sm:h-[52vh]"
            />
          </motion.div>
        </div>
      </Section>

      <Section id="skills" className="py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-sm font-medium text-violet-400">Skills</span>
          <h2 className="font-display mt-2 text-3xl font-semibold text-white">
            O que eu domino
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-white">{skill.name}</span>
                <span className="text-white/40">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.06, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="projetos" className="py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-sm font-medium text-violet-400">Projetos</span>
          <h2 className="font-display mt-2 text-3xl font-semibold text-white">
            Coisas que eu construí
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 transition hover:border-violet-400/40"
            >
              <Layers size={20} className="mb-4 text-violet-300" />
              <h3 className="font-display text-lg font-semibold text-white">
                {project.name}
              </h3>
              <p className="mt-2 flex-1 text-sm text-white/55">{project.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contato" className="relative pb-[46vh] pt-28 text-center sm:pb-[52vh]">
        <span className="pointer-events-none absolute bottom-0 right-0 select-none font-display text-[180px] font-bold leading-none text-white/[0.03] sm:text-[260px]">
          02
        </span>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 -translate-x-1/2"
        >
          <div className="absolute bottom-0 left-1/2 h-[70%] w-[60%] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-600/40 via-fuchsia-500/25 to-indigo-500/30 blur-[70px]" />
          <TiltPhoto
            src="/photos/nicolas-4-cutout.png"
            alt="Nicolas Caraffa"
            className="relative pointer-events-auto"
            imgClassName="h-[42vh] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] sm:h-[48vh]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Vamos construir algo juntos?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/55">
            Aberto a novos projetos, colaborações e conversas sobre tecnologia.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:boxtanicolas@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.97]"
            >
              <Mail size={16} />
              boxtanicolas@gmail.com
            </a>
            <a
              href="https://github.com/ncaraffa"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white active:scale-[0.97]"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          </div>
        </motion.div>
      </Section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Nicolas Caraffa. Feito com React, Tailwind e
        Framer Motion.
      </footer>
    </div>
  );
}
