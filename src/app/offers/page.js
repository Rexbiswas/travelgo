'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Copy, Check, Plane, Train, Bus, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';

export default function OffersPage() {
  const { addToast } = useBooking();
  const [filter, setFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  const deals = [
    {
      id: 1,
      type: 'flight',
      category: 'Flights',
      title: 'Up to 20% OFF on Domestic Flights',
      desc: 'Applicable on top airlines across 100+ cities.',
      code: 'FLY20',
      expiry: 'Valid till 28 Feb 2025',
      badge: 'Best Seller',
      bgImage: '/images/offer_flight_bg.jpg'
    },
    {
      id: 2,
      type: 'train',
      category: 'Trains',
      title: 'Flat 15% OFF on Express Train Tickets',
      desc: 'Instant discount on 1st, 2nd, and 3rd AC seat classes.',
      code: 'TRAIN15',
      expiry: 'Valid till 15 Mar 2025',
      badge: 'Popular',
      bgImage: '/images/offer_train_bg.jpg'
    },
    {
      id: 3,
      type: 'bus',
      category: 'Buses',
      title: 'Up to 25% OFF on Luxury Bus Bookings',
      desc: 'Valid on sleeper, multi-axle, and electric coach operators.',
      code: 'BUS25',
      expiry: 'Valid till 20 Feb 2025',
      badge: 'Flash Deal',
      bgImage: '/images/offer_bus_bg.jpg'
    },
    {
      id: 4,
      type: 'bank',
      category: 'Payment Offers',
      title: 'Extra $15 Cashback with Credit Cards',
      desc: 'Special weekend gateway cashback on all booking modes.',
      code: 'CARD15',
      expiry: 'Weekend Only',
      badge: 'Bank Offer',
      bgGradient: 'from-indigo-600 to-purple-800'
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addToast?.({
      title: `Coupon ${code} Copied!`,
      message: 'Paste at checkout for instant discount.',
      type: 'success'
    });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredDeals = filter === 'all' ? deals : deals.filter((d) => d.type === filter);

  return (
    <div className="min-h-screen bg-[#F8F8FC] py-8 sm:py-12">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-9">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#652BE8] text-xs font-bold mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>TravelGo Exclusive Deals</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#11152F] tracking-tight">
            Popular Travel <span className="text-[#652BE8]">Offers</span>
          </h1>
          <p className="text-sm sm:text-base text-[#60647A] mt-2">
            Save big on flights, trains, buses, and multi-modal combo journeys with verified partner promo codes.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Deals' },
            { id: 'flight', label: 'Flights' },
            { id: 'train', label: 'Trains' },
            { id: 'bus', label: 'Buses' },
            { id: 'bank', label: 'Card Offers' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === item.id
                  ? 'bg-[#652BE8] text-white shadow-md shadow-purple-600/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDeals.map((deal) => (
            <motion.div
              key={deal.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              {/* Banner / Graphic Area */}
              <div 
                className="h-36 relative bg-cover bg-center p-4 flex flex-col justify-between"
                style={{
                  backgroundImage: deal.bgImage ? `url('${deal.bgImage}')` : undefined,
                  backgroundColor: !deal.bgImage ? '#1e1b4b' : undefined,
                }}
              >
                <div className="absolute inset-0 bg-black/45 pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-[#652BE8] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    {deal.badge}
                  </span>
                  <span className="text-[10px] text-white/80 font-medium">{deal.expiry}</span>
                </div>

                <div className="relative z-10">
                  <span className="text-white text-base sm:text-lg font-black leading-tight block drop-shadow-sm">
                    {deal.title}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  {deal.desc}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleCopy(deal.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-[#652BE8] text-xs font-bold hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    <span>Code: {deal.code}</span>
                    {copiedCode === deal.code ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <Link
                    href="/#search"
                    className="text-xs font-bold text-[#652BE8] hover:underline flex items-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
