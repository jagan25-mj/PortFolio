import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Cpu, Network } from 'lucide-react';
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
              <>
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
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}

const demoProjects = [
  {
    id: 'text-summarizer',
    title: 'AI Text Summarizer',
    description: 'Paste any text and get an AI-generated summary using advanced NLP techniques.',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    demo: true,
  },
  {
    id: 'prompt-generator',
    title: 'Prompt Generator',
    description: 'Generate creative prompts for AI image generation with style controls.',
    icon: Cpu,
    color: 'from-lime-500 to-green-500',
    demo: true,
  },
  {
    id: 'embeddings-viz',
    title: 'Embeddings Visualizer',
    description: 'Visualize word embeddings in 3D space to understand semantic relationships.',
    icon: Network,
    color: 'from-coral-500 to-orange-500',
    demo: true,
  },
];

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

            {/* Demo Projects */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {demoProjects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(78, 168, 255, 0.2)',
                      y: -3
                    }}
                    className="glass-morphism rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer magnetic-hover group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${project.color} rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-2 flex items-center font-space-grotesk">
                          {project.title}
                          <span className="ml-2 px-2 py-1 bg-lime-400/20 text-lime-400 text-xs rounded-full animate-pulse">
                            DEMO
                          </span>
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed font-light">
                          {project.description}
                        </p>
                        <motion.div
                          whileHover={{ x: 8 }}
                          className="mt-4 inline-flex items-center text-blue-400 text-sm font-medium group-hover:text-lime-400 transition-colors duration-300"
                        >
                          Try Demo →
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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