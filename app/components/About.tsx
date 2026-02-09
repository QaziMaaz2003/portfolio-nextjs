'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiAcademicCap, HiLocationMarker, HiTrendingUp } from 'react-icons/hi';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
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
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image/Stats */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-3xl font-bold mb-4">My Story</h3>
                <p className="text-blue-100 leading-relaxed">
                  Passionate about creating elegant solutions to complex problems.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3.50</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CGPA / 4.00</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I&apos;m a <span className="font-semibold text-blue-600 dark:text-blue-400">Computer Science student</span> at 
                FAST National University with expertise in <span className="font-semibold">Full Stack Development</span>, 
                Data Science, and Performance Optimization.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                With hands-on experience from <span className="font-semibold text-purple-600 dark:text-purple-400">BytesPak</span> and 
                <span className="font-semibold text-purple-600 dark:text-purple-400"> Meezan Bank</span>, I specialize in building 
                fast, scalable web applications using modern technologies like React, Next.js, Node.js, and Express.
              </p>

              {/* Highlights */}
              <div className="space-y-4 mt-8">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <HiAcademicCap className="text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Education</h4>
                    <p className="text-gray-600 dark:text-gray-400">BS Computer Science at FAST University (8th Semester)</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                >
                  <HiTrendingUp className="text-purple-600 dark:text-purple-400 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Passion</h4>
                    <p className="text-gray-600 dark:text-gray-400">Building efficient, user-friendly applications that solve real-world problems</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg"
                >
                  <HiLocationMarker className="text-pink-600 dark:text-pink-400 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">Karachi, Sindh, Pakistan</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
