'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, X } from 'lucide-react';
import { liveBookingTickerData } from '@/data/travelData';

export default function LiveActivityTicker() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed || pathname === '/') return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % (liveBookingTickerData?.length || 1));
        setVisible(true);
      }, 600);
    }, 6500);

    return () => clearInterval(interval);
  }, [closed, pathname]);

  // Hide on homepage to match reference screenshot pixel-for-pixel
  if (closed || pathname === '/') return null;

  const currentItem = liveBookingTickerData?.[currentIndex] || {
    name: 'Sarah M.',
    city: 'New York',
    item: 'Flight to Paris',
    time: '2 mins ago'
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm">
      <div
        className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3 border border-purple-100 flex items-center gap-3 transition-all duration-500 transform ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
        }`}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#652BE8] to-purple-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[11px] font-bold text-gray-800 truncate">
              {currentItem.name} <span className="text-gray-400 font-normal">from {currentItem.city}</span>
            </p>
          </div>
          <p className="text-[11px] text-[#652BE8] font-semibold truncate mt-0.5">
            Booked {currentItem.item}
          </p>
        </div>

        <button
          onClick={() => setClosed(true)}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
