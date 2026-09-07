import React, { useState } from 'react';
import { RESIDENCES } from '../data/projectsData';
import { ChevronLeft, ChevronRight, ArrowRight, Home, Maximize, Wind, Sun } from 'lucide-react';

export const FeaturedProjects = ({ onSelectResidence, onOpenEnquiry }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeResidence = RESIDENCES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? RESIDENCES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === RESIDENCES.length - 1 ? 0 : prev + 1));
  };

  const getFeatureIcon = (type) => {
    switch (type) {
      case 'home':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-[#01472E]" fill="none" strokeWidth="1.6">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'maximize':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-[#01472E]" fill="none" strokeWidth="1.6">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        );
      case 'wind':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-[#01472E]" fill="none" strokeWidth="1.6">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current text-[#01472E]" fill="none" strokeWidth="1.6">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
          </svg>
        );
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#F6F3EC] text-[#18261F] relative border-t border-[#E8E3D7]">
      <span id="residences" className="sr-only" />
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Section Pre-title and Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#01472E] font-medium mb-3">
              — The Residences
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#01472E] tracking-tight">
              Find your dream home<span className="text-[#D4AF37]">.</span>
            </h2>
          </div>

          <a
            href="#residences"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#01472E] hover:text-[#0B5B3E] transition-colors border-b border-[#01472E] pb-0.5"
          >
            <span>All residences</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Main Showcase Stage (Emarat exact card layout) */}
        <div className="bg-white rounded-md p-6 sm:p-10 shadow-sm border border-[#E5E0D4] mb-10 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Building Photography */}
            <div className="lg:col-span-6 h-[340px] sm:h-[460px] rounded overflow-hidden shadow-md relative group">
              <img
                src={activeResidence.image}
                alt={activeResidence.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-[#01472E] text-[#D4AF37] px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
                {activeResidence.status}
              </div>
            </div>

            {/* Right: Specifications & CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full py-2">
              <div>
                <h3 className="font-serif text-3xl sm:text-5xl font-normal text-[#01472E] mb-6">
                  {activeResidence.title}
                </h3>

                {/* Location & Built Form Grid */}
                <div className="grid grid-cols-2 gap-6 py-4 border-y border-[#ECE7DC] mb-8 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-[#7D8F86] font-semibold mb-1">
                      LOCATION
                    </span>
                    <span className="font-medium text-[#18261F] text-sm sm:text-base">
                      {activeResidence.location}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-[#7D8F86] font-semibold mb-1">
                      BUILT FORM
                    </span>
                    <span className="font-medium text-[#18261F] text-sm sm:text-base">
                      {activeResidence.builtForm}
                    </span>
                  </div>
                </div>

                {/* 4 Feature Icons Row (Emarat exact) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {activeResidence.features.map((feat, i) => (
                    <div key={i} className="flex flex-col items-start">
                      <div className="w-10 h-10 rounded bg-[#F6F3EC] border border-[#ECE7DC] flex items-center justify-center mb-2">
                        {getFeatureIcon(feat.icon)}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#18261F] leading-tight">
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#5A6E64] font-light leading-relaxed mb-8">
                  {activeResidence.overview}
                </p>
              </div>

              {/* View Residence Pill Button & Slider Arrows */}
              <div className="flex items-center justify-between pt-4 border-t border-[#ECE7DC]">
                <button
                  onClick={() => onSelectResidence(activeResidence)}
                  className="px-8 py-3.5 rounded-full bg-[#01472E] hover:bg-[#0B5B3E] text-white text-xs uppercase font-semibold tracking-wider transition-all duration-300 shadow-sm"
                >
                  VIEW RESIDENCE
                </button>

                {/* Controls */}
                <div className="flex items-center gap-2 text-[#01472E]">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-[#01472E]/30 hover:border-[#01472E] hover:bg-[#01472E] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Previous residence"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-[#01472E]/30 hover:border-[#01472E] hover:bg-[#01472E] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Next residence"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom 4 Horizontal Project Tabs (Emarat exact bottom bar) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {RESIDENCES.slice(0, 4).map((res, idx) => (
            <button
              key={res.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-4 rounded-sm text-left transition-all duration-300 border ${
                activeIndex === idx
                  ? 'bg-[#01472E] text-white border-[#01472E] shadow-md'
                  : 'bg-white text-[#18261F] border-[#ECE7DC] hover:border-[#01472E]/50'
              }`}
            >
              <div className={`font-serif text-sm sm:text-base font-medium truncate ${activeIndex === idx ? 'text-white' : 'text-[#01472E]'}`}>
                {res.title}
              </div>
              <div className={`text-[10px] uppercase tracking-wider mt-0.5 truncate ${activeIndex === idx ? 'text-[#D4AF37]' : 'text-[#7D8F86]'}`}>
                {res.location}
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
