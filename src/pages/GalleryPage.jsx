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
    title: 'AR Homes Corporate Headquarters & Executive Team',
    category: 'commercial',
    location: 'Main Headquarters, Jaipur',
    image: '/gallery/gallery-01.jpg',
    display_order: 1
  },
  {
    id: 2,
    title: 'AR Homes Office Grand Opening & Inauguration',
    category: 'commercial',
    location: 'Corporate Office, Jaipur',
    image: '/gallery/gallery-02.jpg',
    display_order: 2
  },
  {
    id: 3,
    title: 'Executive Leadership & Founding Partners',
    category: 'commercial',
    location: 'Corporate Office, Jaipur',
    image: '/gallery/gallery-03.jpg',
    display_order: 3
  },
  {
    id: 4,
    title: 'Client Consultation Desks & Workstation Cabins',
    category: 'commercial',
    location: 'Corporate Office, Jaipur',
    image: '/gallery/gallery-04.jpg',
    display_order: 4
  },
  {
    id: 5,
    title: 'Architectural Planning & Engineering Studio',
    category: 'commercial',
    location: 'Corporate Office, Jaipur',
    image: '/gallery/gallery-05.jpg',
    display_order: 5
  },
  {
    id: 6,
    title: 'Corporate Reception & Client Greeting Zone',
    category: 'commercial',
    location: 'Corporate Office, Jaipur',
    image: '/gallery/gallery-06.jpg',
    display_order: 6
  },
  {
    id: 7,
    title: 'VIP Client Waiting Lounge & Project Showcase Wall',
    category: 'commercial',
    location: 'Corporate Office, Jaipur',
    image: '/gallery/gallery-07.jpg',
    display_order: 7
  },
  {
    id: 8,
    title: 'Executive Chamber & Deal Closure Suite',
    category: 'commercial',
    location: 'Corporate Office, Jaipur',
    image: '/gallery/gallery-08.jpg',
    display_order: 8
  },
  {
    id: 9,
    title: 'Executive Bedroom with Cove Ceiling & Full-Height Wardrobes',
    category: 'interiors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-09.jpg',
    display_order: 9
  },
  {
    id: 10,
    title: 'Designer Living Room Salon with Italian Marble & Chandelier',
    category: 'interiors',
    location: 'Vaishali Nagar, Jaipur',
    image: '/gallery/gallery-10.jpg',
    display_order: 10
  },
  {
    id: 11,
    title: 'Contemporary Guest Bedroom with Geometric Feature Wall',
    category: 'interiors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-11.jpg',
    display_order: 11
  },
  {
    id: 12,
    title: 'Modern Master Bedroom with Accent Lighting & Slatted Panels',
    category: 'interiors',
    location: 'C-Scheme, Jaipur',
    image: '/gallery/gallery-12.jpg',
    display_order: 12
  },
  {
    id: 13,
    title: 'Designer Dressing Area with Mirrored Storage & Ambient Glow',
    category: 'interiors',
    location: 'Vaishali Nagar, Jaipur',
    image: '/gallery/gallery-13.jpg',
    display_order: 13
  },
  {
    id: 14,
    title: 'Spacious Family Lounge & Architectural Display Niches',
    category: 'interiors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-14.jpg',
    display_order: 14
  },
  {
    id: 15,
    title: 'Modern Independent Floor Facade & Designer Boundary Gate',
    category: 'floors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-15.jpg',
    display_order: 15
  },
  {
    id: 16,
    title: 'Covered Portico & Stilt Parking with False Ceiling Spotlights',
    category: 'floors',
    location: 'Vaishali Nagar, Jaipur',
    image: '/gallery/gallery-16.jpg',
    display_order: 16
  },
  {
    id: 17,
    title: 'Covered Front Courtyard & Double Entry Doors',
    category: 'floors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-17.jpg',
    display_order: 17
  },
  {
    id: 18,
    title: 'Expansive Sunlit Balcony with Glass Railing & Wooden Soffit',
    category: 'floors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-18.jpg',
    display_order: 18
  },
  {
    id: 19,
    title: 'Full Modular Kitchen with Quartz Countertops & Gloss Cabinets',
    category: 'interiors',
    location: 'Vaishali Nagar, Jaipur',
    image: '/gallery/gallery-19.jpg',
    display_order: 19
  },
  {
    id: 20,
    title: 'Contemporary L-Shaped Modular Kitchen & Stainless Sink',
    category: 'interiors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-20.jpg',
    display_order: 20
  },
  {
    id: 21,
    title: 'Modern Bathroom Vanity with Ceramic Countertop & Wall Mirror',
    category: 'interiors',
    location: 'Vaishali Nagar, Jaipur',
    image: '/gallery/gallery-21.jpg',
    display_order: 21
  },
  {
    id: 22,
    title: 'Opulent Master Suite with Wooden Flooring & Built-in Headboard',
    category: 'interiors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-22.jpg',
    display_order: 22
  },
  {
    id: 23,
    title: 'En-Suite Bathroom with Large Format Italian Marble Tiles',
    category: 'interiors',
    location: 'Civil Lines, Jaipur',
    image: '/gallery/gallery-23.jpg',
    display_order: 23
  },
  {
    id: 24,
    title: 'Upper Level Terrace Landing with Panoramic Neighborhood View',
    category: 'villas',
    location: 'Vaishali Nagar, Jaipur',
    image: '/gallery/gallery-24.jpg',
    display_order: 24
  }
];

export const GalleryPage = () => {
  const { gallery } = useSiteData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const displayGallery = gallery && gallery.length > 0 ? gallery : GALLERY_ITEMS;

  const gallerySidebarItems = CATEGORIES.map((cat) => {
    const count = cat.id === 'all' 
      ? displayGallery.length 
      : displayGallery.filter(i => i.category === cat.id).length;
    return {
      id: cat.id,
      label: cat.label,
      count
    };
  });

  const activeCategoryIndex = Math.max(0, CATEGORIES.findIndex(c => c.id === activeCategory));

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
        
        {/* Mobile / Tablet Responsive Filter Bar */}
        <div className="lg:hidden mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Active Filter</span>
                <span className="text-sm font-bold text-[#013724]">
                  {CATEGORIES.find(c => c.id === activeCategory)?.label || 'All Portfolio'} ({filteredItems.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isMobileFilterOpen ? 'Close Categories' : 'Select Category'}</span>
                <span className="text-xs">{isMobileFilterOpen ? '▲' : '▼'}</span>
              </button>
            </div>

            {isMobileFilterOpen && (
              <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                <LineSidebar
                  items={gallerySidebarItems}
                  activeIndex={activeCategoryIndex}
                  onItemClick={(index, label, item) => {
                    setActiveCategory(item.id);
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

        {/* Desktop Layout: Side-by-Side LineSidebar + Pure Photo Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12 items-start">
          
          {/* Left Column: Interactive LineSidebar */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="mb-5 pb-3 border-b border-slate-100">
              <span className="text-[10px] uppercase tracking-widest text-[#013724] font-bold block">
                Portfolio Filter
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                Curated Archives
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Hover & click to navigate through property sectors.
              </p>
            </div>

            <LineSidebar
              items={gallerySidebarItems}
              activeIndex={activeCategoryIndex}
              onItemClick={(index, label, item) => setActiveCategory(item.id)}
              accentColor="#013724"
              textColor="#64748b"
              markerColor="#cbd5e1"
              showIndex={true}
              showMarker={true}
              fontSize={0.98}
              itemGap={15}
              markerLength={44}
              maxShift={20}
            />
          </aside>

          {/* Right Column: Photo Gallery Grid */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200/60">
              <span className="text-xs font-semibold text-slate-600">
                Showing <strong className="text-slate-900">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'Showcase' : 'Showcases'} in <strong className="text-[#013724]">{CATEGORIES.find(c => c.id === activeCategory)?.label}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
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
