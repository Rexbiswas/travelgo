'use client';

import React from 'react';
import { Plane, Award, Users, Globe2, ShieldCheck, Heart, Star, Sparkles } from 'lucide-react';
import { reviewsData } from '@/data/travelData';

export default function AboutPage() {
  const stats = [
    { label: 'Happy Travelers', value: '120,000+', icon: Users },
    { label: 'Global Destinations', value: '45+ Countries', icon: Globe2 },
    { label: '5-Star Partner Hotels', value: '1,500+', icon: Award },
    { label: 'Satisfaction Rating', value: '99.8%', icon: Heart },
  ];

  const values = [
    {
      title: 'Real-Time Transparency',
      desc: 'No hidden fees, no surge markups. What you see is what you pay, with instant booking confirmations.',
      icon: Sparkles,
    },
    {
      title: 'Uncompromising Safety',
      desc: 'We strictly audit every partner hotel, flight carrier, and guide to guarantee the highest safety standards.',
      icon: ShieldCheck,
    },
    {
      title: 'Curated Excellence',
      desc: 'Every itinerary is hand-crafted by experienced travelers and local specialists who know every hidden gem.',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Banner */}
      <div className="bg-[#0b1e36] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Plane className="w-3.5 h-3.5" />
            <span>Our Journey & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About TravelGo
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            Reimagining how the world travels with modern technology, personalized journeys, and genuine care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
              Our Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36]">
              Making global travel seamless, accessible, and unforgettable.
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Founded with the belief that travel transforms lives, TravelGo was built to eliminate the stress of planning vacations. We combine real-time availability telemetry, exclusive negotiated rates with five-star resorts, and dedicated 24/7 concierge support.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Whether you are chasing sunsets on the caldera cliffs of Santorini, cruising the turquoise bays of Phi Phi, or cozying up in a snow-covered Swiss chalet, we make sure every moment is effortless.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
              alt="Travelers enjoying vacation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center space-y-2 group hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36]">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36]">
              What Sets TravelGo Apart
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Built on integrity, technology, and genuine hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0b1e36]">{v.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verified Customer Testimonials */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
              Traveler Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36] mt-1">
              Loved by travelers worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsData.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-slate-50 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{rev.name}</h4>
                    <p className="text-[10px] text-gray-500">{rev.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
