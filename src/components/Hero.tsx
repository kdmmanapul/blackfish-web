'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, Sparkles } from '@react-three/drei';
import { Group } from 'three';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ThreeJS animated background component
const AnimatedBackground = () => {
  const sparklesRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <group ref={sparklesRef}>
        <Sparkles 
          count={200}
          scale={[15, 15, 15]}
          size={0.5}
          speed={0.3}
          color="#d4af37"
        />
        <Sparkles 
          count={100}
          scale={[10, 10, 10]}
          size={0.3}
          speed={0.2}
          color="#ffffff"
        />
      </group>
      
      <Environment preset="night" />
    </>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    tl.to(textRef.current, {
      y: 100,
      opacity: 0,
      ease: 'power2.inOut'
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
      {/* ThreeJS Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <AnimatedBackground />
        </Canvas>
      </div>
      
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
            {/* THE <span className="text-gold gold-glow">BLACK</span> ROOM */}
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