'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const [bgColor, setBgColor] = useState('rgb(243, 244, 246)'); // gray-100
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateBgColor = () => {
      const sections = [
        { id: 'about', color: 'rgb(243, 244, 246)' }, // gray-100
        { id: 'skills', color: 'rgb(30, 41, 59)' }, // slate-800
        { id: 'projects', color: 'rgb(243, 244, 246)' }, // gray-100
        { id: 'experience', color: 'rgb(30, 41, 59)' }, // slate-800
        { id: 'contact', color: 'rgb(243, 244, 246)' }, // gray-100
      ];

      let currentColor = 'rgb(243, 244, 246)';

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          const viewportHeight = window.innerHeight;

          // Check if section is in view (more than 40% visible)
          if (sectionTop < viewportHeight * 0.6 && sectionBottom > viewportHeight * 0.4) {
            currentColor = section.color;
            break;
          }
        }
      }

      setBgColor(currentColor);
    };

    updateBgColor();
    const unsubscribe = scrollY.on('change', updateBgColor);

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.div 
      className="min-h-screen"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}

