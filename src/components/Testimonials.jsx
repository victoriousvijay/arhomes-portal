import React from 'react';
import { TESTIMONIALS } from '../data/projectsData';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-luxury-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold">
              Client Distinctions
            </span>
            <span className="w-8 h-[1px] bg-luxury-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Voices of <span className="text-gold-gradient font-normal italic">Confidence</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm font-light leading-relaxed">
            From tech titans to international families, discover why over 1,400 discerning residents entrust their living aspirations to AR Homes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-lg border border-luxury-border flex flex-col justify-between relative group hover:border-luxury-gold/50"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-6 text-luxury-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-luxury-gold" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-luxury-border/60 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-luxury-gold/40"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {item.designation}
                  </p>
                  <span className="inline-block text-[10px] text-luxury-gold font-semibold uppercase tracking-wider mt-0.5">
                    {item.project}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
