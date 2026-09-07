import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Building, Home, Key, MapPin, CheckCircle2, ShieldCheck, Calendar, Sparkles, Search, UserCheck } from 'lucide-react';

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
    location: 'Sector 93, DLF Garden City, Gurugram',
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
    location: 'Outer Ring Road, Kollur, Hyderabad',
    rent: '₹68,000 / month',
    deposit: '2 Months Deposit',
    furnishing: 'Fully Furnished Turnkey',
    area: '2,150 Sq.Ft',
    availableFrom: 'Available from 1st Next Month',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Clubhouse Access', 'Infinity Pool', 'Dolby Cinema Lounge', '100% Power Backup'],
    overview: 'Contemporary sky residence with designer furniture, integrated Bosch appliances, motorized drapery, and panoramic views of the western horizon.'
  },
  {
    id: 'rent-golf-course-villa',
    title: 'Signature 4 BHK Triplex Luxury Villa',
    category: 'houses-villas',
    location: 'Sector 73, Alameda, Gurugram',
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
    location: 'Golf Course Road Corridor, Gurugram',
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
    location: 'Financial District, Kollur Gateway, Hyderabad',
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
    location: 'Sector 93, Gurugram',
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
    <div className="min-h-screen bg-black text-white">
      {/* Header Banner */}
      <PageHeader
        badge="Curated Rental Portfolio"
        title="Refined Spaces to"
        highlight="Rent & Live"
        subtitle="Explore high-specification apartments, bespoke floors, fully managed commercial suites, and luxury co-living options with zero hassle."
        breadcrumbs={[{ label: 'Rent Properties' }]}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12 sm:py-16">
        
        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-white/10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {RENT_CATEGORIES.map((cat) => {
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
              placeholder="Search rental listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a1410] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Results Count & Badges */}
        <div className="flex items-center justify-between py-6 text-xs text-gray-400">
          <span>Showing <strong className="text-white">{filteredRentals.length}</strong> available rental residences</span>
          <span className="text-[#D4AF37] flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" /> Direct Verified Owners • Digital Leases
          </span>
        </div>

        {/* Rentals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-[#0b1411] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={rental.image}
                  alt={rental.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#013724]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                    {rental.furnishing}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {rental.location}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span>Area: {rental.area}</span>
                    <span className="text-[#D4AF37]">{rental.availableFrom}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                    {rental.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-4 line-clamp-2">
                    {rental.overview}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6 pt-3 border-t border-white/10">
                    {rental.tags.map((tag, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-medium">Monthly Rent</span>
                    <span className="text-base font-bold text-[#D4AF37]">{rental.rent}</span>
                    <span className="block text-[10px] text-gray-400">{rental.deposit}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry && onOpenEnquiry({ title: `Schedule Visit - ${rental.title}` })}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      Visit
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry && onOpenEnquiry({ title: `Rent Enquiry - ${rental.title}` })}
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

        {/* Tenant Guarantee Banner */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[#013724] via-[#012217] to-[#013724] border border-[#205843] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">The AR Homes Rental Standard</span>
            <h4 className="font-serif text-2xl font-normal text-white">
              0% Brokerage Leases • Standardized Digital Agreements
            </h4>
            <p className="text-xs text-slate-300 font-light max-w-xl">
              Every rental property under the AR Homes banner undergoes professional deep-cleaning, electrical audit, and biometric access configuration prior to handover.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Tenant Concierge & Lease Assistance' })}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#013724] transition-all shrink-0 cursor-pointer shadow-xl"
          >
            List Your Property For Rent
          </button>
        </div>

      </div>
    </div>
  );
};

export default RentPage;
