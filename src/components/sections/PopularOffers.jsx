'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import AppPromotion from './AppPromotion';
import { useBooking } from '@/context/BookingContext';

export default function PopularOffers() {
  const { addToast } = useBooking();
  const [copiedCode, setCopiedCode] = useState(null);

  const offers = [
    {
      id: 'flight',
      bgImage: '/images/offer_flight_bg.jpg',
      headlinePrefix: 'Up to',
      discount: '20% OFF',
      category: 'on Flight Bookings',
      code: 'FLY20',
    },
    {
      id: 'train',
      bgImage: '/images/offer_train_bg.jpg',
      headlinePrefix: 'Flat',
      discount: '15% OFF',
      category: 'on Train Tickets',
      code: 'TRAIN15',
    },
    {
      id: 'bus',
      bgImage: '/images/offer_bus_bg.jpg',
      headlinePrefix: 'Up to',
      discount: '25% OFF',
      category: 'on Bus Bookings',
      code: 'BUS25',
    },
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addToast?.({
      title: `Coupon ${code} Copied!`,
      type: 'success',
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="offers" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-3">
      
      {/* Header with View All Offers */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-lg sm:text-[21px] font-black text-[#15162D] tracking-tight">
          Popular Offers
        </h2>
        <Link 
          href="/offers" 
          className="text-xs font-bold text-[#652BE8] hover:underline flex items-center gap-1 group"
        >
          <span>View All Offers</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid: 3 Offer Cards (left ~65%) + App Promotion (right ~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        
        {/* Left Side: 3 Promotional Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.015 }}
              className="relative h-[132px] sm:h-[138px] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between p-3 bg-cover bg-center border border-black/5"
              style={{ backgroundImage: `url('${offer.bgImage}')` }}
            >
              {/* Dark subtle overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20 group-hover:via-black/40 transition-colors pointer-events-none" />

              {/* Text content */}
              <div className="relative z-10">
                <div className="text-white text-[13.5px] sm:text-[14.5px] font-black leading-tight drop-shadow-sm">
                  <span className="font-semibold text-white/95">{offer.headlinePrefix} </span>
                  <span>{offer.discount}</span>
                </div>
                <div className="text-white/85 text-[10.5px] font-medium mt-0.2 drop-shadow-xs">
                  {offer.category}
                </div>
              </div>

              {/* Bottom Row: Coupon code pill + Circular arrow button */}
              <div className="relative z-10 flex items-center justify-between mt-auto">
                {/* Coupon Code Pill */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCode(offer.code);
                  }}
                  className="bg-white/95 hover:bg-white text-[#11152F] px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1 transition-colors"
                  title="Click to copy coupon code"
                >
                  <span>Code: {offer.code}</span>
                  {copiedCode === offer.code ? (
                    <Check className="w-2.5 h-2.5 text-green-600" />
                  ) : (
                    <Copy className="w-2.5 h-2.5 text-gray-400" />
                  )}
                </motion.button>

                {/* Circular Arrow Button */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-6 h-6 rounded-full bg-white text-[#11152F] flex items-center justify-center shadow-xs group-hover:bg-[#652BE8] group-hover:text-white transition-all duration-150"
                >
                  <ArrowRight className="w-3 h-3 transform -rotate-45 group-hover:rotate-0 transition-transform" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Mobile Application Promotion */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-4 flex"
        >
          <AppPromotion />
        </motion.div>

      </div>
    </section>
  );
}
