import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND_INFO, getWhatsAppUrl } from '../data/projectsData';

export const FloatingActions = ({ onOpenVipModal }) => {
  const { settings } = useSiteData();
  const phoneVal = settings?.phone || BRAND_INFO.phone;
  const whatsappVal = settings?.whatsapp || BRAND_INFO.whatsapp;
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-luxury-card border border-luxury-border hover:border-luxury-gold text-slate-300 hover:text-luxury-gold shadow-xl transition-all hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Direct Call Button */}
      <a
        href={`tel:${phoneVal}`}
        className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-luxury-dark/95 border border-luxury-border hover:border-luxury-gold text-slate-200 hover:text-white shadow-2xl backdrop-blur-md transition-all hover:-translate-y-0.5 group"
      >
        <Phone className="w-4 h-4 text-luxury-gold" />
        <span className="text-xs font-semibold tracking-wider uppercase">Call Desk</span>
      </a>

      {/* Floating WhatsApp Concierge Button */}
      <a
        href={getWhatsAppUrl(whatsappVal, 'Hello AR Homes, I am interested in your luxury properties.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-xs tracking-wider uppercase shadow-2xl shadow-emerald-950/60 transition-all hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-4 h-4" />
        <span>WhatsApp Concierge</span>
      </a>

    </aside>
  );
};
