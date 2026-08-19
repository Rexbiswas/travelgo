'use client';

import React, { useState } from 'react';
import { X, Calendar, Users, Star, CheckCircle, ShieldCheck, Tag, CreditCard, Download, Sparkles, MapPin } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function BookingModal() {
  const { bookingModalState, closeBookingModal, formatPrice, getRawConvertedPrice, addBooking, user, currency } = useBooking();
  const { isOpen, item, type } = bookingModalState;

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [customerName, setCustomerName] = useState(user?.name || 'Alex Morgan');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'alex.morgan@travelgo.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);
  const [specialRequests, setSpecialRequests] = useState('');

  if (!isOpen || !item) return null;

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(86400000, d2 - d1);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Base price calculation
  const basePricePerUnit = item.pricePerNight || item.price || 10000;
  const subtotalINR = type === 'package' ? basePricePerUnit * guests : basePricePerUnit * nights * rooms;
  const discountAmountINR = Math.round(subtotalINR * (discountPercent / 100));
  const taxesINR = Math.round((subtotalINR - discountAmountINR) * 0.12); // 12% GST / tourism tax
  const totalAmountINR = subtotalINR - discountAmountINR + taxesINR;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TRAVELGO10' || promoCode.trim().toUpperCase() === 'EXPLORE') {
      setDiscountPercent(10);
    } else if (promoCode.trim().toUpperCase() === 'FIRSTTRIP') {
      setDiscountPercent(15);
    } else {
      alert('Invalid code. Try "TRAVELGO10" for 10% off!');
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail) {
      alert('Please fill in your name and email');
      return;
    }

    const bookingPayload = {
      title: item.name || item.title,
      destination: item.location || item.destination,
      type: type || 'hotel',
      checkIn,
      checkOut,
      nights,
      guests,
      rooms,
      totalPriceINR: totalAmountINR,
      image: item.image,
      bookingRef: `TG-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
    };

    const confirmed = addBooking(bookingPayload);
    setConfirmedBookingData(confirmed);
    setStep('success');
  };

  const handleResetAndClose = () => {
    setStep('form');
    setConfirmedBookingData(null);
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-bold text-gray-900">
              {step === 'form' ? `Instant Reservation - ${item.name || item.title}` : 'Booking Confirmed!'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'form' ? (
          <form onSubmit={handleConfirmBooking} className="p-6 space-y-6">
            
            {/* Item Card Summary */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name || item.title}
                className="w-20 h-20 rounded-xl object-cover shadow-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating || '5.0'}</span>
                  <span className="text-gray-500 font-normal">({item.reviewsCount || 240} reviews)</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  {item.name || item.title}
                </h4>
                <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#0284c7]" />
                  {item.location || item.destination}
                </p>
                <p className="text-xs font-bold text-[#0284c7] mt-1">
                  {formatPrice(basePricePerUnit)} {type === 'package' ? '/ person' : '/ night'}
                </p>
              </div>
            </div>

            {/* Travel Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Total Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full text-xs font-medium px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {type !== 'package' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Rooms
                  </label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full text-xs font-medium px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Guest Contact Information */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Primary Traveler Details
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  required
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number (e.g. +91 98765 43210)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
              />
            </div>

            {/* Promo Code Box */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (e.g. TRAVELGO10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2 border border-gray-200 rounded-xl uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Price Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>
                  {formatPrice(basePricePerUnit)} x {type === 'package' ? `${guests} travelers` : `${nights} nights, ${rooms} room`}
                </span>
                <span className="font-semibold">{formatPrice(subtotalINR)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Special Promo Discount ({discountPercent}%)</span>
                  <span>- {formatPrice(discountAmountINR)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Taxes & Tourism Fees (12%)</span>
                <span>{formatPrice(taxesINR)}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-[#0b1e36]">
                <span>Total Amount ({currency})</span>
                <span className="text-[#0284c7] text-base">{formatPrice(totalAmountINR)}</span>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Free cancellation up to 48 hours before check-in. Instant digital voucher confirmation.
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Confirm & Book Now ({formatPrice(totalAmountINR)})</span>
            </button>
          </form>
        ) : (
          /* Confirmation / Digital Boarding Voucher */
          <div className="p-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-gray-900">
                Reservation Confirmed!
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                A confirmation email with voucher PDF has been dispatched to{' '}
                <span className="font-semibold text-gray-800">{customerEmail}</span>
              </p>
            </div>

            {/* Voucher Card matching real-time booking */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 text-left shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>

              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400">
                    Official Travel Voucher
                  </span>
                  <p className="text-base font-extrabold">{confirmedBookingData?.title}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400">Booking Ref</span>
                  <p className="text-xs font-mono font-bold text-emerald-400">
                    {confirmedBookingData?.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 text-xs border-b border-slate-700">
                <div>
                  <span className="text-gray-400 text-[10px]">Guest Name</span>
                  <p className="font-semibold">{confirmedBookingData?.customerName}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px]">Destination</span>
                  <p className="font-semibold">{confirmedBookingData?.destination}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px]">Check-In</span>
                  <p className="font-semibold">{confirmedBookingData?.checkIn}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px]">Check-Out</span>
                  <p className="font-semibold">{confirmedBookingData?.checkOut}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px]">Guests</span>
                  <p className="font-semibold">{confirmedBookingData?.guests} Adults</p>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px]">Total Paid</span>
                  <p className="font-bold text-sky-400">
                    {formatPrice(confirmedBookingData?.totalPriceINR || 0)}
                  </p>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Guaranteed Stay
                </span>
                <span className="font-mono text-[10px]">VERIFIED TRAVELGO QR PASS</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Print / Save Voucher</span>
              </button>
              <button
                onClick={handleResetAndClose}
                className="flex-1 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
