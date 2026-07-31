import { Suspense, useEffect, useState, lazy } from "react";
import type { ComponentType } from "react";
import { useInViewport } from "../hooks/useInViewport";

/**
 * Shared host for the below-the-fold 3D backdrops. `loader` is a dynamic
 * `import()` call, so three.js / @react-three/fiber and the scene itself
 * stay out of the main bundle entirely — they're fetched as their own chunk,
 * and only once this section has scrolled near the viewport. Once loaded,
 * the backdrop keeps receiving `inView` so it can pause its own render loop
 * again whenever the section scrolls back out of view.
 */
export function InteractiveBackground({
  loader,
  className = "",
}: {
  loader: () => Promise<{ default: ComponentType<{ inView: boolean }> }>;
  className?: string;
}) {
  const { ref, inView } = useInViewport<HTMLDivElement>("250px");
  const [everVisible, setEverVisible] = useState(false);
  const [Backdrop] = useState(() => lazy(loader));

  useEffect(() => {
    if (inView) setEverVisible(true);
  }, [inView]);

  return (
    <div ref={ref} className={className}>
      {everVisible && (
        <Suspense fallback={null}>
          <Backdrop inView={inView} />
        </Suspense>
      )}
    </div>
  );
}
