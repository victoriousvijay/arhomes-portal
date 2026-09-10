import React from 'react';
import { Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND, getWhatsAppUrl } from '../data/projectsData';

export const StickySideMenu = ({ onOpenCallback }) => {
  const { settings } = useSiteData();
  const whatsappVal = settings?.whatsapp || BRAND.whatsapp;
  const instagramVal = settings?.instagram || BRAND.instagram;
  const youtubeVal = settings?.youtube || BRAND.youtube;

  return (
    <aside aria-label="Quick contact links" className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col items-center bg-[#01472E] border-l border-t border-b border-[#205843] rounded-l-md shadow-2xl text-white overflow-hidden">
      
      {/* 1. WhatsApp Button */}
      <a
        href={getWhatsAppUrl(whatsappVal, 'Hello AR Homes, I am interested in your luxury properties.')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-12 flex items-center justify-center hover:bg-[#0B5B3E] transition-colors border-b border-[#205843]/60 group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white group-hover:text-[#D4AF37] transition-colors">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* 2. Direct Call / Advisory Desk Action */}
      <a
        href={`tel:${settings?.phone || BRAND.phone}`}
        className="w-11 h-12 flex items-center justify-center hover:bg-[#0B5B3E] transition-colors border-b border-[#205843]/60 group"
        title={`Call Advisory Desk: ${settings?.phone_display || BRAND.phoneDisplay}`}
        aria-label="Call Advisory Desk"
      >
        <Phone className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
      </a>

      {/* 3. Instagram Button */}
      <a
        href={instagramVal}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-12 flex items-center justify-center hover:bg-[#0B5B3E] transition-colors border-b border-[#205843]/60 group"
        title="Follow on Instagram"
        aria-label="Follow on Instagram"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current text-white group-hover:text-[#D4AF37] transition-colors" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>

      {/* 4. YouTube Button */}
      <a
        href={youtubeVal}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-12 flex items-center justify-center hover:bg-[#FF0000] transition-colors group"
        title="Watch on YouTube"
        aria-label="Watch on YouTube"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white group-hover:text-white transition-colors">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>

    </aside>
  );
};
