import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Rotates its children gently toward the pointer position; a no-op when strength is 0. */
export function PointerParallaxGroup({
  children,
  strength,
}: {
  children: ReactNode;
  strength: number;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (strength === 0) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [strength]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g || strength === 0) return;
    const targetY = pointer.current.x * strength;
    const targetX = -pointer.current.y * strength * 0.6;
    const ease = Math.min(1, delta * 2.2);
    g.rotation.y += (targetY - g.rotation.y) * ease;
    g.rotation.x += (targetX - g.rotation.x) * ease;
  });

  return <group ref={group}>{children}</group>;
}
