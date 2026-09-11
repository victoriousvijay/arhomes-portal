import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND } from '../data/projectsData';
import { Home, ChevronRight, ShieldCheck, Award, CheckCircle2, ArrowRight, PhoneCall, Building2 } from 'lucide-react';

const formatImageUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/uc\?id=)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
  }
  return url;
};

const OWNERS = [
  {
    id: 'owner-1',
    image: '/assets/owner-1.jpg',
  },
  {
    id: 'owner-2',
    image: '/assets/owner-2.jpg',
  },
  {
    id: 'owner-3',
    image: '/assets/owner-3.jpg',
  }
];

const STATS = [
  { value: '500+', label: 'Luxury Residences Delivered' },
  { value: '100%', label: 'RERA Compliance & Clear Freehold Titles' },
  { value: '3.2M+', label: 'Sq.Ft Developed & Under Construction' },
  { value: '0%', label: 'Brokerage • Deal Directly with Founders' }
];

export const AboutPage = ({ onOpenEnquiry }) => {
  const { owners } = useSiteData();
  const displayOwners = owners && owners.length > 0 ? owners : OWNERS;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      {/* Top Hero: The Owners with 2D Architectural CAD Blueprint Background */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#021c13] via-[#01140d] to-black border-b border-[#205843]/40 text-white">
        
        {/* 2D Architectural Blueprint Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#01472E]/30 blur-[130px] rounded-full" />
          <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />

          {/* 2D Technical CAD Drafting Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cad-grid-sm" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#205843" strokeWidth="0.5" strokeOpacity="0.6" />
              </pattern>
              <pattern id="cad-grid-lg" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#cad-grid-sm)" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.35" />
                <circle cx="0" cy="0" r="1.5" fill="#D4AF37" fillOpacity="0.6" />
                <path d="M 0 0 L 6 0 M 0 0 L 0 6 M 100 100 L 94 100 M 100 100 L 100 94" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cad-grid-lg)" />
          </svg>

          {/* 2D Architectural Floor Plan Blueprint Schematic (Right Side) */}
          <svg
            className="absolute -right-16 top-12 w-[650px] h-[650px] text-[#205843] opacity-35 md:opacity-45 pointer-events-none"
            viewBox="0 0 500 500"
            fill="none"
          >
            {/* Outer Structural Walls */}
            <rect x="50" y="50" width="380" height="380" stroke="#2D6A4F" strokeWidth="2.5" />
            <rect x="62" y="62" width="356" height="356" stroke="#205843" strokeWidth="1" strokeDasharray="4 2" />

            {/* Room Partition Walls */}
            <path d="M 50 180 L 260 180 M 260 50 L 260 300 M 260 300 L 430 300 M 170 180 L 170 430" stroke="#2D6A4F" strokeWidth="2" />
            <path d="M 50 310 L 170 310 M 260 190 L 430 190" stroke="#205843" strokeWidth="1.5" />

            {/* Door Swing Arcs */}
            <path d="M 170 180 A 45 45 0 0 1 125 225" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="170" y1="180" x2="125" y2="180" stroke="#D4AF37" strokeWidth="1" />
            
            <path d="M 260 120 A 40 40 0 0 0 300 80" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="260" y1="120" x2="260" y2="80" stroke="#D4AF37" strokeWidth="1" />

            <path d="M 260 300 A 50 50 0 0 1 210 350" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />

            {/* Structural Column Nodes */}
            <rect x="46" y="46" width="8" height="8" fill="#D4AF37" />
            <rect x="426" y="46" width="8" height="8" fill="#D4AF37" />
            <rect x="46" y="426" width="8" height="8" fill="#D4AF37" />
            <rect x="426" y="426" width="8" height="8" fill="#D4AF37" />
            <rect x="256" y="46" width="8" height="8" fill="#D4AF37" />
            <rect x="256" y="296" width="8" height="8" fill="#D4AF37" />
            <rect x="166" y="176" width="8" height="8" fill="#D4AF37" />

            {/* Dimension Lines & Ticks */}
            <line x1="50" y1="30" x2="430" y2="30" stroke="#D4AF37" strokeWidth="0.8" />
            <line x1="50" y1="24" x2="50" y2="36" stroke="#D4AF37" strokeWidth="1" />
            <line x1="430" y1="24" x2="430" y2="36" stroke="#D4AF37" strokeWidth="1" />
            <text x="240" y="24" textAnchor="middle" fill="#D4AF37" fontSize="9" fontFamily="monospace" letterSpacing="1">
              38'-0" [11.58m]
            </text>

            <line x1="450" y1="50" x2="450" y2="430" stroke="#D4AF37" strokeWidth="0.8" />
            <line x1="444" y1="50" x2="456" y2="50" stroke="#D4AF37" strokeWidth="1" />
            <line x1="444" y1="430" x2="456" y2="430" stroke="#D4AF37" strokeWidth="1" />
            <text x="465" y="245" fill="#D4AF37" fontSize="9" fontFamily="monospace" letterSpacing="1" transform="rotate(90 465 245)">
              38'-0" [11.58m]
            </text>

            {/* 2D Room Annotation Stamps */}
            <text x="110" y="120" fill="#E5C86C" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1.5">
              LIVING SALON
            </text>
            <text x="110" y="135" fill="#A7F3D0" fontSize="8" fontFamily="monospace">
              21'-0" x 14'-0"
            </text>

            <text x="310" y="120" fill="#E5C86C" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1.5">
              MASTER SUITE
            </text>
            <text x="310" y="135" fill="#A7F3D0" fontSize="8" fontFamily="monospace">
              17'-0" x 15'-0"
            </text>

            <text x="110" y="240" fill="#E5C86C" fontSize="9" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
              FOYER & RECEPTION
            </text>

            {/* Blueprint Stamp */}
            <rect x="270" y="445" width="160" height="38" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 2" />
            <text x="280" y="460" fill="#D4AF37" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
              2D CAD SCHEMATIC • REV 03
            </text>
            <text x="280" y="473" fill="#94A3B8" fontSize="7" fontFamily="monospace">
              SCALE 1:100 • AR HOMES
            </text>
          </svg>

          {/* 2D Drafting Compass & Axis Lines (Left Side) */}
          <svg
            className="absolute -left-12 bottom-6 w-[450px] h-[450px] text-[#2D6A4F] opacity-25 md:opacity-35 pointer-events-none"
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle cx="200" cy="200" r="90" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="4 3" />
            <circle cx="200" cy="200" r="70" stroke="#205843" strokeWidth="0.5" />
            <polygon points="200,90 208,190 200,180 192,190" fill="#D4AF37" />
            <polygon points="200,310 208,210 200,220 192,210" fill="#205843" />
            <polygon points="90,200 190,208 180,200 190,192" fill="#205843" />
            <polygon points="310,200 210,208 220,200 210,192" fill="#205843" />
            <text x="200" y="80" textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="bold" fontFamily="serif">N</text>
            <line x1="30" y1="200" x2="370" y2="200" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="200" y1="30" x2="200" y2="370" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 4" />
            <text x="40" y="190" fill="#D4AF37" fontSize="8" fontFamily="monospace">2D GRID 26.9124° N</text>
            <text x="210" y="360" fill="#D4AF37" fontSize="8" fontFamily="monospace">2D GRID 75.7873° E</text>
          </svg>

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs mb-8 text-gray-400">
            <Link to="/" className="transition-colors flex items-center gap-1 hover:text-[#D4AF37]">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="font-medium text-[#D4AF37]">About Us</span>
          </nav>

          {/* The Founding Promise Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.25em] font-semibold mb-5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>The Founding Promise</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-tight mb-5">
              Direct Accountability from{' '}
              <span className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A880]">
                The Owners
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
              At AR Homes, we do not operate behind layers of impersonal sales agents. Every plot acquired, foundation poured, and deed registered is guided by our three founders.
            </p>
          </div>

          {/* The Three Owners Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayOwners.map((owner, idx) => {
              const fallbackImages = ['/assets/owner-1.jpg', '/assets/owner-2.jpg', '/assets/owner-3.jpg'];
              const imgSrc = (owner.image && !owner.image.includes('unsplash.com'))
                ? formatImageUrl(owner.image)
                : fallbackImages[idx % 3];

              return (
                <div
                  key={owner.id || idx}
                  className="bg-[#002417] border border-[#205843]/60 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_20px_50px_rgba(212,175,55,0.18)] transition-all duration-500 group hover:-translate-y-1.5 shadow-2xl relative"
                >
                  <div className="aspect-square w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={imgSrc}
                      alt="AR Homes Leadership"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-20">

        {/* Minimal Stats Row */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 mb-20 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((st, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#013724] block">
                  {st.value}
                </span>
                <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold block max-w-[220px] mx-auto">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Call to Action */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#013724] border border-[#205843] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Connect Directly with AR Homes Leadership
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
              Whether you are an investor, homeowner, or NRI looking for verified real estate in Jaipur, our founders welcome direct consultations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/buy"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#013724] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg text-center"
            >
              Explore Properties
            </Link>
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Direct Meeting Request with Founders' })}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
            >
              Schedule Founder Meeting
            </button>
          </div>
        </div>

      </div>

      {/* Subtle bottom gradient to footer */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default AboutPage;
