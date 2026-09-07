import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { GALLERY_INTERIORS, RESIDENCES } from '../data/projectsData';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Media' },
  { id: 'living', label: 'Living Salons' },
  { id: 'suites', label: 'Primary Suites' },
  { id: 'kitchens', label: 'Modular Kitchens' },
  { id: 'outdoor', label: 'Terraces & Patios' },
  { id: 'exteriors', label: 'Facade Architecture' }
];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'living',
    title: 'Double-Height Living Salon',
    subtitle: 'Imported Italian Statuario Marble & Ambient Lighting',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 2,
    category: 'exteriors',
    title: 'C2 DLF Garden City Facade',
    subtitle: 'Low-density boutique independent floor elevation',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 3,
    category: 'suites',
    title: 'Primary Master Suite',
    subtitle: 'Engineered hardwood flooring & bespoke dressing salon',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 4,
    category: 'kitchens',
    title: 'European Show Kitchen',
    subtitle: 'Quartz countertops with integrated Bosch appliances',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 5,
    category: 'outdoor',
    title: 'Rooftop Pergola & Sky Deck',
    subtitle: 'Custom timber louvers & evening skyline views',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 6,
    category: 'exteriors',
    title: 'Curved Balcony Architecture',
    subtitle: 'Sculpted organic facade at Alameda Sector 73',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 7,
    category: 'suites',
    title: 'Ensuite Spa Bathroom',
    subtitle: 'Freestanding soaking tub & brushed gold Kohler fittings',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 8,
    category: 'outdoor',
    title: 'Private Veranda & Lawn',
    subtitle: 'Natural sunlight and cross ventilation from 3 open sides',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 9,
    category: 'exteriors',
    title: 'AR Homes Altura High-Rise Monolith',
    subtitle: '35-storey sky mansions in Jagatpura / Tonk Road, Jaipur',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[4/3]'
  }
];

export const GalleryPage = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Banner */}
      <PageHeader
        badge="Visual Portfolio"
        title="Cinematic Spaces &"
        highlight="Architecture"
        subtitle="Immerse yourself in high-resolution photography capturing the textures, craftsmanship, and light that define an AR Homes residence."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12 sm:py-16">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#0a1410] border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 cursor-pointer shadow-xl"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold mb-1">
                  <span>{item.category}</span>
                  <Maximize2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-300 font-light line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule a Private Viewing Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#013724] border border-[#205843] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block">
              Experience It In Person
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Schedule an Exclusive Physical Site Tour
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl">
              Visit our fully furnished show residences in Civil Lines and Vaishali Nagar, Jaipur. Our hospitality team will guide you through materials and finishes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Experience Center Physical Tour Request' })}
            className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#D4AF37] hover:text-[#013724] transition-all shrink-0 cursor-pointer shadow-xl"
          >
            Book Experience Tour
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <button
            type="button"
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="max-h-[75vh] w-auto overflow-hidden rounded-2xl border border-white/20 shadow-2xl mb-4">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
            <div className="text-center max-w-xl">
              <h4 className="font-serif text-xl font-bold text-white mb-1">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-xs text-gray-300 font-light">
                {filteredItems[lightboxIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
