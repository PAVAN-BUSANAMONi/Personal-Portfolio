import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "Java", "Python", "JavaScript", "React", "Node.js", 
  "Express", "MongoDB", "MySQL", "Git", "Docker", 
  "AWS", "DevOps", "AI", "Machine Learning"
];

// Single orbiting skill node
function SkillNode({ skill, radius, speed, offset }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(({ clock }) => {
    if (!hovered) {
      const t = clock.getElapsedTime() * speed + offset;
      if (meshRef.current) {
        // Spherical orbit math
        meshRef.current.position.x = Math.sin(t) * radius;
        meshRef.current.position.z = Math.cos(t) * radius;
        meshRef.current.position.y = Math.sin(t * 0.5) * (radius * 0.3); // slight vertical wobble
      }
    } else {
      // Gentle pulse when hovered
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.02;
        meshRef.current.rotation.y += 0.02;
      }
    }
  });

  // Target scale based on interaction
  const targetScale = clicked ? 1.5 : hovered ? 1.3 : 1;
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => { setHovered(false); setClicked(false); }}
      onClick={() => setClicked(!clicked)}
    >
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial 
        color={hovered ? "#00f2fe" : "#b026ff"} 
        emissive={hovered ? "#00f2fe" : "#b026ff"}
        emissiveIntensity={hovered ? 2 : 0.8}
        roughness={0.2}
      />
      <Html distanceFactor={15} zIndexRange={[100, 0]}>
        <div className={`skill-label ${hovered ? "skill-label-hover" : ""}`}>
          {skill}
        </div>
      </Html>
    </mesh>
  );
}

function GalaxySystem() {
  const groupRef = useRef();
  
  // Slowly rotate the entire galaxy system
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#050505" 
          emissive="#b026ff" 
          emissiveIntensity={0.5} 
          wireframe={true} 
        />
        <pointLight color="#b026ff" intensity={5} distance={20} />
      </mesh>

      {/* Generate Orbiting Skills */}
      {skills.map((skill, i) => {
        // Distribute radii between 3 and 7
        const radius = 3 + Math.random() * 4; 
        // Random speed between 0.2 and 0.6
        const speed = 0.2 + Math.random() * 0.4;
        // Random starting position on the orbit
        const offset = Math.random() * Math.PI * 2;
        
        return (
          <SkillNode 
            key={skill} 
            skill={skill} 
            radius={radius} 
            speed={speed} 
            offset={offset} 
          />
        );
      })}
    </group>
  );
}

export default function SkillsGalaxy() {
  return (
    <div style={{ height: "600px", width: "100%", position: "relative", marginTop: "2rem", marginBottom: "4rem" }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <GalaxySystem />
      </Canvas>
    </div>
  );
}
