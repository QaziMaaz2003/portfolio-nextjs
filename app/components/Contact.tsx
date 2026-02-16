'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiMail, HiPhone } from 'react-icons/hi';
import { SiGithub, SiLinkedin, SiWhatsapp } from 'react-icons/si';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeInVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Let&apos;s Connect</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s turn your vision into reality. I&apos;m here to help bring your ideas to life!
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1.2fr_auto_0.8fr] gap-12 items-start lg:pr-12">
            
            {/* Left Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="py-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name and Email - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-black sm:text-gray-700 dark:text-gray-900 sm:dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-300 sm:dark:border-gray-600 bg-white dark:bg-white sm:dark:bg-gray-800 text-gray-900 dark:text-gray-900 sm:dark:text-white placeholder-gray-400 dark:placeholder-gray-600 sm:dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-black sm:text-gray-700 dark:text-gray-900 sm:dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-300 sm:dark:border-gray-600 bg-white dark:bg-white sm:dark:bg-gray-800 text-gray-900 dark:text-gray-900 sm:dark:text-white placeholder-gray-400 dark:placeholder-gray-600 sm:dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-black sm:text-gray-700 dark:text-gray-900 sm:dark:text-gray-300 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-300 sm:dark:border-gray-600 bg-white dark:bg-white sm:dark:bg-gray-800 text-gray-900 dark:text-gray-900 sm:dark:text-white placeholder-gray-400 dark:placeholder-gray-600 sm:dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-black sm:text-gray-700 dark:text-gray-900 sm:dark:text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-300 sm:dark:border-gray-600 bg-white dark:bg-white sm:dark:bg-gray-800 text-gray-900 dark:text-gray-900 sm:dark:text-white placeholder-gray-400 dark:placeholder-gray-600 sm:dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </motion.button>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg text-center font-medium"
                  >
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-center font-medium"
                  >
                    ✕ {errorMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Vertical Divider with Text */}
            <div className="hidden lg:flex flex-col items-center justify-center relative h-full self-stretch">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent absolute"></div>
              <div className="bg-gray-100 px-4 py-2 rounded-full z-10 relative">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap text-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Or Direct Contact</span>
              </div>
            </div>

            {/* Right Side - Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8 flex flex-col items-center lg:items-start py-6"
            >
              
              {/* Mobile Divider - Only visible on mobile */}
              <div className="lg:hidden w-full flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-gray-300 dark:to-gray-600"></div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">Or Direct Contact</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 dark:via-gray-600 to-gray-300 dark:to-gray-600"></div>
              </div>

              {/* Direct Contact Section */}
              <div>
                <div className="space-y-5">
                  
                  {/* Email */}
                  <motion.a
                    href="mailto:qazimaaz404@gmail.com?subject=Business Inquiry - Portfolio Contact&body=Dear Qazi Maaz,%0D%0A%0D%0AI hope this message finds you well. I recently reviewed your portfolio and was impressed by your technical expertise and project work.%0D%0A%0D%0AI am reaching out to discuss a potential opportunity that aligns with your skill set. I would appreciate the opportunity to connect and explore how we might work together.%0D%0A%0D%0AProject/Opportunity Overview:%0D%0A%0D%0A%0D%0APlease let me know your availability for a brief discussion at your earliest convenience.%0D%0A%0D%0AThank you for your time and consideration.%0D%0A%0D%0ABest regards,"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-white dark:bg-white sm:dark:bg-gray-800 rounded-lg border border-gray-400 dark:border-gray-300 sm:dark:border-gray-600 group-hover:bg-white dark:group-hover:bg-white sm:dark:group-hover:bg-gray-800 transition-colors">
                      <HiMail className="text-2xl text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-700 sm:dark:text-gray-400">Email</p>
                      <p className="font-semibold text-black sm:text-gray-900 dark:text-gray-900 sm:dark:text-white">qazimaaz404@gmail.com</p>
                    </div>
                  </motion.a>

                  {/* WhatsApp */}
                  <motion.a
                    href="https://wa.me/923113279075?text=Hi%20Qazi%20Maaz,%0D%0A%0D%0AI%20hope%20this%20message%20finds%20you%20well.%20I%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20by%20your%20technical%20expertise%20and%20project%20work.%0D%0A%0D%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20that%20aligns%20with%20your%20skill%20set.%20I%20would%20appreciate%20the%20opportunity%20to%20connect%20and%20explore%20how%20we%20might%20work%20together.%0D%0A%0D%0AProject%2FOpportunity%20Overview:%0D%0A%0D%0APlease%20let%20me%20know%20your%20availability%20for%20a%20brief%20discussion%20at%20your%20earliest%20convenience.%0D%0A%0D%0AThank%20you%20for%20your%20time%20and%20consideration.%0D%0A%0D%0ABest%20regards,"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-white dark:bg-white sm:dark:bg-gray-800 rounded-lg border border-gray-400 dark:border-gray-300 sm:dark:border-gray-600 group-hover:bg-white dark:group-hover:bg-white sm:dark:group-hover:bg-gray-800 transition-colors">
                      <SiWhatsapp className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-700 sm:dark:text-gray-400">WhatsApp</p>
                      <p className="font-semibold text-black sm:text-gray-900 dark:text-gray-900 sm:dark:text-white">Message on WhatsApp</p>
                    </div>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="https://www.linkedin.com/in/qazi-maaz-5a8abb279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-white dark:bg-white sm:dark:bg-gray-800 rounded-lg border border-gray-400 dark:border-gray-300 sm:dark:border-gray-600 group-hover:bg-white dark:group-hover:bg-white sm:dark:group-hover:bg-gray-800 transition-colors">
                      <SiLinkedin className="text-2xl text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-700 sm:dark:text-gray-400">LinkedIn</p>
                      <p className="font-semibold text-black sm:text-gray-900 dark:text-gray-900 sm:dark:text-white">Connect on LinkedIn</p>
                    </div>
                  </motion.a>

                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/QaziMaaz2003"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-white dark:bg-white sm:dark:bg-gray-800 rounded-lg border border-gray-400 dark:border-gray-300 sm:dark:border-gray-600 group-hover:bg-white dark:group-hover:bg-white sm:dark:group-hover:bg-gray-800 transition-colors">
                      <SiGithub className="text-2xl text-gray-900 dark:text-gray-900 sm:dark:text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-700 sm:dark:text-gray-400">GitHub</p>
                      <p className="font-semibold text-black sm:text-gray-900 dark:text-gray-900 sm:dark:text-white">View My Projects</p>
                    </div>
                  </motion.a>

                </div>
              </div>

            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
