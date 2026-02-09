'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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
import { ReactNode } from 'react';

// Type definitions
interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Category {
  title: string;
  bgColor: string;
  borderColor: string;
  skills: Skill[];
}

interface SkillCardProps {
  category: Category;
  categoryIndex: number;
  isInView: boolean;
  itemVariants: Record<string, unknown>;
}

// 3D Tilt Card Component
function SkillCard({ category, categoryIndex, isInView, itemVariants }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: 'transform 0.05s linear',
      }}
      className={`group relative ${category.bgColor} ${category.borderColor} border-2 rounded-3xl p-8 overflow-hidden`}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform translate-x-8 -translate-y-8">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
      </div>

      {/* Category Header */}
      <div className="relative z-10 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
          {category.title}
        </h3>
        <div className="h-1 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4" />
      </div>

      {/* Skills */}
      <div className="relative z-10 space-y-3">
        {category.skills.map((skill: Skill, skillIndex: number) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -15 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.08, duration: 0.5 }}
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 cursor-pointer"
          >
            <div className="flex-shrink-0">
              <skill.icon className={`text-2xl ${skill.color} transition-transform duration-300 group-hover:scale-110`} />
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-snug">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const skillCategories = [
    {
      title: 'Frontend Development',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      skills: [
        { name: 'React.js', icon: SiReact, color: 'text-blue-500' },
        { name: 'HTML5', icon: SiHtml5, color: 'text-orange-500' },
        { name: 'CSS3', icon: SiCss3, color: 'text-blue-600' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
      ],
    },
    {
      title: 'Backend & Database',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
        { name: 'Express.js', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
        { name: 'MySQL', icon: SiMysql, color: 'text-blue-700' },
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
      ],
    },
    {
      title: 'Programming Languages',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      skills: [
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
        { name: 'Python', icon: SiPython, color: 'text-blue-500' },
        { name: 'C/C++', icon: SiCplusplus, color: 'text-blue-600' },
      ],
    },
    {
      title: 'Tools & Platforms',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      skills: [
        { name: 'Git & GitHub', icon: SiGithub, color: 'text-gray-800 dark:text-white' },
        { name: 'Vercel', icon: SiVercel, color: 'text-black dark:text-white' },
        { name: 'Linux', icon: SiLinux, color: 'text-yellow-600' },
        { name: 'Windows', icon: FaWindows, color: 'text-blue-500' },
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
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Technical <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A comprehensive collection of tools and technologies I've mastered through real-world development experience. Each skill represents hands-on expertise in production environments.
            </p>
            <div className="flex gap-2 justify-center mt-6">
              <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-blue-600 rounded-full" />
              <div className="h-1 w-8 bg-gradient-to-r from-purple-600 to-purple-600 rounded-full" />
              <div className="h-1 w-8 bg-gradient-to-r from-pink-600 to-pink-600 rounded-full" />
            </div>
          </motion.div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div key={category.title} variants={itemVariants}>
                <SkillCard
                  category={category}
                  categoryIndex={categoryIndex}
                  isInView={isInView}
                  itemVariants={itemVariants}
                />
              </motion.div>
            ))}
          </div>

          {/* Core Competencies */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Professional Competencies
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                Core strengths that define my approach to software development
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {['Problem-Solving', 'Team Collaboration', 'Critical Thinking', 'Adaptability', 'Communication', 'Time Management', 'Leadership', 'Project Management'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.06, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="px-4 py-3 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 text-center font-semibold text-gray-800 dark:text-gray-200 text-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
