'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { SiReact, SiNodedotjs, SiExpress, SiMysql, SiJavascript, SiHtml5, SiCss3 } from 'react-icons/si';
import Image from 'next/image';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    {
      title: 'E-Commerce Website with Order Tracking',
      description: 'Developed a comprehensive e-commerce system with an interactive front-end, enabling seamless product selection, order tracking, and customer management. Designed and implemented a secure database architecture that optimizes data storage and retrieval.',
      tech: [
        { name: 'React.js', icon: SiReact, color: 'text-cyan-500' },
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
        { name: 'Express', icon: SiExpress, color: 'text-gray-700' },
        { name: 'MySQL', icon: SiMysql, color: 'text-blue-700' },
      ],
      image: '/e-commerce.png',
      liveLink: '#',
      githubLink: '#',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Gym Membership Website',
      description: 'Created a user-friendly and responsive website that allows visitors to explore gym facilities, services, and membership plans. Integrated a membership registration system that enables users to sign up and enroll in various gym activities.',
      tech: [
        { name: 'HTML5', icon: SiHtml5, color: 'text-orange-600' },
        { name: 'CSS3', icon: SiCss3, color: 'text-blue-600' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
      ],
      image: '/gymweb.png',
      liveLink: '#',
      githubLink: '#',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={`${
                  expandedProject === index 
                    ? 'flex flex-col md:grid md:grid-cols-2 gap-8 md:items-center' 
                    : 'flex flex-col gap-8 md:gap-0 md:flex-row md:justify-center'
                }`}
              >
                {/* Project Image */}
                <motion.div
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  whileHover={{ scale: 1.02 }}
                  className={`${
                    expandedProject === index ? 'w-full cursor-pointer' : 'w-full max-w-xl cursor-pointer mx-auto'
                  } relative group`}
                >
                  <div className="min-h-[300px] rounded-2xl shadow-xl overflow-hidden relative border-2 border-gray-700">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>

                {/* Project Details - Only show when expanded */}
                <AnimatePresence>
                  {expandedProject === index && (
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        y: isMobile ? 30 : 0, 
                        x: isMobile ? 0 : 50 
                      }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        x: 0 
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: isMobile ? 30 : 0, 
                        x: isMobile ? 0 : 50 
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="space-y-4 w-full"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-black sm:dark:text-gray-300 mb-3">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.tech.map((tech) => (
                            <motion.div
                              key={tech.name}
                              whileHover={{ scale: 1.1 }}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full"
                            >
                              <tech.icon className={`${tech.color} text-xl`} />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {tech.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
