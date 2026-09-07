import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, Home, Building2, Sparkles } from 'lucide-react';

const BUY_LINKS = [
  { label: 'Residential', path: '/buy?type=residential' },
  { label: 'Commercial', path: '/buy?type=commercial' },
  { label: 'Apartments', path: '/buy?type=apartments' },
  { label: 'Villas / Houses', path: '/buy?type=villas-houses' },
  { label: 'Plots / Land', path: '/buy?type=plots-land' },
  { label: 'New Properties', path: '/buy?type=new-properties' }
];

const RENT_LINKS = [
  { label: 'Apartments', path: '/rent?type=apartments' },
  { label: 'Houses / Villas', path: '/rent?type=houses-villas' },
  { label: 'Commercial', path: '/rent?type=commercial' },
  { label: 'PG / Co-living', path: '/rent?type=pg-coliving' }
];

export const Navbar = ({ onStartChat, onOpenEnquiry }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [rentDropdownOpen, setRentDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBuyOpen, setMobileBuyOpen] = useState(false);
  const [mobileRentOpen, setMobileRentOpen] = useState(false);

  const navRef = useRef(null);
  const buyTimeoutRef = useRef(null);
  const rentTimeoutRef = useRef(null);

  const handleEnquiry = onStartChat || onOpenEnquiry;

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

  // Close menus on route change
  useEffect(() => {
    setBuyDropdownOpen(false);
    setRentDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const isBuyActive = location.pathname.startsWith('/buy');
  const isRentActive = location.pathname.startsWith('/rent');
  const isServicesActive = location.pathname === '/services';
  const isAboutActive = location.pathname === '/about';
  const isGalleryActive = location.pathname === '/gallery';

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

        {/* Center: Desktop Navigation with Dropdowns */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
          
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
                Buy
              </Link>
              <button
                type="button"
                onClick={() => {
                  setRentDropdownOpen(false);
                  setBuyDropdownOpen(!buyDropdownOpen);
                }}
                className="p-0.5 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Buy menu"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-white/70 ${buyDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </button>
            </div>

            {buyDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-[#050e0a]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold border-b border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Home className="w-3 h-3" />
                      <span>Properties For Sale</span>
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

          {/* Rent ▾ Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={handleRentEnter}
            onMouseLeave={handleRentLeave}
          >
            <div className="flex items-center gap-1.5 cursor-pointer select-none">
              <Link
                to="/rent"
                className={`hover:text-white transition-colors text-sm font-medium ${isRentActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200'}`}
              >
                Rent
              </Link>
              <button
                type="button"
                onClick={() => {
                  setBuyDropdownOpen(false);
                  setRentDropdownOpen(!rentDropdownOpen);
                }}
                className="p-0.5 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Rent menu"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-white/70 ${rentDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </button>
            </div>

            {rentDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-[#050e0a]/95 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold border-b border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3 h-3" />
                      <span>Rental Listings</span>
                    </span>
                    <Link to="/rent" className="text-[9px] hover:underline text-gray-400">All</Link>
                  </div>
                  {RENT_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setRentDropdownOpen(false)}
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

          {/* Direct Navigation Links to Dedicated Pages */}
          <Link
            to="/services"
            className={`transition-colors hover:text-white ${isServicesActive ? 'text-[#D4AF37] font-semibold' : 'text-gray-200'}`}
          >
            Services
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
        <div className="lg:hidden mt-2 liquid-glass rounded-2xl p-5 border border-white/20 shadow-2xl backdrop-blur-2xl text-white space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto max-h-[80vh] overflow-y-auto">
          
          {/* Mobile Buy Accordion */}
          <div className="border-b border-white/10 pb-3">
            <div className="flex items-center justify-between text-sm font-semibold py-1">
              <Link
                to="/buy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#D4AF37]"
              >
                Buy Properties
              </Link>
              <button
                type="button"
                onClick={() => setMobileBuyOpen(!mobileBuyOpen)}
                className="p-1 cursor-pointer"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileBuyOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {mobileBuyOpen && (
              <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-[#D4AF37]/50">
                {BUY_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left py-1 text-xs text-gray-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Rent Accordion */}
          <div className="border-b border-white/10 pb-3">
            <div className="flex items-center justify-between text-sm font-semibold py-1">
              <Link
                to="/rent"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[#D4AF37]"
              >
                Rent Properties
              </Link>
              <button
                type="button"
                onClick={() => setMobileRentOpen(!mobileRentOpen)}
                className="p-1 cursor-pointer"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileRentOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {mobileRentOpen && (
              <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-[#D4AF37]/50">
                {RENT_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left py-1 text-xs text-gray-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Direct Links */}
          <div className="space-y-3 pt-1 text-sm font-medium">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors"
            >
              Services
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#D4AF37] transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (handleEnquiry) handleEnquiry(null);
              }}
              className="w-full py-2.5 bg-[#D4AF37] text-[#013724] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
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
