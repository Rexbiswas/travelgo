'use client';

import React from 'react';
import BrandLogo from '@/components/ui/BrandLogo';
import { Check, Bus, Train, Plane } from 'lucide-react';

export default function AppPromotion() {
  return (
    <div className="w-full bg-[#EAE6F8] rounded-xl border border-purple-200/60 p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-xs">
      
      {/* Smartphone Mockup on Left */}
      <div className="flex-shrink-0 w-[110px] sm:w-[115px]">
        <div className="w-full bg-slate-900 p-1.5 rounded-[18px] shadow-md border border-slate-800">
          <div className="bg-white rounded-[14px] p-2 flex flex-col items-center min-h-[120px]">
            {/* Notch */}
            <div className="w-7 h-1 bg-slate-300 rounded-full mb-1.5"></div>
            
            {/* Brand */}
            <div className="flex items-center gap-1">
              <BrandLogo size={14} />
              <span className="text-[9.5px] font-black text-[#11152F]">Travel<span className="text-[#652BE8]">Go</span></span>
            </div>

            {/* Transport tabs */}
            <div className="grid grid-cols-3 gap-1 w-full mt-2">
              <div className="bg-purple-50 rounded p-1 flex flex-col items-center">
                <Bus className="w-2.5 h-2.5 text-[#652BE8]" />
                <span className="text-[7.5px] font-bold text-gray-700 mt-0.2">Bus</span>
              </div>
              <div className="bg-purple-50 rounded p-1 flex flex-col items-center">
                <Train className="w-2.5 h-2.5 text-[#652BE8]" />
                <span className="text-[7.5px] font-bold text-gray-700 mt-0.2">Train</span>
              </div>
              <div className="bg-purple-50 rounded p-1 flex flex-col items-center">
                <Plane className="w-2.5 h-2.5 text-[#652BE8]" />
                <span className="text-[7.5px] font-bold text-gray-700 mt-0.2">Flight</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
        
        {/* Title & QR Code */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-[15px] font-black text-[#11152F] leading-tight">
              Get the <span className="text-[#652BE8]">TravelGo</span> App
            </h3>

            {/* Checklist */}
            <div className="space-y-1 mt-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2 h-2 text-emerald-600 font-bold" />
                </div>
                <span className="text-[11px] font-semibold text-[#11152F]">Faster booking</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2 h-2 text-emerald-600 font-bold" />
                </div>
                <span className="text-[11px] font-semibold text-[#11152F]">Real-time trip alerts</span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2 h-2 text-emerald-600 font-bold" />
                </div>
                <span className="text-[11px] font-semibold text-[#11152F]">Exclusive app-only deals</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="w-9 h-9 bg-white rounded-lg p-0.5 shadow-xs border border-purple-200/50 flex-shrink-0">
            <img 
              src="/images/qr_code_clean.png" 
              alt="Scan QR code" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Store Badges */}
        <div className="flex items-center gap-1.5 mt-2.5">
          {/* App Store */}
          <button 
            type="button" 
            className="h-7 px-2 bg-black hover:bg-slate-800 text-white rounded-md flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.66-2.85 1.45-.61.7-.99 1.77-.85 2.82 1.12.09 2.1-.54 2.74-1.32z"/>
            </svg>
            <div className="text-left leading-none">
              <span className="text-[6.5px] text-white/80 block">Download on</span>
              <span className="text-[8.5px] font-bold block">App Store</span>
            </div>
          </button>

          {/* Google Play */}
          <button 
            type="button" 
            className="h-7 px-2 bg-black hover:bg-slate-800 text-white rounded-md flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.35 0 .68.12.94.34l11.5 8.5c.67.5.67 1.5 0 2l-11.5 8.5c-.26.22-.59.34-.94.34-.83 0-1.5-.67-1.5-1.5z"/>
            </svg>
            <div className="text-left leading-none">
              <span className="text-[6.5px] text-white/80 block">GET IT ON</span>
              <span className="text-[8.5px] font-bold block">Google Play</span>
            </div>
          </button>
        </div>

      </div>

    </div>
  );
}
