'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const imageRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    if (isInView) {
      gsap.to(imageRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  }, [isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div 
              ref={imageRef} 
              className="relative aspect-[3/4] overflow-hidden"
              style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
            >
              <div className="absolute inset-0 border border-gold/30 z-10"></div>
              <div className="w-full h-full relative">
                {/* Replace with your actual image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]"></div>
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-gold text-opacity-50">Speakeasy Interior Image</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/40"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/40"></div>
          </div>
          
          {/* Text Column */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="mb-3 text-gold uppercase tracking-[0.2em] text-sm"
              variants={itemVariants}
            >
              Our Story
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-playfair)]"
              variants={itemVariants}
            >
              A Hidden <span className="text-gold">Sanctuary</span> of Elegance
            </motion.h2>
            
            <motion.div 
              className="w-16 h-1 bg-gold mb-8"
              variants={itemVariants}
            ></motion.div>
            
            <motion.p 
              className="text-white/80 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              Established in 2023, The Black Fish was born from a passion for craftsmanship and a reverence for the prohibition era&apos;s clandestine elegance. Nestled in the heart of the city, our speakeasy offers an escape from the ordinary.
            </motion.p>
            
            <motion.p 
              className="text-white/80 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Every detail of our establishment has been meticulously curated to transport you to an era of sophistication and mystery. From our handcrafted cocktails to our intimate ambiance, we invite you to indulge in an experience that honors tradition while embracing innovation.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <a 
                href="#menu" 
                className="inline-block px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-medium"
              >
                Explore Our Menu
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
    </section>
  );
};

export default About; 