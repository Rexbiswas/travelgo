'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Luggage, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Sparkles, 
  ArrowRight, 
  Bus, 
  Train, 
  Plane,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';

export default function BookingsPage() {
  const { bookings, cancelBooking } = useBooking();
  const [tab, setTab] = useState('all');

  const defaultMockBookings = [
    {
      id: 'TG-BK-10492',
      service: 'TravelGo Express Gold Coach',
      mode: 'Bus',
      from: 'New Delhi (NDLS)',
      to: 'Mumbai Central (BOM)',
      date: 'Fri, 14 Feb 2025',
      time: '06:30 AM',
      seat: '14A (Window)',
      status: 'Confirmed',
      price: '$42.00',
    },
    {
      id: 'TG-BK-10381',
      service: 'AirGo Express 6E-204',
      mode: 'Flight',
      from: 'New Delhi (DEL)',
      to: 'Goa (GOI)',
      date: 'Sat, 22 Feb 2025',
      time: '09:20 AM',
      seat: '12F (Standard)',
      status: 'Confirmed',
      price: '$89.00',
    }
  ];

  const displayBookings = bookings.length > 0 ? bookings : defaultMockBookings;

  return (
    <div className="min-h-screen bg-[#F8F8FC] py-8 sm:py-12">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-9">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#652BE8] text-xs font-bold mb-3">
            <Luggage className="w-3.5 h-3.5" />
            <span>Passenger Dashboard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#11152F] tracking-tight">
            My Travel <span className="text-[#652BE8]">Trips & Bookings</span>
          </h1>
          <p className="text-sm sm:text-base text-[#60647A] mt-2">
            View your active e-tickets, digital boarding passes, connection updates, and travel receipts.
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {displayBookings.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:border-purple-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#652BE8] shadow-xs flex-shrink-0">
                  {b.mode === 'Flight' ? <Plane className="w-6 h-6" /> : b.mode === 'Train' ? <Train className="w-6 h-6" /> : <Bus className="w-6 h-6" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#652BE8]">{b.id}</span>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {b.status}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#11152F] mt-1">{b.service}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{b.from} → {b.to}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="text-left sm:text-right">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{b.date} • {b.time}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-700 mt-0.5 block">Seat: {b.seat || '12B'}</span>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-[#652BE8] block leading-none">{b.price || '$42'}</span>
                  <button 
                    onClick={() => window.print?.()}
                    className="text-[11px] text-[#652BE8] font-bold hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print Ticket</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
