import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SectionShell, Column, Wash } from "./Section";
import { InteractiveBackground } from "./InteractiveBackground";
import { GithubIcon, InstagramIcon } from "./BrandIcons";

export function ContactSection() {
  return (
    <SectionShell id="contato" className="py-28 text-center sm:py-36">
      {/* Closes warm, mirroring the hero's lower-left fuchsia, so the page opens
          and closes on the same accent and runs cool through the middle. */}
      <Wash background="radial-gradient(ellipse 60% 56% at 50% 44%, rgb(var(--rgb-violet) / var(--wash-4)), transparent 74%)" />
      <Wash background="radial-gradient(ellipse 46% 42% at 78% 24%, rgb(var(--rgb-fuchsia) / var(--wash-2)), transparent 76%)" />

      <div className="atmo atmo--canvas opacity-60">
        <InteractiveBackground
          loader={() => import("./backdrops/ContactBackdrop")}
          className="h-full w-full"
        />
      </div>

      <Column>
        <span className="pointer-events-none absolute bottom-0 right-0 select-none font-display text-[180px] font-bold leading-none text-white/[0.03] sm:text-[260px]">
          02
        </span>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <span className="text-sm font-medium text-violet-400">Contato</span>
          <h2 className="font-display mt-2 text-3xl font-semibold text-white sm:text-4xl">
            Vamos construir algo juntos?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/55">
            Aberto a novos projetos, colaborações e conversas sobre tecnologia.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:nicolascaraffa0105@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 hover:shadow-[0_0_28px_2px_rgba(167,139,250,0.35)] active:scale-[0.97]"
            >
              <Mail size={16} />
              nicolascaraffa0105@gmail.com
            </a>
            <a
              href="https://www.instagram.com/ncaraffa_/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-violet-300/40 hover:text-white hover:shadow-[0_0_24px_0_rgba(139,92,246,0.2)] active:scale-[0.97]"
            >
              <InstagramIcon size={16} />
              @ncaraffa_
            </a>
            <a
              href="https://github.com/ncaraffa"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-violet-300/40 hover:text-white hover:shadow-[0_0_24px_0_rgba(139,92,246,0.2)] active:scale-[0.97]"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          </div>
        </motion.div>
      </Column>
    </SectionShell>
  );
}
