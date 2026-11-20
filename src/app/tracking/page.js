'use client';

import React, { useState } from 'react';
import { 
  Radar, 
  Search, 
  MapPin, 
  Clock, 
  Zap, 
  Activity, 
  Bus, 
  Train, 
  Plane, 
  Navigation, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';

export default function TrackingPage() {
  const { addToast } = useBooking();
  const [trackingNumber, setTrackingNumber] = useState('TG-8842');
  const [mode, setMode] = useState('bus');
  const [activeTracking, setActiveTracking] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setActiveTracking(true);
    addToast?.({
      title: `Telemetry Connected: ${trackingNumber}`,
      message: 'Live GPS coordinates stream active.',
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] py-8 sm:py-12">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-9">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Satellite & GPS Radar</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#11152F] tracking-tight">
            Real-Time <span className="text-[#652BE8]">Trip Tracking</span>
          </h1>
          <p className="text-sm sm:text-base text-[#60647A] mt-2">
            Track your bus, train, or flight live with real-time speed, platform changes, and estimated arrival updates.
          </p>
        </div>

        {/* Tracking Input Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-purple-100 max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-2xl border border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter Bus / Train / Flight No. or PNR (e.g. TG-8842)"
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-[#11152F] focus:outline-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#652BE8] hover:bg-[#5320c7] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-600/30 cursor-pointer"
            >
              <Radar className="w-4 h-4" />
              <span>Track Live</span>
            </motion.button>
          </form>
        </div>

        {/* Live Radar Dashboard Card */}
        {activeTracking && (
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto"
          >
            {/* Top Telemetry Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#652BE8] shadow-xs">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-[#11152F]">Express Cruiser Gold #TG-8842</h3>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">On Schedule</span>
                  </div>
                  <p className="text-xs text-gray-500">Route: New Delhi (Kashmere Gate) → Mumbai Central</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[11px] text-gray-400 block font-semibold">Speed</span>
                  <span className="text-base font-black text-[#11152F]">78 km/h</span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block font-semibold">Next Halt</span>
                  <span className="text-base font-black text-[#652BE8]">Jaipur (18m)</span>
                </div>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="py-8">
              <div className="flex justify-between text-xs font-bold text-[#11152F] mb-2">
                <span>Departed: 06:30 AM (Delhi)</span>
                <span className="text-[#652BE8]">62% Journey Completed</span>
                <span>ETA: 01:45 PM (Mumbai)</span>
              </div>

              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '62%' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#652BE8] to-purple-400 rounded-full"
                />
              </div>
            </div>

            {/* Stop Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs">
              <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Delhi Terminal</span>
                </div>
                <p className="text-[11px] text-gray-600">Departed Platform 4 on time.</p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Jaipur Bypass (In Transit)</span>
                </div>
                <p className="text-[11px] text-gray-600">Approaching in 18 minutes.</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-500 font-bold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mumbai Central</span>
                </div>
                <p className="text-[11px] text-gray-600">Expected at 01:45 PM.</p>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
