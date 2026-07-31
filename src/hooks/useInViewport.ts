import { useEffect, useRef, useState } from "react";

/** Tracks intersection for a section-level element, with a margin so work can start slightly before it's on screen. */
export function useInViewport<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
