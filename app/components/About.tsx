'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HiAcademicCap, HiLocationMarker, HiTrendingUp } from 'react-icons/hi';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInSection, setIsInSection] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationReversed, setAnimationReversed] = useState(false);
  
  // Manual progress control (0 to 1)
  const progress = useMotionValue(0);
  
  // Image starts centered and moves to left position
  const imageX = useTransform(progress, [0, 1], ["50%", "0%"]);
  
  // Text opacity and position
  const textOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.5, 1]);
  const textX = useTransform(progress, [0, 1], ["50%", "0%"]);

  // Check if section is in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setIsInSection(true);
        } else if (!entry.isIntersecting) {
          setIsInSection(false);
        }
      },
      { threshold: [0.5] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Handle wheel events for animation control
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isInSection) return;
    
    const currentProgress = progress.get();
    
    // Scrolling down
    if (e.deltaY > 0) {
      if (currentProgress < 1) {
        e.preventDefault();
        const newProgress = Math.min(1, currentProgress + 0.05);
        progress.set(newProgress);
        
        if (newProgress >= 1) {
          setAnimationComplete(true);
          setAnimationReversed(false);
        }
      }
      // If animation complete, allow normal scroll
    }
    // Scrolling up
    else if (e.deltaY < 0) {
      if (currentProgress > 0 && !animationReversed) {
        e.preventDefault();
        const newProgress = Math.max(0, currentProgress - 0.05);
        progress.set(newProgress);
        
        if (newProgress <= 0) {
          setAnimationReversed(true);
          setAnimationComplete(false);
        }
      }
      // If animation fully reversed, allow normal scroll up
    }
  }, [isInSection, progress, animationReversed]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="h-screen px-4 sm:px-6 lg:px-8 bg-gray-100 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="relative h-[450px] flex items-center">
          {/* Image - starts centered, moves to left */}
          <motion.div 
            className="absolute left-0 w-1/2 flex justify-center"
            style={{ x: imageX }}
          >
            <div className="relative w-[400px] h-[400px]">
              <Image
                src="/portfol.jpg"
                alt="Portfolio"
                width={400}
                height={400}
                className="rounded-full shadow-2xl object-cover w-full h-full"
                priority
              />
            </div>
          </motion.div>

          {/* Content - starts hidden, slides in from right */}
          <motion.div 
            className="absolute right-0 w-1/2 space-y-6 pl-8"
            style={{ opacity: textOpacity, x: textX }}
          >
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
        </div>
      </section>
  );
}
