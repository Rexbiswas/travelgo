'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Luggage, Calendar, MapPin, CheckCircle2, XCircle, Printer, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function BookingsPage() {
  const { bookings, cancelBooking, formatPrice } = useBooking();
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Banner */}
      <div className="bg-[#0b1e36] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Luggage className="w-3.5 h-3.5" />
            <span>Manage Your Reservations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            My Travel Bookings
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            View active reservations, digital check-in vouchers, and trip itineraries.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-lg mx-auto space-y-4">
            <Luggage className="w-16 h-16 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900">No active bookings yet</h3>
            <p className="text-xs text-gray-500">
              You haven&apos;t made any reservations yet. Start exploring top hotels and holiday packages today!
            </p>
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <span>Explore Top Hotels</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                Confirmed Trips ({bookings.length})
              </h2>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Pass
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {bookings.map((booking) => {
                const isConfirmed = booking.status === 'Confirmed';

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={booking.image || 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80'}
                        alt={booking.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isConfirmed
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {booking.status}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400 font-bold">
                            Ref: {booking.id}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900">
                          {booking.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                            {booking.destination}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {booking.checkIn} to {booking.checkOut}
                          </span>
                          <span>•</span>
                          <span>{booking.guests} Guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="flex sm:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 gap-3">
                      <div>
                        <span className="text-[10px] text-gray-400 block text-left md:text-right">Total Paid</span>
                        <span className="text-lg font-extrabold text-[#0284c7]">
                          {formatPrice(booking.totalPriceINR)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedVoucher(booking)}
                          className="px-3.5 py-2 bg-sky-50 hover:bg-[#0284c7] text-[#0284c7] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View Voucher</span>
                        </button>

                        {isConfirmed && (
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to cancel this reservation?')) {
                                cancelBooking(booking.id);
                              }
                            }}
                            className="px-3 py-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Voucher Modal */}
      {selectedVoucher && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedVoucher(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-gray-900">Official Booking Pass</h4>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="text-xs font-bold text-sky-400">TravelGo Reservation</span>
                <span className="text-xs font-mono text-emerald-400">{selectedVoucher.id}</span>
              </div>
              <h5 className="font-bold text-sm">{selectedVoucher.title}</h5>
              <p className="text-xs text-gray-300">Destination: {selectedVoucher.destination}</p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-gray-400 block">Dates</span>
                  <span>{selectedVoucher.checkIn} - {selectedVoucher.checkOut}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Total</span>
                  <span className="text-sky-400 font-bold">{formatPrice(selectedVoucher.totalPriceINR)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-[#0284c7] text-white rounded-xl text-xs font-bold"
              >
                Print / Save Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
