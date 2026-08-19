'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function ContactPage() {
  const { addToast } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Booking Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast({
        title: 'Incomplete Form',
        message: 'Please fill in your name, email, and message.',
        type: 'error',
      });
      return;
    }

    setSubmitted(true);
    addToast({
      title: 'Message Sent Successfully!',
      message: 'A TravelGo travel specialist will contact you within 15 minutes.',
      type: 'success',
      duration: 6000,
    });
  };

  const faqs = [
    {
      q: 'How does real-time booking confirmation work?',
      a: 'When you confirm a booking on TravelGo, our direct API integration reserves the hotel room or flight seat in real time. You receive an instant digital voucher and QR code on your screen and email.',
    },
    {
      q: 'Can I cancel or modify my reservation?',
      a: 'Yes! Most hotel bookings and vacation packages come with 100% free cancellation up to 48 hours prior to check-in. You can manage your trips directly from the "My Bookings" page.',
    },
    {
      q: 'What payment currencies and methods do you support?',
      a: 'We support all major payment methods including Credit/Debit Cards, UPI, Net Banking, Apple Pay, and Google Pay. You can switch between INR (₹), USD ($), EUR (€), and GBP (£) anytime from the top bar.',
    },
    {
      q: 'Do you provide Visa assistance and travel insurance?',
      a: 'Yes! All international packages include complimentary Visa documentation checklists and 24/7 travel insurance assistance.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Banner */}
      <div className="bg-[#0b1e36] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Clock className="w-3.5 h-3.5" />
            <span>24/7 Global Travel Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact & Support
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            Have questions about a destination or existing booking? Our dedicated team is available 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        
        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b1e36]">Call Center</h3>
              <p className="text-xs text-gray-500 mt-0.5">24/7 Toll-Free Support</p>
              <p className="text-xs font-bold text-[#0284c7] mt-2">+91 (800) 123-4567</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b1e36]">Email Support</h3>
              <p className="text-xs text-gray-500 mt-0.5">Average response: 10 mins</p>
              <p className="text-xs font-bold text-[#0284c7] mt-2">support@travelgo.com</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b1e36]">Global Headquarters</h3>
              <p className="text-xs text-gray-500 mt-0.5">TravelGo Tower, 4th Floor</p>
              <p className="text-xs font-bold text-gray-700 mt-2">Connaught Place, New Delhi</p>
            </div>
          </div>
        </div>

        {/* Contact Form & FAQ Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#0b1e36] mb-1">
              Send us a Message
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and an expert travel planner will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Thank You, {formData.name}!</h3>
                <p className="text-xs text-emerald-700">
                  Your message has been received. Our team is reviewing your inquiry and will reach out to {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Booking Inquiry', message: '' });
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Email *</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none bg-white font-medium"
                    >
                      <option value="Booking Inquiry">Hotel / Package Inquiry</option>
                      <option value="Custom Itinerary">Custom Tour Itinerary Request</option>
                      <option value="Existing Booking">Help with Existing Reservation</option>
                      <option value="Partnership">Hotel Partner / Corporate Travel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Message / Travel Details *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your dream destination, dates, number of guests, or special requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Travel Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-[#0b1e36] mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Quick answers to frequent traveler inquiries.
            </p>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-2"
                    >
                      <span className="text-xs font-bold text-gray-900">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-2 animate-in fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
