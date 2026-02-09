'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVercel,
  SiLinux,
} from 'react-icons/si';
import { FaDatabase, FaWindows } from 'react-icons/fa';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const skillCategories = [
    {
      title: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML', icon: SiHtml5, color: 'text-orange-600' },
        { name: 'CSS', icon: SiCss3, color: 'text-blue-600' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
        { name: 'React', icon: SiReact, color: 'text-cyan-500' },
        { name: 'Tailwind', icon: SiTailwindcss, color: 'text-teal-500' },
      ],
    },
    {
      title: 'Backend',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
        { name: 'Express', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
        { name: 'MySQL', icon: SiMysql, color: 'text-blue-700' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
      ],
    },
    {
      title: 'Languages',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'C/C++', icon: SiCplusplus, color: 'text-blue-600' },
        { name: 'Python', icon: SiPython, color: 'text-blue-500' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
      ],
    },
    {
      title: 'Tools & Others',
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git', icon: SiGit, color: 'text-orange-600' },
        { name: 'GitHub', icon: SiGithub, color: 'text-gray-800 dark:text-white' },
        { name: 'Vercel', icon: SiVercel, color: 'text-black dark:text-white' },
        { name: 'Linux', icon: SiLinux, color: 'text-yellow-600' },
        { name: 'Windows', icon: FaWindows, color: 'text-blue-600' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
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
              Skills & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tech Stack</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} text-white rounded-xl p-4 mb-6 text-center`}>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <skill.icon className={`text-3xl ${skill.color}`} />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
              Soft Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Communication', 'Problem-Solving', 'Team Collaboration', 'Critical Thinking', 'Time Management'].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-md"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
