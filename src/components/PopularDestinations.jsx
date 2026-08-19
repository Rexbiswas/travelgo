'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sun, CloudSun, MapPin, ArrowRight, Heart } from 'lucide-react';
import gsap from 'gsap';
import { destinationsData } from '@/data/travelData';
import { useBooking } from '@/context/BookingContext';

export default function PopularDestinations({ limit = 5, showAllLink = true }) {
  const { formatPrice, favorites, toggleFavorite } = useBooking();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Filter or take top 5 matching the design
  const displayDestinations = (limit ? destinationsData.slice(0, limit) : destinationsData).filter(
    (item) => selectedRegion === 'all' || item.region.toLowerCase() === selectedRegion.toLowerCase()
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              cardsRef.current.filter(Boolean),
              { y: 50, opacity: 0, scale: 0.94 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
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
  }, [displayDestinations]);

  return (
    <section ref={sectionRef} className="py-14 sm:py-18 bg-white" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with blue underline matching reference design */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36] uppercase tracking-wider relative inline-block">
            POPULAR DESTINATIONS
            <span className="block w-16 h-1 bg-[#0284c7] mx-auto mt-2 rounded-full" />
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            Explore world-renowned travel hotspots with real-time weather and verified visitor ratings.
          </p>
        </div>

        {/* 5 Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {displayDestinations.map((dest, index) => {
            const isFav = favorites.includes(dest.id);
            return (
              <div
                key={dest.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-gray-100 aspect-[3/4] flex flex-col justify-end will-change-transform"
              >
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay matching image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Top Badges: Weather & Favorite */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  {/* Live Weather Badge */}
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[11px] font-medium border border-white/20">
                    {dest.weather.temp > 25 ? (
                      <Sun className="w-3 h-3 text-amber-400" />
                    ) : (
                      <CloudSun className="w-3 h-3 text-sky-300" />
                    )}
                    <span>{dest.weather.temp}°C</span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(dest.id);
                    }}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                      isFav
                        ? 'bg-rose-500 text-white scale-110'
                        : 'bg-black/30 text-white/90 hover:bg-white hover:text-rose-500'
                    }`}
                    title="Save to favorites"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Content matching exact reference: City Name & Country */}
                <div className="relative z-10 p-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-sky-300 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-white/80 font-medium">
                        {dest.country}
                      </p>
                    </div>
                  </div>

                  {/* Hover expansion detail */}
                  <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-white/90 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span>From {formatPrice(dest.priceFrom)}</span>
                    <Link
                      href={`/destinations?focus=${dest.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-sky-300 hover:text-sky-200"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All link */}
        {showAllLink && (
          <div className="text-center mt-8">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] hover:text-[#0369a1] uppercase tracking-wider hover:underline transition-colors"
            >
              <span>View All 20+ Global Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
