'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Menu item type
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'signature' | 'classic' | 'mocktail';
};

// Sample menu data
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Midnight Serenade',
    description: 'Japanese whisky, black walnut bitters, demerara syrup, and a hint of smoked applewood.',
    price: '$18',
    category: 'signature'
  },
  {
    id: 2,
    name: 'Golden Hour',
    description: 'Aged rum, Aperol, pineapple cordial, lime, and champagne float.',
    price: '$16',
    category: 'signature'
  },
  {
    id: 3,
    name: 'Velvet Revolver',
    description: 'Rye whiskey, sweet vermouth, black cherry liqueur, and chocolate bitters.',
    price: '$17',
    category: 'signature'
  },
  {
    id: 4,
    name: 'Classic Old Fashioned',
    description: 'Bourbon, sugar cube, Angostura bitters, and an orange twist.',
    price: '$15',
    category: 'classic'
  },
  {
    id: 5,
    name: 'Prohibition Negroni',
    description: 'Gin, Campari, sweet vermouth, and flamed orange peel.',
    price: '$16',
    category: 'classic'
  },
  {
    id: 6,
    name: 'Gilded Elixir',
    description: 'Blackberry shrub, elderflower tonic, lemon, and rosemary smoke.',
    price: '$12',
    category: 'mocktail'
  }
];

const MenuHighlights = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
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
      id="menu" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      <div className="absolute top-20 right-10 w-32 h-32 border border-gold/20 rounded-full"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 border border-gold/10 rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div 
            className="mb-3 text-gold uppercase tracking-[0.2em] text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Crafted with Passion
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-playfair)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Menu <span className="text-gold">Highlights</span>
          </motion.h2>
          
          <motion.div 
            className="w-16 h-1 bg-gold mx-auto mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          ></motion.div>
          
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            A selection of our finest libations, each crafted with precision and care.
            Visit us to explore our full menu of exceptional cocktails.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {menuItems.map((item) => (
            <motion.div 
              key={item.id}
              className="bg-black/50 backdrop-blur-sm border border-gold/20 p-6 relative group"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-playfair)]">
                  {item.name}
                </h3>
                <span className="text-gold font-medium">{item.price}</span>
              </div>
              
              <p className="text-white/70 mb-4 text-sm">{item.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-gold/70">
                  {item.category === 'signature' ? 'Signature' : 
                   item.category === 'classic' ? 'Classic' : 'Alcohol-Free'}
                </span>
                
                <div className="w-8 h-px bg-gold/40"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <a 
            href="#reservations" 
            className="inline-block px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-medium"
          >
            Reserve a Table
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuHighlights; 