'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Network, BarChart3, MapPin, RotateCcw, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyTravelGo() {
  const features = [
    {
      id: 1,
      icon: <Sparkles className="w-4 h-4 text-[#652BE8]" />,
      badge: 'New',
      title: 'AI Travel Planner',
      desc: 'Get the best routes, prices & travel plans with AI.',
      href: '/ai-planner',
      bgColor: 'bg-[#F6F2FF]',
      borderColor: 'border-purple-200/70',
      badgeBg: 'bg-[#652BE8]',
    },
    {
      id: 2,
      icon: <Network className="w-4 h-4 text-[#7C3AED]" />,
      title: 'Multi-Modal Trips',
      desc: 'Plan combined journeys (e.g., Bus + Train + Flight).',
      href: '/#search',
      bgColor: 'bg-[#F3EFFE]',
      borderColor: 'border-purple-200/60',
    },
    {
      id: 3,
      icon: <BarChart3 className="w-4 h-4 text-[#16A36A]" />,
      title: 'Price Insights',
      desc: 'See price trends & get alerts to book at the best time.',
      href: '/offers',
      bgColor: 'bg-[#F0FDF4]',
      borderColor: 'border-emerald-200/70',
    },
    {
      id: 4,
      icon: <MapPin className="w-4 h-4 text-[#EA580C]" />,
      title: 'Real-Time Tracking',
      desc: 'Track your bus, train or flight live on the map.',
      href: '/track-journey',
      bgColor: 'bg-[#FFF7ED]',
      borderColor: 'border-orange-200/70',
    },
    {
      id: 5,
      icon: <RotateCcw className="w-4 h-4 text-[#0284C7]" />,
      title: 'Smart Refunds',
      desc: 'Instant, hassle-free cancellations & refunds.',
      href: '/bookings',
      bgColor: 'bg-[#F0F9FF]',
      borderColor: 'border-sky-200/70',
    },
    {
      id: 6,
      icon: <Users className="w-4 h-4 text-[#0D9488]" />,
      title: 'Travel Community',
      desc: 'Read real traveler reviews, tips & photos.',
      href: '/about',
      bgColor: 'bg-[#F0FDFA]',
      borderColor: 'border-teal-200/70',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section id="why-different" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
      {/* Section Heading */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-[21px] font-black text-[#15162D] tracking-tight">
          Why <span className="text-[#652BE8]">TravelGo</span> is Different?
        </h2>
        <Link 
          href="/ai-planner" 
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#652BE8] hover:underline"
        >
          <span>Explore AI Planner</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* 6 Feature Cards with Framer Motion Stagger */}
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
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="h-full"
          >
            <Link
              href={item.href}
              className={`${item.bgColor} ${item.borderColor} h-full rounded-xl p-3 flex flex-col justify-between cursor-pointer border shadow-[0_1px_3px_rgba(21,22,45,0.03)] hover:shadow-md transition-all block group`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold text-white ${item.badgeBg || 'bg-[#652BE8]'} px-1.5 py-0.2 rounded-full shadow-xs`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-[13px] font-bold text-[#15162D] group-hover:text-[#652BE8] transition-colors leading-tight mb-1">
                  {item.title}
                </h3>
              </div>

              <p className="text-[10.5px] text-[#666A7D] font-medium leading-snug mt-1">
                {item.desc}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
