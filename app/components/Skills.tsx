'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiC,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiCss3,
  SiGit,
  SiDocker,
  SiVercel,
} from 'react-icons/si';

// Type definitions
interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Category {
  title: string;
  description: string;
  skills: Skill[];
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skillCategories: Category[] = [
    {
      title: 'Languages',
      description: 'Programming Languages',
      skills: [
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Python', icon: SiPython },
        { name: 'C++', icon: SiCplusplus },
        { name: 'C', icon: SiC },
      ],
    },
    {
      title: 'Frameworks',
      description: 'Web Development Frameworks',
      skills: [
        { name: 'React.js', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express.js', icon: SiExpress },
      ],
    },
    {
      title: 'Styling',
      description: 'CSS & UI Frameworks',
      skills: [
        { name: 'CSS', icon: SiCss3 },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Bootstrap', icon: SiBootstrap },
      ],
    },
    {
      title: 'Tools',
      description: 'Development & Deployment',
      skills: [
        { name: 'Git', icon: SiGit },
        { name: 'Docker', icon: SiDocker },
        { name: 'Vercel', icon: SiVercel },
      ],
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">Technical Skills</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 px-4">
              Tools I use to build scalable apps
            </p>
          </motion.div>

          {/* Infinite Scrolling Cards */}
          <div 
            className="relative -mx-4 sm:mx-0 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div 
              className="flex gap-4 sm:gap-6 md:gap-8 animate-scroll-mobile sm:animate-scroll-tablet md:animate-scroll" 
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {/* First set of cards */}
              {skillCategories.map((category) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="skill-card group bg-gray-900 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 border border-gray-800 shadow-lg hover:shadow-xl hover:border-gray-700 flex-shrink-0 w-[250px] sm:w-[270px] md:w-[310px] transition-all duration-300"
                >
                  {/* Category Header */}
                  <div className="mb-4 sm:mb-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills as Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                      >
                        <skill.icon className="text-sm sm:text-base text-blue-400" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {skillCategories.map((category) => (
                <motion.div
                  key={`${category.title}-duplicate`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="skill-card group bg-gray-900 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 border border-gray-800 shadow-lg hover:shadow-xl hover:border-gray-700 flex-shrink-0 w-[250px] sm:w-[270px] md:w-[310px] transition-all duration-300"
                >
                  {/* Category Header */}
                  <div className="mb-4 sm:mb-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills as Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 sm:gap-2 bg-gray-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                      >
                        <skill.icon className="text-sm sm:text-base text-blue-400" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
