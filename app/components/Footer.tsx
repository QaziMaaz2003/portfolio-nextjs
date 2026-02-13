'use client';

import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiHeart } from 'react-icons/hi';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-[#010a14] text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
            >
              QM
            </motion.div>
            <p className="text-gray-400 mb-4">
              Full Stack Developer passionate about creating efficient and beautiful web applications.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/QaziMaaz2003"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-[#0a1929] rounded-lg hover:bg-[#132f4c] transition-colors"
              >
                <SiGithub className="text-xl" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/qazi-maaz"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-[#0a1929] rounded-lg hover:bg-[#132f4c] transition-colors"
              >
                <SiLinkedin className="text-xl" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="mailto:qazimaaz404@gmail.com" className="hover:text-white transition-colors">
                  qazimaaz404@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+923113279075" className="hover:text-white transition-colors">
                  +92-311-327-9075
                </a>
              </li>
              <li>Karachi, Sindh, Pakistan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            Made with <HiHeart className="text-red-500" /> by Qazi Maaz Ahmed © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
