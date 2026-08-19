'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

export default function Toast() {
  const { toasts, removeToast } = useBooking();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3.5 border flex items-start gap-3 animate-in slide-in-from-right duration-300 ${
              isSuccess
                ? 'border-emerald-200 text-emerald-900'
                : isError
                ? 'border-rose-200 text-rose-900'
                : 'border-sky-200 text-slate-900'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
              {isInfo && <Info className="w-5 h-5 text-[#0284c7]" />}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold">{toast.title}</h5>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 p-1 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
