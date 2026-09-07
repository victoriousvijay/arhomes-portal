import React from 'react';
import { BRAND_INFO } from '../data/projectsData';
import { Award, ShieldCheck, Gem, Compass, CheckCircle2, Building2 } from 'lucide-react';

export const BrandHeritage = () => {
  return (
    <section id="heritage" className="py-24 bg-luxury-dark relative border-t border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-luxury-border shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="AR Homes Architectural Craftsmanship"
                className="w-full h-[450px] sm:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent" />
              
              {/* Floating Award Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-luxury-card/90 backdrop-blur-md border border-luxury-gold/40 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 border border-luxury-gold flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-white uppercase tracking-wider">
                    Architectural Developer of the Year
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Recognized for High-Rise Structural Innovation & Sustainability
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Border Box */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-luxury-gold pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-luxury-gold pointer-events-none" />
          </div>

          {/* Right Column: Editorial Heritage Story */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-luxury-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold">
                  Brand Philosophy
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                Sculpting Legacies <br />
                <span className="text-gold-gradient font-normal italic">Since 2011</span>
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              At AR Homes, real estate development transcends the assembly of concrete and glass. It is an art form centered on human aspiration. Over 15 years, we have cultivated an unwavering reputation for bringing architectural boldness and meticulous precision to Jaipur's premier landscapes.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              From our boutique luxury low-density independent floors in Civil Lines to the iconic modern residences of Vaishali Nagar and Jagatpura, every structure is engineered using precision aluminum formwork, seismic compliance, and environmental acoustics.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-luxury-black/60 rounded border border-luxury-border">
                <div className="flex items-center gap-2 text-luxury-gold font-serif text-sm font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% RERA Registered</span>
                </div>
                <p className="text-xs text-slate-400 font-light">
                  Complete legal transparency, clear titles, and escrow-backed fiscal compliance.
                </p>
              </div>

              <div className="p-4 bg-luxury-black/60 rounded border border-luxury-border">
                <div className="flex items-center gap-2 text-luxury-gold font-serif text-sm font-bold uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Mivan Monolithic Build</span>
                </div>
                <p className="text-xs text-slate-400 font-light">
                  Smooth seismic shear-wall concrete construction ensuring centuries of stability.
                </p>
              </div>

              <div className="p-4 bg-luxury-black/60 rounded border border-luxury-border">
                <div className="flex items-center gap-2 text-luxury-gold font-serif text-sm font-bold uppercase tracking-wider mb-1">
                  <Compass className="w-4 h-4" />
                  <span>100% Vaastu Harmonized</span>
                </div>
                <p className="text-xs text-slate-400 font-light">
                  All unit layouts are verified by master Vaastu consultants for positive energy flow.
                </p>
              </div>

              <div className="p-4 bg-luxury-black/60 rounded border border-luxury-border">
                <div className="flex items-center gap-2 text-luxury-gold font-serif text-sm font-bold uppercase tracking-wider mb-1">
                  <Gem className="w-4 h-4" />
                  <span>Artisanal Finishes</span>
                </div>
                <p className="text-xs text-slate-400 font-light">
                  Hand-selected Italian marbles, acoustic European double-glazing, and designer fittings.
                </p>
              </div>
            </div>

            {/* Leadership Quote */}
            <div className="border-l-2 border-luxury-gold pl-4 py-2 mt-6">
              <p className="text-xs italic text-slate-200 font-serif leading-relaxed">
                "We do not build merely for the present horizon; we design for generations who will inhabit these spaces fifty years from today."
              </p>
              <div className="text-[11px] font-semibold text-luxury-gold mt-1 uppercase tracking-wider">
                — Managing Director, AR Homes
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
