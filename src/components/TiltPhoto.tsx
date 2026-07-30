import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** 3D tilt that follows the cursor — inspired by motion-primitives' Tilt. */
export function TiltPhoto({
  src,
  alt,
  className,
  imgClassName,
  children,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.5 };
  const sx = useSpring(px, springCfg);
  const sy = useSpring(py, springCfg);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);
  const glareX = useTransform(sx, (v) => `${v * 100}%`);
  const glareY = useTransform(sy, (v) => `${v * 100}%`);
  const glareBackground = useTransform([glareX, glareY], (latest) => {
    const [gx, gy] = latest;
    return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 55%)`;
  });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.3 } }}
      className={`relative ${className ?? ""}`}
    >
      {children ?? (
        <img
          src={src}
          alt={alt}
          className={`pointer-events-none select-none ${imgClassName ?? ""}`}
        />
      )}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: glareBackground }}
      />
    </motion.div>
  );
}
