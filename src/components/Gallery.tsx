'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Gallery image type
type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: 'interior' | 'cocktails' | 'events';
};

// Sample gallery data - replace with your actual images
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/placeholder-dark.jpg',
    alt: 'Elegant bar counter with gold accents',
    category: 'interior'
  },
  {
    id: 2,
    src: '/placeholder-dark.jpg',
    alt: 'Signature cocktail with smoke effect',
    category: 'cocktails'
  },
  {
    id: 3,
    src: '/placeholder-dark.jpg',
    alt: 'Private lounge area with vintage furniture',
    category: 'interior'
  },
  {
    id: 4,
    src: '/placeholder-dark.jpg',
    alt: 'Jazz night performance',
    category: 'events'
  },
  {
    id: 5,
    src: '/placeholder-dark.jpg',
    alt: 'Bartender crafting a cocktail',
    category: 'cocktails'
  },
  {
    id: 6,
    src: '/placeholder-dark.jpg',
    alt: 'Intimate dining area',
    category: 'interior'
  },
];

// Function to get a consistent color based on the image id
const getPlaceholderColor = (id: number) => {
  const colors = [
    'bg-gray-900', 'bg-gray-800', 'bg-gray-700',
    'bg-gray-800', 'bg-gray-900', 'bg-gray-700'
  ];
  return colors[id % colors.length];
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'interior', label: 'Interior' },
    { id: 'cocktails', label: 'Cocktails' },
    { id: 'events', label: 'Events' }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full"></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 border border-gold/10 rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div 
            className="mb-3 text-gold uppercase tracking-[0.2em] text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Visual Experience
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-playfair)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Our <span className="text-gold">Gallery</span>
          </motion.h2>
          
          <motion.div 
            className="w-16 h-1 bg-gold mx-auto mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          ></motion.div>
          
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            Step into the world of Blackfish through our gallery. Experience the ambiance, 
            craftsmanship, and attention to detail that defines our establishment.
          </motion.p>
          
          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gold text-black'
                    : 'bg-transparent border border-gold/30 text-gold hover:bg-gold/10'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredImages.map((image) => (
            <motion.div 
              key={image.id}
              className="relative aspect-square overflow-hidden group cursor-pointer"
              variants={itemVariants}
              onClick={() => setSelectedImage(image)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
              
              {/* Placeholder with dynamic background color */}
              <div className={`w-full h-full ${getPlaceholderColor(image.id)} flex items-center justify-center`}>
                <span className="text-gold text-opacity-50">{image.alt}</span>
              </div>
              
              {/* Uncomment when you have actual images */}
              {/* <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              /> */}
              
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <p className="text-white text-sm">{image.alt}</p>
                <div className="w-10 h-px bg-gold mt-2"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gold"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <motion.div
              className="relative max-w-4xl max-h-[80vh] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Placeholder for actual image in lightbox with dynamic background color */}
              <div className={`w-full h-[60vh] ${selectedImage ? getPlaceholderColor(selectedImage.id) : 'bg-gray-800'} flex items-center justify-center`}>
                <span className="text-gold text-opacity-50">{selectedImage.alt}</span>
              </div>
              
              {/* Uncomment when you have actual images */}
              {/* <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              /> */}
              
              <div className="mt-4">
                <p className="text-white text-lg">{selectedImage.alt}</p>
                <div className="w-16 h-px bg-gold mt-2"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
    </section>
  );
};

export default Gallery; 