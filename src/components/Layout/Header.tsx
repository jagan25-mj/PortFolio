import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download, Github, Linkedin, Instagram } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { SECTIONS } from '../../lib/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, currentSection } = useAppStore();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => s.id);
      const currentSectionElement = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSectionElement) {
        useAppStore.getState().setCurrentSection(currentSectionElement);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-slate-700/50"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white cursor-pointer font-space-grotesk"
            onClick={() => scrollToSection('hero')}
          >
            <span className="text-blue-400 text-glow">J</span>agan <span className="text-lime-400">M</span>urari
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {SECTIONS.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  currentSection === section.id
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {section.label}
              </motion.button>
            ))}
          </nav>

          {/* Social Links & Resume */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://github.com/jagan25-mj"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-300 hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-blue-400/10"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BJPLi6cZoQfi5Lfz5IMV%2BRQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-300 hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-blue-400/10"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.instagram.com/mj__iq__/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-300 hover:text-pink-400 transition-all duration-300 rounded-lg hover:bg-pink-400/10"
            >
              <Instagram size={20} />
            </motion.a>

            <div className="w-px h-6 bg-slate-600 mx-2"></div>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/Murari_Jagan_Sai_Django_Resume_IFQWH7g.pdf"
              download="Jagan_Murari_Resume.pdf"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-lime-400 to-lime-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Download size={16} />
              <span className="text-sm">Resume</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                  currentSection === section.id
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
            <div className="flex items-center space-x-4 px-3 pt-4">
              <a
                href="https://github.com/jagan25-mj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BJPLi6cZoQfi5Lfz5IMV%2BRQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/mj__iq__/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="/Murari_Jagan_Sai_Django_Resume_IFQWH7g.pdf"
                download="Jagan_Murari_Resume.pdf"
                className="flex items-center space-x-2 px-3 py-2 bg-lime-400 text-slate-900 font-semibold rounded-lg text-sm"
              >
                <Download size={16} />
                <span>Resume</span>
              </a>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}