import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useSiteData } from '../context/SiteDataContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Maximize2 
} from 'lucide-react';

const formatImageUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/uc\?id=)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
  }
  return url;
};

const CATEGORIES = [
  { id: 'all', label: 'All Portfolio' },
  { id: 'villas', label: 'Villas & Mansions' },
  { id: 'floors', label: 'Independent Floors' },
  { id: 'apartments', label: 'Apartments' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'land', label: 'Plots & Land Estates' },
  { id: 'interiors', label: 'Interiors & Salons' }
];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'villas',
    title: 'The Imperial Mansions & Villas',
    location: 'Sirsi Road / Vaishali Estate, Jaipur',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 2,
    category: 'floors',
    title: 'C2 Boutique Independent Floor',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 3,
    category: 'land',
    title: 'AR Palm Meadows Freehold Estate Land & Plots',
    location: 'Ajmer Road Express Corridor, Jaipur',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 4,
    category: 'commercial',
    title: 'AR Pinnacle Business Suites Commercial Tower',
    location: 'Tonk Road Commercial District, Jaipur',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 5,
    category: 'apartments',
    title: 'AR Homes Altura High-Rise Monolith',
    location: 'Tonk Road Corridor, Jaipur',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 6,
    category: 'floors',
    title: 'C5 Sculpted Verandas & Facade',
    location: 'Vaishali Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 7,
    category: 'land',
    title: 'Gated Luxury Residential Land Enclave',
    location: 'Sirsi Road Corridor, Jaipur',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 8,
    category: 'interiors',
    title: 'Double-Height Living Salon in Statuario Marble',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 9,
    category: 'interiors',
    title: 'European Modular Kitchen & Island',
    location: 'C-Scheme, Jaipur',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 10,
    category: 'villas',
    title: 'Rooftop Lap Pool & Skyline Pergola',
    location: 'Vaishali Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 11,
    category: 'interiors',
    title: 'Primary Master Retreat & Hardwood Suite',
    location: 'Jagatpura, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 12,
    category: 'commercial',
    title: 'Grade-A Commercial Fitted Office Suite',
    location: 'Tonk Road IT Park, Jaipur',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85'
  }
];

export const GalleryPage = () => {
  const { gallery } = useSiteData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const displayGallery = gallery && gallery.length > 0 ? gallery : GALLERY_ITEMS;

  const filteredItems = displayGallery.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const handleOpenLightbox = (index) => setLightboxIndex(index);
  const handleCloseLightbox = () => setLightboxIndex(null);

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      {/* Light Minimal Header: Just Heading & Subheading */}
      <PageHeader
        theme="light"
        badge="Visual Portfolio"
        title="Properties & Land"
        highlight="Gallery"
        subtitle="A curated showcase of our luxury residences, villas, apartments, commercial spaces, and freehold land estates across Jaipur."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-10 sm:py-16">
        
        {/* Minimal Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' 
              ? GALLERY_ITEMS.length 
              : GALLERY_ITEMS.filter(i => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm ${
                  isActive
                    ? 'bg-[#013724] text-white shadow-[#013724]/20 scale-105 border border-[#013724]'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pure Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm flex flex-col justify-between"
            >
              {/* Photo */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={formatImageUrl(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/85 backdrop-blur-md text-slate-700 shadow-sm group-hover:bg-[#013724] group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Minimal Card Footer */}
              <div className="p-5 bg-white">
                <div className="flex items-center gap-1 text-[#013724] text-[10px] uppercase tracking-widest font-bold mb-1">
                  <MapPin className="w-3 h-3 text-[#013724]" />
                  <span>{item.location}</span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#013724] transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          data-lenis-prevent
        >
          <button
            type="button"
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="max-h-[75vh] w-auto overflow-hidden rounded-2xl border border-white/20 shadow-2xl mb-4 bg-black">
              <img
                src={formatImageUrl(filteredItems[lightboxIndex].image)}
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
            
            <div className="text-center max-w-xl text-white">
              <span className="text-[#D4AF37] text-[11px] uppercase tracking-widest font-semibold block mb-1">
                {filteredItems[lightboxIndex].location} • Image {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h4 className="font-serif text-xl font-bold mb-1">
                {filteredItems[lightboxIndex].title}
              </h4>
            </div>
          </div>
        </div>
      )}

      {/* Subtle bottom gradient to footer */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default GalleryPage;
