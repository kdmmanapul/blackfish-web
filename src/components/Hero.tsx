'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldShowHeroText, setShouldShowHeroText] = useState(true);

  useEffect(() => {
    // Capture initial scroll position
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Determine if we should show the hero text based on initial scroll position
    // If we're already scrolled past the hero section, don't animate in the text
    setShouldShowHeroText(scrollY < viewportHeight * 0.5);

    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: shouldShowHeroText ? 1 : 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: shouldShowHeroText ? 1 : 0,
      y: shouldShowHeroText ? 0 : 20,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="videos/blackfish-background3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Dimming overlay */}
      <div className="absolute inset-0 bg-black/60 z-5"></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          ref={textRef}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="mb-4 text-gold uppercase tracking-[0.3em] text-sm"
            variants={itemVariants}
          >
            Exclusive Speakeasy Experience
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white font-[family-name:var(--font-playfair)] luxury-text-shadow"
            variants={itemVariants}
          >
            <span className="text-gold gold-glow">BLACKFISH</span> 
          </motion.h1>
          
          <motion.p 
            className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            An exclusive sanctuary of sophisticated cocktails and timeless elegance. 
            Where whispers of the past meet modern luxury.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <a 
              href="#reservations" 
              className="inline-block px-8 py-4 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-medium gold-shimmer"
            >
              Make a Reservation
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-gold"
        >
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero; 