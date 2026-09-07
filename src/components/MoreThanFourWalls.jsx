import React, { useRef } from 'react';
import { GALLERY_INTERIORS } from '../data/projectsData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MoreThanFourWalls = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  return (
    <section id="philosophy" className="py-28 bg-[#F6F3EC] text-[#18261F] relative overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Centered Heading (Emarat exact style) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#01472E] leading-tight tracking-tight mb-8">
            More Than <br />
            <span className="italic">Four Walls</span>
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-[#46574F] font-normal leading-relaxed max-w-2xl mx-auto">
            The celebrations, the quiet evenings, the moments that bring everyone together — life's best moments happen at home. At AR Homes, this is where moments like these find their place. Thoughtfully planned, beautifully finished and built to a standard that makes every day feel a little more special.
          </p>
        </div>

      </div>

      {/* Horizontal Scrolling Gallery */}
      <div className="relative w-full">
        
        {/* Gallery Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar px-6 sm:px-16 py-4 cursor-grab active:cursor-grabbing"
        >
          {/* Main Large Emarat Interior Image */}
          <div className="shrink-0 w-[85vw] max-w-[900px] h-[450px] sm:h-[550px] rounded-sm overflow-hidden shadow-xl">
            <img
              src="/assets/interior-living.jpeg"
              alt="AR Homes Living Pavilion"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Additional Curated Interior Slides */}
          {GALLERY_INTERIORS.map((item, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[75vw] max-w-[650px] h-[450px] sm:h-[550px] rounded-sm overflow-hidden shadow-lg relative group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <h4 className="font-serif text-2xl text-white font-medium">{item.title}</h4>
                <p className="text-xs text-white/80 mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Controls */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex justify-end gap-3 mt-6">
          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full border border-[#01472E]/30 hover:border-[#01472E] hover:bg-[#01472E] text-[#01472E] hover:text-white transition-all flex items-center justify-center shadow-sm"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-full border border-[#01472E]/30 hover:border-[#01472E] hover:bg-[#01472E] text-[#01472E] hover:text-white transition-all flex items-center justify-center shadow-sm"
            aria-label="Scroll gallery right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </section>
  );
};
