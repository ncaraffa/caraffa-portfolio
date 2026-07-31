import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useIsTabVisible } from "../../hooks/useIsTabVisible";
import { useWebglSupported } from "../../hooks/useWebglSupported";
import { ContactScene } from "../scenes/ContactScene";

export default function ContactBackdrop({ inView }: { inView: boolean }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const tabVisible = useIsTabVisible();
  const webglSupported = useWebglSupported();

  if (!webglSupported) return null;

  const frameloop = !inView || !tabVisible ? "never" : prefersReducedMotion ? "demand" : "always";

  return (
    <Canvas
      dpr={[1, isDesktop ? 1.5 : 1.1]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 8], fov: 42 }}
      frameloop={frameloop}
      style={{ pointerEvents: "none" }}
    >
      <ContactScene motionEnabled={!prefersReducedMotion} parallax={!isCoarsePointer} />
    </Canvas>
  );
}
