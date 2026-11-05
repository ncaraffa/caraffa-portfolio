import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useT } from "../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;
const IMG = "/images/closing-hands.webp";

/*
 * The send-off. The page darkens to near-black, then the two dithered hands
 * drift toward each other as you scroll (the image is drawn twice, each half
 * clipped, so they meet exactly when the scene settles), followed by one
 * inspirational line. The footer sits on the same black right after.
 */
export function ClosingSection() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 35%"] });
  const leftX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-9%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["9%", "0%"]);
  const glow = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  const half = "absolute inset-0 h-full w-full object-cover object-center select-none";

  return (
    <section
      ref={ref}
      className="relative pb-24 pt-48 sm:pb-32 sm:pt-64"
      // Darkens gradually from the contact section's atmosphere to near-black,
      // so there is no line where the "lights go out".
      style={{
        background:
          "linear-gradient(to bottom, rgb(2 2 3 / 0) 0%, rgb(2 2 3 / 0.55) 12%, rgb(2 2 3 / 0.9) 24%, #020203 34%, #020203 100%)",
      }}
    >
      {/* The hands */}
      <div
        className="relative mx-auto aspect-[2.1/1] w-full max-w-[1500px]"
        style={{
          maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 62%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 62%, transparent 100%)",
        }}
      >
        <motion.img
          src={IMG}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          style={{ x: leftX, clipPath: "inset(0 50% 0 0)" }}
          className={half}
        />
        <motion.img
          src={IMG}
          alt={t(
            "Detalhe d'A Criação de Adão, de Michelangelo, em tons de violeta: duas mãos quase se tocando",
            "Detail of Michelangelo's The Creation of Adam in violet tones: two hands almost touching",
          )}
          loading="lazy"
          decoding="async"
          style={{ x: rightX, clipPath: "inset(0 0 0 50%)" }}
          className={half}
        />
        {/* A spark where they meet */}
        <motion.span
          aria-hidden
          style={{ opacity: glow }}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--rgb-violet)/0.35),transparent_65%)]"
        />
      </div>

      {/* The line */}
      <div className="relative mx-auto mt-10 max-w-4xl px-6 text-center sm:mt-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-sm tracking-[0.08em] text-violet-300/75"
        >
          &gt; npm create vite@latest
          <span className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-violet-300/80" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="font-display mt-6 text-[clamp(34px,5.6vw,76px)] font-semibold leading-[1.04] tracking-tight text-white"
        >
          {t("Toda grande ideia começa com um", "Every great idea starts with a")}{" "}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
            {t("primeiro contato.", "first touch.")}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="mx-auto mt-6 max-w-lg text-lg text-white/50"
        >
          {t("O próximo pode ser o seu.", "The next one could be yours.")}
        </motion.p>
      </div>
    </section>
  );
}
