import { useLayoutEffect, useRef, useState } from "react";

/** Fraction of "DEVELOPER"'s rendered width the portrait is allowed to sit over. */
const TARGET_OVERLAP_DESKTOP = 0.28;
/** Narrow screens get a lighter overlap so the shorter lines stay comfortably readable. */
const TARGET_OVERLAP_MOBILE = 0.3;
const MOBILE_BREAKPOINT = 640;

/**
 * Measures the actual rendered glyph width of "DEVELOPER" and the portrait's
 * rendered width, then derives the margin that makes the portrait cover a
 * fixed fraction of that word — independent of how the title's font-size
 * clamp and the portrait's own size clamp happen to scale at any given
 * viewport. Re-measures on resize and when either box changes size.
 */
export function useHeroPortraitOffset() {
  const outlineRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [marginRight, setMarginRight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const outline = outlineRef.current;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const container = wrap?.parentElement;
    if (!outline || !wrap || !img || !container) return;

    const recompute = () => {
      const target =
        window.innerWidth < MOBILE_BREAKPOINT ? TARGET_OVERLAP_MOBILE : TARGET_OVERLAP_DESKTOP;
      const range = document.createRange();
      range.selectNodeContents(outline);
      const wordRect = range.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      if (wordRect.width === 0 || imgRect.width === 0) return;

      const desiredImgLeft = wordRect.right - wordRect.width * target;
      const desiredMargin = containerRect.right - desiredImgLeft - imgRect.width;
      setMarginRight(Math.max(0, desiredMargin));
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(wrap);
    ro.observe(outline);
    ro.observe(container);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  return { outlineRef, wrapRef, imgRef, marginRight };
}
