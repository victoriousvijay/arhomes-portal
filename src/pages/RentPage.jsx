import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RentHeroCarousel } from '../components/RentHeroCarousel';
import { 
  Building, 
  Home, 
  Key, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Search, 
  UserCheck,
  FileCheck,
  Award,
  PhoneCall,
  BadgeCheck
} from 'lucide-react';

const RENT_CATEGORIES = [
  { id: 'all', label: 'All Rentals' },
  { id: 'apartments', label: 'Apartments' },
  { id: 'houses-villas', label: 'Houses / Villas' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'pg-coliving', label: 'PG / Co-living' }
];

const RENT_CATALOG = [
  {
    id: 'rent-dlf-garden-floor',
    title: '5 BHK Independent Floor with Terrace',
    category: 'houses-villas',
    location: 'Civil Lines Prime, Jaipur',
    rent: '₹1,25,000 / month',
    deposit: '2 Months Deposit',
    furnishing: 'Semi-Furnished Luxury',
    area: '3,200 Sq.Ft',
    availableFrom: 'Immediate Move-in',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Private Elevator', 'Italian Marble', 'Modular Kitchen', '2 Parking Bays'],
    overview: 'Sprawling high-specification independent floor with sun-drenched balconies, imported Italian marble salon, private terrace deck, and 24/7 security.'
  },
  {
    id: 'rent-kollur-sky-suite',
    title: '3 BHK High-Rise Penthouse Suite',
    category: 'apartments',
    location: 'C-Scheme Heritage Enclave, Jaipur',
    rent: '₹68,000 / month',
    deposit: '2 Months Deposit',
    furnishing: 'Fully Furnished Turnkey',
    area: '2,150 Sq.Ft',
    availableFrom: 'Available 1st Next Month',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Clubhouse Access', 'Infinity Pool', 'Dolby Cinema Lounge', '100% Power Backup'],
    overview: 'Contemporary sky residence with designer furniture, integrated Bosch appliances, motorized drapery, and panoramic views of the western horizon.'
  },
  {
    id: 'rent-golf-course-villa',
    title: 'Signature 4 BHK Triplex Luxury Villa',
    category: 'houses-villas',
    location: 'Amrapali Circle, Vaishali Nagar, Jaipur',
    rent: '₹2,40,000 / month',
    deposit: '3 Months Deposit',
    furnishing: 'Fully Furnished Designer',
    area: '4,800 Sq.Ft',
    availableFrom: 'Immediate Move-in',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    tags: ['Private Lawn', 'Servant Quarters', 'Home Theater', 'EV Charging Bay'],
    overview: 'Expansive private residence featuring landscaped personal lawn, double-height ceiling foyer, dedicated staff room, and private elevator.'
  },
  {
    id: 'rent-cyber-hub-office',
    title: 'Fitted Corporate Work Suite (45 Workstations)',
    category: 'commercial',
    location: 'Tonk Road IT & Business Corridor, Jaipur',
    rent: '₹3,10,000 / month',
    deposit: '4 Months Deposit',
    furnishing: 'Plug & Play Fitted',
    area: '3,800 Sq.Ft',
    availableFrom: 'Immediate Move-in',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Conference Room', 'Server Room', 'Central HVAC', 'Cafeteria Access'],
    overview: 'Grade-A fully managed commercial office space with high-speed fiber internet, biometric turnstiles, executive cabins, and 100% dual DG backup.'
  },
  {
    id: 'rent-financial-coliving',
    title: 'AR Executive Studio Suite (All-Inclusive)',
    category: 'pg-coliving',
    location: 'Jagatpura Education & Tech Hub, Jaipur',
    rent: '₹28,500 / month',
    deposit: '1 Month Deposit',
    furnishing: 'Fully Serviced Studio',
    area: '450 Sq.Ft',
    availableFrom: 'Immediate Move-in',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    tags: ['Daily Housekeeping', 'High-Speed Wi-Fi', 'Gym & Gaming Zone', 'Chef Meals Option'],
    overview: 'Bespoke co-living suite tailored for working professionals and tech executives. Includes weekly linen change, utilities, and access to the shared clubhouse.'
  },
  {
    id: 'rent-garden-view-apt',
    title: '2.5 BHK Garden Residence',
    category: 'apartments',
    location: 'Mansarovar Extension, Jaipur',
    rent: '₹52,000 / month',
    deposit: '2 Months Deposit',
    furnishing: 'Semi-Furnished',
    area: '1,650 Sq.Ft',
    availableFrom: 'Immediate Move-in',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    tags: ['Park Facing', 'Modular Wardrobes', 'Children Play Zone', 'Gated Community'],
    overview: 'Tranquil family apartment overlooking the central parklands with modular kitchen fittings, energy-efficient inverter ACs, and dedicated basement parking.'
  }
];

export const RentPage = ({ onOpenEnquiry }) => {
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

  const filteredRentals = RENT_CATALOG.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.overview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      {/* 1. HERO BANNER: Animated Rental Carousel Banner */}
      <RentHeroCarousel 
        rentals={RENT_CATALOG}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 2. LIGHT THEME BODY: Trust-Building Header & Quick Stats */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 pt-14 pb-8">
        
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Direct Rental Residences</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
              Curated Homes <span className="italic text-[#013724] font-medium">To Rent</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3">
              Explore high-specification apartments, independent luxury floors, fitted commercial suites, and boutique executive studios across Jaipur.
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
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Owner Verified</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-[#D4AF37]">24h</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Digital Lease</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search (Light Theme) */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {RENT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-[#013724] text-white shadow-[#013724]/20 scale-105 border border-[#013724]'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search rental listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 hover:border-slate-400 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#013724] focus:ring-2 focus:ring-[#013724]/10 transition-colors shadow-sm"
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
        </div>

        {/* Live Filter Count (Clean without clutter badges) */}
        <div className="flex items-center justify-between py-5 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredRentals.length}</strong> available rental residences
          </span>
        </div>

        {/* Rentals Grid in High-Trust Light Theme */}
        {filteredRentals.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-8 shadow-sm">
            <Building className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No matching rental properties found</h3>
            <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
              We couldn't find any property matching your current filter criteria. Try resetting your search or contacting our rental concierge.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 bg-[#013724] text-white text-xs font-semibold rounded-xl hover:bg-[#D4AF37] hover:text-[#013724] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRentals.map((rental) => (
              <div
                key={rental.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={rental.image}
                    alt={rental.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#013724]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#F3E5AB] border border-[#D4AF37]/30 shadow-md">
                      {rental.furnishing}
                    </span>
                  </div>

                  {/* Bottom Location Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 text-slate-100 font-medium drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-[#F3E5AB]" />
                      {rental.location}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-medium">
                      <span>Area: {rental.area}</span>
                      <span className="text-emerald-700 font-semibold">{rental.availableFrom}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#013724] transition-colors mb-2">
                      {rental.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4 line-clamp-2">
                      {rental.overview}
                    </p>

                    {/* Highlights 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-5 pt-3 border-t border-slate-100">
                      {rental.tags.map((tag, tIdx) => (
                        <div 
                          key={tIdx} 
                          className="flex items-center gap-1.5 text-[11px] text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate font-medium">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-2">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Monthly Rent</span>
                      <span className="text-base sm:text-lg font-bold text-[#013724] tracking-tight">{rental.rent}</span>
                      <span className="block text-[10px] text-slate-500">{rental.deposit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenEnquiry && onOpenEnquiry({ title: `Schedule Visit - ${rental.title}` })}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                      >
                        Visit
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenEnquiry && onOpenEnquiry({ title: `Rent Enquiry - ${rental.title}` })}
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

        {/* 3. FOUR TRUST PILLARS (Rental Assurance Standard) */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#013724] font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Rental Quality Framework
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 mt-3">
              Rent with Absolute Confidence at <span className="italic text-[#013724]">AR Homes</span>
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Every home is verified, deep-cleaned, and backed by transparent digital lease documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#013724] mb-4">
                <Award className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">0% Brokerage Leases</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with property managers. No brokerage, no hidden transaction fees, and full clarity on security deposits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#013724] mb-4">
                <FileCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Digital Lease Registration</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Legally stamped e-agreements executed swiftly with biometric verification, clear notice periods, and fair clauses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#013724] mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Move-In Inspection Audit</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Professional sanitization, HVAC servicing, electrical inspection, and lock recalibration before key handover.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#013724] mb-4">
                <UserCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Dedicated Resident Helpdesk</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access on-demand plumbing, electrical, and facility repair support throughout the entire tenure of your stay.
              </p>
            </div>
          </div>
        </div>

        {/* 4. LANDLORD & TENANT CONCIERGE BANNER */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#013724] border border-[#205843] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3">
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Own a Luxury Residence in Jaipur?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
              List your independent floor or villa with AR Homes Property Management. We curate verified high-net-worth tenants, handle maintenance, and ensure prompt rental disbursements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'List Property for Rent with AR Homes' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#013724] font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] transition-all cursor-pointer shadow-lg"
            >
              List Your Property
            </button>
            <a
              href="tel:+918450984509"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Rental Desk</span>
            </a>
          </div>
        </div>

      </div>

      {/* Subtle light to dark transition border for footer harmony */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default RentPage;
