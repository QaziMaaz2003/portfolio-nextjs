'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiDownload, HiMail, HiChevronDown } from 'react-icons/hi';

export default function Hero() {
  const [displayedName, setDisplayedName] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isNameComplete, setIsNameComplete] = useState(false);
  const [isSubtitleComplete, setIsSubtitleComplete] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const fullName = 'Qazi Maaz Ahmed';
  const fullSubtitle = 'FULL STACK DEVELOPER';

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
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950 w-screen">
      {/* Laptop Background Image - Full Cover */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/laptop.avif"
          alt="Laptop Background"
          fill
          className="object-cover w-full h-full"
          quality={100}
          priority
          unoptimized
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-left max-w-3xl">
          {/* Main Name - Large and Bold with Typing Animation */}
          <h1
            className="text-3xl sm:text-5xl sm:text-6xl lg:text-7xl font-light mb-4 sm:mb-4 text-white tracking-widest drop-shadow-lg"
          >
            {displayedName}
            <span className={`inline-block ml-1 ${!isNameComplete && showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
              .
            </span>
          </h1>

          {/* Subtitle/Title with Typing Animation */}
          <h2
            className="text-base sm:text-lg sm:text-xl lg:text-2xl font-light mb-6 sm:mb-8 text-gray-300 tracking-widest"
          >
            {displayedSubtitle}
            <span className={`inline-block ml-1 ${isNameComplete && !isSubtitleComplete && showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
              .
            </span>
          </h2>

          {/* Tagline */}
          <p
            className={`text-sm sm:text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-8 text-gray-400 leading-relaxed font-light max-w-2xl transition-all duration-1000 ${
              showTagline ? 'opacity-100' : 'opacity-0'
            }`}
          >
            I build fast, modern websites and applications that help businesses grow.
            Specializing in React, Next.js, and Backend Development.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-4 items-stretch sm:items-start w-full sm:w-auto transition-all duration-1000 mt-8 sm:mt-0 mb-16 sm:mb-0 ${
              showTagline ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-8 py-2.5 sm:py-3 bg-white text-black font-semibold rounded-lg text-xs sm:text-sm hover:bg-gray-200 transition-all duration-300"
            >
              <HiMail size={16} />
              Get In Touch
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-8 py-2.5 sm:py-3 bg-gray-800 text-white font-semibold rounded-lg text-xs sm:text-sm border-2 border-white hover:bg-gray-700 transition-all duration-300"
            >
              View Work
            </button>

            <a
              href="/Qazi_Maaz_CV.pdf"
              download
              className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-8 py-2.5 sm:py-3 bg-gray-900 text-white font-semibold rounded-lg text-xs sm:text-sm border-2 border-white hover:bg-gray-800 transition-all duration-300"
            >
              <HiDownload size={16} />
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
        </div>
      </div>
    </section>
  );
}
