'use client';

import { useState, useEffect, useRef } from 'react';
import { HiDownload, HiMail, HiChevronDown } from 'react-icons/hi';
import { motion } from 'framer-motion';

// Extend Window interface for VANTA
declare global {
  interface Window {
    VANTA: any;
  }
}

export default function Hero() {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isNameComplete, setIsNameComplete] = useState(false);
  const [isSubtitleComplete, setIsSubtitleComplete] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [vantaScriptsLoaded, setVantaScriptsLoaded] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const vantaRef = useRef<any>(null);
  
  const fullName = "Hi, I'm Qazi Maaz Ahmed";
  const fullSubtitle = 'FULL STACK DEVELOPER';

  // Defer Vanta scripts loading until after initial render
  useEffect(() => {
    let threeLoaded = false;
    let vantaLoaded = false;

    const checkAndSetLoaded = () => {
      if (threeLoaded && vantaLoaded) setVantaScriptsLoaded(true);
    };

    // Defer loading by 1 second to prioritize main content
    const timeoutId = setTimeout(() => {
      // Load three.js
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      threeScript.async = true;
      threeScript.onload = () => {
        threeLoaded = true;
        // Load Vanta after three.js
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js';
        vantaScript.async = true;
        vantaScript.onload = () => {
          vantaLoaded = true;
          checkAndSetLoaded();
        };
        document.head.appendChild(vantaScript);
      };
      document.head.appendChild(threeScript);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Vanta initialization (runs only after scripts loaded and ref ready)
  useEffect(() => {
    if (vantaScriptsLoaded && typeof window !== 'undefined' && window.VANTA && heroRef.current) {
      try {
        // Check if WebGL is supported
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          console.warn('WebGL not supported, skipping Vanta effect');
          return;
        }

        const isMobile = window.innerWidth < 640;
        vantaRef.current = window.VANTA.HALO({
          el: heroRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: isMobile ? 100 : 200.00,
          minWidth: isMobile ? 100 : 200.00,
          color: 0xffffff,
          backgroundColor: 0x000000,
          amplitudeFactor: isMobile ? 1.2 : 2.00,
          size: isMobile ? 1.0 : 1.50,
          mouseEase: true
        });
      } catch (error) {
        console.warn('Failed to initialize Vanta effect:', error);
      }
    }
    return () => {
      if (vantaRef.current && vantaRef.current.destroy) {
        vantaRef.current.destroy();
      }
    };
  }, [vantaScriptsLoaded]);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsNameComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (!isNameComplete) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullSubtitle.length) {
        setDisplayedSubtitle(fullSubtitle.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsSubtitleComplete(true);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [isNameComplete]);

  useEffect(() => {
    // Only show cursor while typing is happening
    if (isSubtitleComplete) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [isSubtitleComplete]);

  useEffect(() => {
    // Show tagline after subtitle is complete
    if (isSubtitleComplete) {
      setShowTagline(true);
      // Show scroll indicator after a delay (buttons fade in duration is 1000ms)
      const timer = setTimeout(() => {
        setShowScrollIndicator(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubtitleComplete]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Preconnect to external resources */}
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      
      <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-screen bg-black" style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%223%22 fill=%22white%22 stroke=%22white%22 stroke-width=%222%22/%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2212%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 opacity=%221%22/%3E%3C/svg%3E") 16 16, auto' }}>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-6 max-w-4xl">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Name - Large and Bold with Typing Animation */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="gradient-text">
              {displayedName}
            </span>
            <span className={`inline-block ml-1 gradient-text ${!isNameComplete && showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
              .
            </span>
          </h1>

          {/* Subtitle/Title with Typing Animation */}
          <h2
            className="text-xl md:text-3xl font-light mb-4 text-cyan-500/90"
          >
            {displayedSubtitle}
            <span className={`inline-block ml-1 ${isNameComplete && !isSubtitleComplete && showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
              .
            </span>
          </h2>

          {/* Tagline */}
          <p
            className={`text-base md:text-xl mb-8 text-cyan-300 font-medium max-w-2xl mx-auto transition-all duration-1000 ${
              showTagline ? 'opacity-100' : 'opacity-0'
            }`}
          >
            I build fast, modern websites and applications that help businesses grow.
            Specializing in React, Next.js, and Backend Development.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-4 items-center justify-center w-full transition-all duration-1000 mt-8 sm:mt-0 mb-16 sm:mb-0 ${
              showTagline ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg text-sm hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <HiMail size={18} />
              Get In Touch
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Work
            </button>

            <a
              href="/Qazi_Maaz_CV.pdf"
              download
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <HiDownload size={18} />
              Download CV
            </a>
          </div>

          {/* Scroll Indicator - Centered in Hero Section */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 ${
              showScrollIndicator ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ top: 'calc(100% + 40px)' }}
          >
            <div
              className="inline-block animate-bounce"
            >
              <HiChevronDown size={32} className="text-white" />
            </div>
          </div>
        </motion.div>
      </div>
      </section>
    </>
  );
}
