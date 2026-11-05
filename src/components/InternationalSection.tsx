import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionShell, Wash } from "./Section";
import { usePointerDrift } from "../hooks/usePointerDrift";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ i, children, className = "" }: { i: number; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.48, delay: i * 0.06, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/*
 * Editorial, asymmetric (Codex's direction): copy on a 7-col left, and an open
 * typographic signature — "Fluent / English" — on the 5-col right, with the
 * other two facts under a hairline. Static once revealed: nothing here is
 * clickable, so nothing pretends to be. The US flag layer is untouched.
 */
export function InternationalSection() {
  const driftRef = usePointerDrift<HTMLDivElement>();

  return (
    <SectionShell id="international" className="py-16 sm:py-28" lang="en">
      <Wash background="radial-gradient(ellipse 60% 52% at 30% 34%, rgb(var(--rgb-indigo) / var(--wash-3)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 48% 44% at 78% 70%, rgb(var(--rgb-violet) / var(--wash-2)), transparent 76%)" />
      {/* The flag rides the shared atmosphere layer, so it is over-scanned past
          this section and feathered to zero on all four sides. */}
      <div ref={driftRef} aria-hidden className="atmo flag-atmo" />

      <div className="relative mx-auto grid w-full max-w-[1120px] gap-8 px-6 sm:px-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        {/* Left — 7 cols */}
        <div className="lg:col-span-7">
          <Reveal i={0}>
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-violet-300/80">
              Global communication
            </span>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display mt-4 text-[clamp(36px,4.5vw,64px)] font-semibold leading-[1.05] text-white">
              Not from Brazil?
              <br />
              <span className="text-[#C4B5FD]">No problem.</span>
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-7 max-w-[48ch] text-[17px] leading-[1.7] text-white/70 sm:text-lg">
              English has been part of my life for more than ten years. I started learning it very young —
              almost alongside Portuguese — and today I speak it fluently and naturally.
            </p>
          </Reveal>
          <Reveal i={3}>
            <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.7] text-white/55 sm:text-lg">
              Wherever you are based, communication won't be the bottleneck. I can talk ideas through,
              understand what a project actually needs, collaborate all the way through development, and
              explain technical decisions clearly in English.
            </p>
          </Reveal>
        </div>

        {/* Right — 5 cols: the typographic signature */}
        <div className="lg:col-span-5">
          <Reveal i={4}>
            <div className="font-poster text-[clamp(72px,9vw,132px)] leading-[0.86] text-white">
              Fluent
              <br />
              <span className="text-[#C4B5FD]">English</span>
            </div>
            <p className="mt-4 text-sm text-white/50">Natural, everyday conversation — not a phrasebook.</p>
          </Reveal>

          <Reveal i={5}>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <Reveal i={6}>
              <div className="font-poster text-4xl text-white">10+ years</div>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Learned young, almost alongside Portuguese.
              </p>
            </Reveal>
            <Reveal i={7}>
              <div className="font-poster text-4xl text-white">Global</div>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Collaboration — requirements, trade-offs and technical decisions, explained clearly.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
