'use client';

import Image from 'next/image';
import { HiDownload, HiMail } from 'react-icons/hi';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
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
          {/* Main Name - Large and Bold */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white tracking-tighter drop-shadow-lg"
          >
            Qazi Maaz Ahmed
          </h1>

          {/* Subtitle/Title */}
          <h2
            className="text-sm sm:text-base lg:text-lg font-light mb-8 text-gray-300 tracking-widest"
          >
            FULL STACK DEVELOPER, FRONT END & APP DEVELOPER.
          </h2>

          {/* Tagline */}
          <p
            className="text-base sm:text-lg mb-8 text-gray-400 leading-relaxed font-light max-w-2xl"
          >
            I build fast, modern websites and applications that help businesses grow.
            Specializing in React, Next.js, and Backend Development.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg text-sm hover:bg-gray-200 transition-all duration-300"
            >
              <HiMail size={18} />
              Get In Touch
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg text-sm border-2 border-white hover:bg-gray-700 transition-all duration-300"
            >
              View Work
            </button>

            <a
              href="/Qazi_Maaz_CV.pdf"
              download
              className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg text-sm border-2 border-white hover:bg-gray-800 transition-all duration-300"
            >
              <HiDownload size={18} />
              Download CV
            </a>
          </div>

          {/* Scroll Indicator */}
          <div
            className="mt-12"
          >
            <div
              className="inline-block animate-bounce"
            >
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div
                  className="w-1.5 h-2 bg-white rounded-full mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
