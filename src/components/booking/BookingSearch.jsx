'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bus, 
  Train, 
  Plane, 
  Network, 
  MapPin, 
  ArrowLeftRight, 
  Calendar as CalendarIcon, 
  User, 
  Search, 
  X,
  Clock,
  ShieldCheck,
  Zap,
  Coffee,
  Luggage,
  Sparkles,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';

export default function BookingSearch() {
  const { addToast } = useBooking();

  // Active transport mode: 'bus' | 'train' | 'flight'
  const [activeTab, setActiveTab] = useState('bus');
  const [swapped, setSwapped] = useState(false);

  // Per-mode state and presets
  const modeData = {
    bus: {
      fromDefault: 'Delhi (Kashmere Gate ISBT)',
      toDefault: 'Mumbai (Borivali West)',
      dateDefault: 'Fri, 14 Feb 2025',
      passengerDefault: '1 Seat (AC Sleeper)',
      passengerOptions: [
        '1 Seat (AC Sleeper)',
        '1 Seat (Single Lady Sleeper)',
        '2 Seats (Upper Deck)',
        '2 Seats (Semi-Sleeper)',
        'Family (4 Pax - AC Volvo)'
      ],
      stations: [
        { name: 'Delhi (Kashmere Gate ISBT)', subtitle: 'Major Hub Terminal', code: 'ISBT' },
        { name: 'Delhi (Anand Vihar Hub)', subtitle: 'East Terminal', code: 'ANV' },
        { name: 'Mumbai (Borivali West)', subtitle: 'Western Highway', code: 'BOR' },
        { name: 'Mumbai (Dadar East)', subtitle: 'Central Hub', code: 'DDR' },
        { name: 'Bengaluru (Majestic Terminal)', subtitle: 'City Hub', code: 'MAJ' },
        { name: 'Jaipur (Sindhi Camp)', subtitle: 'Interstate Stand', code: 'JPR' },
        { name: 'Goa (Panaji Bus Stand)', subtitle: 'Kadamba Terminal', code: 'GOA' },
      ],
      results: [
        {
          id: 'B1',
          name: 'Zingbus Electric Multi-Axle',
          tag: '⚡ 100% Electric & Silent',
          tagColor: 'bg-emerald-100 text-emerald-700',
          depart: '06:30 AM',
          arrive: '01:45 PM',
          duration: '7h 15m',
          rating: '4.9',
          reviews: '2.4k',
          seatsLeft: '9 Sleepers Left',
          price: '$34',
          amenities: ['Live GPS', 'Water Bottle', 'USB Port', 'Blanket'],
          badge: 'Top Rated Bus'
        },
        {
          id: 'B2',
          name: 'IntrCity SmartBus Lounge',
          tag: '🛡️ Safe & Sanitized',
          tagColor: 'bg-purple-100 text-purple-700',
          depart: '09:00 PM',
          arrive: '06:00 AM',
          duration: '9h 00m',
          rating: '4.8',
          reviews: '1.8k',
          seatsLeft: '14 Seats Left',
          price: '$28',
          amenities: ['Boarding Lounge', 'CCTV', 'Emergency SOS'],
          badge: 'Overnight Sleeper'
        },
        {
          id: 'B3',
          name: 'Orange Luxury Multi-Axle Volvo',
          tag: '🛋️ 2+1 Luxury Sleeper',
          tagColor: 'bg-amber-100 text-amber-800',
          depart: '10:30 PM',
          arrive: '07:45 AM',
          duration: '9h 15m',
          rating: '4.7',
          reviews: '950',
          seatsLeft: '5 Sleepers Left',
          price: '$39',
          amenities: ['Individual Screen', 'Snacks', 'WiFi'],
          badge: 'Premium Comfort'
        }
      ]
    },
    train: {
      fromDefault: 'New Delhi (NDLS)',
      toDefault: 'Mumbai Central (MMCT)',
      dateDefault: 'Fri, 14 Feb 2025',
      passengerDefault: '1 Adult (3rd AC - 3A)',
      passengerOptions: [
        '1 Adult (3rd AC - 3A)',
        '1 Adult (2nd AC - 2A)',
        '1 Adult (1st AC Executive - 1A)',
        '1 Adult (Sleeper Class - SL)',
        '2 Adults (Tatkal Quota)',
        'Senior Citizen (Lower Berth)'
      ],
      stations: [
        { name: 'New Delhi (NDLS)', subtitle: 'Main Northern Terminal', code: 'NDLS' },
        { name: 'Hazrat Nizamuddin (NZM)', subtitle: 'Express Junction', code: 'NZM' },
        { name: 'Mumbai Central (MMCT)', subtitle: 'Western Railway', code: 'MMCT' },
        { name: 'Bandra Terminus (BDTS)', subtitle: 'Suburban Terminal', code: 'BDTS' },
        { name: 'Chhatrapati Shivaji Maharaj (CSMT)', subtitle: 'Central Hub', code: 'CSMT' },
        { name: 'Howrah Junction (HWH)', subtitle: 'Eastern Hub', code: 'HWH' },
        { name: 'KSR Bengaluru (SBC)', subtitle: 'South Western', code: 'SBC' },
      ],
      results: [
        {
          id: 'T1',
          name: '12952 Mumbai Rajdhani Express',
          tag: '⚡ High Speed Priority',
          tagColor: 'bg-blue-100 text-blue-700',
          depart: '04:55 PM',
          arrive: '08:35 AM',
          duration: '15h 40m',
          rating: '4.9',
          reviews: '5.2k',
          seatsLeft: 'CURR_AVBL-32',
          price: '$44',
          amenities: ['Catering Included', 'Clean Linen', 'Punctual (98%)'],
          badge: 'Fastest Train'
        },
        {
          id: 'T2',
          name: '12954 August Kranti Tejas Rajdhani',
          tag: '🚆 Smart Tejas Coaches',
          tagColor: 'bg-emerald-100 text-emerald-700',
          depart: '05:15 PM',
          arrive: '10:05 AM',
          duration: '16h 50m',
          rating: '4.8',
          reviews: '3.9k',
          seatsLeft: 'AVAILABLE-18',
          price: '$38',
          amenities: ['Automatic Doors', 'Bio-Vacuum Toilets', 'Meals'],
          badge: 'Tejas Smart'
        },
        {
          id: 'T3',
          name: '12908 Maharashtra Sampark Kranti',
          tag: '🏷️ Best Value Express',
          tagColor: 'bg-amber-100 text-amber-800',
          depart: '07:10 AM',
          arrive: '04:35 AM',
          duration: '21h 25m',
          rating: '4.6',
          reviews: '2.1k',
          seatsLeft: 'RAC-14',
          price: '$22',
          amenities: ['Pantry Car', 'E-Catering', 'Charging Ports'],
          badge: 'Superfast'
        }
      ]
    },
    flight: {
      fromDefault: 'New Delhi (DEL)',
      toDefault: 'Mumbai (BOM)',
      dateDefault: 'Fri, 14 Feb 2025',
      passengerDefault: '1 Adult (Economy Class)',
      passengerOptions: [
        '1 Adult (Economy)',
        '1 Adult (Premium Economy)',
        '1 Adult (Business Class)',
        '2 Adults, 1 Child (Economy)',
        'Family (4 Pax - Flexi)'
      ],
      stations: [
        { name: 'New Delhi (DEL)', subtitle: 'Indira Gandhi Intl (T3/T2)', code: 'DEL' },
        { name: 'Mumbai (BOM)', subtitle: 'Chhatrapati Shivaji Intl (T2/T1)', code: 'BOM' },
        { name: 'Bengaluru (BLR)', subtitle: 'Kempegowda Intl', code: 'BLR' },
        { name: 'Goa (GOI)', subtitle: 'Dabolim / Mopa Airport', code: 'GOI' },
        { name: 'Kolkata (CCU)', subtitle: 'Netaji Subhash Chandra Intl', code: 'CCU' },
        { name: 'Dubai (DXB)', subtitle: 'Dubai International (DXB)', code: 'DXB' },
      ],
      results: [
        {
          id: 'F1',
          name: 'IndiGo 6E-204 (Airbus A321neo)',
          tag: '✈️ Non-Stop (On-Time 96%)',
          tagColor: 'bg-blue-100 text-blue-700',
          depart: '08:15 AM',
          arrive: '10:30 AM',
          duration: '2h 15m',
          rating: '4.8',
          reviews: '12.4k',
          seatsLeft: '4 Seats Left at $78',
          price: '$78',
          amenities: ['15 kg Checked Baggage', '7 kg Cabin', 'Terminal 3 -> 2'],
          badge: 'Most Popular'
        },
        {
          id: 'F2',
          name: 'Air India AI-805 (Boeing 787 Dreamliner)',
          tag: '🍽️ Free Hot Meal & Beverage',
          tagColor: 'bg-red-100 text-red-700',
          depart: '02:00 PM',
          arrive: '04:15 PM',
          duration: '2h 15m',
          rating: '4.7',
          reviews: '8.1k',
          seatsLeft: '11 Seats Left',
          price: '$89',
          amenities: ['Widebody Comfort', 'Complimentary Meal', '25 kg Baggage'],
          badge: 'Full Service'
        },
        {
          id: 'F3',
          name: 'Vistara UK-995 (Airbus A320neo)',
          tag: '✨ Premium Flying Experience',
          tagColor: 'bg-purple-100 text-purple-700',
          depart: '07:00 PM',
          arrive: '09:15 PM',
          duration: '2h 15m',
          rating: '4.9',
          reviews: '9.3k',
          seatsLeft: '6 Seats Left',
          price: '$94',
          amenities: ['Starbuck Coffee', 'In-Flight Streaming', 'Priority Check-in'],
          badge: 'Best Rated'
        }
      ]
    }
  };

  // State initialized with active mode defaults
  const [fromCity, setFromCity] = useState(modeData.bus.fromDefault);
  const [toCity, setToCity] = useState(modeData.bus.toDefault);
  const [journeyDate, setJourneyDate] = useState('Fri, 14 Feb 2025');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(modeData.bus.passengerDefault);

  // Dropdown / Popover states
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [returnPickerOpen, setReturnPickerOpen] = useState(false);
  const [passengerOpen, setPassengerOpen] = useState(false);

  // Multi-modal modal state
  const [multiModalOpen, setMultiModalOpen] = useState(false);

  // Search results preview state
  const [searching, setSearching] = useState(false);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);

  // Handle mode tab change in REAL TIME
  const handleModeSwitch = (newMode) => {
    setActiveTab(newMode);
    const data = modeData[newMode];
    setFromCity(data.fromDefault);
    setToCity(data.toDefault);
    setPassengers(data.passengerDefault);
    
    // Close any open popovers
    setFromOpen(false);
    setToOpen(false);
    setDatePickerOpen(false);
    setReturnPickerOpen(false);
    setPassengerOpen(false);

    addToast?.({
      title: `Switched to ${newMode.toUpperCase()} Mode`,
      message: `Updated stations, routes, and live seat class options.`,
      type: 'info'
    });
  };

  // Swap From & To with smooth rotation
  const handleSwap = () => {
    setSwapped((prev) => !prev);
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  // Search validation & action
  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromCity.trim() || !toCity.trim()) {
      addToast?.({
        title: 'Missing Route',
        message: 'Please choose both origin and destination.',
        type: 'error'
      });
      return;
    }
    if (fromCity === toCity) {
      addToast?.({
        title: 'Same Origin & Destination',
        message: 'Origin and destination cannot be identical.',
        type: 'error'
      });
      return;
    }

    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setResultsModalOpen(true);
      addToast?.({
        title: `Real-Time ${activeTab.toUpperCase()} Options Found!`,
        message: `Displaying live operator schedules for ${fromCity.split(' ')[0]} → ${toCity.split(' ')[0]}.`,
        type: 'success'
      });
    }, 400);
  };

  const tabs = [
    { id: 'bus', label: 'Bus', icon: <Bus className="w-4 h-4" /> },
    { id: 'train', label: 'Train', icon: <Train className="w-4 h-4" /> },
    { id: 'flight', label: 'Flight', icon: <Plane className="w-4 h-4" /> },
  ];

  const currentModeInfo = modeData[activeTab];

  return (
    <div id="search" className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 relative z-30 -mt-20 sm:-mt-24">
      
      {/* Booking Search Card */}
      <div className="bg-white rounded-2xl sm:rounded-[26px] shadow-[0_12px_40px_rgba(20,10,60,0.12)] border border-purple-100/80 p-4 sm:p-5 backdrop-blur-sm">
        
        {/* Top Row: Transport Tabs & Multi-Modal Trip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-gray-100">
          
          {/* Transport mode selector tabs with Framer Motion layoutId */}
          <div className="inline-flex items-center bg-[#F4F2FC] p-1.5 rounded-full self-start relative">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleModeSwitch(tab.id)}
                  className={`relative flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full text-xs sm:text-[13px] font-bold transition-colors duration-200 z-10 cursor-pointer ${
                    isActive ? 'text-white' : 'text-[#11152F] hover:text-[#652BE8]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-[#652BE8] rounded-full shadow-md shadow-purple-600/30 z-[-1]"
                    />
                  )}
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side: Plan with AI CTA & Multi-Modal Trip Button with Beta badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/ai-planner"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#652BE8] bg-[#F3EEFF] hover:bg-[#EAE2FC] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#652BE8]" />
              <span>Plan with AI</span>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setMultiModalOpen(true)}
              className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#15162D] hover:text-[#652BE8] px-3 py-1.5 rounded-xl hover:bg-[#F3EEFF] transition-colors cursor-pointer"
            >
              <Network className="w-4 h-4 text-[#652BE8]" />
              <span>Multi-Modal Trip</span>
              <span className="text-[10px] font-bold text-[#652BE8] bg-[#EDE8FC] px-2 py-0.5 rounded-full">
                Beta
              </span>
            </motion.button>
          </div>
        </div>

        {/* Search Fields Row - Clean Responsive Flex Layout Ensuring All Items Fit in One Line on Desktop */}
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 sm:gap-2.5">
          
          {/* Field 1: From */}
          <div className="flex-[1.25] min-w-0 relative">
            <div 
              onClick={() => {
                setFromOpen(!fromOpen);
                setToOpen(false);
                setDatePickerOpen(false);
                setPassengerOpen(false);
              }}
              className="px-3 py-2 bg-gray-50/80 hover:bg-gray-50 border border-gray-200/90 rounded-xl cursor-pointer transition-colors"
            >
              <span className="text-[10px] text-[#60647A] font-semibold block leading-tight">
                From ({activeTab === 'flight' ? 'Airport' : activeTab === 'train' ? 'Station' : 'Boarding'})
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-[13px] font-bold text-[#11152F] truncate">{fromCity}</span>
              </div>
            </div>

            {/* From Dropdown with dynamic stations */}
            <AnimatePresence>
              {fromOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 mt-1 z-50 max-h-60 overflow-y-auto"
                  onMouseLeave={() => setFromOpen(false)}
                >
                  <div className="px-3 pb-1 text-[10px] font-bold text-gray-400 uppercase">
                    Select {activeTab.toUpperCase()} Origin
                  </div>
                  {currentModeInfo.stations.map((s) => (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => {
                        setFromCity(s.name);
                        setFromOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8] flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="block truncate">{s.name}</span>
                        <span className="text-[9px] text-gray-400 font-normal block">{s.subtitle}</span>
                      </div>
                      <span className="text-[10px] bg-purple-50 text-[#652BE8] font-mono px-1.5 py-0.2 rounded font-bold">{s.code}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center self-center z-10">
            <motion.button
              type="button"
              onClick={handleSwap}
              animate={{ rotate: swapped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-7.5 h-7.5 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-500 hover:text-[#652BE8] hover:border-[#652BE8] transition-colors cursor-pointer"
              title="Swap Origin & Destination"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Field 2: To */}
          <div className="flex-[1.25] min-w-0 relative">
            <div 
              onClick={() => {
                setToOpen(!toOpen);
                setFromOpen(false);
                setDatePickerOpen(false);
                setPassengerOpen(false);
              }}
              className="px-3 py-2 bg-gray-50/80 hover:bg-gray-50 border border-gray-200/90 rounded-xl cursor-pointer transition-colors"
            >
              <span className="text-[10px] text-[#60647A] font-semibold block leading-tight">
                To ({activeTab === 'flight' ? 'Airport' : activeTab === 'train' ? 'Station' : 'Drop-off'})
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-[13px] font-bold text-[#11152F] truncate">{toCity}</span>
              </div>
            </div>

            {/* To Dropdown with dynamic stations */}
            <AnimatePresence>
              {toOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 mt-1 z-50 max-h-60 overflow-y-auto"
                  onMouseLeave={() => setToOpen(false)}
                >
                  <div className="px-3 pb-1 text-[10px] font-bold text-gray-400 uppercase">
                    Select {activeTab.toUpperCase()} Destination
                  </div>
                  {currentModeInfo.stations.map((s) => (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => {
                        setToCity(s.name);
                        setToOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8] flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="block truncate">{s.name}</span>
                        <span className="text-[9px] text-gray-400 font-normal block">{s.subtitle}</span>
                      </div>
                      <span className="text-[10px] bg-purple-50 text-[#652BE8] font-mono px-1.5 py-0.2 rounded font-bold">{s.code}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Field 3: Journey Date */}
          <div className="flex-1 min-w-0 relative">
            <div 
              onClick={() => {
                setDatePickerOpen(!datePickerOpen);
                setFromOpen(false);
                setToOpen(false);
                setReturnPickerOpen(false);
                setPassengerOpen(false);
              }}
              className="px-3 py-2 bg-gray-50/80 hover:bg-gray-50 border border-gray-200/90 rounded-xl cursor-pointer transition-colors"
            >
              <span className="text-[10px] text-[#60647A] font-semibold block leading-tight">Journey Date</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <CalendarIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-[12.5px] font-bold text-[#11152F] truncate">{journeyDate}</span>
              </div>
            </div>

            {/* Date Picker */}
            <AnimatePresence>
              {datePickerOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 mt-1 z-50"
                  onMouseLeave={() => setDatePickerOpen(false)}
                >
                  <div className="text-[11px] font-bold text-gray-900 mb-1.5">Select Departure Date</div>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {['Fri, 14 Feb 2025', 'Sat, 15 Feb 2025', 'Sun, 16 Feb 2025', 'Mon, 17 Feb 2025', 'Fri, 21 Feb 2025'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setJourneyDate(d);
                          setDatePickerOpen(false);
                        }}
                        className="p-1.5 rounded-lg text-left font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#652BE8]"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Field 4: Return (Optional) */}
          <div className="flex-[0.9] min-w-0 relative">
            <div 
              onClick={() => {
                setReturnPickerOpen(!returnPickerOpen);
                setDatePickerOpen(false);
                setFromOpen(false);
                setToOpen(false);
                setPassengerOpen(false);
              }}
              className="px-3 py-2 bg-gray-50/80 hover:bg-gray-50 border border-gray-200/90 rounded-xl cursor-pointer transition-colors"
            >
              <span className="text-[10px] text-[#60647A] font-semibold block leading-tight truncate">Return (Optional)</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <CalendarIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className={`text-[12px] truncate ${returnDate ? 'text-[#11152F] font-bold' : 'text-gray-400'}`}>
                  {returnDate || 'Add Return'}
                </span>
              </div>
            </div>

            {/* Return Picker */}
            <AnimatePresence>
              {returnPickerOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 p-2 mt-1 z-50"
                  onMouseLeave={() => setReturnPickerOpen(false)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-gray-900">Return Date</span>
                    {returnDate && (
                      <button 
                        type="button" 
                        onClick={() => { setReturnDate(''); setReturnPickerOpen(false); }}
                        className="text-[9px] text-red-500 hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 text-xs">
                    {['Sun, 16 Feb 2025', 'Mon, 17 Feb 2025', 'Fri, 21 Feb 2025', 'Sun, 23 Feb 2025'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setReturnDate(d);
                          setReturnPickerOpen(false);
                        }}
                        className="w-full p-1.5 rounded-lg text-left font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#652BE8]"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Field 5: Passengers / Class */}
          <div className="flex-[1.1] min-w-0 relative">
            <div 
              onClick={() => {
                setPassengerOpen(!passengerOpen);
                setFromOpen(false);
                setToOpen(false);
                setDatePickerOpen(false);
                setReturnPickerOpen(false);
              }}
              className="px-3 py-2 bg-gray-50/80 hover:bg-gray-50 border border-gray-200/90 rounded-xl cursor-pointer transition-colors"
            >
              <span className="text-[10px] text-[#60647A] font-semibold block leading-tight">
                {activeTab === 'flight' ? 'Pax & Class' : activeTab === 'train' ? 'Berth & Quota' : 'Passengers'}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-[12.5px] font-bold text-[#11152F] truncate">{passengers}</span>
              </div>
            </div>

            {/* Dynamic Passenger Selector tailored per mode */}
            <AnimatePresence>
              {passengerOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 mt-1 z-50"
                  onMouseLeave={() => setPassengerOpen(false)}
                >
                  <div className="text-[11px] font-bold text-gray-900 mb-1.5">
                    Select {activeTab.toUpperCase()} Travel Class
                  </div>
                  <div className="space-y-1">
                    {currentModeInfo.passengerOptions.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setPassengers(p);
                          setPassengerOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                          passengers === p ? 'bg-purple-100/70 text-[#652BE8]' : 'text-gray-700 hover:bg-purple-50 hover:text-[#652BE8]'
                        }`}
                      >
                        <span className="truncate">{p}</span>
                        {passengers === p && <Check className="w-3 h-3 text-[#652BE8] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Tickets Button - Cleanly integrated without wrapping */}
          <div className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={searching}
              className="w-full lg:w-auto h-full py-2.5 px-5 rounded-xl bg-[#652BE8] hover:bg-[#5320c7] active:scale-[0.98] transition-all duration-150 text-white font-bold text-xs sm:text-[13.5px] flex items-center justify-center gap-2 shadow-md shadow-purple-600/25 cursor-pointer disabled:opacity-75 whitespace-nowrap"
            >
              {searching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Tickets</span>
                </>
              )}
            </motion.button>
          </div>

        </form>
      </div>

      {/* Multi-Modal Trip Modal with Framer Motion */}
      <AnimatePresence>
        {multiModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-purple-100"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-[#652BE8]" />
                  <h3 className="text-base font-bold text-[#11152F]">Multi-Modal Trip</h3>
                  <span className="text-[10px] font-bold text-[#652BE8] bg-purple-100 px-2 py-0.5 rounded-full">Beta</span>
                </div>
                <button 
                  onClick={() => setMultiModalOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                Combine Bus + Train + Flight in one single ticket with connection protection.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMultiModalOpen(false);
                  addToast?.({ title: 'Multi-Modal Route Saved', type: 'success' });
                }}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#652BE8] text-white font-bold text-xs hover:bg-[#5320c7] transition-colors cursor-pointer"
              >
                Explore Connected Routes
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC REAL-TIME RESULTS MODAL tailored per active transport mode */}
      <AnimatePresence>
        {resultsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-gray-100 max-h-[85vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#652BE8] shadow-xs">
                    {activeTab === 'flight' ? <Plane className="w-5 h-5" /> : activeTab === 'train' ? <Train className="w-5 h-5" /> : <Bus className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#11152F]">
                      Available Real-Time {activeTab.toUpperCase()} Options
                    </h3>
                    <p className="text-xs text-gray-500">
                      {fromCity} → {toCity} • {journeyDate} • {passengers}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setResultsModalOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Real-Time Filter Pills Bar */}
              <div className="flex items-center gap-2 py-3 overflow-x-auto text-[11px] font-bold text-gray-600">
                <span className="text-[#652BE8] font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#652BE8]" />
                  <span>Real-Time Live Telemetry</span>
                </span>
                <span className="text-gray-300">•</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">Lowest Fare Guarantee</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">Instant Digital Ticket</span>
              </div>

              {/* Dynamic Inventory Cards tailored per mode */}
              <div className="space-y-3">
                {currentModeInfo.results.map((item, idx) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-4 rounded-2xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#11152F]">{item.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-700">★ {item.rating} ({item.reviews})</span>
                      </div>

                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${item.tagColor}`}>
                        {item.tag}
                      </span>

                      <div className="flex items-center gap-3 text-sm font-extrabold text-[#11152F] mt-2">
                        <span>{item.depart}</span>
                        <span className="text-xs text-gray-400 font-normal">→ {item.duration} →</span>
                        <span>{item.arrive}</span>
                      </div>

                      {/* Amenities / Perks */}
                      <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-gray-500">
                        {item.amenities.map((a, i) => (
                          <span key={i} className="flex items-center gap-1">
                            {i > 0 && <span>•</span>}
                            <span>{a}</span>
                          </span>
                        ))}
                      </div>

                      <span className="text-[11px] text-amber-700 font-bold block mt-1">
                        {item.seatsLeft}
                      </span>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <div className="text-left sm:text-right">
                        <span className="text-xs text-gray-400 line-through mr-1.5 block sm:inline">$55</span>
                        <span className="text-xl font-black text-[#11152F]">{item.price}</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setResultsModalOpen(false);
                          addToast?.({ 
                            title: `Seat Selected on ${item.name}!`, 
                            message: `Reserved at ${item.price}. Ready for passenger check-in.`, 
                            type: 'success' 
                          });
                        }}
                        className="px-5 py-2 rounded-xl bg-[#652BE8] hover:bg-[#5320c7] text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-colors cursor-pointer"
                      >
                        Select Seat
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
