import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND, getWhatsAppUrl } from '../data/projectsData';
import { ChevronDown, Menu, X, ArrowRight, Home, Phone, MessageCircle, ShieldCheck } from 'lucide-react';

const BUY_LINKS = [
  { label: 'Residential Floors', path: '/buy?type=residential' },
  { label: 'Villas & Mansions', path: '/buy?type=villas-houses' },
  { label: 'High-Rise Apartments', path: '/buy?type=apartments' },
  { label: 'Commercial Suites', path: '/buy?type=commercial' },
  { label: 'Plots & Land Estates', path: '/buy?type=plots-land' },
  { label: 'New Releases', path: '/buy?type=new-properties' }
];

export const Navbar = ({ onStartChat, onOpenEnquiry }) => {
  const location = useLocation();
  const { settings } = useSiteData();

  const phoneVal = settings?.phone || BRAND.phone;
  const phoneDisplayVal = settings?.phone_display || settings?.phone || BRAND.phoneDisplay;
  const whatsappVal = settings?.whatsapp || BRAND.whatsapp;

  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBuyOpen, setMobileBuyOpen] = useState(false);

  const navRef = useRef(null);
  const buyTimeoutRef = useRef(null);

  const handleEnquiry = onStartChat || onOpenEnquiry;

  const handleBuyEnter = () => {
    clearTimeout(buyTimeoutRef.current);
    setBuyDropdownOpen(true);
  };
  const handleBuyLeave = () => {
    buyTimeoutRef.current = setTimeout(() => {
      setBuyDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setBuyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(buyTimeoutRef.current);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setBuyDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const isBuyActive = location.pathname.startsWith('/buy');
  const isServicesActive = location.pathname === '/services';
  const isAboutActive = location.pathname === '/about';
  const isGalleryActive = location.pathname === '/gallery';
  const isContactActive = location.pathname === '/contact';

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pointer-events-none">
      <nav
        ref={navRef}
        className="liquid-glass overflow-visible rounded-2xl px-4 md:px-6 py-2.5 flex items-center justify-between relative border border-white/20 shadow-2xl backdrop-blur-xl z-50 pointer-events-auto"
      >
        
        {/* Left: AR Homes Brand Logo */}
        <Link to="/" className="flex items-center gap-3 select-none group shrink-0">
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
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
          
          {/* Buy ▾ Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={handleBuyEnter}
            onMouseLeave={handleBuyLeave}
          >
            <div className="flex items-center gap-1.5 cursor-pointer select-none">
              <Link
                to="/buy"
                className={`hover:text-white transition-colors text-sm font-medium ${isBuyActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200'}`}
              >
                Buy Properties & Land
              </Link>
              <button
                type="button"
                onClick={() => setBuyDropdownOpen(!buyDropdownOpen)}
                className="p-0.5 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Buy menu"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-white/70 ${buyDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </button>
            </div>

            {buyDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-[#050e0a]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold border-b border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Home className="w-3 h-3" />
                      <span>Properties & Land</span>
                    </span>
                    <Link to="/buy" className="text-[9px] hover:underline text-gray-400">All</Link>
                  </div>
                  {BUY_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setBuyDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D4AF37]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Direct Navigation Links */}
          <Link
            to="/services"
            className={`transition-colors hover:text-white ${isServicesActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200'}`}
          >
            Services & Loans
          </Link>
          <Link
            to="/about"
            className={`transition-colors hover:text-white ${isAboutActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200'}`}
          >
            About Us
          </Link>
          <Link
            to="/gallery"
            className={`transition-colors hover:text-white ${isGalleryActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200'}`}
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className={`transition-colors hover:text-white ${isContactActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200'}`}
          >
            Contact
          </Link>
        </div>

        {/* Right CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleEnquiry && handleEnquiry(null)}
            className="hidden lg:inline-flex bg-white text-black px-5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#013724] transition-all cursor-pointer shadow-lg active:scale-95"
          >
            Enquire Now
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors cursor-pointer border border-white/15 shadow-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 liquid-glass rounded-2xl p-4 sm:p-5 border border-white/20 shadow-2xl backdrop-blur-2xl text-white space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto max-h-[82vh] overflow-y-auto">
          
          {/* Top Action Inside Mobile Menu */}
          <div className="p-3.5 rounded-xl bg-[#013724]/80 border border-[#D4AF37]/40 shadow-inner flex items-center justify-between gap-3">
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                Find Your Ideal Property
              </span>
              <span className="text-xs text-slate-300 font-light">
                Jaipur Luxury Residences & Land
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (handleEnquiry) handleEnquiry(null);
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#013724] rounded-lg text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
            >
              Enquire
            </button>
          </div>

          {/* Mobile Buy Accordion */}
          <div className="border-b border-white/10 pb-3">
            <div className="flex items-center justify-between text-sm font-semibold py-1">
              <Link
                to="/buy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#D4AF37] flex items-center gap-2"
              >
                <span>Buy Properties & Land</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-normal">Sale</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileBuyOpen(!mobileBuyOpen)}
                className="p-2 cursor-pointer text-white/80 hover:text-[#D4AF37]"
                aria-label="Expand Buy categories"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileBuyOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>
            </div>
            {mobileBuyOpen && (
              <div className="mt-2 pl-3 space-y-2 border-l-2 border-[#D4AF37]/50 py-1">
                {BUY_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left py-1 text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Direct Links */}
          <div className="space-y-3 pt-1 text-sm font-medium border-b border-white/10 pb-4">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors py-0.5"
            >
              Services, Finance & Loans
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors py-0.5"
            >
              About AR Homes Leadership
            </Link>
            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors py-0.5"
            >
              Property & Land Gallery
            </Link>
            <Link
              to="/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors py-0.5"
            >
              Frequently Asked Questions (FAQs)
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors py-0.5"
            >
              Contact & Experience Center
            </Link>
          </div>

          {/* Direct Quick Contact Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`tel:${phoneVal}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="truncate">{phoneDisplayVal}</span>
            </a>
            <a
              href={getWhatsAppUrl(whatsappVal, 'Hello AR Homes, I am interested in your properties.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white text-xs font-semibold border border-[#25D366]/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
