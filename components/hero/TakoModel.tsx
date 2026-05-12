"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural French Tako:
 * - Rectangular wrap (tortilla) — RoundedBox with creamy material
 * - Crisp grilled stripes via subtle emissive bands
 * - "Filling" peeks out the open end: meat, cheese, salsa, lettuce
 *
 * To swap for a real .glb, see /public/models/README.md and import
 * via useGLTF('/models/french-tako.glb') in TakoCanvas.tsx
 */
export function TakoModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // gentle drift on top of PresentationControls / Float
    group.current.position.y = Math.sin(t * 0.6) * 0.04;
  });

  return (
    <group ref={group} rotation={[0.1, -0.35, 0.05]} scale={1.05}>
      {/* Tortilla wrap — main body */}
      <RoundedBox
        args={[2.6, 0.85, 1.5]}
        radius={0.28}
        smoothness={6}
        creaseAngle={0.4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#F2D9A8"
          roughness={0.65}
          metalness={0.02}
          clearcoat={0.15}
          clearcoatRoughness={0.6}
          sheen={0.5}
          sheenColor="#FFE9B8"
        />
      </RoundedBox>

      {/* Grilled stripes on top — emissive subtle */}
      {[-0.7, -0.25, 0.2, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 0.432, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <planeGeometry args={[0.06, 1.42]} />
          <meshStandardMaterial
            color="#8A4A1B"
            roughness={0.85}
            emissive="#3a1d08"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* Bottom crispier stripes */}
      {[-0.55, 0, 0.5].map((x, i) => (
        <mesh
          key={`b${i}`}
          position={[x, -0.432, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.05, 1.4]} />
          <meshStandardMaterial color="#A85E22" roughness={0.9} />
        </mesh>
      ))}

      {/* Filling peeking out — right open end */}
      <group position={[1.32, 0.05, 0]}>
        {/* meat */}
        <mesh castShadow>
          <sphereGeometry args={[0.32, 24, 16]} />
          <meshStandardMaterial color="#7B2E1C" roughness={0.8} />
        </mesh>
        {/* cheese drip */}
        <mesh position={[-0.05, -0.12, 0.35]} castShadow>
          <sphereGeometry args={[0.18, 16, 12]} />
          <meshPhysicalMaterial
            color="#FFCC2E"
            roughness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#FFA600"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* lettuce */}
        <mesh position={[-0.08, 0.18, -0.3]} castShadow>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#3F7A2A" roughness={0.9} flatShading />
        </mesh>
        {/* salsa drop */}
        <mesh position={[0.18, -0.2, -0.15]} castShadow>
          <sphereGeometry args={[0.1, 12, 8]} />
          <meshStandardMaterial
            color="#A11C2C"
            roughness={0.4}
            emissive="#5b0e1a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Filling peeking out — left open end */}
      <group position={[-1.32, 0.05, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.3, 24, 16]} />
          <meshStandardMaterial color="#7B2E1C" roughness={0.8} />
        </mesh>
        <mesh position={[0.06, -0.1, -0.3]} castShadow>
          <sphereGeometry args={[0.16, 16, 12]} />
          <meshPhysicalMaterial
            color="#FFCC2E"
            roughness={0.3}
            clearcoat={1}
            emissive="#FFA600"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.04, 0.16, 0.32]} castShadow>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#3F7A2A" roughness={0.9} flatShading />
        </mesh>
      </group>

      {/* Tiny crumbs scattered for life */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 1.7 + (i % 2) * 0.2;
        return (
          <mesh
            key={`c${i}`}
            position={[Math.cos(angle) * r, -0.6, Math.sin(angle) * r * 0.4]}
          >
            <dodecahedronGeometry args={[0.05 + (i % 3) * 0.02, 0]} />
            <meshStandardMaterial color="#C28B4E" roughness={0.9} flatShading />
          </mesh>
        );
      })}
    </group>
  );
}
