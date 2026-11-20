'use client';

import React from 'react';
import { Users, Ticket, Building2, Globe2 } from 'lucide-react';

export default function StatisticsStrip() {
  const stats = [
    {
      id: 1,
      icon: <Users className="w-4.5 h-4.5 text-[#652BE8]" />,
      number: '10M+',
      label: 'Happy Travelers',
    },
    {
      id: 2,
      icon: <Ticket className="w-4.5 h-4.5 text-[#652BE8]" />,
      number: '50M+',
      label: 'Tickets Booked',
    },
    {
      id: 3,
      icon: <Building2 className="w-4.5 h-4.5 text-[#652BE8]" />,
      number: '5,000+',
      label: 'Verified Operators',
    },
    {
      id: 4,
      icon: <Globe2 className="w-4.5 h-4.5 text-[#652BE8]" />,
      number: '100+',
      label: 'Cities & Countries',
    },
  ];

  return (
    <section className="w-full bg-[#EAE6F8]/70 border-t border-purple-100/80 py-3.5 mt-3 sm:mt-4">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-between">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-8.5 h-8.5 rounded-lg bg-purple-100/80 flex items-center justify-center flex-shrink-0 shadow-xs">
                {stat.icon}
              </div>
              <div>
                <span className="text-base sm:text-[18px] font-black text-[#11152F] tracking-tight block leading-none">
                  {stat.number}
                </span>
                <span className="text-[11px] text-[#60647A] font-semibold block mt-0.5 leading-none">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
