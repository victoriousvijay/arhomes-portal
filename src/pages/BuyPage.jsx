import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { BuyHeroCarousel } from '../components/BuyHeroCarousel';
import { LoanCalculator } from '../components/LoanCalculator';
import { RESIDENCES } from '../data/projectsData';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Search, 
  PhoneCall, 
  BadgeCheck 
} from 'lucide-react';
import { LineSidebar } from '../components/LineSidebar';

const formatImageUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/uc\?id=)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
  }
  return url;
};

const CATEGORIES = [
  { id: 'all', label: 'All Properties' },
  { id: 'residential', label: 'Residential Floors' },
  { id: 'villas-houses', label: 'Villas & Mansions' },
  { id: 'apartments', label: 'High-Rise Apartments' },
  { id: 'commercial', label: 'Commercial Suites' },
  { id: 'plots-land', label: 'Estate Plots' },
  { id: 'new-properties', label: 'New Releases' }
];

// Expanded property catalog for sale
export const BUY_CATALOG = [
  ...RESIDENCES.map((res, idx) => ({
    ...res,
    category: idx % 2 === 0 ? 'residential' : 'apartments',
    subCategory: idx === 0 ? 'villas-houses' : 'new-properties',
    isNew: idx < 2
  })),
  {
    id: 'ar-commercial-tower',
    title: 'AR Pinnacle Business Suites',
    location: 'Tonk Road Commercial District, Jaipur',
    builtForm: 'G + 24 Grade-A Commercial Tower',
    category: 'commercial',
    subCategory: 'commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: 'GRADE-A OFFICE SUITES', icon: 'building' },
      { label: 'DOUBLE-GLAZED FACADE', icon: 'wind' },
      { label: 'HIGH RENTAL YIELDS (8.4%)', icon: 'sun' },
      { label: 'CENTRAL METRO ACCESS', icon: 'map' }
    ],
    overview: 'LEED Gold certified commercial floor plates designed for corporate headquarters and high-net-worth investors looking for prime commercial capital appreciation in Jaipur.',
    price: '₹2.45 Cr onwards',
    priceUsd: '$295,000 onwards',
    rera: 'RAJ/P/2026/890',
    status: 'Ready to Fit-Out',
    isNew: true
  },
  {
    id: 'ar-meadows-plots',
    title: 'AR Palm Meadows Estate Plots',
    location: 'Ajmer Road Express Corridor, Jaipur',
    builtForm: 'Gated Plotted Enclave',
    category: 'plots-land',
    subCategory: 'plots-land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: '300 TO 800 SQ.YD PLOTS', icon: 'maximize' },
      { label: 'FREEHOLD REGISTRATION', icon: 'shield' },
      { label: 'CLUBHOUSE & POOL ACCESS', icon: 'home' },
      { label: 'IMMEDIATE POSSESSION', icon: 'sun' }
    ],
    overview: 'Bespoke freehold residential plots surrounded by serene landscaped avenues, complete with underground cabling, private security checkpoints, and grand club amenities in Jaipur.',
    price: '₹1.80 Cr onwards',
    priceUsd: '$215,000 onwards',
    rera: 'RAJ/P/2026/612',
    status: 'Ready for Registry',
    isNew: false
  },
  {
    id: 'ar-imperial-villas',
    title: 'The Imperial Mansions & Villas',
    location: 'Sirsi Road / Vaishali Estate, Jaipur',
    builtForm: 'Triplex Independent Luxury Villas',
    category: 'villas-houses',
    subCategory: 'villas-houses',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    features: [
      { label: '5 & 6 BHK PRIVATE VILLAS', icon: 'home' },
      { label: 'PRIVATE TEMPERATURE POOL', icon: 'maximize' },
      { label: 'PRIVATE ELEVATOR', icon: 'wind' },
      { label: '3-CAR BASEMENT PARKING', icon: 'sun' }
    ],
    overview: 'Palatial triplex mansions designed with Scandinavian floor-to-ceiling glass pavilions, double-height great rooms, and private rooftop sky lounges in Jaipur.',
    price: '₹6.75 Cr onwards',
    priceUsd: '$815,000 onwards',
    rera: 'RAJ/P/2026/981',
    status: 'Exclusive Launch',
    isNew: true
  }
];

export const BuyPage = ({ onOpenEnquiry, onSelectResidence }) => {
  const { properties, settings } = useSiteData();
  const catalog = properties && properties.length > 0 ? properties : BUY_CATALOG;

  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get('type') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(rawType);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (rawType) {
      setSelectedCategory(rawType.toLowerCase());
    }
  }, [rawType]);

  const handleTabClick = (id) => {
    setSelectedCategory(id);
    setSearchParams(id === 'all' ? {} : { type: id });
  };

  const buySidebarItems = CATEGORIES.map((cat) => {
    const count = catalog.filter((item) => {
      if (cat.id === 'all') return true;
      if (cat.id === 'new-properties') return item.isNew;
      if (cat.id === 'residential') return item.category !== 'commercial' && item.category !== 'plots-land';
      return item.category === cat.id || item.subCategory === cat.id;
    }).length;

    return {
      id: cat.id,
      label: cat.label,
      count
    };
  });

  const activeCategoryIndex = Math.max(0, CATEGORIES.findIndex(c => c.id === selectedCategory));

  const filteredProperties = catalog.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      item.subCategory === selectedCategory ||
      (selectedCategory === 'new-properties' && item.isNew) ||
      (selectedCategory === 'residential' && item.category !== 'commercial' && item.category !== 'plots-land');

    const matchesSearch =
      searchQuery === '' ||
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.overview || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.builtForm || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Top showcase properties for the hero banner carousel
  const heroOnly = catalog.filter(p => Boolean(p.is_hero_carousel));
  const carouselProperties = heroOnly.length > 0 ? heroOnly : catalog.slice(0, 5);

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      {/* 1. HERO BANNER: Smooth Animated Property Carousel */}
      <BuyHeroCarousel 
        properties={carouselProperties}
        onOpenEnquiry={onOpenEnquiry}
        onSelectResidence={onSelectResidence}
      />

      {/* 2. LIGHT THEME BODY: Trust-Building Header & Quick Stats */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 pt-14 pb-8">
        
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Developer Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
              Verified Properties <span className="italic text-[#013724] font-medium">For Sale</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3">
              Each residence is backed by clear legal ownership, RERA registration, and our hallmark low-density architectural blueprint across Jaipur’s prime addresses.
            </p>
          </div>

          {/* Quick Trust Key Metrics */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-[#013724]">0%</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Brokerage Fee</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-[#013724]">100%</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">RERA Compliant</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-[#D4AF37]">8.35%</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Loan Tie-Ups</span>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Responsive Filter Bar & Search */}
        <div className="lg:hidden mt-8 mb-8 space-y-3">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by neighborhood, floor or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#013724] shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Drawer Trigger */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Category Filter</span>
                <span className="text-xs font-bold text-[#013724]">
                  {CATEGORIES.find(c => c.id === selectedCategory)?.label || 'All Properties'} ({filteredProperties.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isMobileFilterOpen ? 'Close Categories' : 'Change Category'}</span>
                <span className="text-xs">{isMobileFilterOpen ? '▲' : '▼'}</span>
              </button>
            </div>

            {isMobileFilterOpen && (
              <div className="mt-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                <LineSidebar
                  items={buySidebarItems}
                  activeIndex={activeCategoryIndex}
                  onItemClick={(index, label, item) => {
                    handleTabClick(item.id);
                    setIsMobileFilterOpen(false);
                  }}
                  accentColor="#013724"
                  textColor="#64748b"
                  markerColor="#cbd5e1"
                  showIndex={true}
                  showMarker={true}
                  fontSize={0.92}
                  itemGap={10}
                  markerLength={28}
                  maxShift={12}
                />
              </div>
            )}
          </div>
        </div>

        {/* Desktop Side-by-Side: Sticky LineSidebar + Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12 items-start mt-8">
          
          {/* Left Column: Interactive LineSidebar & Search Filter */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">
                Quick Search
              </span>
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Locality, type, floor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-10 pr-8 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#013724] focus:bg-white transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="block text-[10px] uppercase tracking-widest text-[#013724] font-bold mb-3">
                Portfolio Categories
              </span>
              <LineSidebar
                items={buySidebarItems}
                activeIndex={activeCategoryIndex}
                onItemClick={(index, label, item) => handleTabClick(item.id)}
                accentColor="#013724"
                textColor="#64748b"
                markerColor="#cbd5e1"
                showIndex={true}
                showMarker={true}
                fontSize={0.96}
                itemGap={15}
                markerLength={44}
                maxShift={20}
              />
            </div>
          </aside>

          {/* Right Column: Properties Grid */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200/60">
              <span className="text-xs font-semibold text-slate-600">
                Showing <strong className="text-slate-900 font-semibold">{filteredProperties.length}</strong> available {filteredProperties.length === 1 ? 'property' : 'properties'} in <strong className="text-[#013724]">{CATEGORIES.find(c => c.id === selectedCategory)?.label}</strong>
              </span>
            </div>

            {/* Properties Grid in High-Trust Light Theme */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-8 shadow-sm">
                <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No matching properties found</h3>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  We couldn't find any property matching your current filter criteria. Try resetting your search or exploring our upcoming launches.
                </p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="px-5 py-2.5 bg-[#013724] text-white text-xs font-semibold rounded-xl hover:bg-[#D4AF37] hover:text-[#013724] transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={formatImageUrl(prop.image)}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-[#013724]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F3E5AB] border border-[#D4AF37]/30 shadow-md">
                        {prop.builtForm || prop.category}
                      </span>
                      {prop.isNew && (
                        <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-[10px] font-bold uppercase tracking-wider text-[#013724] shadow-sm">
                          New Release
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Location Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 text-slate-100 font-medium drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-[#F3E5AB]" />
                      {prop.location}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#013724] transition-colors mb-1.5">
                      {prop.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4 line-clamp-2">
                      {prop.overview}
                    </p>

                    {/* Highlights 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-5 pt-3 border-t border-slate-100">
                      {(prop.features || []).slice(0, 4).map((feat, fIdx) => (
                        <div 
                          key={fIdx} 
                          className="flex items-center gap-1.5 text-[11px] text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate font-medium">{feat?.label || feat || 'Verified Feature'}</span>
                        </div>
                      ))}
                    </div>

                    {/* RERA and Status bar */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pb-2">
                      <span>RERA: {prop.rera || 'RAJ/P/2026/745'}</span>
                      <span className="text-emerald-700 font-sans font-semibold">{prop.status}</span>
                    </div>
                  </div>

                  {/* Card Price & Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-2">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Starting Price</span>
                      <span className="text-base sm:text-lg font-bold text-[#013724] tracking-tight">{prop.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectResidence && onSelectResidence(prop)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenEnquiry && onOpenEnquiry(prop)}
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#013724] hover:bg-[#D4AF37] text-white hover:text-[#013724] transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
          </div>
        </div>

        {/* 3. REAL-TIME MORTGAGE & CIBIL CALCULATOR */}
        <div className="mt-16">
          <LoanCalculator onOpenEnquiry={onOpenEnquiry} defaultAmount={25000000} />
        </div>

        {/* 5. VIP PRIVATE SITE VISIT BANNER */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#013724] border border-[#205843] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3">
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Experience the Architecture in Person
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
              We arrange discreet, private walkthroughs of completed model independent floors and ongoing projects in Civil Lines, C-Scheme, and Vaishali Nagar, accompanied by a senior project architect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'VIP Chauffeured Site Inspection' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#013724] font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] transition-all cursor-pointer shadow-lg"
            >
              Book Private Site Visit
            </button>
            <a
              href={`tel:${settings?.phone || '+918875566970'}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Concierge</span>
            </a>
          </div>
        </div>

      </div>

      {/* Subtle light to dark transition border for footer harmony */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default BuyPage;
