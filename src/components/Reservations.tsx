'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          message: ''
        });
      }, 5000);
    }, 1500);
  };
  
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
      id="reservations" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      <div className="absolute top-40 left-10 w-40 h-40 border border-gold/10 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-gold/20 rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div 
            className="mb-3 text-gold uppercase tracking-[0.2em] text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Secure Your Spot
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-playfair)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Make a <span className="text-gold">Reservation</span>
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
            Reservations are highly recommended as seating is limited. 
            For same-day reservations or parties of 6 or more, please call us directly.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-black/50 backdrop-blur-sm border border-gold/20 p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-gold text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Reservation Received</h3>
                <p className="text-white/70">
                  Thank you for your reservation request. We will contact you shortly to confirm your booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/80 text-sm mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gold/30 text-white p-3 focus:border-gold focus:outline-none transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/80 text-sm mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gold/30 text-white p-3 focus:border-gold focus:outline-none transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/80 text-sm mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gold/30 text-white p-3 focus:border-gold focus:outline-none transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/80 text-sm mb-2" htmlFor="guests">
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gold/30 text-white p-3 focus:border-gold focus:outline-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="7+">7+ Guests (Call us)</option>
                    </select>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/80 text-sm mb-2" htmlFor="date">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gold/30 text-white p-3 focus:border-gold focus:outline-none transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-white/80 text-sm mb-2" htmlFor="time">
                      Preferred Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gold/30 text-white p-3 focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">Select a time</option>
                      {['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </motion.div>
                  
                  <motion.div className="md:col-span-2" variants={itemVariants}>
                    <label className="block text-white/80 text-sm mb-2" htmlFor="message">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-black/50 border border-gold/30 text-white p-3 focus:border-gold focus:outline-none transition-colors"
                    ></textarea>
                  </motion.div>
                  
                  <motion.div className="md:col-span-2 text-center mt-4" variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-4 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-medium ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'gold-shimmer'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Reservation'}
                    </button>
                  </motion.div>
                </motion.div>
              </form>
            )}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p>For immediate assistance or last-minute reservations, please call us at <span className="text-gold">(555) 123-4567</span></p>
            <p className="mt-2">Hours: Tuesday - Sunday, 6:00 PM - 2:00 AM | Closed Mondays</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reservations; 