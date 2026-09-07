import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero = ({ onOpenEnquiry }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const headlines = [
    { line1: "Building Spaces That", line2: "Feel Like Home" },
    { line1: "Designed With", line2: "Quality That Lasts" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end pb-20 sm:pb-28 pt-24 overflow-hidden">
      
      {/* Exact Emarat Dusk Architectural Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-building.jpeg"
          alt="AR Homes Luxury Architectural Residence"
          className="w-full h-full object-cover object-center brightness-[0.9] contrast-[1.05]"
        />
        {/* Subtle vignette gradient to ensure white text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 w-full">
        
        {/* Editorial Serif Headline at Bottom-Left (Emarat exact placement & typography) */}
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.05] tracking-tight drop-shadow-lg transition-all duration-700">
            <span className="block font-serif">
              {headlines[headlineIndex].line1}
            </span>
            <span className="block font-serif italic text-white/95">
              {headlines[headlineIndex].line2}
            </span>
          </h1>
        </div>

        {/* Center Bottom SCROLL Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center">
          <a
            href="#philosophy"
            className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-[10px] tracking-[0.3em] font-medium uppercase">
              SCROLL
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
          </a>
        </div>

      </div>

    </section>
  );
};
