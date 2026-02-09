'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'BytesPak - Software Company',
      period: 'October 2025 - January 2026',
      type: 'work',
      icon: HiBriefcase,
      color: 'from-blue-500 to-cyan-500',
      description: [
        'Developed and maintained full-stack web applications using modern technologies (React, Node.js, and Express)',
        'Collaborated with cross-functional teams for system design, API integration, and deployment',
      ],
    },
    {
      title: 'Back-End Developer - Internship',
      company: 'Meezan Bank Limited',
      period: 'June 2025 - August 2025',
      type: 'work',
      icon: HiBriefcase,
      color: 'from-green-500 to-emerald-500',
      description: [
        'Worked as a Backend Developer Intern in the Enterprise Service Bus (ESB) team',
        'Gained hands-on experience in API development, integration, and management to support core banking services',
        'Conducted API testing and validation using Postman to ensure reliability and performance',
      ],
    },
    {
      title: 'Student Teaching Assistant',
      company: 'FAST - National University',
      period: 'September 2023 - December 2023',
      type: 'work',
      icon: HiAcademicCap,
      color: 'from-purple-500 to-pink-500',
      description: [
        'Graded and evaluated 50+ assignments and projects in Applied Physics',
        'Provided detailed feedback that improved students\' problem-solving skills',
      ],
    },
  ];

  const achievements = [
    {
      title: 'Coders Cup - First Place',
      organization: 'FAST National University',
      period: 'September 2022',
      icon: HiTrophy,
      color: 'from-yellow-500 to-orange-500',
      description: 'Secured first place in a competitive speed programming competition, showcasing strong coding efficiency and problem-solving under pressure',
    },
    {
      title: 'Dean\'s List Honoree',
      organization: 'FAST National University',
      period: 'Fall Semester 2024',
      icon: HiTrophy,
      color: 'from-pink-500 to-rose-500',
      description: 'Recognized for outstanding academic performance in Computer Science, reflecting a consistent commitment to excellence in coursework and research',
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
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
              Experience & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Work Experience */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">
              Professional Experience
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative md:pl-20"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hidden md:block" />
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${exp.color}`}>
                          <exp.icon className="text-3xl text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h4>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                            {exp.company}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                            {exp.period}
                          </p>
                          <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-blue-600 dark:text-blue-400 mt-1">▹</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Honors & Awards
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color}`}>
                      <achievement.icon className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-1">
                        {achievement.organization}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                        {achievement.period}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certification */}
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Certifications
            </h3>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center gap-4">
                <HiAcademicCap className="text-4xl" />
                <div>
                  <h4 className="text-xl font-bold mb-1">Web Development</h4>
                  <p className="text-blue-100">ZeroToMastery Academy</p>
                  <p className="text-blue-200 text-sm">May 2024 - August 2024</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
