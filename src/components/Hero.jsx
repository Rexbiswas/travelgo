'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import SearchBar from './SearchBar';

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const searchBarContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Slow background zoom in
      gsap.fromTo(
        bgRef.current,
        { scale: 1.15, filter: 'brightness(0.9)' },
        { scale: 1.05, filter: 'brightness(1)', duration: 2.2, ease: 'power2.out' }
      );

      // Staggered content reveal
      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.9 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        .fromTo(
          searchBarContainerRef.current,
          { y: 50, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      {/* Hero Banner with scenic background matching reference screenshot */}
      <div className="relative min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] w-full flex items-center justify-start overflow-hidden">
        {/* Background Image with GSAP smooth zoom */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=2000&q=85')`,
          }}
        >
          {/* Gentle cinematic overlay to keep text crisp while maintaining vibrant turquoise colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent sm:from-black/50" />
        </div>

        {/* Hero Content matching exact reference typography */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full pt-12 pb-24 sm:pb-28">
          <div className="max-w-xl space-y-4">
            
            {/* Live travel badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-semibold shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Travel Deals & Live Weather</span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md"
            >
              EXPLORE<br />THE WORLD
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-white/95 font-medium tracking-wide drop-shadow"
            >
              Find your perfect destination
            </p>

            <div ref={ctaRef} className="pt-2">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:translate-x-1 active:scale-95"
              >
                <span>Explore Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Search Bar with GSAP entrance */}
      <div ref={searchBarContainerRef} className="-mt-12 sm:-mt-14 relative z-30 pb-4">
        <SearchBar />
      </div>
    </section>
  );
}
