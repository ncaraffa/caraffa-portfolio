import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PointerParallaxGroup } from "./PointerParallaxGroup";

const NODE_COUNT = 9;
const NODE_RADIUS = 3.2;
const COLOR_LINE = "#8b5cf6";
const COLOR_NODE = "#c4b5fd";

function useNodePositions(count: number, radius: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const phi = Math.acos(1 - 2 * ((i + 0.5) / count));
      points.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta) * 0.6,
          radius * Math.cos(phi),
        ),
      );
    }
    return points;
  }, [count, radius]);
}

/**
 * A small graph of connected nodes, standing in for "technologies talking to
 * each other." Deliberately different from the hero's wireframe + rings: a
 * discrete, thin-lined network rather than solid orbital geometry.
 */
export function TechConnectionsScene({
  motionEnabled,
  parallax = false,
}: {
  motionEnabled: boolean;
  parallax?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const nodes = useNodePositions(NODE_COUNT, NODE_RADIUS);

  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const b = nodes[(i + 3) % nodes.length];
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [nodes]);

  useFrame((_, delta) => {
    if (group.current && motionEnabled) group.current.rotation.y += delta * 0.06;
  });

  return (
    <PointerParallaxGroup strength={parallax && motionEnabled ? 0.1 : 0}>
      <group ref={group}>
        <ambientLight intensity={0.55} color={COLOR_NODE} />
        <pointLight position={[3, 2, 4]} intensity={18} color={COLOR_LINE} distance={14} decay={2} />
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color={COLOR_LINE} transparent opacity={0.4} />
        </lineSegments>
        {nodes.map((point, i) => (
          <mesh key={i} position={point}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color={COLOR_NODE} />
          </mesh>
        ))}
      </group>
    </PointerParallaxGroup>
  );
}
