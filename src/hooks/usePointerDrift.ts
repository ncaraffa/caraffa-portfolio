import { useEffect, useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Writes the pointer's position within an element as two normalised CSS custom
 * properties (--flag-dx / --flag-dy, each roughly -0.5..0.5) so a decorative
 * layer can drift with the cursor in CSS alone — no per-frame React state.
 *
 * Disabled outright for coarse pointers and reduced motion, in which case the
 * variables are never written and the consuming rule falls back to its resting
 * position.
 */
export function usePointerDrift<T extends HTMLElement>(varX = "--flag-dx", varY = "--flag-dy") {
  const ref = useRef<T>(null);
  const isCoarse = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarse || prefersReducedMotion) return;

    // Written straight through rather than coalesced in requestAnimationFrame:
    // pointermove already fires at input rate, setting two custom properties is
    // cheap, and the consuming rule's own long transition does the smoothing —
    // so rAF would only add a scheduling dependency for no visual gain.
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      el.style.setProperty(varX, ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty(varY, ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty(varX, "0");
      el.style.setProperty(varY, "0");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [isCoarse, prefersReducedMotion, varX, varY]);

  return ref;
}
