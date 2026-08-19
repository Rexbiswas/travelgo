'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, MapPin, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import { hotelsData } from '@/data/travelData';
import { useBooking } from '@/context/BookingContext';

export default function TopHotels({ limit = 4, showAllLink = true }) {
  const { formatPrice, openBookingModal } = useBooking();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const displayHotels = limit ? hotelsData.slice(0, limit) : hotelsData;

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cardsRef.current.filter(Boolean),
              { y: 60, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                stagger: 0.12,
                ease: 'power3.out',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [displayHotels]);

  return (
    <section ref={sectionRef} className="py-14 sm:py-18 bg-[#f8fafc]" id="hotels">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with blue underline matching reference design */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36] uppercase tracking-wider relative inline-block">
            TOP HOTELS
            <span className="block w-16 h-1 bg-[#0284c7] mx-auto mt-2 rounded-full" />
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            Handpicked 5-star accommodations with instant confirmation and best price guarantee.
          </p>
        </div>

        {/* 4 Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayHotels.map((hotel, index) => (
            <div
              key={hotel.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col group will-change-transform transform hover:-translate-y-2"
            >
              {/* Hotel Image with Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Real-time Room Availability Counter */}
                <div className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Only {hotel.availableRooms} rooms left</span>
                </div>

                {hotel.badge && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {hotel.badge}
                  </div>
                )}
              </div>

              {/* Hotel Details matching reference design */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Star Rating: 5 gold stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                    {[...Array(hotel.stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-[11px] font-bold text-gray-700 ml-1">
                      {hotel.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Hotel Name */}
                  <h3 className="text-base font-bold text-[#0b1e36] tracking-tight group-hover:text-[#0284c7] transition-colors line-clamp-1">
                    {hotel.name}
                  </h3>

                  {/* Location Pin */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{hotel.location}</span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold text-[#0284c7]">
                      {formatPrice(hotel.pricePerNight)}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">/ night</span>
                  </div>
                </div>

                {/* Book Now Button matching exact reference design */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openBookingModal(hotel, 'hotel')}
                    className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All link */}
        {showAllLink && (
          <div className="text-center mt-10">
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] hover:text-[#0369a1] uppercase tracking-wider hover:underline transition-colors"
            >
              <span>Explore All Luxury Hotels & Resorts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
