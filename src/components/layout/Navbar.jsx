'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  Globe, 
  Bell, 
  Menu, 
  X, 
  User, 
  Check, 
  Bus, 
  Train, 
  Plane, 
  Network, 
  Compass, 
  Sparkles, 
  Radar,
  Map, 
  LifeBuoy, 
  FileText, 
  LogOut,
  Calendar,
  CheckCircle2,
  XCircle,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '@/components/ui/BrandLogo';
import { useBooking } from '@/context/BookingContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, addToast } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null); // 'tickets' | 'trips' | 'tools' | 'lang' | 'notif' | 'user' | null
  const [mobileExpanded, setMobileExpanded] = useState({ tickets: false, trips: false, tools: false });
  const [scrolled, setScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
  ];

  const notifications = [
    { id: 1, title: 'Bus 24B on Schedule', desc: 'New Delhi to Mumbai departing platform 3.', time: '10m ago' },
    { id: 2, title: 'Special Offer: FLY20', desc: 'Up to 20% discount on flight bookings applied to wallet.', time: '1h ago' },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header 
      ref={navRef}
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 border-b border-[#E8E6F0] ${
        scrolled ? 'shadow-[0_4px_16px_rgba(21,22,45,0.06)]' : 'shadow-[0_1px_3px_rgba(21,22,45,0.02)]'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        
        {/* Left: Brand Logo & Identity */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div 
              whileHover={{ rotate: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <BrandLogo size={34} />
            </motion.div>
            <span className="text-[20px] font-black tracking-tight text-[#15162D] flex items-center">
              Travel<span className="text-[#652BE8]">Go</span>
            </span>
          </Link>
        </div>

        {/* Center: Main Navigation (Refined strictly to: Book Tickets, My Trips, Offers [HOT], Travel Tools, Support) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[14.5px] font-medium text-[#15162D]">
          
          {/* 1. Book Tickets Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('tickets')}
            onMouseLeave={() => setOpenDropdown((prev) => prev === 'tickets' ? null : prev)}
          >
            <button 
              onClick={() => toggleDropdown('tickets')}
              className={`flex items-center gap-1.5 py-2 transition-colors duration-150 cursor-pointer ${
                openDropdown === 'tickets' ? 'text-[#652BE8] font-semibold' : 'hover:text-[#652BE8]'
              }`}
            >
              <span>Book Tickets</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openDropdown === 'tickets' ? 'rotate-180 text-[#652BE8]' : 'text-[#666A7D]'
              }`} />
            </button>

            <AnimatePresence>
              {openDropdown === 'tickets' && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-[0_12px_32px_rgba(21,22,45,0.12)] border border-[#E8E6F0] py-2 mt-1 z-50"
                >
                  <Link 
                    href="/#search" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors"
                  >
                    <Bus className="w-4 h-4 text-[#652BE8]" />
                    <span className="font-medium">Bus Tickets</span>
                  </Link>
                  <Link 
                    href="/#search" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors"
                  >
                    <Train className="w-4 h-4 text-[#652BE8]" />
                    <span className="font-medium">Train Tickets</span>
                  </Link>
                  <Link 
                    href="/#search" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors"
                  >
                    <Plane className="w-4 h-4 text-[#652BE8]" />
                    <span className="font-medium">Flight Tickets</span>
                  </Link>
                  <div className="border-t border-[#E8E6F0] my-1"></div>
                  <Link 
                    href="/#search" 
                    className="flex items-center justify-between px-4 py-2.5 text-[13.5px] text-[#652BE8] font-bold hover:bg-[#F3EEFF] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Network className="w-4 h-4" />
                      <span>Multi-Modal Journey</span>
                    </div>
                    <span className="text-[10px] bg-[#652BE8]/10 text-[#652BE8] px-2 py-0.5 rounded-full font-bold">Beta</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. My Trips Dropdown (Upcoming, Completed, Cancelled, View Tickets, Track Journey) */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('trips')}
            onMouseLeave={() => setOpenDropdown((prev) => prev === 'trips' ? null : prev)}
          >
            <button 
              onClick={() => toggleDropdown('trips')}
              className={`relative flex items-center gap-1.5 py-2 transition-colors duration-150 cursor-pointer ${
                pathname === '/bookings' || openDropdown === 'trips' ? 'text-[#652BE8] font-semibold' : 'hover:text-[#652BE8]'
              }`}
            >
              <span>My Trips</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openDropdown === 'trips' ? 'rotate-180 text-[#652BE8]' : 'text-[#666A7D]'
              }`} />
              {pathname === '/bookings' && (
                <motion.div
                  layoutId="navbarActiveIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#652BE8] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {openDropdown === 'trips' && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-[0_12px_32px_rgba(21,22,45,0.12)] border border-[#E8E6F0] py-2 mt-1 z-50"
                >
                  <Link 
                    href="/bookings?tab=upcoming" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#652BE8]" />
                    <span className="font-medium">Upcoming Trips</span>
                  </Link>
                  <Link 
                    href="/bookings?tab=completed" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">Completed Trips</span>
                  </Link>
                  <Link 
                    href="/bookings?tab=cancelled" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors"
                  >
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span className="font-medium">Cancelled Trips</span>
                  </Link>
                  <div className="border-t border-[#E8E6F0] my-1"></div>
                  <Link 
                    href="/bookings" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#666A7D]" />
                    <span className="font-medium">View Tickets</span>
                  </Link>
                  <Link 
                    href="/track-journey" 
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#652BE8] font-bold hover:bg-[#F3EEFF] transition-colors"
                  >
                    <Radar className="w-4 h-4 text-[#652BE8]" />
                    <span>Track Journey</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Offers (with small orange HOT badge beside Offers) */}
          <Link 
            href="/offers"
            className={`relative flex items-center gap-1.5 py-2 transition-colors duration-150 ${
              pathname === '/offers' ? 'text-[#652BE8] font-semibold' : 'hover:text-[#652BE8]'
            }`}
          >
            <span>Offers</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white bg-[#F59E0B] rounded-full shadow-xs">
              HOT
            </span>
            {pathname === '/offers' && (
              <motion.div
                layoutId="navbarActiveIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#652BE8] rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>

          {/* 4. Travel Tools Dropdown (AI Travel Planner, Journey Tracker, Route Explorer) */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('tools')}
            onMouseLeave={() => setOpenDropdown((prev) => prev === 'tools' ? null : prev)}
          >
            <button 
              onClick={() => toggleDropdown('tools')}
              className={`relative flex items-center gap-1.5 py-2 transition-colors duration-150 cursor-pointer ${
                pathname === '/ai-planner' || pathname === '/track-journey' || pathname === '/tracking' || openDropdown === 'tools' 
                  ? 'text-[#652BE8] font-semibold' 
                  : 'hover:text-[#652BE8]'
              }`}
            >
              <span>Travel Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                openDropdown === 'tools' ? 'rotate-180 text-[#652BE8]' : 'text-[#666A7D]'
              }`} />
              {(pathname === '/ai-planner' || pathname === '/track-journey' || pathname === '/tracking') && (
                <motion.div
                  layoutId="navbarActiveIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#652BE8] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {openDropdown === 'tools' && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-[0_12px_32px_rgba(21,22,45,0.12)] border border-[#E8E6F0] p-2 mt-1 z-50 space-y-1"
                >
                  {/* Tool 1: AI Travel Planner */}
                  <Link 
                    href="/ai-planner" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F3EEFF] transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#652BE8]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#652BE8] group-hover:bg-[#652BE8] group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-bold text-[#15162D] group-hover:text-[#652BE8] transition-colors">
                          AI Travel Planner
                        </span>
                        <span className="text-[9px] font-bold text-[#652BE8] bg-[#652BE8]/10 px-1.5 py-0.2 rounded-full">New</span>
                      </div>
                      <p className="text-[11.5px] text-[#666A7D] leading-tight mt-0.5">
                        Plan smarter journeys with AI.
                      </p>
                    </div>
                  </Link>

                  {/* Tool 2: Journey Tracker */}
                  <Link 
                    href="/track-journey" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F3EEFF] transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Radar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-bold text-[#15162D] group-hover:text-[#652BE8] transition-colors">
                          Journey Tracker
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                      <p className="text-[11.5px] text-[#666A7D] leading-tight mt-0.5">
                        Track your bus, train or flight.
                      </p>
                    </div>
                  </Link>

                  {/* Tool 3: Route Explorer */}
                  <Link 
                    href="/#search" 
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F3EEFF] transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Map className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[13.5px] font-bold text-[#15162D] group-hover:text-[#652BE8] transition-colors block">
                        Route Explorer
                      </span>
                      <p className="text-[11.5px] text-[#666A7D] leading-tight mt-0.5">
                        Discover alternative travel routes.
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Support (Simple navigation item) */}
          <Link 
            href="/contact"
            className={`relative flex items-center py-2 transition-colors duration-150 ${
              pathname === '/contact' ? 'text-[#652BE8] font-semibold' : 'hover:text-[#652BE8]'
            }`}
          >
            <span>Support</span>
            {pathname === '/contact' && (
              <motion.div
                layoutId="navbarActiveIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#652BE8] rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        </nav>

        {/* Right Actions: Language, Notification, User Profile & Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('lang')}
              className="flex items-center gap-1 text-[13px] font-semibold text-[#15162D] hover:text-[#652BE8] px-2 py-1.5 rounded-lg hover:bg-[#F8F8FC] transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#666A7D]" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-[#666A7D]" />
            </button>

            <AnimatePresence>
              {openDropdown === 'lang' && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-[0_12px_32px_rgba(21,22,45,0.12)] border border-[#E8E6F0] py-1.5 z-50"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setSelectedLang(l.code);
                        setOpenDropdown(null);
                        addToast?.({ title: `Language: ${l.name}`, type: 'success' });
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] cursor-pointer"
                    >
                      <span>{l.name}</span>
                      {selectedLang === l.code && <Check className="w-3.5 h-3.5 text-[#652BE8]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('notif')}
              className="relative p-2 text-[#15162D] hover:text-[#652BE8] hover:bg-[#F8F8FC] rounded-full transition-colors focus:outline-none cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA580C] ring-2 ring-white"></span>
            </button>

            <AnimatePresence>
              {openDropdown === 'notif' && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-76 bg-white rounded-xl shadow-[0_12px_32px_rgba(21,22,45,0.12)] border border-[#E8E6F0] p-3 z-50"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8E6F0]">
                    <span className="text-xs font-bold text-[#15162D]">Trip Notifications</span>
                    <button 
                      onClick={() => {
                        addToast?.({ title: 'Notifications marked as read', type: 'info' });
                        setOpenDropdown(null);
                      }} 
                      className="text-[11px] text-[#652BE8] font-semibold hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 rounded-lg hover:bg-[#F8F8FC] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#15162D]">{n.title}</p>
                          <span className="text-[10px] text-[#666A7D]">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#666A7D] mt-0.5 line-clamp-1">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile: Hi, Alex */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('user')}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[#F8F8FC] transition-colors focus:outline-none cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#F3EEFF] border border-purple-200 flex items-center justify-center text-[#652BE8] font-bold text-xs shadow-xs">
                <User className="w-4 h-4 text-[#652BE8]" />
              </div>
              <span className="hidden sm:inline-block text-[13.5px] font-semibold text-[#15162D]">
                Hi, Alex
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#666A7D]" />
            </button>

            <AnimatePresence>
              {openDropdown === 'user' && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-[0_12px_32px_rgba(21,22,45,0.12)] border border-[#E8E6F0] py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-[#E8E6F0]">
                    <p className="text-xs font-bold text-[#15162D]">Alex Morgan</p>
                    <p className="text-[11px] text-[#666A7D]">alex.morgan@travelgo.com</p>
                  </div>
                  <Link href="/bookings" className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors">
                    <FileText className="w-3.5 h-3.5 text-[#666A7D]" />
                    <span>My Bookings</span>
                  </Link>
                  <Link href="/track-journey" className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors">
                    <Radar className="w-3.5 h-3.5 text-[#652BE8]" />
                    <span>Live Tracking</span>
                  </Link>
                  <Link href="/offers" className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8] transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Travel Points (1,240 pts)</span>
                  </Link>
                  <div className="border-t border-[#E8E6F0] my-1"></div>
                  <button
                    onClick={() => {
                      addToast?.({ title: 'Signed Out', message: 'See you soon on your next journey!', type: 'info' });
                      setOpenDropdown(null);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#15162D] hover:text-[#652BE8] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#E8E6F0] bg-white px-4 py-3 space-y-2 shadow-xl overflow-hidden"
          >
            {/* Book Tickets Accordion */}
            <div>
              <button 
                onClick={() => setMobileExpanded(p => ({ ...p, tickets: !p.tickets }))}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#15162D] hover:bg-[#F3EEFF]"
              >
                <div className="flex items-center gap-2.5">
                  <Bus className="w-4 h-4 text-[#652BE8]" />
                  <span>Book Tickets</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.tickets ? 'rotate-180 text-[#652BE8]' : 'text-gray-400'}`} />
              </button>
              {mobileExpanded.tickets && (
                <div className="pl-8 pr-3 py-1 space-y-1 bg-[#F8F8FC] rounded-lg mt-1">
                  <Link href="/#search" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">Bus Tickets</Link>
                  <Link href="/#search" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">Train Tickets</Link>
                  <Link href="/#search" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">Flight Tickets</Link>
                  <Link href="/#search" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-bold text-[#652BE8]">Multi-Modal Journey (Beta)</Link>
                </div>
              )}
            </div>

            {/* My Trips Accordion */}
            <div>
              <button 
                onClick={() => setMobileExpanded(p => ({ ...p, trips: !p.trips }))}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#15162D] hover:bg-[#F3EEFF]"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#652BE8]" />
                  <span>My Trips</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.trips ? 'rotate-180 text-[#652BE8]' : 'text-gray-400'}`} />
              </button>
              {mobileExpanded.trips && (
                <div className="pl-8 pr-3 py-1 space-y-1 bg-[#F8F8FC] rounded-lg mt-1">
                  <Link href="/bookings?tab=upcoming" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">Upcoming Trips</Link>
                  <Link href="/bookings?tab=completed" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">Completed Trips</Link>
                  <Link href="/bookings?tab=cancelled" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">Cancelled Trips</Link>
                  <Link href="/bookings" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">View Tickets</Link>
                  <Link href="/track-journey" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-bold text-[#652BE8]">Track Journey</Link>
                </div>
              )}
            </div>

            {/* Offers */}
            <Link 
              href="/offers" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8]"
            >
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-[#652BE8]" />
                <span>Offers</span>
              </div>
              <span className="text-[10px] font-black uppercase text-white bg-[#F59E0B] px-1.5 py-0.5 rounded-full">HOT</span>
            </Link>

            {/* Travel Tools Accordion */}
            <div>
              <button 
                onClick={() => setMobileExpanded(p => ({ ...p, tools: !p.tools }))}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#15162D] hover:bg-[#F3EEFF]"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#652BE8]" />
                  <span>Travel Tools</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.tools ? 'rotate-180 text-[#652BE8]' : 'text-gray-400'}`} />
              </button>
              {mobileExpanded.tools && (
                <div className="pl-8 pr-3 py-1 space-y-1 bg-[#F8F8FC] rounded-lg mt-1">
                  <Link href="/ai-planner" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">
                    AI Travel Planner <span className="text-[9px] text-[#652BE8] font-bold">(Plan smarter journeys)</span>
                  </Link>
                  <Link href="/track-journey" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">
                    Journey Tracker <span className="text-[9px] text-emerald-600 font-bold">(Live map & radar)</span>
                  </Link>
                  <Link href="/#search" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-xs font-medium text-[#15162D] hover:text-[#652BE8]">
                    Route Explorer
                  </Link>
                </div>
              )}
            </div>

            {/* Support */}
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#15162D] hover:bg-[#F3EEFF] hover:text-[#652BE8]"
            >
              <LifeBuoy className="w-4 h-4 text-[#652BE8]" />
              <span>Support</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
