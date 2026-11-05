import type { ReactNode } from "react";
import { Hero } from "./components/Hero";
import { IntroSection } from "./components/IntroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { InternationalSection } from "./components/InternationalSection";
import { ContactSection } from "./components/ContactSection";
import { ClosingSection } from "./components/ClosingSection";
import { Section, GlowOrb } from "./components/Section";
import { Logo } from "./components/Logo";
import { useLang, useT, type Lang } from "./i18n";

function BrFlag() {
  return (
    <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden>
      <rect width="28" height="20" fill="#009c3b" />
      <path d="M14 2.2 25.6 10 14 17.8 2.4 10z" fill="#ffdf00" />
      <circle cx="14" cy="10" r="4.6" fill="#002776" />
      <path d="M9.5 9.2c3-.9 6.4-.5 9 1" stroke="#fff" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  const opts: { id: Lang; label: string; flag: ReactNode }[] = [
    { id: "pt", label: "Português", flag: <BrFlag /> },
    { id: "en", label: "English", flag: <img src="/images/flag-us.svg" alt="" className="h-full w-full object-cover" /> },
  ];
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1" role="group" aria-label="Idioma / Language">
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setLang(o.id)}
          aria-pressed={lang === o.id}
          title={o.label}
          aria-label={o.label}
          className={`h-5 w-7 overflow-hidden rounded-[4px] transition duration-300 ${lang === o.id ? "opacity-100 ring-2 ring-violet-300/70 ring-offset-1 ring-offset-ink" : "opacity-40 grayscale hover:opacity-80 hover:grayscale-0"}`}
        >
          {o.flag}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const t = useT();
  return (
    /* `app-root` carries `isolation: isolate` and `overflow-x: clip`, and
       deliberately NO background — see the long note on .app-root in index.css.
       body owns the base colour; an opaque background here would paint over the
       whole ambient layer below. */
    <div className="app-root">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-5%,rgb(var(--rgb-lilac)/0.16),transparent_70%)]" />
        <GlowOrb
          className="left-[-12%] top-[6%] h-[34rem] w-[34rem] opacity-45"
          style={{ background: "rgb(var(--rgb-violet) / 0.34)" }}
          delay={0}
        />
        <GlowOrb
          className="right-[-14%] top-[38%] h-[32rem] w-[32rem] opacity-40"
          style={{ background: "rgb(var(--rgb-fuchsia) / 0.24)" }}
          delay={3}
        />
        <GlowOrb
          className="left-[18%] bottom-[-14%] h-[34rem] w-[34rem] opacity-40"
          style={{ background: "rgb(var(--rgb-indigo) / 0.26)" }}
          delay={6}
        />
      </div>

      <header className="sticky top-0 z-50">
        {/* The veil is its own masked layer so the tint AND the blur both fade
            out downward, instead of ending on a hard line at y=64. */}
        <div
          aria-hidden
          className="header-veil absolute inset-0 -z-10 h-[140%] bg-ink/85 backdrop-blur-md"
        />
        {/* A thread of violet light along the header's foot — brightest at the
            centre, fading to nothing at both ends, so it never draws a rule. */}
        <div
          aria-hidden
          className="header-thread pointer-events-none absolute inset-x-0 bottom-0 h-px"
        />
        <Section className="flex h-16 items-center justify-between">
          <a
            href="#intro"
            className="group flex items-center gap-3"
            aria-label={t("Nicolas Caraffa — início", "Nicolas Caraffa — home")}
          >
            <Logo
              className="h-7 transition-transform duration-300 group-hover:scale-105"
              glow="opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="font-display text-lg font-semibold text-white">
              Nicolas
              <span className="text-violet-400 transition-colors duration-300 group-hover:text-violet-300">
                .
              </span>
              Caraffa
            </span>
          </a>
          <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 text-sm text-white/60 sm:flex">
            <a href="#intro" className="nav-link transition hover:text-white">
              {t("Sobre mim", "About")}
            </a>
            <a href="#skills" className="nav-link transition hover:text-white">
              {t("Habilidades", "Skills")}
            </a>
            <a href="#projetos" className="nav-link transition hover:text-white">
              {t("Projetos", "Projects")}
            </a>
            <a href="#contato" className="nav-link transition hover:text-white">
              {t("Contato", "Contact")}
            </a>
          </nav>
          <LangSwitch />
          </div>
        </Section>
      </header>

      <Hero />
      <IntroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <InternationalSection />
      <ContactSection />
      <ClosingSection />

      <footer className="relative bg-[#020203] py-8 text-center text-xs text-white/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" />
        © {new Date().getFullYear()} Nicolas Caraffa. {t("Feito com React, Tailwind e Framer Motion.", "Built with React, Tailwind and Framer Motion.")}
      </footer>

      {/* Grain sits above everything so it can dither the section washes too —
          inside the ambient layer it was isolated from them and did nothing. */}
      <div
        aria-hidden
        className="grain-overlay pointer-events-none fixed inset-0 z-40"
      />
    </div>
  );
}
