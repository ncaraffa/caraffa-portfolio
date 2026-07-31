import { motion } from "framer-motion";
import { Languages, Clock, Globe2 } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";
import { usePointerDrift } from "../hooks/usePointerDrift";

const HIGHLIGHTS = [
  {
    icon: Languages,
    label: "Fluent English",
    desc: "Natural, everyday conversation — not a phrasebook.",
  },
  {
    icon: Clock,
    label: "10+ years",
    desc: "Learned young, almost alongside Portuguese.",
  },
  {
    icon: Globe2,
    label: "Global collaboration",
    desc: "Requirements, trade-offs and technical decisions, explained clearly.",
  },
];

export function InternationalSection() {
  const driftRef = usePointerDrift<HTMLDivElement>();

  return (
    <SectionShell id="international" className="py-28 sm:py-32" lang="en">
      <Wash background="radial-gradient(ellipse 60% 52% at 30% 34%, rgb(var(--rgb-indigo) / var(--wash-3)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 48% 44% at 78% 70%, rgb(var(--rgb-violet) / var(--wash-2)), transparent 76%)" />
      {/* The flag rides the shared atmosphere layer, so it is over-scanned past
          this section and feathered to zero on all four sides. */}
      <div ref={driftRef} aria-hidden className="atmo flag-atmo" />

      <Column>
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300/80"
          >
            Global communication
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
            className="font-display mt-3 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl"
          >
            Not from Brazil?
            <br />
            <span className="text-white/45">No problem.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 text-lg leading-relaxed text-white/70"
          >
            English has been part of my life for more than ten years. I started
            learning it very young — almost alongside Portuguese — and today I
            speak it fluently and naturally.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-4 leading-relaxed text-white/55"
          >
            Wherever you are based, communication won't be the bottleneck. I can
            talk ideas through, understand what a project actually needs,
            collaborate all the way through development, and explain technical
            decisions clearly in English.
          </motion.p>
        </div>

        <div
          className="mt-12 grid gap-4 sm:grid-cols-3"
          style={{ perspective: 1000 }}
        >
          {HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4, rotateX: 1.5, rotateY: -1.5 }}
              transition={{ duration: 0.45, delay: 0.22 + i * 0.07 }}
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
      </Column>
    </SectionShell>
  );
}
