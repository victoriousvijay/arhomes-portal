import React, { useState } from 'react';
import { INSIGHTS_ARTICLES } from '../data/projectsData';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';

export const RealEstateJournal = () => {
  const [activeModalArticle, setActiveModalArticle] = useState(null);

  return (
    <section id="insights" className="py-28 bg-[#01472E] text-white relative border-t border-[#205843]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vertical Gold Typography & Circular Button (Emarat exact) */}
          <div className="lg:col-span-3 flex flex-col justify-between items-start self-stretch py-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-6">
                Editorial Dispatch
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#D4AF37] font-normal leading-tight tracking-tight uppercase">
                Insights & <br />
                Updates
              </h2>
            </div>

            {/* Circular All Articles Button */}
            <div className="mt-8 lg:mt-0">
              <a
                href="#insights"
                className="w-20 h-20 rounded-full border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#013824] flex flex-col items-center justify-center transition-all duration-300 group"
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="text-[8px] uppercase tracking-widest font-bold mt-1 text-center leading-tight">
                  ALL ARTICLES
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Article Cards with Overlays (Emarat exact) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
            {INSIGHTS_ARTICLES.slice(0, 2).map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer"
                onClick={() => setActiveModalArticle(article)}
              >
                {/* Image Card with Dark Overlay & Golden Typography */}
                <div className="relative aspect-[16/11] rounded overflow-hidden shadow-2xl mb-4 border border-[#205843]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                  />
                  
                  {/* Subtle Inner Framing */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold">
                        AR HOMES JOURNAL
                      </span>
                    </div>

                    {/* Centered Overlay Headline */}
                    <div className="text-center px-4">
                      <p className="font-serif text-sm sm:text-base text-white/95 uppercase tracking-wider font-semibold">
                        {article.title}
                      </p>
                    </div>

                    {/* Bottom Right Date Badge */}
                    <div className="flex justify-end">
                      <span className="font-serif text-2xl font-bold text-white tracking-tight">
                        {article.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Title Below */}
                <h3 className="font-serif text-lg text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {article.title}
                </h3>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Article Reading Dialog */}
      {activeModalArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#013824] border border-[#D4AF37]/50 rounded-lg p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveModalArticle(null)}
              className="absolute top-4 right-4 p-2 bg-[#002719] text-white hover:text-[#D4AF37] rounded-full border border-[#205843]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              {activeModalArticle.date} • {activeModalArticle.tag}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-2 mb-4 leading-snug">
              {activeModalArticle.title}
            </h3>

            <div className="h-60 rounded overflow-hidden mb-6">
              <img src={activeModalArticle.image} alt={activeModalArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-xs sm:text-sm text-slate-200 font-light space-y-4 leading-relaxed">
              <p>
                In the modern landscape of high-density metropolitan living, the true differentiator of residential architecture is spatial honesty and construction rigor.
              </p>
              <p>
                At AR Homes, every independent floor and high-rise residence is detailed with acoustic isolation, double-insulated Low-E fenestrations, VRV/VRF smart climate zoning, and imported Italian marble finishes that create an enduring living sanctuary.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#205843] flex justify-end">
              <button
                onClick={() => setActiveModalArticle(null)}
                className="px-6 py-2 bg-[#D4AF37] text-[#013824] font-bold text-xs uppercase tracking-wider rounded"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
