'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function SearchBar({ onSearch, className = '' }) {
  const router = useRouter();
  const { searchQuery, setSearchQuery, addToast } = useBooking();
  
  const [destination, setDestination] = useState(searchQuery.destination || '');
  const [checkIn, setCheckIn] = useState(searchQuery.checkIn || '');
  const [checkOut, setCheckOut] = useState(searchQuery.checkOut || '');
  const [guests, setGuests] = useState(searchQuery.guests || 2);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const popularSuggestions = [
    { name: 'Paris', country: 'France' },
    { name: 'Dubai', country: 'UAE' },
    { name: 'Switzerland', country: 'Switzerland' },
    { name: 'Greece', country: 'Greece' },
    { name: 'Bali', country: 'Indonesia' },
    { name: 'Maldives', country: 'Maldives' },
  ];

  const handleGuestsUpdate = (newAdults, newChildren) => {
    setAdults(newAdults);
    setChildren(newChildren);
    setGuests(newAdults + newChildren);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    
    const query = {
      destination,
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      guests,
    };

    setSearchQuery(query);

    if (onSearch) {
      onSearch(query);
    } else {
      // If on home page or elsewhere, route to /hotels or /destinations with query
      if (destination) {
        addToast({
          title: 'Searching Real-Time Deals',
          message: `Finding best rates for ${destination} with live availability...`,
          type: 'info',
        });
        router.push(`/hotels?destination=${encodeURIComponent(destination)}`);
      } else {
        router.push('/hotels');
      }
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 ${className}`}>
      <div className="bg-white rounded-2xl sm:rounded-full shadow-2xl p-3 sm:p-2.5 border border-gray-100/80 backdrop-blur-md">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0 items-center">
          
          {/* Where to? */}
          <div className="sm:col-span-3 px-4 py-2 relative sm:border-r sm:border-gray-200">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
              Where to?
            </label>
            <input
              type="text"
              placeholder="Enter destination"
              value={destination}
              onFocus={() => setShowDestSuggestions(true)}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full text-sm text-gray-700 placeholder-gray-400 font-medium focus:outline-none bg-transparent"
            />

            {/* Destination Autocomplete Suggestions */}
            {showDestSuggestions && (
              <div
                className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                onMouseLeave={() => setShowDestSuggestions(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Popular Destinations
                </div>
                {popularSuggestions.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setDestination(item.name);
                      setShowDestSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-sky-50 hover:text-[#0284c7] flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-[10px] text-gray-400">{item.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Check In */}
          <div className="sm:col-span-3 px-4 py-2 sm:border-r sm:border-gray-200">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
              Check In
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm text-gray-700 font-medium focus:outline-none bg-transparent cursor-pointer"
            />
          </div>

          {/* Check Out */}
          <div className="sm:col-span-3 px-4 py-2 sm:border-r sm:border-gray-200">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
              Check Out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm text-gray-700 font-medium focus:outline-none bg-transparent cursor-pointer"
            />
          </div>

          {/* Guests */}
          <div className="sm:col-span-3 px-4 py-2 relative flex items-center justify-between">
            <div
              className="cursor-pointer flex-1"
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            >
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider mb-0.5 cursor-pointer">
                <Users className="w-3.5 h-3.5 text-[#0284c7]" />
                Guests
              </label>
              <div className="flex items-center justify-between text-sm text-gray-700 font-medium">
                <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-2 sm:mr-0" />
              </div>
            </div>

            {/* Guest Selector Dropdown */}
            {showGuestDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
                onMouseLeave={() => setShowGuestDropdown(false)}
              >
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-800">Adults</p>
                    <p className="text-[10px] text-gray-400">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => handleGuestsUpdate(Math.max(1, adults - 1), children)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 disabled:opacity-40 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestsUpdate(adults + 1, children)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-xs font-bold text-gray-800">Children</p>
                    <p className="text-[10px] text-gray-400">Ages 0 to 12</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => handleGuestsUpdate(adults, Math.max(0, children - 1))}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 disabled:opacity-40 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestsUpdate(adults, children + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuestDropdown(false)}
                  className="w-full mt-2 py-1.5 bg-[#0284c7] text-white rounded-lg text-xs font-semibold hover:bg-[#0369a1] transition-colors"
                >
                  Done
                </button>
              </div>
            )}

            {/* Search Button matching reference */}
            <button
              type="submit"
              className="mt-2 sm:mt-0 w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white px-6 py-3 rounded-xl sm:rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
