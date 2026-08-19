'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Heart, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { photoGalleryData } from '@/data/travelData';

export default function PhotoGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [photoLikes, setPhotoLikes] = useState({});
  const sectionRef = useRef(null);
  const photosRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              photosRef.current.filter(Boolean),
              { scale: 0.8, opacity: 0, y: 40 },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: 'back.out(1.4)',
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setPhotoLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === 0 ? photoGalleryData.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === photoGalleryData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="py-14 sm:py-18 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with blue underline */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1e36] uppercase tracking-wider relative inline-block">
            PHOTO GALLERY
            <span className="block w-16 h-1 bg-[#0284c7] mx-auto mt-2 rounded-full" />
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            Glimpses of pristine paradises and iconic architectural wonders from our global travelers.
          </p>
        </div>

        {/* 6 Photos Grid matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {photoGalleryData.map((item, index) => {
            const currentLikes = item.likes + (photoLikes[item.id] || 0);
            return (
              <div
                key={item.id}
                ref={(el) => (photosRef.current[index] = el)}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 bg-gray-100 will-change-transform"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-120"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-sky-200 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activePhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 hidden sm:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 hidden sm:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoGalleryData[activePhotoIndex].image}
                alt={photoGalleryData[activePhotoIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
              />

              <div className="w-full mt-4 flex items-center justify-between text-white px-2">
                <div>
                  <h3 className="text-lg font-bold">
                    {photoGalleryData[activePhotoIndex].title}
                  </h3>
                  <p className="text-xs text-sky-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {photoGalleryData[activePhotoIndex].location}
                  </p>
                </div>

                <button
                  onClick={(e) => handleLike(photoGalleryData[activePhotoIndex].id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-rose-500 transition-colors text-xs font-semibold"
                >
                  <Heart className="w-4 h-4 fill-current text-rose-400" />
                  <span>
                    {(
                      photoGalleryData[activePhotoIndex].likes +
                      (photoLikes[photoGalleryData[activePhotoIndex].id] || 0)
                    ).toLocaleString()}{' '}
                    likes
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
