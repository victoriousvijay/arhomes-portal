import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { RESIDENCES } from '../data/projectsData';
import { Home, Building2, Landmark, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Sparkles, Filter, Search } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Properties' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'apartments', label: 'Apartments' },
  { id: 'villas-houses', label: 'Villas / Houses' },
  { id: 'plots-land', label: 'Plots / Land' },
  { id: 'new-properties', label: 'New Properties' }
];

// Expanded property catalog for sale
const BUY_CATALOG = [
  ...RESIDENCES.map((res, idx) => ({
    ...res,
    category: idx % 2 === 0 ? 'residential' : 'apartments',
    subCategory: idx === 0 ? 'villas-houses' : 'new-properties',
    isNew: idx < 2
  })),
  {
    id: 'ar-commercial-tower',
    title: 'AR Pinnacle Business Suites',
    location: 'Golf Course Extension Road, Gurugram',
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
    overview: 'LEED Gold certified commercial floor plates designed for global corporate headquarters and high-net-worth investors looking for stable commercial capital appreciation.',
    price: '₹2.45 Cr onwards',
    priceUsd: ',000 onwards',
    rera: 'RC/REP/HARERA/GGM/890/2026',
    status: 'Ready to Fit-Out',
    isNew: true
  },
  {
    id: 'ar-meadows-plots',
    title: 'AR Palm Meadows Estate Plots',
    location: 'Sohna - South of Gurgaon',
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
    overview: 'Bespoke freehold residential plots surrounded by the Aravalli hills, complete with underground cabling, private security checkpoints, and landscaped avenues.',
    price: '₹1.80 Cr onwards',
    priceUsd: ',000 onwards',
    rera: 'RC/REP/HARERA/GGM/612/2026',
    status: 'Ready for Registry',
    isNew: false
  },
  {
    id: 'ar-imperial-villas',
    title: 'The Imperial Mansions & Villas',
    location: 'Kollur Luxury Corridor, Hyderabad',
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
    overview: 'Palatial triplex mansions designed with Scandinavian floor-to-ceiling glass pavilions, double-height great rooms, and private rooftop sky lounges.',
    price: '₹6.75 Cr onwards',
    priceUsd: ',000 onwards',
    rera: 'P01100009981',
    status: 'Exclusive Launch',
    isNew: true
  }
];

export const BuyPage = ({ onOpenEnquiry, onSelectResidence }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get('type') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(rawType);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (rawType) {
      setSelectedCategory(rawType.toLowerCase());
    }
  }, [rawType]);

  const handleTabClick = (id) => {
    setSelectedCategory(id);
    setSearchParams(id === 'all' ? {} : { type: id });
  };

  const filteredProperties = BUY_CATALOG.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      item.subCategory === selectedCategory ||
      (selectedCategory === 'new-properties' && item.isNew) ||
      (selectedCategory === 'residential' && item.category !== 'commercial' && item.category !== 'plots-land');

    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.overview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Banner */}
      <PageHeader
        badge="Properties For Sale"
        title="Discover Your Ideal"
        highlight="Home & Investment"
        subtitle="Explore luxury independent floors, premium high-rise residences, iconic villas, and commercial real estate engineered for lasting distinction."
        breadcrumbs={[{ label: 'Buy Properties' }]}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12 sm:py-16">
        
        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-white/10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#013724] shadow-lg shadow-[#D4AF37]/20 scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a1410] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between py-6 text-xs text-gray-400">
          <span>Showing <strong className="text-white">{filteredProperties.length}</strong> available properties</span>
          <span className="text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> 100% Verified RERA Registered
          </span>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#0b1411] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#013724]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                    {prop.builtForm}
                  </span>
                  {prop.isNew && (
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-[10px] font-bold uppercase tracking-wider text-[#013724]">
                      New Release
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {prop.location}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-4 line-clamp-2">
                    {prop.overview}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6 pt-3 border-t border-white/10">
                    {prop.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{feat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">Starting Price</span>
                    <span className="text-base font-bold text-[#D4AF37]">{prop.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectResidence && onSelectResidence(prop)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry && onOpenEnquiry(prop)}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#D4AF37] text-[#013724] hover:bg-white transition-colors cursor-pointer shadow-md"
                    >
                      Enquire
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banking & Advisory Banner */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[#013724] via-[#012217] to-[#013724] border border-[#205843] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Financing & Advisory</span>
            <h4 className="font-serif text-2xl font-normal text-white">
              Pre-Approved Home Loans with Preferred Banking Partners
            </h4>
            <p className="text-xs text-slate-300 font-light max-w-xl">
              Enjoy seamless 8.35% competitive mortgage rates with HDFC, SBI, ICICI, and Axis Bank. Our in-house financial desk handles all paperwork and disbursement support.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Home Loan & Investment Advisory' })}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#013724] transition-all shrink-0 cursor-pointer shadow-xl"
          >
            Check Loan Eligibility
          </button>
        </div>

      </div>
    </div>
  );
};

export default BuyPage;
