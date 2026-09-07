import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export const Navbar = ({ onOpenEnquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#01472E] text-white border-b border-[#205843]/40 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        
        {/* Left: Golden Monogram & Logo (Emarat style) */}
        <a href="#" className="flex flex-col items-center group">
          {/* Gold Tower / Apex Geometry */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#D4AF37] stroke-current fill-none mb-0.5" strokeWidth="1.5">
              {/* Central vertical tower line */}
              <line x1="20" y1="2" x2="20" y2="28" stroke="#D4AF37" strokeWidth="1.8" />
              <line x1="16" y1="8" x2="16" y2="26" stroke="#D4AF37" strokeWidth="1.2" />
              <line x1="24" y1="8" x2="24" y2="26" stroke="#D4AF37" strokeWidth="1.2" />
              <line x1="12" y1="14" x2="12" y2="24" stroke="#D4AF37" strokeWidth="1" />
              <line x1="28" y1="14" x2="28" y2="24" stroke="#D4AF37" strokeWidth="1" />
              {/* Lower Diamond Base */}
              <polygon points="20,22 30,30 20,38 10,30" stroke="#D4AF37" strokeWidth="1.5" />
            </svg>
            <span className="font-sans text-[11px] font-bold tracking-[0.35em] text-[#D4AF37] uppercase">
              AR HOMES
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links (Emarat exact items) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide">
          <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">
            Home
          </a>
          <div className="relative group flex items-center gap-1 cursor-pointer text-slate-200 hover:text-[#D4AF37] transition-colors">
            <span>Corporate</span>
            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
          </div>
          <div className="relative group flex items-center gap-1 cursor-pointer text-slate-200 hover:text-[#D4AF37] transition-colors">
            <a href="#residences">Projects</a>
            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
          </div>
          <div className="relative group flex items-center gap-1 cursor-pointer text-slate-200 hover:text-[#D4AF37] transition-colors">
            <a href="#floorplans">Upcoming Projects</a>
            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
          </div>
          <a href="#philosophy" className="text-slate-200 hover:text-[#D4AF37] transition-colors">
            Careers
          </a>
          <div className="relative group flex items-center gap-1 cursor-pointer text-slate-200 hover:text-[#D4AF37] transition-colors">
            <a href="#insights">Media</a>
            <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
          </div>
          <a href="#contact" className="text-slate-200 hover:text-[#D4AF37] transition-colors">
            Contact
          </a>
        </nav>

        {/* Right: Pill Button (Emarat exact style) */}
        <div className="hidden lg:block">
          <button
            onClick={() => onOpenEnquiry(null)}
            className="px-6 py-2 rounded-full border border-white/40 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
          >
            ENQUIRY NOW
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => onOpenEnquiry(null)}
            className="px-3.5 py-1.5 rounded-full border border-white/40 text-white text-[10px] font-semibold uppercase tracking-wider"
          >
            ENQUIRE
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-white hover:text-[#D4AF37]"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#013824] border-t border-[#205843] px-6 py-6 space-y-4">
          <a
            href="#"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white hover:text-[#D4AF37] py-1 border-b border-[#205843]/40"
          >
            Home
          </a>
          <a
            href="#residences"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white hover:text-[#D4AF37] py-1 border-b border-[#205843]/40"
          >
            Projects
          </a>
          <a
            href="#floorplans"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white hover:text-[#D4AF37] py-1 border-b border-[#205843]/40"
          >
            Floor Plans
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white hover:text-[#D4AF37] py-1 border-b border-[#205843]/40"
          >
            About AR Homes
          </a>
          <a
            href="#insights"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white hover:text-[#D4AF37] py-1 border-b border-[#205843]/40"
          >
            Insights & Media
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white hover:text-[#D4AF37] py-1 border-b border-[#205843]/40"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
};
