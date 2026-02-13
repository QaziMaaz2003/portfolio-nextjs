'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';
import Image from 'next/image';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences = [
    {
      title: 'Back-End Developer - Internship',
      company: 'Meezan Bank Limited',
      period: 'June 2025 - August 2025',
      type: 'work',
      icon: HiBriefcase,
      color: 'from-green-500 to-emerald-500',
      description: 'Worked as a Backend Developer Intern in the Enterprise Service Bus (ESB) team. Gained hands-on experience in API development, integration, and management to support core banking services. Conducted API testing and validation using Postman to ensure reliability and performance.',
      tools: ['IBM App Connect Enterprise', 'REST API Design', 'API Integration', 'Postman', 'Thunder Client'],
      logo: '🏦',
      logoImage: '/meezanLogoo.png',
      location: 'Karachi, Pakistan',
    },
    {
      title: 'Full Stack Developer',
      company: 'BytesPak - Software Company',
      period: 'October 2025 - January 2026',
      type: 'work',
      icon: HiBriefcase,
      color: 'from-blue-500 to-cyan-500',
      description: 'Developed and maintained full-stack web applications. I develop modern, responsive user interfaces using Next.js and React, and design scalable backend systems with NestJS and using TypeScript. My work includes database management, REST API development, and third-party API integrations. I have built multiple full-stack applications, including a trading platform featuring an AI-powered agent that analyzes market conditions and identifies trade opportunities. I focus on performance optimization, clean architecture, and delivering reliable, scalable solutions.',
      tools: ['React', 'Next.js', 'NestJS', 'TypeScript', 'JavaScript', 'Git'],
      logo: '💻',
      logoImage: '/bytespakLogo.jpg',
      location: 'Karachi, Pakistan',
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
            <div className="space-y-4 flex flex-col items-center px-2 sm:px-0">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="w-full max-w-3xl"
                >
                  {/* Collapsed View */}
                  <motion.button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-600 hover:border-purple-600 hover:bg-gray-200 dark:hover:bg-gray-500 hover:shadow-lg shadow-md rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 transition-all hover:scale-102"
                  >
                    <div className="flex items-start gap-2 w-full sm:w-auto">
                      <div className="text-left flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300 line-clamp-2">{exp.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm line-clamp-1">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap">{exp.period}</p>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl sm:text-2xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        +
                      </motion.div>
                    </div>
                  </motion.button>

                  {/* Expanded View */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-600 text-gray-900 dark:text-white rounded-b-lg p-4 sm:p-6 lg:p-8 overflow-hidden shadow-md mt-2 backdrop-blur-sm"
                      >
                        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8">
                          <div className="flex-1 min-w-0">
                            {/* Description */}
                            <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed text-sm sm:text-base">
                              {exp.description}
                            </p>

                            {/* Tools */}
                            <div>
                              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold mb-3">
                                📍 Location: {exp.location}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {exp.tools.map((tool, toolIndex) => (
                                  <span
                                    key={toolIndex}
                                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-medium hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {exp.logoImage ? (
                            exp.logoImage.includes('bytespak') ? (
                              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 mx-auto lg:mx-0">
                                <Image
                                  src={exp.logoImage}
                                  alt={exp.company}
                                  width={128}
                                  height={128}
                                  className="object-cover w-full h-full"
                                  style={{ mixBlendMode: 'lighten' }}
                                  quality={95}
                                />
                              </div>
                            ) : (
                              <Image
                                src={exp.logoImage}
                                alt={exp.company}
                                width={120}
                                height={120}
                                className="object-contain mix-blend-mode-lighten flex-shrink-0 h-24 sm:h-32 w-auto mx-auto lg:mx-0"
                                style={{ mixBlendMode: 'lighten' }}
                                quality={95}
                              />
                            )
                          ) : (
                            <div className="text-4xl sm:text-6xl flex-shrink-0 mx-auto lg:mx-0">{exp.logo}</div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
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
