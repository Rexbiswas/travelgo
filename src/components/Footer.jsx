'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  ShieldCheck, 
  CreditCard, 
  Heart, 
  Globe2, 
  ArrowUpRight,
  Bus,
  Train,
  Plane,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import BrandLogo from '@/components/ui/BrandLogo';
import { useBooking } from '@/context/BookingContext';

export default function Footer() {
  const { addToast } = useBooking();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast?.({
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    setSubscribed(true);
    addToast?.({
      title: '🎉 Subscribed!',
      message: 'Thank you for joining TravelGo exclusive deals & alerts!',
      type: 'success',
    });
    setEmail('');
  };

  const bookingLinks = [
    { name: 'Bus Tickets', href: '/#search' },
    { name: 'Train Tickets', href: '/#search' },
    { name: 'Flight Tickets', href: '/#search' },
    { name: 'Multi-Modal Trips', href: '/#search' },
    { name: 'Popular Routes', href: '/destinations' },
  ];

  const travelTools = [
    { name: 'AI Travel Planner', href: '/#why-different' },
    { name: 'Real-Time Tracking', href: '/#why-different' },
    { name: 'Price Insights', href: '/#why-different' },
    { name: 'Smart Refunds', href: '/#why-different' },
    { name: 'Travel Community', href: '/#why-different' },
  ];

  const companyLinks = [
    { name: 'About TravelGo', href: '/about' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Partner Operators', href: '/contact' },
    { name: 'Privacy Policy', href: '/about' },
    { name: 'Terms of Service', href: '/about' },
  ];

  return (
    <footer className="w-full bg-[#11152F] text-white border-t border-slate-800/80 pt-12 pb-8 mt-6">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800/70">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <motion.div 
                whileHover={{ rotate: -8, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <BrandLogo size={32} />
              </motion.div>
              <span className="text-2xl font-black tracking-tight text-white">
                Travel<span className="text-[#8B5CF6]">Go</span>
              </span>
            </Link>

            <p className="text-xs sm:text-[13px] text-gray-400 leading-relaxed max-w-sm">
              One platform for all your travel. Book bus, train, and flight tickets in real time — smart, flexible, and rewarding with AI route planning.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-semibold text-gray-300">Verified Operators</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-[11px] font-semibold text-gray-300">Smart Refunds</span>
              </div>
            </div>
          </div>

          {/* Column 2: Book Tickets (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Book Tickets
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {bookingLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="hover:text-purple-400 hover:translate-x-0.5 inline-block transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Travel Tools (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Travel Tools
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {travelTools.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="hover:text-purple-400 hover:translate-x-0.5 inline-block transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Deals (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay Ahead with Travel Deals
            </h4>
            <p className="text-xs text-gray-400">
              Get flash sale alerts, promo codes like <span className="text-purple-400 font-bold">FLY20</span> & travel guides directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#652BE8] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-4 py-2 bg-[#652BE8] hover:bg-[#5320c7] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-colors cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="w-3 h-3" />
              </motion.button>
            </form>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-500">
              <CreditCard className="w-3.5 h-3.5 text-gray-400" />
              <span>Secure payments • Instant digital tickets • Zero spam</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} TravelGo Inc. All rights reserved.</p>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Support Center</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
