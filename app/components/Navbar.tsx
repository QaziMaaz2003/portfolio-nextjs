'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuImgContainerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Mouse tracking for tilt effect
  const mouse = useRef({ x: 0, y: 0 });
  const center = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });

  // Default animation ease
  const defaultEase = "power4.inOut";
  const scales = [0.81, 0.84, 0.87, 0.9];
  const heroImage = '/lapp.png';

  // 3D tilt effect based on mouse position (desktop only)
  const updateTilt = () => {
    if (!menuImgContainerRef.current || !imagesRef.current) return;
    // Skip tilt animation on mobile
    if (window.innerWidth <= 768) return;

    const dx = mouse.current.x - center.current.x;
    const dy = mouse.current.y - center.current.y;

    const tiltx = (dy / center.current.y) * 20;
    const tilty = (dx / center.current.x) * 20;

    gsap.to(menuImgContainerRef.current, {
      duration: 2,
      transform: `translateY(-50%) rotate3d(${tiltx}, ${tilty}, 0, 15deg)`,
      ease: "power3.out",
    });

    imagesRef.current.forEach((img, index) => {
      if (!img) return;
      const parallaxX = -(dx * (index + 1)) / 100;
      const parallaxY = -(dy * (index + 1)) / 100;
      gsap.to(img, {
        duration: 2,
        x: parallaxX,
        y: parallaxY,
        scale: scales[index],
        ease: "power3.out",
      });
    });
  };

  // Helper function to play scissor sound using Web Audio API
  const playScissorSound = (type: 'open' | 'close') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (type === 'open') {
        // Scissor opening sound - ascending pitch
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.15);
      } else {
        // Scissor closing sound - descending pitch
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.15);
      }
    } catch (error) {
      // Silently fail if Web Audio API is not available
      console.log('Audio API not available');
    }
  };

  // Helper function to set image refs
  const setImageRef = (index: number) => (el: HTMLImageElement | null) => {
    if (imagesRef.current) {
      imagesRef.current[index] = el;
    }
  };

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();

    // Set initial image positions - only for desktop (mobile uses CSS for static display)
    const setInitialImagePositions = () => {
      if (window.innerWidth > 768) {
        gsap.set(["#img-1", "#img-2", "#img-3", "#img-4"], { 
          opacity: 0,
          scale: 0.8,
        });
      }
    };
    setInitialImagePositions();

    // Mouse move handler for 3D tilt effect
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      updateTilt();
    };

    // Window resize handler
    const handleResize = () => {
      center.current.x = window.innerWidth / 2;
      center.current.y = window.innerHeight / 2;
      checkScreenSize();
      setInitialImagePositions();
    };

    document.body.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    // Handle scroll for active section and hide/show header
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
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

      // Hide/show header on scroll
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (!isOpen) {
        if (diff > 10 && currentY > 50) {
          setIsHeaderHidden(true);
        } else if (diff < -10) {
          setIsHeaderHidden(false);
        }
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    // Initial GSAP setup for menu
    gsap.set(".menu-link-item", { y: 40, opacity: 0 });
    gsap.set(".mobile-menu", { 
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      pointerEvents: "none"
    });
  }, []);

  // Disable page scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
    
    // Play scissor opening sound
    playScissorSound('open');
    
    // Menu opens from top to bottom
    gsap.to(".mobile-menu", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      pointerEvents: "all",
      duration: 1.25,
      ease: defaultEase,
    });

    gsap.to(".menu-link-item", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.06,
      delay: 0.5,
      ease: "power3.out",
    });

    // Animate images in (desktop only - mobile shows static image via CSS)
    if (window.innerWidth > 768) {
      gsap.to(["#img-1", "#img-2", "#img-3", "#img-4"], {
        opacity: 1,
        scale: 1,
        duration: 1.25,
        ease: defaultEase,
        stagger: 0.1,
        delay: 0.25,
      });
    }
  };

  const closeMenu = () => {
    // Play scissor closing sound
    playScissorSound('close');

    // Animate images out first (desktop only)
    if (window.innerWidth > 768) {
      gsap.to(["#img-1", "#img-2", "#img-3", "#img-4"], {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: defaultEase,
        stagger: 0.05,
      });
    }

    // Animate menu items out
    gsap.to(".menu-link-item", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: "power3.in",
    });

    // Menu closes from bottom to top
    gsap.to(".mobile-menu", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      pointerEvents: "none",
      duration: 1.25,
      ease: defaultEase,
      delay: 0.3,
      onComplete: () => {
        setIsOpen(false);
      }
    });
  };

  const handleMenuToggle = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (isOpen) {
        closeMenu();
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 1300);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] h-14 flex items-center px-4 transition-all duration-300 ${
          isHeaderHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isOpen ? 'bg-[#101010]' : 'bg-[#101010]/90 backdrop-blur-md'}`}
        style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%223%22 fill=%22white%22 stroke=%22white%22 stroke-width=%222%22/%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2212%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 opacity=%221%22/%3E%3C/svg%3E") 16 16, auto' }}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer relative w-12 h-12 flex items-center justify-center"
            onClick={() => scrollToSection('hero')}
          >
            <Image
              src="/LOGOO.png"
              alt="MA Logo"
              width={48}
              height={48}
              className="object-contain"
              style={{ filter: 'invert(70%) sepia(50%) saturate(500%) hue-rotate(170deg) brightness(1.1)' }}
            />
          </motion.div>

          {/* Hamburger Button */}
          <button
            aria-label="Toggle menu"
            className="relative z-[400] w-6 h-4 flex items-center justify-center"
            onClick={handleMenuToggle}
          >
            <span
              className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-500 ease-in-out ${
                isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-500 ease-in-out ${
                isOpen ? 'opacity-0 top-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2'
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-500 ease-in-out ${
                isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen Menu */}
      <div
        ref={menuRef}
        className="mobile-menu fixed inset-0 bg-[#101010] z-[150] flex items-center justify-center"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", cursor: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%223%22 fill=%22white%22 stroke=%22white%22 stroke-width=%222%22/%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2212%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 opacity=%221%22/%3E%3C/svg%3E") 16 16, auto' }}
      >
        {/* Image container with layered images and 3D tilt effect */}
        <div className="menu-img-container" ref={menuImgContainerRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="img-1"
            className="menu-img-layer"
            src={heroImage}
            alt=""
            ref={setImageRef(0)}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="img-2"
            className="menu-img-layer"
            src={heroImage}
            alt=""
            ref={setImageRef(1)}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="img-3"
            className="menu-img-layer"
            src={heroImage}
            alt=""
            ref={setImageRef(2)}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="img-4"
            className="menu-img-layer"
            src={heroImage}
            alt=""
            ref={setImageRef(3)}
          />
        </div>

        <div className="flex flex-col items-center justify-center absolute top-[50%] left-1/2 -translate-x-1/2 w-full px-4 md:top-1/2 md:left-auto md:right-[15%] md:translate-x-0 md:-translate-y-1/2 md:items-start md:w-auto md:px-0 gap-3 sm:gap-4 md:gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`menu-link-item text-2xl sm:text-3xl md:text-5xl font-bold transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-cyan-400'
                  : 'text-white hover:text-cyan-400'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
