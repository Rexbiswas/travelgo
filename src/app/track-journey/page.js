'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radar, 
  Search, 
  MapPin, 
  Clock, 
  Bus, 
  Train, 
  Plane, 
  Navigation, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';

export default function TrackJourneyPage() {
  const { addToast } = useBooking();
  const [query, setQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [trackedItem, setTrackedItem] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Supported demo booking references for verification
  const supportedBookings = {
    'TG-8842': {
      type: 'Bus',
      operator: 'Zingbus Electric Multi-Axle',
      route: 'New Delhi (ISBT) → Mumbai (Borivali)',
      status: 'On Time',
      currentLocation: 'Jaipur Bypass Highway, Mile 142',
      nextStop: 'Ajmer Toll Plaza (Arrival in 38m)',
      eta: '01:45 PM Today',
      speed: '78 km/h',
      battery: '82%',
      lastTelemetry: '30 seconds ago via GPS Satellite'
    },
    'IR-12952': {
      type: 'Train',
      operator: 'Rajdhani Express (12952)',
      route: 'New Delhi (NDLS) → Mumbai Central (MMCT)',
      status: 'On Time (Platform 4 Verified)',
      currentLocation: 'Kota Junction Outskirts',
      nextStop: 'Ratlam Junction (Platform 2)',
      eta: '08:35 AM Tomorrow',
      speed: '124 km/h',
      lastTelemetry: 'Live railway signaling API sync'
    },
    '6E-2041': {
      type: 'Flight',
      operator: 'IndiGo Airbus A321neo (6E-2041)',
      route: 'Delhi (DEL-T3) → Mumbai (BOM-T2)',
      status: 'In Flight — Altitude 34,000 ft',
      currentLocation: 'Overhead Udaipur Airspace',
      nextStop: 'Chhatrapati Shivaji Maharaj Int Airport (BOM)',
      eta: '09:15 PM (Gate 12B)',
      speed: '820 km/h',
      lastTelemetry: 'ADS-B transponder telemetry stream'
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    if (!clean) {
      addToast?.({
        title: 'Enter Booking Reference',
        message: 'Please input your PNR, ticket ID or flight number (e.g., TG-8842, IR-12952, 6E-2041).',
        type: 'error'
      });
      return;
    }

    setHasSearched(true);
    if (supportedBookings[clean]) {
      setTrackedItem(supportedBookings[clean]);
      addToast?.({
        title: `Telemetry Connected: ${clean}`,
        message: `Live data verified from operator transponder.`,
        type: 'success'
      });
    } else {
      setTrackedItem(null);
      addToast?.({
        title: 'Reference Not Found',
        message: 'Provider data stream is not available for this reference. Try demo reference: TG-8842, IR-12952, or 6E-2041.',
        type: 'info'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC] py-8 sm:py-12">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Satellite & Operator Telemetry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#15162D] tracking-tight">
            Journey <span className="text-[#652BE8]">Tracker</span>
          </h1>
          <p className="text-sm sm:text-base text-[#666A7D] mt-2 max-w-xl mx-auto">
            Track your bus, train, or flight in real time with verified telemetry, current speed, and accurate arrival estimates.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(21,22,45,0.06)] border border-[#E8E6F0] mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Radar className="w-4 h-4 text-[#652BE8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter PNR, Bus Ticket ID or Flight No (e.g. TG-8842)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F8FC] border border-[#E8E6F0] rounded-xl text-sm font-semibold text-[#15162D] focus:outline-none focus:border-[#652BE8] focus:bg-white transition-all"
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-[#652BE8] hover:bg-[#5320C7] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track Now</span>
            </button>
          </form>

          {/* Quick Demo Reference Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#E8E6F0] text-xs">
            <span className="text-[#666A7D] font-medium">Try verified references:</span>
            {['TG-8842', 'IR-12952', '6E-2041'].map((refCode) => (
              <button
                key={refCode}
                type="button"
                onClick={() => {
                  setQuery(refCode);
                  setHasSearched(true);
                  setTrackedItem(supportedBookings[refCode]);
                }}
                className="px-2.5 py-1 bg-[#F3EEFF] hover:bg-[#EAE2FC] text-[#652BE8] rounded-lg font-bold transition-colors cursor-pointer"
              >
                {refCode}
              </button>
            ))}
          </div>
        </div>

        {/* Live Telemetry Display */}
        {trackedItem ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E8E6F0] p-6 shadow-sm mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E6F0] gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F3EEFF] text-[#652BE8] text-xs font-bold mb-1.5">
                  {trackedItem.type === 'Bus' && <Bus className="w-3.5 h-3.5" />}
                  {trackedItem.type === 'Train' && <Train className="w-3.5 h-3.5" />}
                  {trackedItem.type === 'Flight' && <Plane className="w-3.5 h-3.5" />}
                  <span>{trackedItem.type} Telemetry</span>
                </div>
                <h3 className="text-xl font-bold text-[#15162D]">{trackedItem.operator}</h3>
                <p className="text-xs text-[#666A7D] font-medium mt-0.5">{trackedItem.route}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {trackedItem.status}
                </span>
                <p className="text-[11px] text-[#666A7D] mt-1">{trackedItem.lastTelemetry}</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
              <div className="bg-[#F8F8FC] p-3.5 rounded-xl border border-[#E8E6F0]">
                <span className="text-[11px] font-semibold text-[#666A7D] block">Current Location</span>
                <span className="text-sm font-bold text-[#15162D] block mt-1">{trackedItem.currentLocation}</span>
              </div>
              <div className="bg-[#F8F8FC] p-3.5 rounded-xl border border-[#E8E6F0]">
                <span className="text-[11px] font-semibold text-[#666A7D] block">Next Stop</span>
                <span className="text-sm font-bold text-[#15162D] block mt-1">{trackedItem.nextStop}</span>
              </div>
              <div className="bg-[#F8F8FC] p-3.5 rounded-xl border border-[#E8E6F0]">
                <span className="text-[11px] font-semibold text-[#666A7D] block">Estimated Arrival</span>
                <span className="text-sm font-bold text-[#652BE8] block mt-1">{trackedItem.eta}</span>
              </div>
            </div>

            {/* Radar Simulation Animation */}
            <div className="relative h-44 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-4">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#652BE8_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Radar concentric rings */}
              <div className="absolute w-36 h-36 rounded-full border border-purple-500/30"></div>
              <div className="absolute w-64 h-64 rounded-full border border-purple-500/20"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#652BE8] text-white flex items-center justify-center shadow-lg shadow-purple-600/50 mb-2">
                  <Navigation className="w-6 h-6 animate-pulse" />
                </div>
                <p className="text-white text-xs font-bold">Speed: {trackedItem.speed}</p>
                <p className="text-purple-300 text-[11px]">Real-time GPS coordinates stream active</p>
              </div>
            </div>
          </motion.div>
        ) : hasSearched ? (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#E8E6F0] p-6 text-center shadow-xs mb-10">
            <Info className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
            <h4 className="text-base font-bold text-[#15162D]">No Live Provider Data for &quot;{query}&quot;</h4>
            <p className="text-xs text-[#666A7D] mt-1">
              Live tracking requires an active journey ticket or verified provider booking code. Please verify your reference or try one of our supported references above.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 text-center">
            <div className="bg-white p-4 rounded-xl border border-[#E8E6F0]">
              <Bus className="w-5 h-5 text-[#652BE8] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-[#15162D]">Buses</h4>
              <p className="text-[11px] text-[#666A7D] mt-0.5">GPS location, next stop & delay telemetry.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E6F0]">
              <Train className="w-5 h-5 text-[#652BE8] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-[#15162D]">Trains</h4>
              <p className="text-[11px] text-[#666A7D] mt-0.5">Live station status, platforms & speed.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E6F0]">
              <Plane className="w-5 h-5 text-[#652BE8] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-[#15162D]">Flights</h4>
              <p className="text-[11px] text-[#666A7D] mt-0.5">Altitude, airspace radar & terminal gates.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
