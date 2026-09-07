import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import DomeGallery from '../components/DomeGallery';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Layers, 
  ShieldCheck, 
  ArrowDown, 
  MapPin, 
  RotateCcw, 
  Camera, 
  CheckCircle2,
  Move,
  Search,
  Building2,
  Calendar
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Spaces' },
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
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 2,
    category: 'exteriors',
    title: 'C2 Boutique Residence Elevation',
    subtitle: 'Low-density 5 BHK independent floor elevation with natural stone cladding',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 3,
    category: 'suites',
    title: 'Primary Master Suite',
    subtitle: 'Engineered hardwood flooring & bespoke dressing salon',
    location: 'Vaishali Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 4,
    category: 'kitchens',
    title: 'European Show Kitchen',
    subtitle: 'Quartz countertops with integrated German Bosch appliances',
    location: 'C-Scheme, Jaipur',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 5,
    category: 'outdoor',
    title: 'Rooftop Pergola & Sky Deck',
    subtitle: 'Custom timber louvers & evening skyline views across Jaipur',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 6,
    category: 'exteriors',
    title: 'Curved Balcony Architecture',
    subtitle: 'Sculpted organic facade at C5 Vaishali Nagar',
    location: 'Vaishali Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 7,
    category: 'suites',
    title: 'Ensuite Spa Bathroom',
    subtitle: 'Freestanding soaking tub & brushed gold Kohler fittings',
    location: 'C-Scheme, Jaipur',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 8,
    category: 'outdoor',
    title: 'Private Veranda & Lawn',
    subtitle: 'Natural sunlight and cross ventilation from 3 open sides',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 9,
    category: 'exteriors',
    title: 'AR Homes Altura High-Rise Monolith',
    subtitle: '35-storey sky mansions in Tonk Road corridor, Jaipur',
    location: 'Tonk Road, Jaipur',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 10,
    category: 'living',
    title: 'Formal Dining Salon',
    subtitle: '10-seater dining space with custom brass lighting and wine storage',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 11,
    category: 'outdoor',
    title: 'Temperature-Controlled Pool & Deck',
    subtitle: 'Rooftop private lap pool with natural stone coping',
    location: 'Vaishali Nagar, Jaipur',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 12,
    category: 'kitchens',
    title: 'Fluted Oak Breakfast Island',
    subtitle: 'Integrated breakfast counter opening into morning garden terrace',
    location: 'Civil Lines, Jaipur',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85'
  }
];

export const GalleryPage = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const catalogRef = useRef(null);

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterAndScroll = (catId) => {
    setActiveTab(catId);
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#010805] text-white selection:bg-[#D4AF37] selection:text-[#013724]">
      
      {/* ---------------------------------------------------- */}
      {/* 1. DYNAMIC & INTERACTIVE HERO SECTION                */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-black via-[#021f14] to-[#010805]">
        
        {/* Ambient background glow and grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-br from-[#013724]/40 to-[#D4AF37]/15 rounded-full blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10">
          
          {/* Breadcrumb & Live Tag */}
          <ScrollReveal animation="fade" delay={50}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-[#D4AF37]/10">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                360° Spherical Architecture
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-gray-300 text-[11px] tracking-wider border border-white/10">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                Jaipur, Rajasthan
              </span>
            </div>
          </ScrollReveal>

          {/* Hero Headline with Masking Effect */}
          <ScrollReveal animation="up" delay={120}>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-[1.08] mb-6">
                Cinematic Spaces & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF2B2] to-[#AA7C11] font-serif italic">
                  Living Architecture
                </span>
              </h1>
            </div>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal animation="up" delay={200}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light text-center max-w-2xl mx-auto leading-relaxed mb-8">
              Immerse yourself in Rajasthan&apos;s benchmark residences through an interactive three-dimensional lens. Hand-finished Italian Statuario marble, bespoke teak millwork, and sculpted verandas across Jaipur.
            </p>
          </ScrollReveal>

          {/* Interactive Fast Jump Buttons */}
          <ScrollReveal animation="up" delay={280}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-14">
              <button
                type="button"
                onClick={() => scrollToSection('interactive-dome')}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#013724] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/20 cursor-pointer"
              >
                <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
                360° Spherical Dome
              </button>

              <button
                type="button"
                onClick={() => handleFilterAndScroll('living')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Living Salons
              </button>

              <button
                type="button"
                onClick={() => handleFilterAndScroll('exteriors')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Facade Architecture
              </button>

              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'VIP Physical Site Tour Request' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#013724] hover:bg-[#024a31] text-[#D4AF37] border border-[#205843] font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book VIP Visit
              </button>
            </div>
          </ScrollReveal>

          {/* Floating Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <ScrollReveal animation="zoom" delay={150}>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-md text-center group">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-1 group-hover:scale-105 transition-transform">
                  360°
                </span>
                <span className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Spatial Sphere
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="zoom" delay={220}>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-md text-center group">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-1 group-hover:scale-105 transition-transform">
                  35+
                </span>
                <span className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Curated Tiles
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="zoom" delay={290}>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-md text-center group">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-1 group-hover:scale-105 transition-transform">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Statuario & Teak
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="zoom" delay={360}>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-md text-center group">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-1 group-hover:scale-105 transition-transform">
                  04 Prime
                </span>
                <span className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Jaipur Locations
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll Down Prompt */}
          <ScrollReveal animation="fade" delay={450}>
            <div className="flex flex-col items-center justify-center mt-12">
              <button
                type="button"
                onClick={() => scrollToSection('interactive-dome')}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer group"
                aria-label="Scroll to 3D Dome Gallery"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">
                  Explore 3D Spherical Dome
                </span>
                <div className="w-8 h-12 rounded-full border border-white/20 group-hover:border-[#D4AF37] flex items-center justify-center p-1 transition-colors">
                  <ArrowDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
                </div>
              </button>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. 3D DOME GALLERY SECTION                           */}
      {/* ---------------------------------------------------- */}
      <section id="interactive-dome" className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-[1500px] mx-auto">
        <ScrollReveal animation="up">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest mb-3 border border-[#D4AF37]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive 3D Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3">
              Rotate, Drag & Discover Every Angle
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
              Drag anywhere on the dome below to spin through 360 degrees of boutique residences. Click any image to enlarge in high resolution.
            </p>
            
            {/* Gesture Legend / User Hints */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-5 text-[11px] sm:text-xs text-gray-400 font-light">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10">
                <Move className="w-3.5 h-3.5 text-[#D4AF37]" />
                Drag 360° to Pan
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10">
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                Tap Tile to Enlarge
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10">
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                Smooth Inertia Physics
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Dome Gallery 3D Container */}
        <ScrollReveal animation="zoom" delay={100}>
          <div className="relative w-full h-[580px] sm:h-[680px] md:h-[780px] lg:h-[840px] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(1,55,36,0.25)] bg-[#021810]">
            <DomeGallery 
              grayscale={false}
              overlayBlurColor="#021810"
              minRadius={580}
              padFactor={0.22}
              openedImageWidth="min(90vw, 680px)"
              openedImageHeight="min(75vh, 520px)"
              imageBorderRadius="18px"
              openedImageBorderRadius="24px"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. CURATED SPACE-BY-SPACE COLLECTION                 */}
      {/* ---------------------------------------------------- */}
      <section ref={catalogRef} className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-24">
        
        <ScrollReveal animation="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block mb-2">
                Curated Catalog
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Explore Residences by Space
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md">
              Filter through our hand-finished living salons, master retreats, and luxury facades across Civil Lines and Vaishali Nagar.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal animation="fade" delay={100}>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-12">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              const count = cat.id === 'all' 
                ? GALLERY_ITEMS.length 
                : GALLERY_ITEMS.filter(i => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#013724] shadow-lg shadow-[#D4AF37]/20 scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#013724]/20 text-[#013724]' : 'bg-white/10 text-gray-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <ScrollReveal key={item.id} animation="up" delay={(idx % 3) * 100}>
              <div
                onClick={() => handleOpenLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden bg-[#0a1410] border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 cursor-pointer shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card Gradient & Meta */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-[#D4AF37] text-[10px] uppercase tracking-widest font-semibold mb-1">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-light line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* 4. PHYSICAL SITE VISIT VIP CALLOUT                   */}
        {/* ---------------------------------------------------- */}
        <ScrollReveal animation="zoom">
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#013724] via-[#02432c] to-[#01281b] border border-[#205843] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                <Building2 className="w-4 h-4" />
                Experience Center Physical Site Tour
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white">
                Walk Through The Craftsmanship In Person
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl">
                Experience our fully furnished sample show residences in Civil Lines and Vaishali Nagar, Jaipur. Inspect marble selections, acoustic glass, and space flow firsthand.
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Experience Center Physical Tour Request' })}
              className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#D4AF37] hover:text-[#013724] transition-all shrink-0 cursor-pointer shadow-xl hover:scale-105"
            >
              Book Physical Tour
            </button>
          </div>
        </ScrollReveal>

      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. LIGHTBOX MODAL                                    */}
      {/* ---------------------------------------------------- */}
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
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
            
            <div className="text-center max-w-xl">
              <span className="text-[#D4AF37] text-[11px] uppercase tracking-widest font-semibold block mb-1">
                {filteredItems[lightboxIndex].location} • Image {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
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
