import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { Network } from 'lucide-react';
import * as THREE from 'three';

function NetworkVisualization() {
  const groupRef = useRef<THREE.Group>(null!);
  const layerRefs = useRef<THREE.Group[]>([]);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
    
    // Animate individual layers
    layerRefs.current.forEach((layer, index) => {
      if (layer) {
        layer.rotation.z = Math.sin(clock.getElapsedTime() + index) * 0.1;
        layer.position.y = Math.sin(clock.getElapsedTime() * 0.5 + index) * 0.2;
      }
    });
  });

  // Create multiple layers for neural network
  const layers = [
    { nodes: 4, radius: 1.5, z: -2, color: '#4EA8FF' },
    { nodes: 6, radius: 2, z: 0, color: '#A3FF12' },
    { nodes: 6, radius: 2, z: 0, color: '#A3FF12' },
    { nodes: 3, radius: 1.5, z: 2, color: '#FF7A59' },
  ];

  return (
    <group ref={groupRef}>
      {layers.map((layer, layerIndex) => {
        const nodes = Array.from({ length: layer.nodes }, (_, i) => {
          const angle = (i / layer.nodes) * Math.PI * 2;
          return new THREE.Vector3(
            Math.cos(angle) * layer.radius,
            Math.sin(angle) * 0.3,
            layer.z
          );
        });
        
        return (
          <group 
            key={layerIndex} 
            ref={(el) => {
              if (el) layerRefs.current[layerIndex] = el;
            }}
          >
            {/* Layer Nodes */}
            {nodes.map((position, nodeIndex) => (
              <mesh key={`${layerIndex}-${nodeIndex}`} position={position}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshBasicMaterial color={layer.color} />
                {/* Glow effect */}
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[0.12, 8, 8]} />
                  <meshBasicMaterial 
                    color={layer.color} 
                    transparent 
                    opacity={0.3}
                  />
                </mesh>
              </mesh>
            ))}
            
            {/* Connections to next layer */}
            {layerIndex < layers.length - 1 && (
              <React.Fragment key={`conns-${layerIndex}`}>
                {nodes.map((startPos, startIndex) => {
                  const nextLayer = layers[layerIndex + 1];
                  const nextNodes = Array.from({ length: nextLayer.nodes }, (_, i) => {
                    const angle = (i / nextLayer.nodes) * Math.PI * 2;
                    return new THREE.Vector3(
                      Math.cos(angle) * nextLayer.radius,
                      Math.sin(angle) * 0.3,
                      nextLayer.z
                    );
                  });
                  
                  return nextNodes.map((endPos, endIndex) => (
                    <line key={`${layerIndex}-${startIndex}-${endIndex}`}>
                      <bufferGeometry>
                        <bufferAttribute
                          attach="attributes-position"
                          count={2}
                          array={new Float32Array([...startPos.toArray(), ...endPos.toArray()])}
                          itemSize={3}
                        />
                      </bufferGeometry>
                      <lineBasicMaterial 
                        color="#666" 
                        opacity={0.4} 
                        transparent 
                      />
                    </line>
                  ));
                })}
              </React.Fragment>
            )}
          </group>
        );
      })}
    </group>
  );
}

function MLRobot() {
  const robotRef = useRef<THREE.Group>(null!);
  const eyeLeftRef = useRef<THREE.Mesh>(null!);
  const eyeRightRef = useRef<THREE.Mesh>(null!);
  const dataParticlesRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (robotRef.current) {
      robotRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
      robotRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
    }

    if (eyeLeftRef.current && eyeRightRef.current) {
      const blinkPhase = Math.sin(clock.getElapsedTime() * 2);
      const scaleY = blinkPhase > 0.95 ? 0.3 : 1;
      eyeLeftRef.current.scale.y = scaleY;
      eyeRightRef.current.scale.y = scaleY;
    }

    if (dataParticlesRef.current) {
      dataParticlesRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      dataParticlesRef.current.children.forEach((child, i) => {
        const offset = i * 0.5;
        child.position.y = Math.sin(clock.getElapsedTime() + offset) * 0.3;
      });
    }
  });

  const createDataParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 2.5;
      particles.push(
        <mesh
          key={i}
          position={[
            Math.cos(angle) * radius,
            Math.sin(i) * 0.5,
            Math.sin(angle) * radius
          ]}
        >
          <octahedronGeometry args={[0.05, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#4EA8FF' : '#A3FF12'}
            emissive={i % 2 === 0 ? '#4EA8FF' : '#A3FF12'}
            emissiveIntensity={0.5}
          />
        </mesh>
      );
    }
    return particles;
  };

  return (
    <group>
      <group ref={robotRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 1.5, 1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>

        <mesh ref={eyeLeftRef} position={[-0.2, 0.95, 0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#4EA8FF"
            emissive="#4EA8FF"
            emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.2, 0.95, 0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#4EA8FF"
            emissive="#4EA8FF"
            emissiveIntensity={1}
          />
        </mesh>

        <mesh position={[0, 0.7, 0.45]}>
          <boxGeometry args={[0.3, 0.05, 0.1]} />
          <meshStandardMaterial color="#A3FF12" emissive="#A3FF12" emissiveIntensity={0.5} />
        </mesh>

        <mesh position={[-0.7, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.7, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[-0.3, -1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.3, -1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.2, 0.51]}>
          <boxGeometry args={[0.6, 0.4, 0.05]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#4EA8FF"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      <group ref={dataParticlesRef}>
        {createDataParticles()}
      </group>
    </group>
  );
}

export default function Playground() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="playground" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">
              AI <span className="text-lime-400">Playground</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-lime-400 to-coral-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interactive demos showcasing various AI/ML techniques and algorithms
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Network Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-morphism rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 magnetic-hover group">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center font-space-grotesk">
                  <Network className="text-lime-400 mr-3" size={28} />
                  Neural Network Visualization
                </h3>
                <p className="text-gray-300 mb-6 font-light">
                  An interactive 3D representation of a simple neural network architecture,
                  demonstrating node connections and data flow patterns.
                </p>

                <div className="h-64 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50 group-hover:border-blue-500/30 transition-all duration-300">
                  <Canvas camera={{ position: [0, 0, 6] }}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} />
                    <NetworkVisualization />
                  </Canvas>
                </div>
              </div>
            </motion.div>

            {/* ML Robot Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="glass-morphism rounded-xl p-8 hover:border-lime-500/50 transition-all duration-300 magnetic-hover group">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center font-space-grotesk">
                  <Network className="text-blue-400 mr-3" size={28} />
                  ML Processing Bot
                </h3>
                <p className="text-gray-300 mb-6 font-light">
                  An animated 3D robot representing machine learning data processing.
                  Watch as it analyzes streaming data particles in real-time.
                </p>

                <div className="h-96 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50 group-hover:border-lime-500/30 transition-all duration-300">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} intensity={1} />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#A3FF12" />
                    <MLRobot />
                  </Canvas>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="gradient-border rounded-xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 to-slate-700/30"></div>
              <h3 className="text-2xl font-semibold text-white mb-4 font-space-grotesk relative z-10">
                Coming Soon: Interactive ML Demos
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6 font-light relative z-10">
                I'm working on a collection of interactive machine learning demonstrations 
                including real-time model inference, data visualization, and algorithm comparisons. 
                Stay tuned for updates!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm relative z-10">
                {[
                  'Real-time Image Classification',
                  'Sentiment Analysis Tool',
                  'Clustering Visualizer',
                  'Recommendation Engine',
                  'Time Series Forecasting'
                ].map((feature) => (
                  <motion.span
                    key={feature}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full hover:bg-blue-400/20 hover:text-blue-400 transition-all duration-300 cursor-default"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
