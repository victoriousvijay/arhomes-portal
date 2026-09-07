import React, { useState } from 'react';
import { FLOOR_PLAN_DATA } from '../data/projectsData';
import { ArrowRight } from 'lucide-react';

export const InteractiveFloorPlans = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState("TYPICAL FLOOR");

  const currentPlan = FLOOR_PLAN_DATA.find((p) => p.tab === activeTab) || FLOOR_PLAN_DATA[0];

  return (
    <section id="floorplans" className="py-28 bg-[#01472E] text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Header (Emarat exact) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b border-[#205843]/60 pb-8">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white">
              Floor Plans
            </h2>
          </div>
          <p className="mt-4 lg:mt-0 text-xs sm:text-sm text-slate-300 max-w-md font-light leading-relaxed lg:text-right">
            Each floor has been planned with the same attention to detail that goes into every other aspect of the residence.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-14">
          {FLOOR_PLAN_DATA.map((plan) => (
            <button
              key={plan.tab}
              onClick={() => setActiveTab(plan.tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === plan.tab
                  ? 'bg-[#E5C86C] text-[#013824] shadow-md font-bold'
                  : 'bg-transparent border border-white/20 text-slate-300 hover:border-white/60 hover:text-white'
              }`}
            >
              {plan.tab}
            </button>
          ))}
        </div>

        {/* Plan Display Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 3D Top-Down Architectural Floor Plan Render */}
          <div className="lg:col-span-7 bg-[#003320] rounded-lg p-6 sm:p-10 border border-[#205843] flex items-center justify-center shadow-2xl relative group">
            <div className="relative w-full max-w-[620px] aspect-[4/3] rounded overflow-hidden">
              <img
                src={currentPlan.image}
                alt={`${currentPlan.name} 3D Architectural Layout`}
                className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-[#D4AF37]">
              Scale 1:100 Architectural Master Layout
            </div>
          </div>

          {/* Right: Specifications & Materials */}
          <div className="lg:col-span-5 flex flex-col justify-between py-4">
            <div>
              <h3 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-2">
                {currentPlan.name}
              </h3>
              <p className="text-xs text-[#D4AF37] uppercase tracking-wider mb-8">
                {currentPlan.subtitle} • {currentPlan.area}
              </p>

              {/* 4 Materials Specs in 2 Columns (Emarat exact) */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-10">
                {currentPlan.materials.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-[#94B8A8] font-medium mb-1">
                      {m.room}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl text-white font-normal">
                      {m.finish}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed mb-8">
                {currentPlan.details}
              </p>
            </div>

            {/* Request Detailed Plan Link */}
            <div>
              <button
                onClick={() => onOpenEnquiry({ title: `Detailed Layout for ${currentPlan.name}` })}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C86C] transition-colors border-b border-[#D4AF37] pb-1"
              >
                <span>Request detailed plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
