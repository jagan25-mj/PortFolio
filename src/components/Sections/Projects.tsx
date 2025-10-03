import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../lib/constants';

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  inView: boolean;
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 25px 50px rgba(78, 168, 255, 0.25)'
      }}
      className="group glass-morphism rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 magnetic-hover"
      style={{
        transform: 'perspective(1000px) rotateX(0deg)',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(3deg) rotateY(-3deg) scale(1.02)';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured Badge */}
        {project.featured && (
          <motion.div 
            className="absolute top-4 left-4"
            whileHover={{ scale: 1.1 }}
          >
            <span className="px-3 py-1 bg-gradient-to-r from-lime-400 to-lime-500 text-slate-900 text-xs font-bold rounded-full shadow-lg">
              FEATURED
            </span>
          </motion.div>
        )}
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors font-space-grotesk">
            {project.title}
          </h3>
          <p className="text-blue-400/80 text-sm font-medium mb-3 uppercase tracking-wide">{project.role}</p>
          <p className="text-gray-300 leading-relaxed font-light">{project.summary}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05, y: -1 }}
              className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm rounded-full border border-slate-600/50 hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 flex items-center font-space-grotesk">
            <span className="w-2 h-2 bg-coral-400 rounded-full mr-2 animate-pulse"></span>
            Key Features
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-gray-400 text-sm flex items-start group/item"
              >
                <ArrowRight size={14} className="text-coral-400 mt-0.5 mr-2 flex-shrink-0 group-hover/item:translate-x-1 transition-transform duration-300" />
                {highlight}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center space-x-2">
            <ExternalLink size={16} />
            <span>Live Demo</span>
            </span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 glass-morphism-light text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center group/github"
          >
            <Github size={16} className="group-hover/github:rotate-12 transition-transform duration-300" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const featuredProjects = PROJECTS.filter(p => p.featured);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">
              Featured <span className="text-coral-400">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-coral-400 to-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Projects that showcase my skills in AI/ML, web development, and game programming
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                inView={inView}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-lg text-gray-300 mb-6">
              Want to see more projects or collaborate on something interesting?
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/jagan25-mj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800 border border-slate-600 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              <Github size={20} />
              <span>View All Projects on GitHub</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}