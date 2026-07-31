import { motion } from "framer-motion";
import { Code2, Server, Bot } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";
import { InteractiveBackground } from "./InteractiveBackground";

const SKILL_GROUPS = [
  {
    icon: Code2,
    label: "Frontend",
    skills: [
      { name: "React / TypeScript", level: 92 },
      { name: "UI/UX & Design Systems", level: 80 },
    ],
  },
  {
    icon: Server,
    label: "Backend & dados",
    skills: [
      { name: "Node.js / APIs", level: 88 },
      { name: "Next.js / Supabase", level: 85 },
      { name: "Python", level: 78 },
    ],
  },
  {
    icon: Bot,
    label: "IA & automação",
    skills: [{ name: "Automação & Agentes de IA", level: 90 }],
  },
];

export function SkillsSection() {
  return (
    <SectionShell id="skills" className="py-28">
      <Wash background="radial-gradient(ellipse 58% 52% at 52% 46%, rgb(var(--rgb-violet) / var(--wash-3)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 44% 40% at 12% 78%, rgb(var(--rgb-indigo) / var(--wash-2)), transparent 76%)" />

      {/* The WebGL wrapper is itself an over-scanned, feathered atmo layer, so
          the scene's rectangular drawing buffer has no findable edge. */}
      <div className="atmo atmo--canvas opacity-70">
        <InteractiveBackground
          loader={() => import("./backdrops/SkillsBackdrop")}
          className="h-full w-full"
        />
      </div>

      <Column>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-14 text-center"
        >
          <span className="text-sm font-medium text-violet-400">Skills</span>
          <h2 className="font-display mt-2 text-3xl font-semibold text-white">
            O que eu domino
          </h2>
        </motion.div>

        <div className="relative z-10 grid gap-10 sm:grid-cols-3">
          {SKILL_GROUPS.map(({ icon: Icon, label, skills }, groupIndex) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-2 text-white/70">
                <Icon size={16} className="text-violet-300" />
                <span className="text-xs font-medium uppercase tracking-[0.14em]">
                  {label}
                </span>
              </div>

              {skills.map((skill, i) => (
                <div key={skill.name}>
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
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 shadow-[0_0_10px_0_rgba(167,139,250,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </Column>
    </SectionShell>
  );
}
