import React from 'react';
import { Waves, Castle, Film, Dumbbell, Leaf, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const AMENITIES = [
  {
    icon: 'waves',
    category: 'Wellness & Spa',
    title: 'Heated Rooftop Pool',
    desc: 'Temperature-controlled infinity pool with panoramic skyline views and private sun cabanas.'
  },
  {
    icon: 'dumbbell',
    category: 'Fitness Club',
    title: 'Technogym Fitness Studio',
    desc: 'State-of-the-art cardiovascular and strength training equipment with dedicated pilates and yoga zone.'
  },
  {
    icon: 'leaf',
    category: 'Nature & Landscape',
    title: 'Landscaped Zen Courtyards',
    desc: 'Sustainably manicured floral gardens, meditation pathways, and cascading water features.'
  },
  {
    icon: 'shield-check',
    category: 'Security & Concierge',
    title: '5-Tier Smart Security',
    desc: '24/7 biometric access, RFID vehicle gates, private elevator lobbies, and dedicated concierge desk.'
  },
  {
    icon: 'castle',
    category: 'Exclusive Club',
    title: 'Private Resident Lounge',
    desc: 'Bespoke banquet spaces, business boardrooms, and cigar lounge designed for executive hosting.'
  },
  {
    icon: 'film',
    category: 'Entertainment',
    title: 'Private Screening Theater',
    desc: 'Acoustically tuned 16-seat Dolby Atmos private cinema for intimate film screenings.'
  },
  {
    icon: 'zap',
    category: 'Smart Living',
    title: 'EV Fast-Charging Bays',
    desc: 'Dedicated high-voltage charging points for every residence along with 100% DG power backup.'
  },
  {
    icon: 'sparkles',
    category: 'Family Living',
    title: "Children's Play Sanctuary",
    desc: 'Safe, rubberized outdoor adventure play zone and indoor creative learning workshop for young residents.'
  }
];

export const LuxuryAmenities = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const getAmenityIcon = (iconName) => {
    const iconClass = isLight ? "w-6 h-6 text-[#013724]" : "w-6 h-6 text-luxury-gold";
    switch (iconName) {
      case 'waves': return <Waves className={iconClass} />;
      case 'castle': return <Castle className={iconClass} />;
      case 'film': return <Film className={iconClass} />;
      case 'dumbbell': return <Dumbbell className={iconClass} />;
      case 'leaf': return <Leaf className={iconClass} />;
      case 'shield-check': return <ShieldCheck className={iconClass} />;
      case 'zap': return <Zap className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section 
      id="services" 
      className={`py-20 sm:py-24 relative ${
        isLight 
          ? 'bg-white border-t border-slate-200 text-slate-900' 
          : 'bg-luxury-dark border-t border-luxury-border/60 text-white'
      }`}
    >
      <span id="amenities" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className={`w-8 h-[1px] ${isLight ? 'bg-[#013724]' : 'bg-luxury-gold'}`} />
            <span className={`text-xs uppercase tracking-[0.25em] font-semibold ${isLight ? 'text-[#013724]' : 'text-luxury-gold'}`}>
              The Art of Living
            </span>
            <span className={`w-8 h-[1px] ${isLight ? 'bg-[#013724]' : 'bg-luxury-gold'}`} />
          </div>
          <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
            World-Class <span className={isLight ? 'text-[#013724] font-normal italic' : 'text-gold-gradient font-normal italic'}>Amenities</span>
          </h2>
          <p className={`mt-4 text-sm font-normal leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400 font-light'}`}>
            Every amenity is an extension of your home. From skyward heated pools to 40,000 sq.ft private sporting pavilions, discover bespoke experiences engineered for wellbeing and leisure.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES.map((amenity, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300 ${
                isLight
                  ? 'bg-[#F8FAFC] border border-slate-200 hover:border-[#013724] hover:shadow-lg'
                  : 'glass-card border border-luxury-border hover:border-luxury-gold/50'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  isLight
                    ? 'bg-emerald-50 border border-emerald-200 group-hover:bg-[#013724] group-hover:text-white'
                    : 'bg-luxury-black/70 border border-luxury-border group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold'
                }`}>
                  {getAmenityIcon(amenity.icon)}
                </div>
                <div className={`text-[10px] uppercase tracking-widest font-semibold mb-1 ${
                  isLight ? 'text-[#013724]' : 'text-luxury-gold'
                }`}>
                  {amenity.category}
                </div>
                <h3 className={`font-serif text-lg font-bold mb-2 transition-colors ${
                  isLight ? 'text-slate-900 group-hover:text-[#013724]' : 'text-white group-hover:text-luxury-goldLight'
                }`}>
                  {amenity.title}
                </h3>
                <p className={`text-xs font-normal leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-400 font-light'
                }`}>
                  {amenity.desc}
                </p>
              </div>
              <div className={`pt-6 mt-4 flex items-center justify-between border-t ${
                isLight ? 'border-slate-200' : 'border-luxury-border/40'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider ${
                  isLight ? 'text-slate-500 font-medium' : 'text-slate-400'
                }`}>
                  Exclusive to Residents
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#013724]' : 'bg-luxury-gold'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Banner */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-[#205843] bg-gradient-to-r from-[#013724] via-[#01261a] to-[#013724] p-8 sm:p-12 text-white relative flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Eco-Conscious Engineering
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
              IGBC Platinum Rated Green Development
            </h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              AR Homes integrates rainwater harvesting aquifers, 100% organic waste composters, on-grid solar power generation for all communal areas, and high-efficiency low-E insulated glass panels to reduce carbon footprint by up to 35%.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <div className="px-6 py-4 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-center">
              <span className="font-serif text-3xl font-bold text-[#D4AF37]">35%</span>
              <div className="text-[10px] uppercase text-slate-300 tracking-wider mt-1">Energy Reduction</div>
            </div>
            <div className="px-6 py-4 rounded-xl bg-black/40 border border-[#D4AF37]/40 text-center">
              <span className="font-serif text-3xl font-bold text-[#D4AF37]">80%</span>
              <div className="text-[10px] uppercase text-slate-300 tracking-wider mt-1">Open Green Deck</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LuxuryAmenities;
