import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Zap, Target, Lightbulb } from 'lucide-react';

const stats = [
  { label: 'Years Coding', value: '2', icon: Code2 },
  { label: 'Projects Shipped', value: '5', icon: Zap },
  { label: 'Hackathons', value: '4', icon: Target },
  { label: 'OSS Contributions', value: '4', icon: Lightbulb },
];

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-20 relative">
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
              About <span className="text-blue-400">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-lime-400 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                Student • Researcher • Builder
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a B.Tech student passionate about the intersection of artificial intelligence 
                and web development. My journey began with curiosity about how machines learn, 
                and has evolved into building production-ready applications that solve real problems.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently preparing for GATE DA-AI while shipping AI-powered projects. 
                I believe in learning by building, and I'm always excited to explore 
                cutting-edge technologies like PyTorch, LangChain, and advanced web frameworks.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me contributing to open source, 
                participating in hackathons, or writing about my learning journey.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block bg-gradient-to-r from-blue-500/20 to-lime-500/20 border border-blue-500/30 rounded-xl p-6 mt-8"
              >
                <p className="text-blue-400 font-semibold mb-2">Current Focus</p>
                <p className="text-gray-300">
                  Building generative AI applications while mastering advanced algorithms 
                  and data structures for GATE DA-AI preparation.
                </p>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: '0 20px 40px rgba(78, 168, 255, 0.2)',
                      y: -5
                    }}
                    className="glass-morphism rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 magnetic-hover group"
                  >
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Icon className="relative w-8 h-8 text-blue-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 font-space-grotesk">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}