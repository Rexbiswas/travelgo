'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plane, Lock, Mail, User, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, loginUser, logoutUser, addToast } = useBooking();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      addToast({
        title: 'Error',
        message: 'Please enter your email',
        type: 'error',
      });
      return;
    }

    loginUser(name || email.split('@')[0], email);
    router.push('/');
  };

  const handleDemoLogin = (demoName, demoEmail) => {
    setName(demoName);
    setEmail(demoEmail);
    loginUser(demoName, demoEmail);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 group justify-center">
            <span className="text-3xl font-extrabold tracking-tight text-[#0b1e36]">
              Travel<span className="text-[#0284c7]">Go</span>
            </span>
            <Plane className="w-7 h-7 text-[#0284c7] transform -rotate-12" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">
            {user?.isLoggedIn
              ? 'Traveler Account Portal'
              : isRegister
              ? 'Create Your TravelGo Account'
              : 'Sign In to Your Account'}
          </h2>
          <p className="text-xs text-gray-500">
            Access exclusive member discounts, real-time trip status, and instant vouchers.
          </p>
        </div>

        {user?.isLoggedIn ? (
          /* Profile Card if already logged in */
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-sky-100 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-sky-50 text-[#0284c7] font-bold text-xs rounded-full border border-sky-200">
                {user.membership || 'TravelGo Member'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/bookings"
                className="py-2.5 bg-sky-50 hover:bg-[#0284c7] text-[#0284c7] hover:text-white rounded-xl text-xs font-bold transition-colors"
              >
                My Bookings
              </Link>
              <Link
                href="/destinations"
                className="py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors"
              >
                Explore Deals
              </Link>
            </div>

            <button
              onClick={() => logoutUser()}
              className="w-full py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Auth Form */
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
            
            {/* 1-Click Demo Login Bar */}
            <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100 space-y-2">
              <span className="text-[11px] font-bold text-sky-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                1-Click Quick Demo Sign-In:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Alex Morgan', 'alex.morgan@travelgo.com')}
                  className="flex-1 py-1.5 bg-white hover:bg-sky-100 text-xs font-bold text-[#0284c7] rounded-lg border border-sky-200 shadow-2xs transition-colors"
                >
                  Alex (Elite VIP)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Priya Sharma', 'priya.sharma@travelgo.com')}
                  className="flex-1 py-1.5 bg-white hover:bg-sky-100 text-xs font-bold text-gray-700 rounded-lg border border-gray-200 shadow-2xs transition-colors"
                >
                  Priya (Explorer)
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="traveler@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-[#0284c7] hover:underline font-semibold"
              >
                {isRegister
                  ? 'Already have an account? Sign In'
                  : 'New to TravelGo? Create an account'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
