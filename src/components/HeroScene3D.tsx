import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useIsTabVisible } from "../hooks/useIsTabVisible";

const COLOR_VIOLET = "#a78bfa";
const COLOR_PURPLE = "#8b5cf6";
const COLOR_MAGENTA = "#c026d3";
const COLOR_DUST = "#c4b5fd";

function useWebglSupported(): boolean {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
      );
    } catch {
      return false;
    }
  }, []);
}

/** Rotates its children gently toward the pointer position; a no-op when motion is disabled. */
function PointerParallaxGroup({
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

function WireframeCore({ spin }: { spin: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current && spin !== 0) {
      mesh.current.rotation.y += delta * spin;
      mesh.current.rotation.x += delta * spin * 0.4;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2.7, 1]} />
      <meshBasicMaterial color={COLOR_VIOLET} wireframe transparent opacity={0.16} />
    </mesh>
  );
}

function DriftingRing({
  radius,
  tube,
  rotation,
  color,
  spin,
}: {
  radius: number;
  tube: number;
  rotation: [number, number, number];
  color: string;
  spin: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current && spin !== 0) mesh.current.rotation.z += delta * spin;
  });
  return (
    <mesh ref={mesh} rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} />
    </mesh>
  );
}

function SceneContents({
  motionEnabled,
  particleCount,
  parallax,
}: {
  motionEnabled: boolean;
  particleCount: number;
  parallax: boolean;
}) {
  const spin = motionEnabled ? 1 : 0;
  return (
    <>
      <ambientLight intensity={0.5} color={COLOR_VIOLET} />
      <pointLight position={[4, 2, 3]} intensity={22} color={COLOR_PURPLE} distance={16} decay={2} />
      <pointLight position={[-3.5, -2, -2]} intensity={14} color={COLOR_MAGENTA} distance={13} decay={2} />
      <PointerParallaxGroup strength={parallax && motionEnabled ? 0.14 : 0}>
        <WireframeCore spin={spin * 0.05} />
        <DriftingRing radius={3.5} tube={0.012} rotation={[Math.PI / 2.3, 0, 0]} color={COLOR_PURPLE} spin={spin * 0.045} />
        <DriftingRing radius={4.2} tube={0.008} rotation={[Math.PI / 1.8, 0.3, 0]} color={COLOR_VIOLET} spin={spin * -0.03} />
        <Sparkles
          count={particleCount}
          scale={[10, 5.5, 6]}
          position={[0, -0.3, -2.5]}
          size={2.4}
          speed={spin * 0.25}
          opacity={0.55}
          color={COLOR_DUST}
        />
      </PointerParallaxGroup>
    </>
  );
}

/**
 * Decorative, ambient 3D backdrop for the hero. Purely presentational: no
 * pointer events, capped pixel ratio, pauses when the tab is hidden, and
 * collapses to a single static frame under prefers-reduced-motion.
 */
export default function HeroScene3D() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const tabVisible = useIsTabVisible();
  const webglSupported = useWebglSupported();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !webglSupported) return null;

  const lowPower =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  const particleCount = !isDesktop ? 90 : lowPower ? 150 : 260;
  const frameloop = !tabVisible ? "never" : prefersReducedMotion ? "demand" : "always";

  return (
    <Canvas
      dpr={[1, isDesktop ? 1.6 : 1.2]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 8], fov: 42 }}
      frameloop={frameloop}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <SceneContents
          motionEnabled={!prefersReducedMotion}
          particleCount={particleCount}
          parallax={!isCoarsePointer}
        />
      </Suspense>
    </Canvas>
  );
}
