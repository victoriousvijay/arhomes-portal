import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND } from '../data/projectsData';

export const MobileBottomBar = ({ onOpenCallback }) => {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#01281b]/95 backdrop-blur-2xl border-t border-[#D4AF37]/35 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] transition-transform"
      role="region"
      aria-label="Mobile Quick Actions"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* 1. Direct Call Button */}
        <a
          href={`tel:${BRAND.phone}`}
          className="flex-1 min-w-[70px] flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/15 transition-all active:scale-95 text-center group"
          title="Call AR Homes Concierge"
        >
          <div className="w-6 h-6 rounded-full bg-[#01472E] flex items-center justify-center mb-0.5 text-[#D4AF37] group-hover:scale-110 transition-transform">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-medium tracking-wide uppercase">Call</span>
        </a>

        {/* 2. Direct WhatsApp Button */}
        <a
          href={`https://wa.me/${BRAND.whatsapp}?text=Hello%20AR%20Homes,%20I%20am%20interested%20in%20your%20luxury%20properties%20in%20Jaipur.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[70px] flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/15 transition-all active:scale-95 text-center group"
          title="WhatsApp AR Homes"
        >
          <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-0.5 text-[#25D366] group-hover:scale-110 transition-transform">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-medium tracking-wide uppercase">WhatsApp</span>
        </a>

        {/* 3. Primary CTA: Request Callback */}
        <button
          type="button"
          onClick={() => onOpenCallback && onOpenCallback({ title: 'Mobile Callback Request' })}
          className="flex-[2.4] py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C86C] to-[#D4AF37] text-[#013724] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 fill-current" />
          <span className="whitespace-nowrap">Request Callback</span>
        </button>

      </div>
    </div>
  );
};

export default MobileBottomBar;
