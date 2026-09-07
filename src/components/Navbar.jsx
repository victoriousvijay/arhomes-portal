import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight, Home, Building2 } from 'lucide-react';

const BUY_ITEMS = [
  'Residential',
  'Commercial',
  'Apartments',
  'Villas / Houses',
  'Plots / Land',
  'New Properties'
];

const RENT_ITEMS = [
  'Apartments',
  'Houses / Villas',
  'Commercial',
  'PG / Co-living'
];

export const Navbar = ({ onStartChat, onOpenEnquiry }) => {
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [rentDropdownOpen, setRentDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBuyOpen, setMobileBuyOpen] = useState(false);
  const [mobileRentOpen, setMobileRentOpen] = useState(false);

  const navRef = useRef(null);
  const buyTimeoutRef = useRef(null);
  const rentTimeoutRef = useRef(null);

  const handleEnquiry = onStartChat || onOpenEnquiry;

  const handleSelectCategory = (type, item) => {
    setBuyDropdownOpen(false);
    setRentDropdownOpen(false);
    setMobileMenuOpen(false);
    if (handleEnquiry) {
      handleEnquiry({ title: `${item} (${type})`, location: 'Prime NCR / Hyderabad' });
    }
  };

  const handleBuyEnter = () => {
    clearTimeout(buyTimeoutRef.current);
    setRentDropdownOpen(false);
    setBuyDropdownOpen(true);
  };
  const handleBuyLeave = () => {
    buyTimeoutRef.current = setTimeout(() => {
      setBuyDropdownOpen(false);
    }, 200);
  };

  const handleRentEnter = () => {
    clearTimeout(rentTimeoutRef.current);
    setBuyDropdownOpen(false);
    setRentDropdownOpen(true);
  };
  const handleRentLeave = () => {
    rentTimeoutRef.current = setTimeout(() => {
      setRentDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setBuyDropdownOpen(false);
        setRentDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(buyTimeoutRef.current);
      clearTimeout(rentTimeoutRef.current);
    };
  }, []);

  return (
    <header className="relative z-40 w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-5">
      <nav
        ref={navRef}
        className="liquid-glass overflow-visible rounded-2xl px-4 md:px-6 py-2.5 flex items-center justify-between relative border border-white/20 shadow-2xl backdrop-blur-xl z-40"
      >
        
        {/* Left: AR Homes Brand Logo */}
        <a href="#" className="flex items-center gap-3 select-none group shrink-0">
          <img
            src="/ar-homes-logo.jpg"
            alt="AR Homes Logo"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-white/30 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-wider text-white leading-tight">
              AR HOMES
            </span>
            <span className="text-[9.5px] tracking-widest text-gray-300 uppercase font-light hidden sm:inline-block">
              Ghar Bethe, Ghar Dekho
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation with Dropdowns */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
          
          {/* Buy ▾ Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={handleBuyEnter}
            onMouseLeave={handleBuyLeave}
          >
            <button
              type="button"
              onClick={() => {
                setRentDropdownOpen(false);
                setBuyDropdownOpen(!buyDropdownOpen);
              }}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-sm font-medium select-none"
            >
              <span>Buy</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-white/70 ${buyDropdownOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {buyDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-[#050e0a]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold border-b border-white/10 flex items-center gap-1.5">
                    <Home className="w-3 h-3" />
                    <span>Properties For Sale</span>
                  </div>
                  {BUY_ITEMS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelectCategory('Buy', item)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D4AF37]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rent ▾ Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={handleRentEnter}
            onMouseLeave={handleRentLeave}
          >
            <button
              type="button"
              onClick={() => {
                setBuyDropdownOpen(false);
                setRentDropdownOpen(!rentDropdownOpen);
              }}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-sm font-medium select-none"
            >
              <span>Rent</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-white/70 ${rentDropdownOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {rentDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-[#050e0a]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold border-b border-white/10 flex items-center gap-1.5">
                    <Building2 className="w-3 h-3" />
                    <span>Rental Listings</span>
                  </div>
                  {RENT_ITEMS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSelectCategory('Rent', item)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D4AF37]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Direct Links */}
          <a
            href="#services"
            className="hover:text-white transition-colors"
          >
            Services
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors"
          >
            About Us
          </a>
          <a
            href="#gallery"
            className="hover:text-white transition-colors"
          >
            Gallery
          </a>
        </div>

        {/* Right CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleEnquiry && handleEnquiry(null)}
            className="bg-white text-black px-5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#013724] transition-all cursor-pointer shadow-lg active:scale-95"
          >
            Enquire Now
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 liquid-glass rounded-2xl p-5 border border-white/20 shadow-2xl backdrop-blur-2xl text-white space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          
          {/* Mobile Buy Accordion */}
          <div className="border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setMobileBuyOpen(!mobileBuyOpen)}
              className="w-full flex items-center justify-between text-sm font-semibold py-1 cursor-pointer"
            >
              <span>Buy Properties</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileBuyOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileBuyOpen && (
              <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-[#D4AF37]/50">
                {BUY_ITEMS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSelectCategory('Buy', item)}
                    className="block w-full text-left py-1 text-xs text-gray-300 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Rent Accordion */}
          <div className="border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => setMobileRentOpen(!mobileRentOpen)}
              className="w-full flex items-center justify-between text-sm font-semibold py-1 cursor-pointer"
            >
              <span>Rent Properties</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileRentOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileRentOpen && (
              <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-[#D4AF37]/50">
                {RENT_ITEMS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSelectCategory('Rent', item)}
                    className="block w-full text-left py-1 text-xs text-gray-300 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Direct Links */}
          <div className="space-y-3 pt-1 text-sm font-medium">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors"
            >
              About Us
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors"
            >
              Gallery
            </a>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (handleEnquiry) handleEnquiry(null);
              }}
              className="w-full py-2.5 bg-[#D4AF37] text-[#013724] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Book an Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
