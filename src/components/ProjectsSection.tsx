import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";
import { GithubIcon } from "./BrandIcons";
import { useT } from "../i18n";

/** Real projects only — prints in /public/projects are screenshots of the live pages. */
const PROJECTS = [
  {
    name: "NISHLAM Project",
    kind: { pt: "Site de marca", en: "Brand website" },
    desc: { pt: "Site da NISHLAM, marca de serigrafia de camisetas e acessórios: catálogo completo e um simulador de estampa na frente e nas costas da camiseta.", en: "Website for NISHLAM, a screen-printing brand for t-shirts and accessories: full catalog and a print simulator for the front and back of the shirt." },
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    image: "/projects/nishlam.webp",
    url: "https://nishlamproject.com.br",
    repo: "https://github.com/ncaraffa/nishlam-project",
    glow: "var(--rgb-fuchsia)",
  },
  {
    name: "Natty Store",
    kind: { pt: "E-commerce", en: "E-commerce" },
    desc: { pt: "Loja de itens digitais para Roblox (MM2, Flee the Facility e Adopt Me), com reserva automática de estoque, encomendas e pagamento via Pix.", en: "Digital item store for Roblox (MM2, Flee the Facility and Adopt Me), with automatic stock reservation, custom orders and Pix payments." },
    tags: ["Next.js", "Supabase", "Mercado Pago"],
    image: "/projects/natty.webp",
    url: "https://natty-store-mu.vercel.app",
    repo: "https://github.com/ncaraffa/Natty-Store",
    glow: "var(--rgb-violet)",
  },
  {
    name: "NCImóveis",
    kind: { pt: "Site institucional", en: "Business website" },
    desc: { pt: "Site do corretor de imóveis Nicola Caraffa em Corumbá e Campo Grande (MS), com catálogo de imóveis, simulador de financiamento e painel administrativo.", en: "Website for real estate agent Nicola Caraffa in Corumbá and Campo Grande (MS, Brazil), with a property catalog, mortgage simulator and admin panel." },
    tags: ["HTML", "CSS", "JavaScript", "Appwrite"],
    image: "/projects/ncimoveis.webp",
    url: "https://caraffaimoveis.com.br",
    repo: "https://github.com/ncaraffa/NCImoveis",
    glow: "var(--rgb-indigo)",
  },
  {
    name: "CaraffaStore",
    kind: { pt: "SaaS", en: "SaaS" },
    desc: { pt: "Plataforma multi-tenant para pequenos comerciantes criarem a própria loja virtual e venderem via Pix, sem comissão por venda.", en: "Multi-tenant platform for small merchants to create their own online store and sell via Pix, with no commission per sale." },
    tags: ["Next.js", "TypeScript", "Supabase", "Mercado Pago"],
    image: "/projects/caraffastore.webp",
    url: "https://caraffastore.vercel.app",
    repo: "https://github.com/ncaraffa/CaraffaStore",
    glow: "var(--rgb-indigo)",
  },
  {
    name: "Untitled",
    kind: { pt: "Jogo", en: "Game" },
    desc: { pt: "Terror psicológico em primeira pessoa: cinco noites, uma casa e tarefas que deixam de parecer comuns. Publicado no itch.io como purp0se.", en: "First-person psychological horror: five nights, one house and chores that stop feeling ordinary. Published on itch.io as purp0se." },
    tags: ["Game dev", { pt: "Terror", en: "Horror" }, "Windows"],
    image: "/projects/untitled-game.webp",
    url: "https://purp0se.itch.io/untitled",
    repo: "https://github.com/ncaraffa/Untitled",
    glow: "var(--rgb-lilac)",
  },
];

type Project = (typeof PROJECTS)[number];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);
  const host = new URL(project.url).host;
  const t = useT();

  return (
    <article
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-20"
    >
      {/* Print inside a browser frame */}
      <motion.a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        aria-label={t(`Abrir ${project.name}`, `Open ${project.name}`)}
        initial={{ opacity: 0, x: flip ? 60 : -60, rotate: flip ? 1.5 : -1.5 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative block ${flip ? "lg:order-2" : ""}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
          style={{ background: `radial-gradient(closest-side, rgb(${project.glow} / 0.45), transparent)` }}
        />
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0d0d14] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition duration-500 group-hover:-translate-y-1.5 group-hover:border-violet-300/30">
          <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="mx-auto truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[11px] text-white/40">
              {host}
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.image}
              alt={t(`Página inicial de ${project.name}`, `${project.name} home page`)}
              loading="lazy"
              decoding="async"
              style={{ y: imgY }}
              className="absolute inset-0 h-[108%] w-full -translate-y-[4%] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </motion.a>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={flip ? "lg:order-1" : ""}
      >
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300/80">
          {t(project.kind)}
        </span>
        <h3 className="font-display mt-3 text-3xl font-semibold text-white sm:text-5xl">
          {project.name}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-xl">{t(project.desc)}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={t(tag)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60"
            >
              {t(tag)}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 hover:shadow-[0_0_28px_2px_rgba(167,139,250,0.35)] active:scale-[0.97]"
          >
            {t("Ver ao vivo", "Live site")}
            <ArrowUpRight size={16} />
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-violet-300/40 hover:text-white active:scale-[0.97]"
          >
            <GithubIcon size={16} />
            {t("Código", "Code")}
          </a>
        </div>
      </motion.div>
    </article>
  );
}

export function ProjectsSection() {
  const t = useT();
  return (
    <SectionShell id="projetos" className="py-40">
      <Wash background="radial-gradient(ellipse 56% 48% at 24% 26%, rgb(var(--rgb-indigo) / var(--wash-3)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 50% 46% at 76% 74%, rgb(var(--rgb-violet) / var(--wash-2)), transparent 76%)" />

      <Column wide>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="text-sm font-medium text-violet-400">{t("Projetos", "Projects")}</span>
          <h2 className="font-display mt-2 text-4xl font-semibold text-white sm:text-5xl">
            {t("Coisas que eu construí", "Things I have built")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/55">
            {t("Projetos reais, no ar — clique em qualquer um para abrir.", "Real projects, live — click any of them to open.")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-28 sm:gap-36">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.name} project={p} index={i} />
          ))}
        </div>
      </Column>
    </SectionShell>
  );
}
