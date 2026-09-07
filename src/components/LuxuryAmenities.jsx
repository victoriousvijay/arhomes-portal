import React from 'react';
import { AMENITIES } from '../data/projectsData';
import { Waves, Castle, Film, Dumbbell, Leaf, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const LuxuryAmenities = () => {
  const getAmenityIcon = (iconName) => {
    switch (iconName) {
      case 'waves': return <Waves className="w-6 h-6 text-luxury-gold" />;
      case 'castle': return <Castle className="w-6 h-6 text-luxury-gold" />;
      case 'film': return <Film className="w-6 h-6 text-luxury-gold" />;
      case 'dumbbell': return <Dumbbell className="w-6 h-6 text-luxury-gold" />;
      case 'leaf': return <Leaf className="w-6 h-6 text-luxury-gold" />;
      case 'shield-check': return <ShieldCheck className="w-6 h-6 text-luxury-gold" />;
      case 'zap': return <Zap className="w-6 h-6 text-luxury-gold" />;
      default: return <Sparkles className="w-6 h-6 text-luxury-gold" />;
    }
  };

  return (
    <section id="amenities" className="py-24 bg-luxury-dark relative border-t border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-luxury-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold">
              The Art of Living
            </span>
            <span className="w-8 h-[1px] bg-luxury-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            World-Class <span className="text-gold-gradient font-normal italic">Amenities</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm font-light leading-relaxed">
            Every amenity is an extension of your home. From skyward heated pools to 40,000 sq.ft private sporting pavilions, discover bespoke experiences engineered for wellbeing and leisure.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES.map((amenity, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-lg border border-luxury-border hover:border-luxury-gold/50 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-md bg-luxury-black/70 border border-luxury-border flex items-center justify-center mb-5 group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold transition-colors">
                  {getAmenityIcon(amenity.icon)}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mb-1">
                  {amenity.category}
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-luxury-goldLight transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {amenity.desc}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-luxury-border/40 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Exclusive to Residents</span>
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Banner */}
        <div className="mt-16 rounded-xl overflow-hidden border border-luxury-gold/30 bg-gradient-to-r from-luxury-black via-luxury-card to-luxury-black p-8 sm:p-12 relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-luxury-gold font-semibold">
              Eco-Conscious Engineering
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
              IGBC Platinum Rated Green Development
            </h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              AR Homes integrates rainwater harvesting aquifers, 100% organic waste composters, on-grid solar power generation for all communal areas, and high-efficiency low-E insulated glass panels to reduce carbon footprint by up to 35%.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <div className="px-6 py-4 rounded bg-luxury-black/80 border border-luxury-gold text-center">
              <span className="font-serif text-3xl font-bold text-luxury-gold">35%</span>
              <div className="text-[10px] uppercase text-slate-300 tracking-wider mt-1">Energy Reduction</div>
            </div>
            <div className="px-6 py-4 rounded bg-luxury-black/80 border border-luxury-gold text-center">
              <span className="font-serif text-3xl font-bold text-luxury-gold">80%</span>
              <div className="text-[10px] uppercase text-slate-300 tracking-wider mt-1">Open Green Deck</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
