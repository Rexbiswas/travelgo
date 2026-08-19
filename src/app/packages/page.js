'use client';

import React, { useState } from 'react';
import { Clock, Star, MapPin, CheckCircle2, ChevronDown, ChevronUp, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { packagesData } from '@/data/travelData';
import { useBooking } from '@/context/BookingContext';

export default function PackagesPage() {
  const { formatPrice, openBookingModal } = useBooking();
  const [expandedPackageId, setExpandedPackageId] = useState(null);

  const toggleItinerary = (id) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Banner */}
      <div className="bg-[#0b1e36] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Holiday Itineraries</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            All-Inclusive Holiday Packages
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            Handcrafted vacations with flights, luxury accommodations, guided tours, and VIP access.
          </p>
        </div>
      </div>

      {/* Packages Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {packagesData.map((pkg) => {
          const isExpanded = expandedPackageId === pkg.id;

          return (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Package Image */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  {pkg.badge && (
                    <div className="absolute top-4 left-4 bg-[#0284c7] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {pkg.badge}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-300" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Package Content */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{pkg.rating}</span>
                        <span className="text-gray-400 font-normal">({pkg.reviewsCount} reviews)</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                        {pkg.destination}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#0b1e36] mt-2">
                      {pkg.title}
                    </h2>

                    {/* Inclusions List */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Package Inclusions:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pkg.inclusions.map((inc) => (
                          <div key={inc} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Booking Footer */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-[#0284c7]">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">/ person</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => toggleItinerary(pkg.id)}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
                      >
                        <span>{isExpanded ? 'Hide Itinerary' : 'View Day-by-Day'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => openBookingModal(pkg, 'package')}
                        className="flex-1 sm:flex-initial bg-[#0284c7] hover:bg-[#0369a1] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Book Package</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Day-by-Day Itinerary Dropdown */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-6 sm:p-8 bg-slate-50/70 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-[#0b1e36] mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0284c7]" />
                    <span>Complete Day-by-Day Journey Plan</span>
                  </h4>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-sky-200">
                    {pkg.itinerary.map((day) => (
                      <div key={day.day} className="relative pl-8">
                        <span className="absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full bg-[#0284c7] border-2 border-white shadow-sm" />
                        <h5 className="text-xs font-bold text-gray-900">
                          Day {day.day}: {day.title}
                        </h5>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                          {day.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}
