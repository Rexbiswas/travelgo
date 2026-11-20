'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Bus, 
  Train, 
  Plane, 
  Clock, 
  ShieldCheck, 
  Leaf, 
  CheckCircle2, 
  Sliders, 
  Calendar,
  Zap,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';

export default function AIPlannerPage() {
  const { addToast } = useBooking();

  const [fromCity, setFromCity] = useState('New Delhi');
  const [toCity, setToCity] = useState('Goa');
  const [preference, setPreference] = useState('fastest'); // 'fastest' | 'cheapest' | 'greener'
  const [days, setDays] = useState('3 Days');
  const [generating, setGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(true);

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setPlanGenerated(true);
      addToast?.({
        title: '✨ AI Route Generated!',
        message: `Custom multi-modal plan from ${fromCity} to ${toCity} is ready.`,
        type: 'success'
      });
    }, 600);
  };

  const itineraryLegs = [
    {
      step: 1,
      mode: 'Express Airport Metro / Shuttle',
      icon: <Train className="w-4 h-4 text-[#652BE8]" />,
      route: `${fromCity} Central → Terminal 3`,
      time: '07:15 AM - 07:45 AM',
      duration: '30 mins',
      status: 'On Time',
      badge: 'Leg 1',
      details: 'Reserved seating with contactless QR entry.'
    },
    {
      step: 2,
      mode: 'Direct Flight Link (AirGo 6E-204)',
      icon: <Plane className="w-4 h-4 text-blue-600" />,
      route: 'DEL → GOI',
      time: '09:20 AM - 11:50 AM',
      duration: '2h 30m',
      status: 'Gate 14B',
      badge: 'Leg 2 (Primary)',
      details: 'Complimentary snack & luggage auto-transfer.'
    },
    {
      step: 3,
      mode: 'Luxury Coastal Coach Express',
      icon: <Bus className="w-4 h-4 text-emerald-600" />,
      route: `Airport Interchange → ${toCity} Resort District`,
      time: '12:30 PM - 01:20 PM',
      duration: '50 mins',
      status: 'Confirmed Transfer',
      badge: 'Leg 3 (Last Mile)',
      details: 'Drop-off right at your hotel doorstep.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FC] py-8 sm:py-12">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-[#652BE8] text-xs font-bold mb-3 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#652BE8]" />
            <span>Next-Gen Multi-Modal AI Engine</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#11152F] tracking-tight leading-tight"
          >
            Smart <span className="text-[#652BE8]">AI Travel</span> Planner
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-[#60647A] mt-2.5 max-w-xl mx-auto"
          >
            Combine buses, trains, and flights in a single unified route. The AI optimizes layovers, lowest fares, and carbon footprint automatically.
          </motion.p>
        </div>

        {/* Input Parameters Box */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_10px_35px_rgba(20,10,60,0.08)] border border-purple-100 mb-10"
        >
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* From */}
            <div className="p-3 bg-gray-50/80 rounded-2xl border border-gray-200">
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Starting Point</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#652BE8]" />
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#11152F] focus:outline-none"
                  placeholder="e.g. New Delhi"
                />
              </div>
            </div>

            {/* To */}
            <div className="p-3 bg-gray-50/80 rounded-2xl border border-gray-200">
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Destination</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#11152F] focus:outline-none"
                  placeholder="e.g. Goa"
                />
              </div>
            </div>

            {/* Travel Preference */}
            <div className="p-3 bg-gray-50/80 rounded-2xl border border-gray-200">
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">AI Optimization</label>
              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#11152F] focus:outline-none cursor-pointer"
              >
                <option value="fastest">⚡ Fastest Transit (Flight + Express)</option>
                <option value="cheapest">💰 Best Value (Train + Bus)</option>
                <option value="greener">🌱 Lowest Carbon (Green Route)</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={generating}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#652BE8] hover:bg-[#5320c7] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-colors cursor-pointer disabled:opacity-75"
              >
                {generating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Plan Route with AI</span>
                  </>
                )}
              </motion.button>
            </div>

          </form>
        </motion.div>

        {/* AI Generated Itinerary Preview */}
        {planGenerated && (
          <div className="space-y-6">
            
            {/* Route Summary Bar */}
            <div className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent p-5 rounded-3xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#652BE8] uppercase tracking-wider block">Recommended Multi-Modal Plan</span>
                <h3 className="text-xl sm:text-2xl font-black text-[#11152F] mt-0.5">
                  {fromCity} to {toCity} Express Link
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Total Transit Time: <span className="font-bold text-[#11152F]">3h 50m</span> • Guaranteed Connection Guarantee • Unified Single Ticket
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Total Package Fare</span>
                  <span className="text-2xl font-black text-[#652BE8]">$84</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => addToast?.({ title: 'Multi-Modal Ticket Reserved!', message: 'Proceeding to seat preferences.', type: 'success' })}
                  className="px-6 py-3 rounded-2xl bg-[#652BE8] hover:bg-[#5320c7] text-white font-bold text-xs shadow-md shadow-purple-600/30 cursor-pointer"
                >
                  Book Complete Trip
                </motion.button>
              </div>
            </div>

            {/* Timeline Legs */}
            <div className="space-y-4">
              {itineraryLegs.map((leg, index) => (
                <motion.div
                  key={leg.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.12 }}
                  className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0 shadow-xs border border-purple-100">
                      {leg.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#652BE8] bg-purple-100/70 px-2.5 py-0.5 rounded-full">
                          {leg.badge}
                        </span>
                        <span className="text-sm font-black text-[#11152F]">{leg.mode}</span>
                      </div>

                      <p className="text-sm font-bold text-gray-800 mt-1">{leg.route}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{leg.details}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-left md:text-right">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{leg.time}</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 mt-0.5 block">{leg.status}</span>
                    </div>

                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                      {leg.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
