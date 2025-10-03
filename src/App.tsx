import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Scene3D from './components/Scene/Scene3D';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Playground from './components/Sections/Playground';
import Contact from './components/Sections/Contact';
import { useAppStore } from './lib/store';

function App() {
  const { theme, setReducedMotion } = useAppStore();

  useEffect(() => {
    // Apply theme
    document.documentElement.className = theme;
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setReducedMotion]);

  useEffect(() => {
    // Smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene3D />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            
            <div className="relative bg-slate-900/90 backdrop-blur-sm">
              <About />
              <Skills />
              <Projects />
              <Playground />
              <Contact />
            </div>
          </motion.main>
        </AnimatePresence>

        {/* Footer */}
        <footer className="relative bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 py-8">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Jagan Murari. Built with React, Three.js, and lots of ☕
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Designed and developed with passion for innovation
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Performance optimizations */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

export default App;