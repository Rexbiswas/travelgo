'use client';

import React from 'react';
import { Sparkles, Network, BarChart3, MapPin, RotateCcw, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyTravelGo() {
  const features = [
    {
      id: 1,
      icon: <Sparkles className="w-4 h-4 text-[#8B5CF6]" />,
      badge: 'New',
      title: 'AI Travel Planner',
      desc: 'Get the best routes, prices & travel plans with AI.',
      bgColor: 'bg-[#F4E8FC]',
    },
    {
      id: 2,
      icon: <Network className="w-4 h-4 text-[#7C3AED]" />,
      title: 'Multi-Modal Trips',
      desc: 'Plan combined journeys (e.g., Bus + Train + Flight).',
      bgColor: 'bg-[#EDE7FA]',
    },
    {
      id: 3,
      icon: <BarChart3 className="w-4 h-4 text-[#16A34A]" />,
      title: 'Price Insights',
      desc: 'See price trends & get alerts to book at the best time.',
      bgColor: 'bg-[#EAF6EC]',
    },
    {
      id: 4,
      icon: <MapPin className="w-4 h-4 text-[#EA580C]" />,
      title: 'Real-Time Tracking',
      desc: 'Track your bus, train or flight live on the map.',
      bgColor: 'bg-[#FAF0E6]',
    },
    {
      id: 5,
      icon: <RotateCcw className="w-4 h-4 text-[#0284C7]" />,
      title: 'Smart Refunds',
      desc: 'Instant, hassle-free cancellations & refunds.',
      bgColor: 'bg-[#EDF3F8]',
    },
    {
      id: 6,
      icon: <Users className="w-4 h-4 text-[#15803D]" />,
      title: 'Travel Community',
      desc: 'Read real traveler reviews, tips & photos.',
      bgColor: 'bg-[#EAF7EE]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section id="why-different" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-3.5">
      {/* Section Heading */}
      <h2 className="text-lg sm:text-[21px] font-black text-[#11152F] tracking-tight mb-3">
        Why <span className="text-[#652BE8]">TravelGo</span> is Different?
      </h2>

      {/* 6 Pastel Feature Cards with Framer Motion Stagger */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5"
      >
        {features.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className={`${item.bgColor} rounded-xl p-3 flex flex-col justify-between cursor-pointer border border-white/60 min-h-[142px] shadow-xs hover:shadow-md`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-white/80 flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold text-white bg-[#8B5CF6] px-1.5 py-0.2 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-[13px] font-bold text-[#11152F] leading-tight mb-1">
                {item.title}
              </h3>
            </div>

            <p className="text-[10.5px] text-[#60647A] font-medium leading-snug">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
