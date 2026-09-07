import React from 'react';

export const ParallaxQuote = () => {
  return (
    <section className="relative py-36 overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/assets/interior-night.jpeg')" }}>
      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-[#001D13]/80 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mb-8" />
        
        <blockquote className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight tracking-tight mb-8">
          "Quality is our foundation, not just a feature. We craft living spaces meant to endure for generations."
        </blockquote>

        <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
          — AR Homes Architectural Philosophy
        </div>
      </div>
    </section>
  );
};
