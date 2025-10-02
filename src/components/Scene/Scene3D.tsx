import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Background3D from './Background3D';
import CameraController from './CameraController';
import { useAppStore } from '../../lib/store';

function LoadingFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
    </div>
  );
}

export default function Scene3D() {
  const { reducedMotion } = useAppStore();
  
  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(78,168,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(163,255,18,0.05),transparent_50%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <CameraController />
          <Background3D />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}