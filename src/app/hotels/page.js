'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Star, MapPin, Zap, Check, SlidersHorizontal, ShieldCheck, Wifi, Waves, Coffee, Sparkles } from 'lucide-react';
import { hotelsData, destinationsData } from '@/data/travelData';
import { useBooking } from '@/context/BookingContext';

function HotelsContent() {
  const searchParams = useSearchParams();
  const initialDest = searchParams.get('destination') || 'all';

  const { formatPrice, openBookingModal } = useBooking();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(initialDest);
  const [maxPriceINR, setMaxPriceINR] = useState(30000);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (initialDest) {
      setSelectedDestination(initialDest.toLowerCase());
    }
  }, [initialDest]);

  const amenitiesList = ['All', 'Infinity Pool', 'Spa & Wellness', 'Free High-Speed WiFi', 'Ski-In/Ski-Out', 'Private Beach'];

  const filteredHotels = hotelsData.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDest =
      selectedDestination === 'all' ||
      hotel.destinationId.toLowerCase() === selectedDestination.toLowerCase() ||
      hotel.location.toLowerCase().includes(selectedDestination.toLowerCase());

    const matchesPrice = hotel.pricePerNight <= maxPriceINR;
    const matchesRating = hotel.rating >= minRating;
    const matchesAmenity =
      selectedAmenity === 'All' || hotel.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()));

    return matchesSearch && matchesDest && matchesPrice && matchesRating && matchesAmenity;
  });

  // Sorting
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === 'price_asc') return a.pricePerNight - b.pricePerNight;
    if (sortBy === 'price_desc') return b.pricePerNight - a.pricePerNight;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-[#0b1e36] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-2">
          <span className="px-3 py-1 bg-white/10 text-sky-300 text-xs font-semibold rounded-full backdrop-blur-md inline-block">
            ⚡ Real-Time Room Availability & Price Guarantee
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Top Luxury Hotels & Resorts
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Book verified stays worldwide with instant voucher delivery and flexible cancellation.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hotel name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
              />
            </div>

            {/* Destination Selector */}
            <div>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none bg-white"
              >
                <option value="all">All Destinations</option>
                <option value="maldives">Maldives</option>
                <option value="dubai">Dubai (UAE)</option>
                <option value="switzerland">Switzerland</option>
                <option value="bali">Bali (Indonesia)</option>
                <option value="greece">Greece</option>
                <option value="paris">Paris (France)</option>
              </select>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                <span>Max Rate / Night</span>
                <span className="text-[#0284c7]">{formatPrice(maxPriceINR)}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={30000}
                step={1000}
                value={maxPriceINR}
                onChange={(e) => setMaxPriceINR(Number(e.target.value))}
                className="w-full accent-[#0284c7] cursor-pointer"
              />
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none bg-white"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

          {/* Quick Amenity Tags */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-gray-500 flex-shrink-0">Amenities:</span>
            {amenitiesList.map((amenity) => (
              <button
                key={amenity}
                onClick={() => setSelectedAmenity(amenity)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold flex-shrink-0 transition-colors ${
                  selectedAmenity === amenity
                    ? 'bg-[#0284c7] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold text-gray-500">
            Found <span className="font-bold text-gray-900">{sortedHotels.length}</span> available properties
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Best Rate Guaranteed</span>
          </div>
        </div>

        {/* Hotels Grid */}
        {sortedHotels.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No hotels matched your filters</h3>
            <p className="text-xs text-gray-500 mt-1">Try increasing your budget limit or clearing filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDestination('all');
                setMaxPriceINR(30000);
                setSelectedAmenity('All');
              }}
              className="mt-4 px-4 py-2 bg-[#0284c7] text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Room status */}
                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Only {hotel.availableRooms} rooms available</span>
                  </div>

                  {hotel.badge && (
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {hotel.badge}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                      {[...Array(hotel.stars || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-xs font-bold text-gray-800 ml-1">
                        {hotel.rating.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-gray-400">({hotel.reviewsCount} reviews)</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0b1e36] group-hover:text-[#0284c7] transition-colors">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {hotel.location}
                    </p>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    {/* Amenity tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 3).map((am) => (
                        <span
                          key={am}
                          className="px-2 py-0.5 bg-sky-50 text-[#0284c7] text-[10px] font-semibold rounded"
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Book Button */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block line-through">
                        {formatPrice(hotel.originalPrice)}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-[#0284c7]">
                          {formatPrice(hotel.pricePerNight)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">/ night</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingModal(hotel, 'hotel')}
                      className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Book Now</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-gray-400">Loading hotels...</div>}>
      <HotelsContent />
    </Suspense>
  );
}
