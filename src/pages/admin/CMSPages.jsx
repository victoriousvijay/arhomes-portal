import React, { useState, useRef } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  Layers, 
  Sparkles, 
  Users, 
  Image as ImageIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Save, 
  Check, 
  X,
  Eye,
  Building,
  ArrowUpDown
} from 'lucide-react';

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

const GALLERY_CATEGORIES = [
  { id: 'villas', label: 'Villas & Mansions' },
  { id: 'floors', label: 'Independent Floors' },
  { id: 'land', label: 'Land & Plots' },
  { id: 'commercial', label: 'Commercial Suites' },
  { id: 'apartments', label: 'High-Rise Apartments' },
  { id: 'interiors', label: 'Luxury Interiors' }
];

export const CMSPages = () => {
  const { 
    properties, 
    saveProperty, 
    owners, 
    saveOwner, 
    deleteOwner, 
    gallery, 
    saveGalleryItem, 
    deleteGalleryItem, 
    services,
    saveService,
    deleteService,
    uploadImage 
  } = useSiteData();

  const [activeTab, setActiveTab] = useState('owners'); // 'owners' | 'gallery' | 'buyHero' | 'services'

  // Owner Modal State
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [ownerForm, setOwnerForm] = useState({
    id: '',
    name: '',
    role: '',
    expertise: '',
    credentials: '',
    bio: '',
    image: '',
    display_order: 1
  });

  // Gallery Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    id: '',
    title: '',
    category: 'villas',
    location: 'Jaipur, Rajasthan',
    image: '',
    display_order: 1
  });

  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    id: '',
    title: '',
    category: 'Finance & Lending',
    desc: '',
    highlights: ['', '', ''],
    image: '',
    display_order: 1
  });

  const [isUploading, setIsUploading] = useState(false);
  const ownerFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);
  const serviceFileInputRef = useRef(null);

  // SERVICE HANDLERS
  const openEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      ...service,
      highlights: service.highlights && service.highlights.length ? [...service.highlights] : ['', '', '']
    });
    setIsServiceModalOpen(true);
  };

  const openNewService = () => {
    setEditingService(null);
    setServiceForm({
      id: `service-${Date.now()}`,
      title: '',
      category: 'Finance & Lending',
      desc: '',
      highlights: ['', '', ''],
      image: '',
      display_order: (services?.length || 0) + 1
    });
    setIsServiceModalOpen(true);
  };

  const handleServiceUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const publicUrl = await uploadImage(file);
      setServiceForm(prev => ({ ...prev, image: publicUrl }));
    } catch (err) {
      console.error('Service image upload error:', err);
      alert('Failed to upload image. You can also paste an image URL directly.');
    } finally {
      setIsUploading(false);
    }
  };

  const saveServiceSubmit = async (e) => {
    e.preventDefault();
    const finalForm = {
      ...serviceForm,
      image: formatGoogleDriveUrl(serviceForm.image),
      highlights: (serviceForm.highlights || []).filter(h => h && h.trim().length > 0)
    };
    await saveService(finalForm);
    setIsServiceModalOpen(false);
  };

  const reorderService = async (service, direction) => {
    const index = (services || []).findIndex(s => s.id === service.id);
    if (index < 0) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const currentOrder = service.display_order || index + 1;
    const targetService = services[targetIndex];
    const targetOrder = targetService.display_order || targetIndex + 1;

    await saveService({ ...service, display_order: targetOrder });
    await saveService({ ...targetService, display_order: currentOrder });
  };

  // OWNER HANDLERS
  const openEditOwner = (owner) => {
    setEditingOwner(owner);
    setOwnerForm({ ...owner });
    setIsOwnerModalOpen(true);
  };

  const openNewOwner = () => {
    setEditingOwner(null);
    setOwnerForm({
      id: `owner-${Date.now()}`,
      name: '',
      role: 'Co-Founder & Partner',
      expertise: 'Development & Strategy',
      credentials: 'B.Arch / B.E.',
      bio: '',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      display_order: owners.length + 1
    });
    setIsOwnerModalOpen(true);
  };

  const handleOwnerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setOwnerForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert('Upload failed. Please try another image.');
    } finally {
      setIsUploading(false);
    }
  };

  const saveOwnerSubmit = (e) => {
    e.preventDefault();
    if (!ownerForm.name.trim() || !ownerForm.image) {
      alert('Please provide name and photo.');
      return;
    }
    const processed = {
      ...ownerForm,
      image: formatGoogleDriveUrl(ownerForm.image),
      id: ownerForm.id || `owner-${Date.now()}`
    };
    saveOwner(processed);
    setIsOwnerModalOpen(false);
  };

  // GALLERY HANDLERS
  const openEditGallery = (item) => {
    setEditingGalleryItem(item);
    setGalleryForm({ ...item });
    setIsGalleryModalOpen(true);
  };

  const openNewGallery = () => {
    setEditingGalleryItem(null);
    setGalleryForm({
      id: Date.now(),
      title: '',
      category: 'villas',
      location: 'Jaipur, Rajasthan',
      image: '',
      display_order: gallery.length + 1
    });
    setIsGalleryModalOpen(true);
  };

  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setGalleryForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert('Upload failed. Please try another image.');
    } finally {
      setIsUploading(false);
    }
  };

  const saveGallerySubmit = (e) => {
    e.preventDefault();
    if (!galleryForm.title.trim() || !galleryForm.image) {
      alert('Please provide title and photo.');
      return;
    }
    const processed = {
      ...galleryForm,
      image: formatGoogleDriveUrl(galleryForm.image)
    };
    saveGalleryItem(processed);
    setIsGalleryModalOpen(false);
  };

  // BUY HERO CAROUSEL HANDLERS
  const heroProperties = properties.filter(p => p.is_hero_carousel);

  const toggleHero = (prop) => {
    saveProperty({
      ...prop,
      is_hero_carousel: !prop.is_hero_carousel
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#013724] font-semibold">
          <Layers className="w-4 h-4" />
          <span>Content Management System</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Page Content & Media Manager
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage the 3 Co-Founders, Photo Gallery portfolio, and Buy Page Hero Carousel slides.
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('owners')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'owners'
                ? 'bg-[#013724] text-white shadow-sm border border-transparent'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>3 Co-Founders (About Us)</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'owners' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {owners.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#013724] text-white shadow-sm border border-transparent'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Showcase</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {gallery.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('buyHero')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'buyHero'
                ? 'bg-[#013724] text-white shadow-sm border border-transparent'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Buy Hero Carousel</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'buyHero' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {heroProperties.length} Slides
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#013724] text-white shadow-sm border border-transparent'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services & Advisory Desks</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'services' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {(services || []).length} Desks
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: OWNERS */}
      {activeTab === 'owners' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">The Three Co-Founders & Leadership</h2>
              <p className="text-xs text-slate-500">
                Update leadership headshots, designations, engineering credentials, and biographies.
              </p>
            </div>
            <button
              onClick={openNewOwner}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Leader</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {owners.map((owner, idx) => (
              <div 
                key={owner.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#013724]/40 hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="relative h-60 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={formatGoogleDriveUrl(owner.image)}
                      alt={owner.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-[10px] text-white font-bold">
                      Founder #{idx + 1}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{owner.name}</h3>
                    <p className="text-xs text-[#013724] font-semibold mt-0.5">{owner.role}</p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{owner.credentials}</p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {owner.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => openEditOwner(owner)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#013724]" />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove ${owner.name}?`)) {
                        deleteOwner(owner.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GALLERY */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Visual Portfolio & Architecture Gallery</h2>
              <p className="text-xs text-slate-500">
                Manage property and land photographs with category tags (Villas, Floors, Land, Commercial).
              </p>
            </div>
            <button
              onClick={openNewGallery}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div 
                key={item.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col group hover:border-[#013724]/40 hover:shadow-md transition-all"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={formatGoogleDriveUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] text-slate-900 font-bold uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-500">{item.location}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openEditGallery(item)}
                      className="text-[11px] text-[#013724] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove photo "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BUY HERO CAROUSEL */}
      {activeTab === 'buyHero' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Buy Page Hero Carousel Manager</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Toggle which properties are showcased in the top hero slider on the Buy page.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#013724]">
              Properties Included in Carousel ({heroProperties.length} active)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map((prop) => (
                <div 
                  key={prop.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    prop.is_hero_carousel 
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-xs' 
                      : 'bg-slate-50 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={formatGoogleDriveUrl(prop.image)}
                      alt={prop.title}
                      className="w-14 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{prop.title}</h4>
                      <p className="text-[10px] text-slate-500 truncate">{prop.location}</p>
                      <p className="text-[10px] text-[#013724] font-bold">{prop.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleHero(prop)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ml-2 ${
                      prop.is_hero_carousel
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {prop.is_hero_carousel ? 'Showcased' : '+ Add to Hero'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SERVICES & ADVISORY DESKS */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Services & Financial Advisory Desks</h2>
              <p className="text-xs text-slate-500">
                Manage service cards shown on the Services & Loan Assistance page. Upload images, update descriptions, and feature bullet points.
              </p>
            </div>
            <button
              onClick={openNewService}
              className="px-4 py-2.5 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Advisory Service</span>
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(services || []).map((svc, idx) => (
              <div
                key={svc.id || idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#013724]/40 hover:shadow-md transition-all shadow-sm group"
              >
                <div>
                  {/* Thumbnail Image Header */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    {svc.image ? (
                      <img
                        src={formatGoogleDriveUrl(svc.image)}
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#D4AF37] border border-white/20">
                      {svc.category || 'Advisory Desk'}
                    </span>

                    <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      #{svc.display_order || idx + 1}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-[#013724] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {svc.desc}
                    </p>

                    {svc.highlights && svc.highlights.length > 0 && (
                      <div className="space-y-1.5 border-t border-slate-100 pt-3">
                        {svc.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-3 pt-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => reorderService(svc, 'up')}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === (services || []).length - 1}
                      onClick={() => reorderService(svc, 'down')}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      ▼
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditService(svc)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#013724]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service desk "${svc.title}"?`)) {
                          deleteService(svc.id);
                        }
                      }}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: EDIT/ADD OWNER (Light Theme + Internal Scroll) */}
      {isOwnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 max-h-[88vh] flex flex-col">
            {/* Pinned Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#013724]" />
                <span>{editingOwner ? 'Edit Founder Profile' : 'Add New Co-Founder'}</span>
              </h3>
              <button 
                onClick={() => setIsOwnerModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Internal Scroll Form Body */}
            <form onSubmit={saveOwnerSubmit} className="flex-1 overflow-y-auto flex flex-col">
              <div className="p-6 space-y-3.5 text-xs flex-1">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Founder Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand R. Verma"
                    value={ownerForm.name}
                    onChange={(e) => setOwnerForm({ ...ownerForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Executive Role *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Co-Founder & Managing Director"
                      value={ownerForm.role}
                      onChange={(e) => setOwnerForm({ ...ownerForm, role: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Area of Expertise</label>
                    <input
                      type="text"
                      placeholder="e.g. Land Acquisitions & Master Planning"
                      value={ownerForm.expertise}
                      onChange={(e) => setOwnerForm({ ...ownerForm, expertise: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Degrees & Credentials</label>
                  <input
                    type="text"
                    placeholder="e.g. B.E. Civil • 22+ Years Real Estate Leadership"
                    value={ownerForm.credentials}
                    onChange={(e) => setOwnerForm({ ...ownerForm, credentials: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                  />
                </div>

                {/* Photo Input (Upload or URL) */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-slate-800 font-bold block">Photo (Local File or Google Drive URL) *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL or Google Drive link"
                      value={ownerForm.image}
                      onChange={(e) => setOwnerForm({ ...ownerForm, image: e.target.value })}
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#013724]"
                    />
                    <input
                      type="file"
                      ref={ownerFileInputRef}
                      accept="image/*"
                      onChange={handleOwnerUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => ownerFileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#013724]" />
                      <span>{isUploading ? 'Uploading...' : 'Browse'}</span>
                    </button>
                  </div>
                  {ownerForm.image && (
                    <div className="flex items-center gap-2 pt-1">
                      <img 
                        src={formatGoogleDriveUrl(ownerForm.image)} 
                        alt="Preview" 
                        className="w-10 h-10 object-cover rounded-full border-2 border-[#013724]" 
                      />
                      <span className="text-[10px] text-slate-500 truncate">Photo selected</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Executive Biography</label>
                  <textarea
                    rows={3}
                    placeholder="Professional journey, architectural standards, milestones..."
                    value={ownerForm.bio}
                    onChange={(e) => setOwnerForm({ ...ownerForm, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724] resize-none"
                  />
                </div>
              </div>

              {/* Pinned Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOwnerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold shadow-md transition-colors cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT/ADD GALLERY PHOTO (Light Theme + Internal Scroll) */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 max-h-[88vh] flex flex-col">
            {/* Pinned Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#013724]" />
                <span>{editingGalleryItem ? 'Edit Gallery Photo' : 'Add Architecture Photo'}</span>
              </h3>
              <button 
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Internal Scroll Form Body */}
            <form onSubmit={saveGallerySubmit} className="flex-1 overflow-y-auto flex flex-col">
              <div className="p-6 space-y-3.5 text-xs flex-1">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Photo Title / Caption *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Italian Marble Living Salon"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category *</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    >
                      {GALLERY_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Locality / Project</label>
                    <input
                      type="text"
                      placeholder="e.g. Civil Lines, Jaipur"
                      value={galleryForm.location}
                      onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>
                </div>

                {/* Photo Input (Upload or URL) */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-slate-800 font-bold block">Photo (Local File or Google Drive URL) *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL or Google Drive link"
                      value={galleryForm.image}
                      onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#013724]"
                    />
                    <input
                      type="file"
                      ref={galleryFileInputRef}
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#013724]" />
                      <span>{isUploading ? 'Uploading...' : 'Browse'}</span>
                    </button>
                  </div>
                  {galleryForm.image && (
                    <div className="flex items-center gap-2 pt-1">
                      <img 
                        src={formatGoogleDriveUrl(galleryForm.image)} 
                        alt="Preview" 
                        className="w-14 h-10 object-cover rounded border border-slate-300" 
                      />
                      <span className="text-[10px] text-slate-500 truncate">Photo selected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pinned Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold shadow-md transition-colors cursor-pointer"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT/ADD SERVICE (Light Theme + Internal Scroll) */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-2xl animate-in fade-in zoom-in-95 max-h-[88vh] flex flex-col">
            {/* Pinned Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#013724]" />
                <span>{editingService ? 'Edit Advisory Service' : 'Add New Advisory Service'}</span>
              </h3>
              <button 
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Internal Scroll Form Body */}
            <form onSubmit={saveServiceSubmit} className="flex-1 overflow-y-auto flex flex-col">
              <div className="p-6 space-y-4 text-xs flex-1">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Home Loans & Instant Pre-Approvals"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category / Tag *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Finance & Lending"
                      value={serviceForm.category}
                      onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Display Order #</label>
                    <input
                      type="number"
                      value={serviceForm.display_order}
                      onChange={(e) => setServiceForm({ ...serviceForm, display_order: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the loan assistance or advisory service..."
                    value={serviceForm.desc}
                    onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724] resize-none"
                  />
                </div>

                {/* 3 Highlights */}
                <div className="space-y-2">
                  <label className="block text-slate-700 font-semibold">Key Bullet Highlights (Up to 3)</label>
                  {[0, 1, 2].map((hIdx) => (
                    <input
                      key={hIdx}
                      type="text"
                      placeholder={`Highlight #${hIdx + 1} (e.g. Preferential 8.35% Base Rates)`}
                      value={(serviceForm.highlights && serviceForm.highlights[hIdx]) || ''}
                      onChange={(e) => {
                        const copy = serviceForm.highlights ? [...serviceForm.highlights] : ['', '', ''];
                        copy[hIdx] = e.target.value;
                        setServiceForm({ ...serviceForm, highlights: copy });
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-[#013724]"
                    />
                  ))}
                </div>

                {/* Image Input (Local File or Google Drive) */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="text-slate-800 font-bold block">Service Card Photo (Local Upload or URL) *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL or Google Drive link"
                      value={serviceForm.image}
                      onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#013724]"
                    />
                    <input
                      type="file"
                      ref={serviceFileInputRef}
                      accept="image/*"
                      onChange={handleServiceUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => serviceFileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#013724]" />
                      <span>{isUploading ? 'Uploading...' : 'Browse'}</span>
                    </button>
                  </div>
                  {serviceForm.image && (
                    <div className="flex items-center gap-2 pt-1">
                      <img 
                        src={formatGoogleDriveUrl(serviceForm.image)} 
                        alt="Preview" 
                        className="w-16 h-12 object-cover rounded-lg border border-slate-300" 
                      />
                      <span className="text-[10px] text-slate-500">Photo preview loaded</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pinned Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#013724] hover:bg-[#024e33] text-white font-bold shadow-md transition-colors cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSPages;
