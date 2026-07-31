import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PointerParallaxGroup } from "./PointerParallaxGroup";

const COLOR_VIOLET = "#a78bfa";
const COLOR_MAGENTA = "#c026d3";

/**
 * A quiet pair of drifting rings for the closing section — sparser and
 * slower than the hero or the tech graph, so the page settles down instead
 * of ramping back up right before the contact call-to-action.
 */
export function ContactScene({
  motionEnabled,
  parallax = false,
}: {
  motionEnabled: boolean;
  parallax?: boolean;
}) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!motionEnabled) return;
    if (ringA.current) ringA.current.rotation.z += delta * 0.035;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.02;
  });

  return (
    <PointerParallaxGroup strength={parallax && motionEnabled ? 0.09 : 0}>
      <group>
        <ambientLight intensity={0.42} color={COLOR_VIOLET} />
        <pointLight position={[0, 2, 4]} intensity={16} color={COLOR_VIOLET} distance={14} decay={2} />
        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[3.4, 0.01, 8, 128]} />
          <meshBasicMaterial color={COLOR_VIOLET} transparent opacity={0.28} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.9, 0.4, 0]}>
          <torusGeometry args={[2.5, 0.008, 8, 96]} />
          <meshBasicMaterial color={COLOR_MAGENTA} transparent opacity={0.2} />
        </mesh>
      </group>
    </PointerParallaxGroup>
  );
}
