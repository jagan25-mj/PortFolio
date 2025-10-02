import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse floating-animation"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-lime-400 rounded-full animate-pulse floating-animation"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-coral-400 rounded-full animate-pulse floating-animation"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse floating-animation"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-4"
            >
              <div className="inline-block px-4 py-2 glass-morphism-light rounded-full text-sm text-blue-400 font-medium mb-6">
                ✨ Available for opportunities
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-space-grotesk leading-tight">
              <span className="text-blue-400 text-glow">Boss</span> —{' '}
              <span className="bg-gradient-to-r from-lime-400 to-blue-400 bg-clip-text text-transparent">
                ML + Full-Stack Engineer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              I build AI-powered web applications with{' '}
              <span className="text-blue-400 font-semibold">React</span>,{' '}
              <span className="text-lime-400 font-semibold">Django</span>,{' '}
              <span className="text-coral-400 font-semibold">PyTorch</span> &{' '}
              <span className="text-blue-400 font-semibold">LangChain</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 40px rgba(78, 168, 255, 0.4)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span>View Projects</span>
              <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 glass-morphism border-2 border-lime-400 text-lime-400 font-semibold rounded-xl hover:bg-lime-400 hover:text-slate-900 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center space-x-2">
              <Download size={18} />
              <span>Download Resume</span>
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="p-3 rounded-full glass-morphism-light text-gray-400 hover:text-white hover:border-blue-400 transition-all duration-300 cursor-pointer magnetic-hover"
              onClick={scrollToProjects}
            >
              <ArrowDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-transparent to-slate-900/30 pointer-events-none" />
    </section>
  );
}