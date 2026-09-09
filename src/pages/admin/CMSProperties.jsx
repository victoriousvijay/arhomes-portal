import React, { useState, useRef } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Upload, 
  Link as LinkIcon, 
  Check, 
  X, 
  Eye, 
  SlidersHorizontal,
  Home,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';

const CATEGORIES = [
  { id: 'residential', label: 'Luxury Residential' },
  { id: 'apartments', label: 'Penthouses & Apartments' },
  { id: 'commercial', label: 'Commercial & Retail' },
  { id: 'plots-land', label: 'Plots & Land Estates' },
  { id: 'villas-houses', label: 'Villas & Mansions' }
];

// Helper to convert Google Drive share link to direct renderable image URL
const formatGoogleDriveUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/uc\?id=)([a-zA-Z0-9_-]+)/;
  const match = trimmed.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
  }
  return trimmed;
};

export const CMSProperties = () => {
  const { properties, saveProperty, deleteProperty, uploadImage } = useSiteData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropId, setEditingPropId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url'
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'residential',
    subCategory: 'new-properties',
    location: '',
    price: '',
    priceUsd: '',
    builtForm: '',
    rera: '',
    status: 'Ready to Move',
    overview: '',
    image: '',
    is_featured_home: true,
    is_hero_carousel: true,
    isNew: false,
    display_order: 1
  });

  const openNewModal = () => {
    setEditingPropId(null);
    setFormData({
      title: '',
      category: 'residential',
      subCategory: 'new-properties',
      location: 'Jaipur, Rajasthan',
      price: '₹3.50 Cr onwards',
      priceUsd: '$420,000 onwards',
      builtForm: 'Independent Luxury Residence',
      rera: 'RAJ/P/2026/001',
      status: 'Ready to Move',
      overview: 'Exclusive bespoke residential development crafted with imported Italian marble and world-class finishes in Jaipur prime corridor.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      is_featured_home: true,
      is_hero_carousel: true,
      isNew: true,
      display_order: properties.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prop) => {
    setEditingPropId(prop.id);
    setFormData({
      title: prop.title || '',
      category: prop.category || 'residential',
      subCategory: prop.subCategory || 'new-properties',
      location: prop.location || '',
      price: prop.price || '',
      priceUsd: prop.priceUsd || '',
      builtForm: prop.builtForm || '',
      rera: prop.rera || '',
      status: prop.status || 'Ready to Move',
      overview: prop.overview || '',
      image: prop.image || '',
      is_featured_home: prop.is_featured_home !== undefined ? prop.is_featured_home : true,
      is_hero_carousel: prop.is_hero_carousel !== undefined ? prop.is_hero_carousel : false,
      isNew: prop.isNew || false,
      display_order: prop.display_order || 1
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const publicUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: publicUrl }));
    } catch (err) {
      alert('Failed to upload image. Please try another image or external URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image) {
      alert('Please fill out the property title and provide an image.');
      return;
    }

    const processedImageUrl = formatGoogleDriveUrl(formData.image);

    const propId = editingPropId || `prop-${Date.now()}`;
    const payload = {
      ...formData,
      id: propId,
      image: processedImageUrl,
      // Default features if not present
      features: formData.features || [
        { label: 'VRV HIGH-WALL AIR-CONDITIONING', icon: 'wind' },
        { label: 'ITALIAN STATUARIO FLOORING', icon: 'shield' },
        { label: 'PRIVATE HIGH-SPEED ELEVATOR', icon: 'maximize' },
        { label: 'TWO SECURE STILT BAYS', icon: 'sun' }
      ]
    };

    saveProperty(payload);
    setIsModalOpen(false);
  };

  // Quick toggle handlers directly from list
  const toggleFeaturedHome = (prop) => {
    saveProperty({
      ...prop,
      is_featured_home: !prop.is_featured_home
    });
  };

  const toggleHeroCarousel = (prop) => {
    saveProperty({
      ...prop,
      is_hero_carousel: !prop.is_hero_carousel
    });
  };

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (p.title || '').toLowerCase().includes(q) ||
      (p.location || '').toLowerCase().includes(q) ||
      (p.rera || '').toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            <Building2 className="w-4 h-4" />
            <span>Content Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Properties & Land Inventory
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Add, update, or remove real estate listings and control which properties display on the Home page or Buy Hero Carousel.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#aa8c2c] text-[#013724] font-bold text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search listings by title, locality, or RERA ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#013724] text-[#D4AF37] border border-[#D4AF37]/40'
                : 'bg-black/30 text-gray-400 hover:text-white'
            }`}
          >
            All ({properties.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#013724] text-[#D4AF37] border border-[#D4AF37]/40'
                  : 'bg-black/30 text-gray-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-400 bg-white/5 rounded-2xl border border-white/10">
            <Building2 className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <p className="text-sm font-semibold">No property listings found</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting search filters or click "Add New Property"</p>
          </div>
        ) : (
          filteredProperties.map((prop) => {
            return (
              <div 
                key={prop.id}
                className="rounded-2xl border border-white/10 bg-[#091a13]/90 overflow-hidden shadow-xl flex flex-col group hover:border-[#D4AF37]/40 transition-all"
              >
                {/* Image & Quick Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/40">
                  <img
                    src={formatGoogleDriveUrl(prop.image)}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06120c] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-[#D4AF37] font-bold uppercase">
                      {prop.category || 'Residential'}
                    </span>
                    {prop.status && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-[10px] text-white font-semibold">
                        {prop.status}
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 left-3">
                    <div className="text-lg font-black text-white drop-shadow">
                      {prop.price || 'Price on Request'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {prop.location}
                    </p>
                    {prop.builtForm && (
                      <p className="text-[11px] text-gray-300 font-medium mt-1">
                        🏛️ {prop.builtForm}
                      </p>
                    )}
                    {prop.rera && (
                      <div className="text-[10px] font-mono text-emerald-400 mt-1.5">
                        RERA: {prop.rera}
                      </div>
                    )}
                  </div>

                  {/* Visibility Toggles */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                      Page Visibility Controls:
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <Home className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-300 text-[11px]">Home Featured Grid</span>
                      </div>
                      <button
                        onClick={() => toggleFeaturedHome(prop)}
                        className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                          prop.is_featured_home ? 'bg-emerald-500' : 'bg-white/10'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                            prop.is_featured_home ? 'left-4' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-gray-300 text-[11px]">Buy Hero Carousel</span>
                      </div>
                      <button
                        onClick={() => toggleHeroCarousel(prop)}
                        className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                          prop.is_hero_carousel ? 'bg-[#D4AF37]' : 'bg-white/10'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                            prop.is_hero_carousel ? 'left-4' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => openEditModal(prop)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Edit Details</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete listing "${prop.title}"?`)) {
                          deleteProperty(prop.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 transition-all cursor-pointer"
                      title="Delete Property"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Add or Edit Property */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071710] border border-white/20 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#D4AF37]" />
                  <span>{editingPropId ? 'Edit Property Listing' : 'Add New Property or Land'}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Update specifications, pricing, imagery, and page placement.
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Imperial Mansions"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Location & Built Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Location / Locality in Jaipur *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Civil Lines / C-Scheme, Jaipur"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Built Form / Configuration</label>
                  <input
                    type="text"
                    placeholder="e.g. Triplex Independent Luxury Villas"
                    value={formData.builtForm}
                    onChange={(e) => setFormData({ ...formData, builtForm: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Price & Price USD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Price (₹ Display) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹4.25 Cr onwards"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Price USD (NRI International)</label>
                  <input
                    type="text"
                    placeholder="e.g. $510,000 onwards"
                    value={formData.priceUsd}
                    onChange={(e) => setFormData({ ...formData, priceUsd: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* RERA & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">RERA Number</label>
                  <input
                    type="text"
                    placeholder="e.g. RAJ/P/2026/891"
                    value={formData.rera}
                    onChange={(e) => setFormData({ ...formData, rera: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Construction Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Exclusive Launch">Exclusive Launch</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Ready for Registry">Ready for Registry</option>
                  </select>
                </div>
              </div>

              {/* Image Upload / Google Drive input */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-gray-200 font-bold flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                    <span>Property Image (Local File or Google Drive URL) *</span>
                  </label>

                  <div className="flex gap-1 p-0.5 bg-white/10 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('upload')}
                      className={`px-2 py-1 rounded text-[10px] font-semibold ${
                        imageInputMode === 'upload' ? 'bg-[#013724] text-[#D4AF37]' : 'text-gray-400'
                      }`}
                    >
                      Local File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-2 py-1 rounded text-[10px] font-semibold ${
                        imageInputMode === 'url' ? 'bg-[#013724] text-[#D4AF37]' : 'text-gray-400'
                      }`}
                    >
                      Drive / External Link
                    </button>
                  </div>
                </div>

                {imageInputMode === 'upload' ? (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 px-4 border border-dashed border-white/20 hover:border-[#D4AF37] rounded-xl flex flex-col items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <Upload className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-xs font-semibold text-gray-300">
                        {isUploading ? 'Uploading to Supabase Storage...' : 'Click to select image file from computer'}
                      </span>
                      <span className="text-[10px] text-gray-500">Supports JPG, PNG, WEBP up to 10MB</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder="Paste Google Drive share link (e.g. drive.google.com/file/d/.../view) or direct image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">
                      💡 Tip: Google Drive sharing links are automatically converted into direct viewable image URLs!
                    </p>
                  </div>
                )}

                {/* Preview Thumbnail */}
                {formData.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 rounded-lg bg-black/60 border border-white/10">
                    <img
                      src={formatGoogleDriveUrl(formData.image)}
                      alt="Preview"
                      className="w-16 h-12 object-cover rounded-md border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gray-300 font-semibold truncate">Image Selected</div>
                      <div className="text-[10px] text-gray-500 truncate">{formData.image}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Overview Description */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Property Overview & Details</label>
                <textarea
                  rows={3}
                  placeholder="Architectural features, structural highlights, private amenities, neighborhood details..."
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Page Placement Checkboxes */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-gray-300 font-bold mb-2">Publishing & Placement Controls:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_featured_home}
                      onChange={(e) => setFormData({ ...formData, is_featured_home: e.target.checked })}
                      className="rounded text-[#D4AF37] focus:ring-0"
                    />
                    <span className="text-gray-300">Feature on Home Page Grid</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_hero_carousel}
                      onChange={(e) => setFormData({ ...formData, is_hero_carousel: e.target.checked })}
                      className="rounded text-[#D4AF37] focus:ring-0"
                    />
                    <span className="text-gray-300">Include in Buy Page Hero Carousel</span>
                  </label>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#aa8c2c] text-[#013724] font-bold shadow-lg cursor-pointer"
                >
                  {editingPropId ? 'Save Property Updates' : 'Publish Property Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSProperties;
