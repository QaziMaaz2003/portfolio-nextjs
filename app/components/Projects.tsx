'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { SiReact, SiNodedotjs, SiExpress, SiMysql, SiJavascript, SiHtml5, SiCss3 } from 'react-icons/si';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      image: '/projects/ecommerce.jpg',
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
      image: '/projects/gym.jpg',
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
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
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Project Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`${index % 2 === 1 ? 'md:order-2' : ''} relative group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 rounded-2xl group-hover:opacity-30 transition-opacity`} />
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} opacity-10`} />
                    <div className="absolute text-gray-400 dark:text-gray-600">
                      <HiCode size={80} />
                    </div>
                  </div>
                </motion.div>

                {/* Project Details */}
                <motion.div className={`${index % 2 === 1 ? 'md:order-1' : ''} space-y-4`}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
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

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow`}
                    >
                      <HiExternalLink size={20} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                      <HiCode size={20} />
                      View Code
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* More Projects CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Want to see more of my work?
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/QaziMaaz2003"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              View All Projects on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
