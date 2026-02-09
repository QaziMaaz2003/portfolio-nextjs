'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { HiAcademicCap, HiLocationMarker, HiTrendingUp } from 'react-icons/hi';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-10 md:space-y-12"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Content - slides in from left */}
            <motion.div 
              variants={imageVariants}
              className="space-y-6 sm:space-y-7 md:space-y-8 order-2 md:order-1"
            >
              {/* Introduction */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Passionate Full Stack Developer
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  I&apos;m a <span className="font-semibold text-blue-600 dark:text-blue-400">Computer Science student</span> at FAST National University with deep expertise in <span className="font-semibold text-gray-900 dark:text-white">Full Stack Development</span>, Data Science, and Performance Optimization. I transform complex problems into elegant, scalable solutions.
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white uppercase tracking-wide sm:tracking-widest">Professional Experience</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  With hands-on experience from <span className="font-semibold text-blue-600 dark:text-blue-400">BytesPak</span> and <span className="font-semibold text-blue-600 dark:text-blue-400">Meezan Bank</span>, I specialize in architecting and developing fast, scalable web applications using modern technologies like <span className="font-medium">React, Next.js, Node.js, Express, and MySQL</span>.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  className="p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800/30 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                      <HiAcademicCap className="text-white text-base sm:text-lg" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm uppercase tracking-wide">Education</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">BS Computer Science<br/><span className="text-xs text-gray-600 dark:text-gray-400">FAST University (8th Semester)</span></p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  className="p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10 rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-800/30 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-1.5 sm:p-2 bg-purple-600 rounded-lg">
                      <HiTrendingUp className="text-white text-base sm:text-lg" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm uppercase tracking-wide">Specialty</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Full Stack & Backend<br/><span className="text-xs text-gray-600 dark:text-gray-400">Scalable Solutions</span></p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  className="p-4 sm:p-5 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-900/10 rounded-lg sm:rounded-xl border border-pink-200 dark:border-pink-800/30 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-1.5 sm:p-2 bg-pink-600 rounded-lg">
                      <HiLocationMarker className="text-white text-base sm:text-lg" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm uppercase tracking-wide">Location</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Karachi, Pakistan<br/><span className="text-xs text-gray-600 dark:text-gray-400">Available Worldwide</span></p>
                </motion.div>
              </div>
            </motion.div>

            {/* Image - slides in from right */}
            <motion.div 
              variants={textVariants}
              className="flex justify-center order-1 md:order-2"
            >
              <div className="relative w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] max-w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gray-100"></div>
                <Image
                  src="/portfoliooo.png"
                  alt="Portfolio"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover relative z-10 shadow-xl"
                  priority
                  style={{ 
                    mixBlendMode: 'darken',
                    filter: 'brightness(0.98)'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
