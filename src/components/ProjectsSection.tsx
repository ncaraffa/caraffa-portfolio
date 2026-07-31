import { motion } from "framer-motion";
import { ShoppingBag, Bot, Camera, ArrowUpRight } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";

const PROJECTS = [
  {
    name: "Natty Store",
    desc: "Loja de itens digitais para Roblox, com Next.js, Supabase e pagamentos via Pix (Mercado Pago).",
    tags: ["Next.js", "Supabase", "Mercado Pago"],
    icon: ShoppingBag,
    accent: "violet" as const,
    href: "https://github.com/ncaraffa/Natty-Store",
  },
  {
    name: "Júnior — Assistente Pessoal IA",
    desc: "Agente autônomo rodando em OpenClaw: automação de tarefas, controle de dispositivos, monitoramento e integrações multi-canal.",
    tags: ["Agentes de IA", "Automação", "Node.js"],
    icon: Bot,
    accent: "fuchsia" as const,
    href: null,
  },
  {
    name: "Room Monitor",
    desc: "Sistema de monitoramento com detecção de movimento, captura de vídeo/foto e alertas em tempo real.",
    tags: ["Python", "Computer Vision", "IoT"],
    icon: Camera,
    accent: "indigo" as const,
    href: null,
  },
];

const ACCENTS = {
  violet: {
    border: "hover:border-violet-400/40",
    shadow: "hover:shadow-[0_0_36px_-12px_rgba(139,92,246,0.55)]",
    iconWrap: "border-violet-400/30 bg-violet-400/10",
    icon: "text-violet-300",
    glow: "from-violet-600/30",
  },
  fuchsia: {
    border: "hover:border-fuchsia-400/40",
    shadow: "hover:shadow-[0_0_36px_-12px_rgba(232,121,249,0.5)]",
    iconWrap: "border-fuchsia-400/30 bg-fuchsia-400/10",
    icon: "text-fuchsia-300",
    glow: "from-fuchsia-600/25",
  },
  indigo: {
    border: "hover:border-indigo-400/40",
    shadow: "hover:shadow-[0_0_36px_-12px_rgba(129,140,248,0.5)]",
    iconWrap: "border-indigo-400/30 bg-indigo-400/10",
    icon: "text-indigo-300",
    glow: "from-indigo-600/25",
  },
};

export function ProjectsSection() {
  return (
    <SectionShell id="projetos" className="py-28">
      {/*
        The old wash was `at 50% 0%` inside an inset-0 box: a half-ellipse whose
        flat diameter landed exactly on the Skills/Projects boundary — the single
        most visible seam on the page. Centres are now well inside an
        over-scanned box, so the falloff is symmetric and lands mid-gradient.
      */}
      <Wash background="radial-gradient(ellipse 56% 48% at 24% 26%, rgb(var(--rgb-indigo) / var(--wash-3)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 50% 46% at 76% 74%, rgb(var(--rgb-violet) / var(--wash-2)), transparent 76%)" />

      <Column>
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

      <div className="grid gap-6 sm:grid-cols-3" style={{ perspective: 1200 }}>
        {PROJECTS.map((project, i) => {
          const accent = ACCENTS[project.accent];
          const Icon = project.icon;
          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 transition-all ${accent.border} ${accent.shadow}`}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent.glow} to-transparent opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
              />

              <span
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${accent.iconWrap}`}
              >
                <Icon size={19} className={accent.icon} />
              </span>

              <h3 className="font-display text-lg font-semibold text-white">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-violet-200"
                  >
                    {project.name}
                    <ArrowUpRight
                      size={16}
                      className="text-white/40 transition group-hover:text-white/70"
                    />
                  </a>
                ) : (
                  project.name
                )}
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
          );
        })}
      </div>
      </Column>
    </SectionShell>
  );
}
