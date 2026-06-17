import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate random points in a sphere for stars
function generateStarPositions(count, radius) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

const StarField = () => {
  const ref = useRef();
  const sphere = useMemo(() => generateStarPositions(1200, 15), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f2fe"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Generate points for neural network
const NeuralNetwork = () => {
  const linesRef = useRef();
  const pointsRef = useRef();
  
  const particleCount = 150;
  const maxDistance = 2.5;
  
  const { positions, lines, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2; // push back slightly
    }

    const linePositions = [];
    const lineColors = [];
    
    // Connect close points
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < maxDistance) {
          linePositions.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
          
          const alpha = 1.0 - dist / maxDistance;
          // Gradient from purple to blue based on connection
          lineColors.push(
            0.69, 0.15, 1.0, alpha, // b026ff -> approx 176,38,255
            0.0, 0.95, 1.0, alpha   // 00f2fe -> approx 0,242,254
          );
        }
      }
    }
    return {
      positions: pos,
      lines: new Float32Array(linePositions),
      colors: new Float32Array(lineColors)
    };
  }, []);

  useFrame((state, delta) => {
    if (linesRef.current && pointsRef.current) {
      linesRef.current.rotation.y += delta * 0.02;
      linesRef.current.rotation.x += delta * 0.01;
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#b026ff"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attachObject={['attributes', 'position']} count={lines.length / 3} array={lines} itemSize={3} />
          <bufferAttribute attachObject={['attributes', 'color']} count={colors.length / 4} array={colors} itemSize={4} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors={true} transparent={true} depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.4} />
      </lineSegments>
    </group>
  );
};

// Parallax interaction component
const ParallaxRig = () => {
  const { camera, mouse } = useThree();
  useFrame(() => {
    // Smoothly interpolate camera position based on mouse
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, -5);
  });
  return null;
};

export default function Particle() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 25]} />
        <StarField />
        <NeuralNetwork />
        <ParallaxRig />
      </Canvas>
    </div>
  );
}
