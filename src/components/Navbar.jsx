'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, Menu, X, Globe, User, Luggage, ChevronDown, Check } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency, currencies, bookings, user, logoutUser } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Packages', href: '/packages' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const confirmedBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-white py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo matching the reference image */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b1e36]">
              Travel<span className="text-[#0284c7]">Go</span>
            </span>
            <Plane className="w-6 h-6 text-[#0284c7] transform -rotate-12 transition-transform group-hover:rotate-0 duration-300" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#0284c7] font-semibold'
                      : 'text-gray-700 hover:text-[#0284c7]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0284c7] rounded-full animate-in fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                title="Select Currency"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {currencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {Object.entries(currencies).map(([code, item]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-sky-50 hover:text-[#0284c7] transition-colors text-left"
                    >
                      <span>{item.label}</span>
                      {currency === code && <Check className="w-3.5 h-3.5 text-[#0284c7]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* My Bookings Link */}
            <Link
              href="/bookings"
              className="relative p-2 text-gray-600 hover:text-[#0284c7] hover:bg-sky-50 rounded-lg transition-colors"
              title="My Bookings"
            >
              <Luggage className="w-5 h-5" />
              {confirmedBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0284c7] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {confirmedBookingsCount}
                </span>
              )}
            </Link>

            {/* User Login / Profile Button */}
            {user?.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all"
                >
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="max-w-[90px] truncate">{user.name}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 bg-emerald-50 rounded">
                        {user.membership}
                      </span>
                    </div>
                    <Link
                      href="/bookings"
                      className="block px-3 py-2 text-gray-700 hover:bg-sky-50 hover:text-[#0284c7]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Bookings ({confirmedBookingsCount})
                    </Link>
                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-[#0284c7] border border-[#0284c7] hover:bg-[#0284c7] hover:text-white rounded-lg transition-all duration-200 shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/bookings"
              className="relative p-2 text-gray-600 hover:text-[#0284c7]"
            >
              <Luggage className="w-5 h-5" />
              {confirmedBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0284c7] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {confirmedBookingsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#0284c7] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-100 mt-3 space-y-2 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-sky-50 text-[#0284c7] font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-medium text-gray-600">Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-xs font-semibold bg-gray-100 rounded px-2 py-1 border-0"
                >
                  {Object.keys(currencies).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>

              {user?.isLoggedIn ? (
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-semibold"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-[#0284c7] px-3 py-1 border border-[#0284c7] rounded-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
