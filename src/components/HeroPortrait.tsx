import { motion } from "framer-motion";
import type { RefObject } from "react";

/**
 * The hero portrait: a stable 2D layer, no mouse tilt or perspective. Its
 * only motion is a one-time entrance (fade + small rise). The bottom edge
 * fades into the background via a mask instead of ending in a hard cut.
 */
export function HeroPortrait({
  wrapRef,
  imgRef,
  marginRight,
}: {
  wrapRef: RefObject<HTMLDivElement | null>;
  imgRef: RefObject<HTMLImageElement | null>;
  marginRight: number | null;
}) {
  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
      style={marginRight !== null ? { marginRight } : undefined}
      className="hero-portrait-wrap col-start-1 row-start-1 flex h-full items-end justify-end"
    >
      <picture className="hero-portrait block h-full">
        <source srcSet="/photos/nicolas-hero-cutout.webp" type="image/webp" />
        <img
          ref={imgRef}
          src="/photos/nicolas-hero-cutout.png"
          alt="Nicolas Caraffa"
          width={1229}
          height={1370}
          fetchPriority="high"
          decoding="async"
          className="h-full w-auto select-none object-contain"
        />
      </picture>
    </motion.div>
  );
}
