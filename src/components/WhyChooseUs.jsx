'use client';

import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Tag, Headphones, ThumbsUp } from 'lucide-react';
import gsap from 'gsap';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const features = [
    {
      id: 'safe-secure',
      title: 'Safe & Secure',
      subtitle: 'Your safety is our priority',
      icon: ShieldCheck,
    },
    {
      id: 'price-guarantee',
      title: 'Best Price Guarantee',
      subtitle: 'We ensure best price for you',
      icon: Tag,
    },
    {
      id: 'support',
      title: '24/7 Support',
      subtitle: 'We are here to help you anytime',
      icon: Headphones,
    },
    {
      id: 'easy-booking',
      title: 'Easy Booking',
      subtitle: 'Book your trip in easy steps',
      icon: ThumbsUp,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              itemsRef.current.filter(Boolean),
              { y: 45, opacity: 0, scale: 0.9 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                stagger: 0.12,
                ease: 'back.out(1.6)',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 sm:py-18 bg-[#f8fafc]" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with blue underline */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36] uppercase tracking-wider relative inline-block">
            WHY CHOOSE US?
            <span className="block w-16 h-1 bg-[#0284c7] mx-auto mt-2 rounded-full" />
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            Travel with complete peace of mind, transparent pricing, and round-the-clock personal assistance.
          </p>
        </div>

        {/* 4 Feature Columns matching exact reference design with GSAP entry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[index] = el)}
                className="flex items-center sm:items-start gap-4 p-5 rounded-2xl bg-white sm:bg-transparent hover:bg-white transition-all duration-400 sm:hover:shadow-xl sm:hover:p-5 group cursor-default will-change-transform"
              >
                {/* Blue Circular Icon Container matching screenshot */}
                <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center flex-shrink-0 text-[#0284c7] group-hover:scale-115 group-hover:rotate-6 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-400 shadow-sm">
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-sm font-extrabold text-[#0b1e36] tracking-tight group-hover:text-[#0284c7] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
