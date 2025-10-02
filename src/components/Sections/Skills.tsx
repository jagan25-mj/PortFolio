import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SKILLS } from '../../lib/constants';

interface SkillBarProps {
  skill: { name: string; level: number };
  index: number;
  inView: boolean;
}

function SkillBar({ skill, index, inView }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-blue-400 text-sm font-semibold">{skill.level}%</span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-lime-400 rounded-full relative shadow-lg"
        >
          <div className="absolute inset-0 bg-white/30 rounded-full shimmer"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="skills" className="py-20 relative">
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
              Technical <span className="text-lime-400">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-lime-400 to-coral-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit for building modern AI-powered applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {Object.entries(SKILLS).map(([category, { title, items }], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="glass-morphism rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 magnetic-hover group"
              >
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center font-space-grotesk">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  {title}
                </h3>
                <div className="space-y-4">
                  {items.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={index}
                      inView={inView}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-white text-center mb-8">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'React', 'HTML', 'Python', 'Django', 'PyTorch', 'JavaScript',
                'Tailwind CSS', 'CSS', 'MySQL', 'n8n', 'NumPy',
                'OpenAI API', 'Transformers', 'GitHub Actions', 'REST APIs'
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-slate-800 border border-slate-600 text-gray-300 rounded-full text-sm font-medium hover:border-blue-400 hover:text-blue-400 transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}