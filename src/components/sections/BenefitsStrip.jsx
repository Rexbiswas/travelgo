'use client';

import React from 'react';
import { Zap, ShieldCheck, RefreshCw, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BenefitsStrip() {
  const benefits = [
    {
      icon: <Zap className="w-4 h-4 text-[#652BE8]" />,
      title: 'Real-Time Availability',
      desc: 'Live seats, prices & delays',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#2563EB]" />,
      title: 'Verified Operators',
      desc: 'Trusted & safe travel',
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-[#6366F1]" />,
      title: 'Flexible Booking',
      desc: 'Easy change or cancel',
    },
    {
      icon: (
        <div className="w-4 h-4 rounded-full border border-[#652BE8] flex items-center justify-center font-bold text-[9.5px] text-[#652BE8]">
          ₹
        </div>
      ),
      title: 'Travel Rewards',
      desc: 'Earn & redeem points',
    },
    {
      icon: <Leaf className="w-4 h-4 text-[#16A36A]" />,
      title: 'Greener Travel',
      desc: 'Compare carbon footprint',
    },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
        {benefits.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#F3EEFF]/50 transition-colors"
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#15162D] leading-snug">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#666A7D] font-medium leading-tight mt-0.5">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
