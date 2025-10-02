import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../lib/store';

interface CameraControllerProps {
  targetPosition?: THREE.Vector3;
  targetLookAt?: THREE.Vector3;
}

export default function CameraController({ 
  targetPosition = new THREE.Vector3(0, 0, 5),
  targetLookAt = new THREE.Vector3(0, 0, 0)
}: CameraControllerProps) {
  const { camera, mouse } = useThree();
  const { reducedMotion, currentSection } = useAppStore();
  
  const currentPosition = useRef(new THREE.Vector3(0, 0, 5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  // Section-based camera positions
  const sectionPositions = {
    hero: new THREE.Vector3(0, 0, 5),
    about: new THREE.Vector3(2, 1, 4),
    skills: new THREE.Vector3(-1, 2, 6),
    projects: new THREE.Vector3(1, -1, 3),
    playground: new THREE.Vector3(-2, 0, 7),
    notes: new THREE.Vector3(0, 2, 4),
    contact: new THREE.Vector3(0, -1, 5),
  };

  useFrame((state, delta) => {
    if (!camera) return;

    const targetPos = sectionPositions[currentSection as keyof typeof sectionPositions] || targetPosition;
    
    // Smooth camera movement
    currentPosition.current.lerp(targetPos, delta * 2);
    currentLookAt.current.lerp(targetLookAt, delta * 2);
    
    // Add subtle mouse parallax (if motion not reduced)
    if (!reducedMotion) {
      const parallaxX = mouse.x * 0.5;
      const parallaxY = mouse.y * 0.3;
      
      camera.position.copy(currentPosition.current);
      camera.position.x += parallaxX;
      camera.position.y += parallaxY;
    } else {
      camera.position.copy(currentPosition.current);
    }
    
    camera.lookAt(currentLookAt.current);
  });

  return null;
}