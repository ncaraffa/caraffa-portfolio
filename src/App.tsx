import { InstagramIcon } from "./components/BrandIcons";
import { Hero } from "./components/Hero";
import { IntroSection } from "./components/IntroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Section, GlowOrb } from "./components/Section";
import { Logo } from "./components/Logo";

export default function App() {
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
          className="header-veil absolute inset-0 -z-10 h-[140%] bg-ink/80 backdrop-blur-xl"
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
            aria-label="Nicolas Caraffa — início"
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
          <nav className="hidden items-center gap-8 text-sm text-white/60 sm:flex">
            <a href="#intro" className="nav-link transition hover:text-white">
              Sobre mim
            </a>
            <a href="#skills" className="nav-link transition hover:text-white">
              Skills
            </a>
            <a href="#projetos" className="nav-link transition hover:text-white">
              Projetos
            </a>
            <a href="#contato" className="nav-link transition hover:text-white">
              Contato
            </a>
            <a
              href="https://www.instagram.com/ncaraffa_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Nicolas Caraffa"
              className="text-white/50 transition hover:text-violet-300"
            >
              <InstagramIcon size={17} />
            </a>
          </nav>
        </Section>
      </header>

      <Hero />
      <IntroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      <footer className="relative py-8 text-center text-xs text-white/30">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" />
        © {new Date().getFullYear()} Nicolas Caraffa. Feito com React, Tailwind e
        Framer Motion.
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
