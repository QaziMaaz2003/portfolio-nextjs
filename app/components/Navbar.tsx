'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  useEffect(() => {
    // Handle scroll for active section
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply blur only to main content, not navbar
    const nav = document.querySelector('nav');
    
    if (isOpen) {
      // Ensure navbar is never blurred
      if (nav) {
        (nav as HTMLElement).style.filter = 'none';
        (nav as HTMLElement).style.pointerEvents = 'auto';
      }
      
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        (section as HTMLElement).style.filter = 'blur(4px)';
        (section as HTMLElement).style.pointerEvents = 'none';
      });
    } else {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        (section as HTMLElement).style.filter = 'none';
        (section as HTMLElement).style.pointerEvents = 'auto';
      });
    }

    return () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        (section as HTMLElement).style.filter = 'none';
        (section as HTMLElement).style.pointerEvents = 'auto';
      });
      
      if (nav) {
        (nav as HTMLElement).style.filter = 'none';
        (nav as HTMLElement).style.pointerEvents = 'auto';
      }
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            QM
          </motion.div>

          <div className="hidden md:flex items-center gap-0">
            {/* Desktop Menu - Slides in from left */}
            <AnimatePresence>
              {isDesktopMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden flex gap-2 border-r border-gray-700 pr-4"
                >
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsDesktopMenuOpen(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 rounded text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        activeSection === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Navigation Menu Button - Stays on right */}
            <button
              onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <HiMenu size={24} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0, rotateX: -90, originY: 0 }}
          animate={{ opacity: 1, scaleY: 1, rotateX: 0, originY: 0 }}
          exit={{ opacity: 0, scaleY: 0, rotateX: -90, originY: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ perspective: 1200 }}
          className="md:hidden bg-gray-900 border-t border-gray-700 backdrop-blur-md relative z-50"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
