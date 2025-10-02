import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Twitter, Mail, MessageCircle, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/boss',
      icon: Github,
      color: 'hover:text-blue-400 hover:bg-blue-400/10',
      description: 'Check out my code and projects'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/boss',
      icon: Linkedin,
      color: 'hover:text-blue-400 hover:bg-blue-400/10',
      description: 'Connect with me professionally'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/boss',
      icon: Twitter,
      color: 'hover:text-blue-400 hover:bg-blue-400/10',
      description: 'Follow my tech journey'
    },
    {
      name: 'Email',
      url: 'mailto:murarijagansai@gmail.com.com',
      icon: Mail,
      color: 'hover:text-lime-400 hover:bg-lime-400/10',
      description: 'Send me a direct message'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">
              Let's <span className="text-blue-400">Connect</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-lime-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to collaborate on something amazing? Let's connect through social media 
              and build the future together!
            </p>
          </div>

          {/* Social Media Links */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -8,
                      boxShadow: '0 20px 40px rgba(78, 168, 255, 0.2)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`group glass-morphism rounded-xl p-8 text-center transition-all duration-300 magnetic-hover border-slate-700/50 hover:border-blue-500/50 ${social.color}`}
                  >
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Icon className="relative w-12 h-12 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 font-space-grotesk">
                      {social.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {social.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Connect</span>
                      <ExternalLink size={14} className="ml-1" />
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-16"
            >
              <div className="gradient-border rounded-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-lime-500/5"></div>
                <h3 className="text-2xl font-semibold text-white mb-4 font-space-grotesk relative z-10">
                  Open for Opportunities
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6 font-light relative z-10">
                  Currently seeking internship opportunities in AI/ML and full-stack development. 
                  Interested in remote work and collaborative projects. Let's build something amazing together!
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm relative z-10">
                  {[
                    'Machine Learning Internships',
                    'Full-Stack Development',
                    'Open Source Collaboration',
                    'AI Research Projects',
                    'Remote Opportunities'
                  ].map((opportunity) => (
                    <motion.span
                      key={opportunity}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full hover:bg-blue-400/20 hover:text-blue-400 transition-all duration-300 cursor-default"
                    >
                      {opportunity}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}