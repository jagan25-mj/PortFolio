import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../lib/store';

interface ParticleFieldProps {
  count?: number;
}

function ParticleField({ count = 2000 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { reducedMotion } = useAppStore();
  
  const particles = useMemo(() => {
    const temp = new THREE.Object3D();
    const positions: THREE.Vector3[] = [];
    
    for (let i = 0; i < count; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
    }
    
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current || reducedMotion) return;
    
    const time = clock.getElapsedTime();
    const temp = new THREE.Object3D();
    
    particles.forEach((position, i) => {
      const t = time * 0.1 + i * 0.01;
      temp.position.copy(position);
      temp.position.y += Math.sin(t) * 0.5;
      temp.rotation.x = time * 0.1;
      temp.rotation.y = time * 0.05;
      temp.updateMatrix();
      meshRef.current.setMatrixAt(i, temp.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.02, 0]} />
      <meshBasicMaterial color="#4EA8FF" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function FloatingPlanet() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={[3, -2, -5]}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#A3FF12"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function WireframeTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={1}
      position={[-4, 2, -8]}
    >
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.3, 16, 32]} />
        <meshBasicMaterial
          color="#FF7A59"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function Background3D() {
  const { reducedMotion } = useAppStore();
  const { size } = useThree();
  
  // Adjust particle count based on screen size
  const particleCount = useMemo(() => {
    if (reducedMotion) return 0;
    if (size.width < 768) return 500;
    if (size.width < 1024) return 1000;
    return 2000;
  }, [size.width, reducedMotion]);

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4EA8FF" />
      
      <Stars
        radius={50}
        depth={50}
        count={reducedMotion ? 1000 : 5000}
        factor={4}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 1}
      />
      
      {particleCount > 0 && <ParticleField count={particleCount} />}
      
      {!reducedMotion && (
        <>
          <FloatingPlanet />
          <WireframeTorus />
        </>
      )}
    </>
  );
}