import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  ArrowRight, 
  Home, 
  CheckCircle2
} from 'lucide-react';

export const RentHeroCarousel = ({ rentals = [], onOpenEnquiry }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideDuration = 6000; // 6 seconds per slide
  const progressIntervalRef = useRef(null);

  const slides = rentals.length > 0 ? rentals : [];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleSelectSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Progress and Auto-rotation
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const stepTime = 50;
    const increment = (stepTime / slideDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, slides.length]);

  if (slides.length === 0) return null;

  const currentRental = slides[currentIndex];

  return (
    <div 
      className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[680px] bg-[#050c08] overflow-hidden select-none flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Ken Burns and Crossfade Effects */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Luxury Cinematic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              {/* Subtle Brand Tint */}
              <div className="absolute inset-0 bg-[#013724]/20 mix-blend-multiply pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Top Breadcrumbs Navigation */}
      <div className="relative z-20 pt-28 sm:pt-32 px-6 sm:px-12 max-w-[1440px] mx-auto w-full">
        <nav className="flex items-center gap-2 text-xs text-gray-300">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-[#D4AF37] font-medium tracking-wide">Rental Listings</span>
        </nav>
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-20 px-6 sm:px-12 max-w-[1440px] mx-auto w-full py-8 sm:py-12 my-auto">
        <div className="max-w-3xl">
          
          {/* Title with Smooth Typography (No clutter labels) */}
          <h1 
            key={`rent-title-${currentIndex}`}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            {currentRental.title}
          </h1>

          {/* Location Bar */}
          <div 
            key={`rent-loc-${currentIndex}`}
            className="flex items-center gap-2 text-sm sm:text-base text-gray-200 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700"
          >
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="font-light">{currentRental.location}</span>
          </div>

          {/* Overview Snippet */}
          <p 
            key={`rent-desc-${currentIndex}`}
            className="text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-2xl mb-6 line-clamp-2 sm:line-clamp-3 animate-in fade-in slide-in-from-bottom-2 duration-700"
          >
            {currentRental.overview}
          </p>

          {/* Key Feature Chips */}
          <div 
            key={`rent-feats-${currentIndex}`}
            className="flex flex-wrap gap-2 sm:gap-3 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700"
          >
            {currentRental.tags && currentRental.tags.slice(0, 3).map((tag, tIdx) => (
              <div 
                key={tIdx} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-xs text-gray-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-medium">{tag}</span>
              </div>
            ))}
          </div>

          {/* Rent & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">Monthly Rent</span>
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{currentRental.rent}</span>
              <span className="block text-[11px] text-gray-300 font-light mt-0.5">{currentRental.deposit}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry({ title: `Schedule Rental Visit - ${currentRental.title}` })}
                className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#013724] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
              >
                <span>Schedule Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry({ title: `Lease Enquiry - ${currentRental.title}` })}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer hover:border-white/40"
              >
                Enquire Terms
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Carousel Controls & Property Pills */}
      <div className="relative z-20 px-6 sm:px-12 max-w-[1440px] mx-auto w-full pb-8">
        
        {/* Progress Bar Indicator */}
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-5">
          <div 
            className="bg-[#D4AF37] h-full transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Quick Property Selector Pills (Desktop/Tablet) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {slides.map((slide, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={slide.id || idx}
                  onClick={() => handleSelectSlide(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#013724]/90 text-white border-[#D4AF37] shadow-lg shadow-[#013724]/50 scale-105'
                      : 'bg-black/40 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#D4AF37] animate-pulse' : 'bg-gray-600'}`} />
                  <span>{slide.title.split(' ')[0]} {slide.title.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows & Counter */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            <span className="text-xs text-gray-400 font-mono">
              <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-black/50 hover:bg-[#D4AF37] text-white hover:text-[#013724] border border-white/15 hover:border-[#D4AF37] transition-all cursor-pointer backdrop-blur-md active:scale-95"
                aria-label="Previous rental slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-black/50 hover:bg-[#D4AF37] text-white hover:text-[#013724] border border-white/15 hover:border-[#D4AF37] transition-all cursor-pointer backdrop-blur-md active:scale-95"
                aria-label="Next rental slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RentHeroCarousel;
