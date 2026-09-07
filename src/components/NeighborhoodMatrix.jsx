import React, { useState } from 'react';
import { CONNECTIVITY_DATA } from '../data/projectsData';
import { MapPin, Navigation, Clock, Car, School, HeartPulse, ShoppingBag, ArrowUpRight } from 'lucide-react';

export const NeighborhoodMatrix = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const getCategoryIcon = (idx) => {
    switch (idx) {
      case 0: return <Car className="w-4 h-4" />;
      case 1: return <School className="w-4 h-4" />;
      case 2: return <HeartPulse className="w-4 h-4" />;
      case 3: return <ShoppingBag className="w-4 h-4" />;
      default: return <Navigation className="w-4 h-4" />;
    }
  };

  return (
    <section id="connectivity" className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-luxury-border/60 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-luxury-gold" />
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold">
                Strategic Geography
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              The Epicenter of <span className="text-gold-gradient font-normal italic">Connectivity</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-slate-400 text-sm max-w-md font-light">
            Situated right at Outer Ring Road Exit 2 in Kollur, AR Homes developments connect seamlessly to the Financial District, HITEC City, and international transport hubs.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {CONNECTIVITY_DATA.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(idx)}
              className={`p-4 rounded-md border text-left transition-all flex items-center gap-3 ${
                activeCategory === idx
                  ? 'bg-luxury-gold text-luxury-black border-luxury-gold shadow-lg shadow-luxury-gold/20'
                  : 'bg-luxury-card border-luxury-border text-slate-300 hover:border-luxury-gold/50 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded ${activeCategory === idx ? 'bg-luxury-black text-luxury-gold' : 'bg-luxury-black/60 text-luxury-gold'}`}>
                {getCategoryIcon(idx)}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">{cat.category}</div>
                <div className={`text-[10px] ${activeCategory === idx ? 'text-luxury-black/80' : 'text-slate-400'}`}>
                  {cat.destinations.length} Key Hubs
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content Layout: Destinations Grid + Simulated Interactive Geographic Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Destinations Cards */}
          <div className="lg:col-span-7 space-y-4">
            {CONNECTIVITY_DATA[activeCategory].destinations.map((dest, i) => (
              <div
                key={i}
                className="glass-card p-5 rounded-md border border-luxury-border hover:border-luxury-gold/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-luxury-gold group-hover:text-luxury-black transition-colors text-luxury-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white group-hover:text-luxury-gold transition-colors">
                      {dest.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-light mt-0.5">
                      {dest.desc}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-luxury-border/60 shrink-0">
                  <span className="font-serif text-sm font-bold text-luxury-gold">
                    {dest.time}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {dest.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Geographic Map / Strategic Node View */}
          <div className="lg:col-span-5 rounded-lg overflow-hidden border border-luxury-border bg-luxury-card p-6 flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                  Location Matrix & Corridor
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Traffic: Smooth Flow
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Outer Ring Road Growth Corridor
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                Kollur is positioned directly between the bustling financial headquarters of Gachibowli and the forthcoming Neopolis high-density SEZ, giving homeowners unparalleled capital appreciation.
              </p>

              {/* Geographic Schematic Highlights */}
              <div className="space-y-3 bg-luxury-black/70 p-4 rounded border border-luxury-border/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Signal-Free Radial Road</span>
                  <span className="text-luxury-gold font-semibold">100 Feet Express Avenue</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Upcoming Metro Phase 2</span>
                  <span className="text-luxury-gold font-semibold">Scheduled Neopolis Extension</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Lakefront Ecological Buffer</span>
                  <span className="text-luxury-gold font-semibold">Osman Sagar Conservation Zone</span>
                </div>
              </div>
            </div>

            {/* Direct Directions CTA */}
            <div className="mt-8 pt-4 border-t border-luxury-border/60 relative z-10">
              <a
                href="https://maps.google.com/?q=AR+Homes+Kollur+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-luxury-black hover:bg-luxury-gold text-slate-200 hover:text-luxury-black border border-luxury-border hover:border-luxury-gold rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
