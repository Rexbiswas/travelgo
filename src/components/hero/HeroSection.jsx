'use client';

import React from 'react';
import BookingSearch from '@/components/booking/BookingSearch';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full">
      
      {/* Scenic Travel Hero Area */}
      <div 
        className="relative w-full h-[300px] sm:h-[330px] lg:h-[355px] bg-cover bg-center overflow-hidden flex flex-col justify-start pt-7 sm:pt-8"
        style={{ 
          backgroundImage: "url('/images/hero_banner.jpg')",
          backgroundPosition: 'center 40%'
        }}
      >
        {/* Subtle gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-transparent pointer-events-none"></div>

        {/* Hero Heading & Subtitle with Framer Motion */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] leading-tight"
          >
            One Platform for All Your{' '}
            <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Travel
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1.5 sm:mt-2 text-xs sm:text-[14px] font-medium text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] max-w-xl mx-auto tracking-normal"
          >
            Book Bus, Train & Flight Tickets in Real Time — Smart, Flexible, and Rewarding.
          </motion.p>
        </div>
      </div>

      {/* Main Booking Search Panel overlapping hero */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <BookingSearch />
      </motion.div>
    </section>
  );
}
