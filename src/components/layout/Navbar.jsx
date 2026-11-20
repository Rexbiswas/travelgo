'use client';

import React, { useState, useEffect } from 'react';
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
  Activity, 
  Sparkles, 
  LifeBuoy, 
  FileText, 
  LogOut,
  ShieldCheck,
  Tag,
  Radar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '@/components/ui/BrandLogo';
import { useBooking } from '@/context/BookingContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logoutUser, addToast } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ticketsDropdown, setTicketsDropdown] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
  ];

  const notifications = [
    { id: 1, title: 'Bus 24B on Schedule', desc: 'New Delhi to Mumbai is departing on platform 3.', time: '10m ago' },
    { id: 2, title: 'Offer Code: FLY20', desc: 'Up to 20% discount on flight bookings applied to wallet.', time: '1h ago' },
  ];

  const navItems = [
    { name: 'My Trips', href: '/bookings' },
    { name: 'Offers', href: '/offers', badge: 'Hot' },
    { name: 'AI Planner', href: '/ai-planner', badge: 'AI', badgeColor: 'bg-[#652BE8] text-white' },
    { name: 'Live Tracking', href: '/tracking', pulse: true },
    { name: 'Support', href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 bg-white ${scrolled ? 'shadow-xs border-b border-gray-100' : 'border-b border-gray-100/90'}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-13 sm:h-14 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-7">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div 
              whileHover={{ rotate: -8, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <BrandLogo size={32} />
            </motion.div>
            <span className="text-[19px] font-black tracking-tight text-[#11152F] flex items-center">
              Travel<span className="text-[#652BE8]">Go</span>
            </span>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[13.5px] font-medium text-[#11152F]">
          
          {/* Book Tickets Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setTicketsDropdown(true)}
            onMouseLeave={() => setTicketsDropdown(false)}
          >
            <button 
              className={`flex items-center gap-1 transition-colors py-1.5 focus:outline-none cursor-pointer ${
                ticketsDropdown ? 'text-[#652BE8] font-bold' : 'hover:text-[#652BE8]'
              }`}
              onClick={() => setTicketsDropdown(!ticketsDropdown)}
            >
              <span>Book Tickets</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${ticketsDropdown ? 'rotate-180 text-[#652BE8]' : 'text-gray-400'}`} />
            </button>

            <AnimatePresence>
              {ticketsDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 mt-0.5 z-50"
                >
                  <Link href="/#search" className="flex items-center gap-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-purple-50 hover:text-[#652BE8] transition-colors">
                    <Bus className="w-3.5 h-3.5 text-[#652BE8]" />
                    <span>Bus Tickets</span>
                  </Link>
                  <Link href="/#search" className="flex items-center gap-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-purple-50 hover:text-[#652BE8] transition-colors">
                    <Train className="w-3.5 h-3.5 text-[#652BE8]" />
                    <span>Train Tickets</span>
                  </Link>
                  <Link href="/#search" className="flex items-center gap-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-purple-50 hover:text-[#652BE8] transition-colors">
                    <Plane className="w-3.5 h-3.5 text-[#652BE8]" />
                    <span>Flight Tickets</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link href="/#search" className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#652BE8] font-bold hover:bg-purple-50 transition-colors">
                    <Network className="w-3.5 h-3.5" />
                    <span>Multi-Modal Trip</span>
                    <span className="text-[9px] bg-purple-100 text-[#652BE8] px-1.5 py-0.2 rounded-full font-bold ml-auto">Beta</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nav Items */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={`relative flex items-center gap-1.5 transition-colors py-1 ${
                  isActive ? 'text-[#652BE8] font-bold' : 'hover:text-[#652BE8]'
                }`}
              >
                <span>{item.name}</span>

                {/* Pulse indicator for live tracking */}
                {item.pulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}

                {/* Badge if present */}
                {item.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-none ${
                    item.badgeColor || 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {/* Active Indicator Underline */}
                {isActive && (
                  <motion.div
                    layoutId="navbarActiveIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#652BE8] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

        </nav>

        {/* Right Actions: Language, Notification, User Profile */}
        <div className="flex items-center gap-3">
          
          {/* Language Selector: EN */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdown(!langDropdown);
                setNotifDropdown(false);
                setUserDropdown(false);
              }}
              className="flex items-center gap-1 text-[13px] font-semibold text-[#11152F] hover:text-[#652BE8] px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-gray-600" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            <AnimatePresence>
              {langDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50"
                  onMouseLeave={() => setLangDropdown(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setSelectedLang(l.code);
                        setLangDropdown(false);
                        addToast?.({ title: `Language Switched to ${l.name}`, type: 'success' });
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:text-[#652BE8] cursor-pointer"
                    >
                      <span>{l.name}</span>
                      {selectedLang === l.code && <Check className="w-3 h-3 text-[#652BE8]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification Bell with red dot */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdown(!notifDropdown);
                setLangDropdown(false);
                setUserDropdown(false);
              }}
              className="relative p-1.5 text-gray-700 hover:text-[#652BE8] hover:bg-gray-50 rounded-full transition-colors focus:outline-none cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            <AnimatePresence>
              {notifDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-2.5 z-50"
                  onMouseLeave={() => setNotifDropdown(false)}
                >
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-100">
                    <span className="text-[11px] font-bold text-gray-900">Notifications</span>
                    <span className="text-[10px] text-[#652BE8] font-semibold cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="space-y-1.5">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-bold text-[#11152F]">{n.title}</p>
                          <span className="text-[9px] text-gray-400">{n.time}</span>
                        </div>
                        <p className="text-[10.5px] text-gray-500 mt-0.5 line-clamp-1">{n.desc}</p>
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
              onClick={() => {
                setUserDropdown(!userDropdown);
                setLangDropdown(false);
                setNotifDropdown(false);
              }}
              className="flex items-center gap-1.5 pl-1 pr-1.5 py-0.5 rounded-full hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs shadow-inner">
                <User className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="hidden sm:inline-block text-[13px] font-semibold text-[#11152F]">
                Hi, Alex
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            <AnimatePresence>
              {userDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 z-50"
                  onMouseLeave={() => setUserDropdown(false)}
                >
                  <div className="px-3 py-1.5 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900">Alex Morgan</p>
                    <p className="text-[10px] text-gray-500">alex.morgan@travelgo.com</p>
                  </div>
                  <Link href="/bookings" className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:text-[#652BE8] transition-colors">
                    <FileText className="w-3 h-3 text-gray-500" />
                    <span>My Bookings</span>
                  </Link>
                  <Link href="/offers" className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-purple-50 hover:text-[#652BE8] transition-colors">
                    <Sparkles className="w-3 h-3 text-[#652BE8]" />
                    <span>Rewards (1,240 pts)</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      addToast?.({ title: 'Signed Out', message: 'See you on your next journey!', type: 'info' });
                      setUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 text-left cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-700 hover:text-[#652BE8] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2 shadow-xl"
          >
            <Link 
              href="/#search" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8]"
            >
              <Bus className="w-3.5 h-3.5 text-[#652BE8]" />
              Book Tickets
            </Link>
            <Link 
              href="/ai-planner" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#652BE8]" />
              AI Planner
            </Link>
            <Link 
              href="/tracking" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8]"
            >
              <Radar className="w-3.5 h-3.5 text-emerald-600" />
              Live Tracking
            </Link>
            <Link 
              href="/bookings" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8]"
            >
              <Compass className="w-3.5 h-3.5 text-[#652BE8]" />
              My Trips
            </Link>
            <Link 
              href="/offers" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8]"
            >
              <Tag className="w-3.5 h-3.5 text-[#652BE8]" />
              Offers
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#11152F] hover:bg-purple-50 hover:text-[#652BE8]"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-[#652BE8]" />
              Support
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
