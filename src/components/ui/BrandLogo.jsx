'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BrandLogo({ size = 32, className = '' }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 128 128" 
        width="100%" 
        height="100%"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7C3AED" />
            <stop offset="50%" stop-color="#652BE8" />
            <stop offset="100%" stop-color="#5218C5" />
          </linearGradient>

          <linearGradient id="logoWingTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="100%" stop-color="#F5F3FF" />
          </linearGradient>

          <linearGradient id="logoWingShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#EBE5FF" />
            <stop offset="100%" stop-color="#D8CCFF" />
          </linearGradient>

          <linearGradient id="logoFoldCrease" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#DDD2FE" />
            <stop offset="100%" stop-color="#C4B5FD" />
          </linearGradient>

          <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#3B0764" flood-opacity="0.3" />
          </filter>
        </defs>

        {/* Rounded Squircle Badge */}
        <rect width="128" height="128" rx="30" fill="url(#logoBgGrad)" />

        {/* Inner Specular Highlight */}
        <rect x="2" y="2" width="124" height="124" rx="28" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.25" />

        {/* Dynamic Origami Paper Plane */}
        <g transform="translate(64, 64) rotate(-8) translate(-64, -64)" filter="url(#logoShadow)">
          <path d="M 104 26 L 30 68 L 56 78 Z" fill="url(#logoWingTop)" />
          <path d="M 104 26 L 56 78 L 74 102 Z" fill="url(#logoWingShade)" />
          <path d="M 56 78 L 68 89 L 74 102 Z" fill="url(#logoFoldCrease)" />
          <path d="M 104 26 L 56 78" stroke="#DDD6FE" stroke-width="1.2" stroke-linecap="round" />
        </g>
      </svg>
    </div>
  );
}
