'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiBriefcase } from 'react-icons/hi';
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
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Work Experience */}
          <div>
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
                    className="w-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-blue-500/40 hover:from-blue-500/10 hover:to-purple-500/10 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-2 w-full sm:w-auto">
                      <div className="text-left flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-200 line-clamp-2">{exp.title}</h4>
                        <p className="text-gray-300 text-xs sm:text-sm line-clamp-1">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                      <p className="text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap">{exp.period}</p>
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
                        className="bg-gradient-to-br from-white/5 via-blue-500/5 to-purple-500/10 border border-white/10 text-white rounded-xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-[0_8px_32px_rgba(59,130,246,0.1)] mt-2 backdrop-blur-md"
                      >
                        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8">
                          <div className="flex-1 min-w-0">
                            {/* Description */}
                            <p className="text-gray-200 mb-4 leading-relaxed text-sm sm:text-base">
                              {exp.description}
                            </p>

                            {/* Tools */}
                            <div>
                              <p className="text-gray-300 text-xs sm:text-sm font-semibold mb-3">
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
        </motion.div>
      </div>
    </section>
  );
}
