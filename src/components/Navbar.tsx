'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-90 luxury-shadow' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div 
            className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-gold luxury-text-shadow"
            variants={itemVariants}
          >
            BLACKFISH
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.nav className="hidden md:flex space-x-8" variants={navVariants}>
          {['About', 'Menu', 'Gallery', 'Contact'].map((item) => (
            <motion.div key={item} variants={itemVariants}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="text-white hover:text-gold transition-colors duration-300 uppercase tracking-wider text-sm font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemVariants}>
            <Link 
              href="#reservations" 
              className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300 uppercase tracking-wider text-sm font-medium"
            >
              Reservations
            </Link>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden overflow-hidden"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="bg-black bg-opacity-95 px-4 py-5 flex flex-col space-y-4">
          {['About', 'Menu', 'Gallery', 'Contact'].map((item) => (
            <motion.div key={item} variants={itemVariants}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="block text-white hover:text-gold transition-colors duration-300 uppercase tracking-wider text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemVariants} className="pt-2">
            <Link 
              href="#reservations" 
              className="block w-full text-center px-4 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300 uppercase tracking-wider text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservations
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar; 