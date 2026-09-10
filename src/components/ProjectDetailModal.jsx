import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, CheckCircle2, Download, Calendar, ShieldCheck, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/projectsData';
import { useSiteData } from '../context/SiteDataContext';

export const ProjectDetailModal = ({ project, currency, onClose, onOpenVipModal }) => {
  const { addLead } = useSiteData();
  const [selectedImage, setSelectedImage] = useState(0);
  const [brochureDownloading, setBrochureDownloading] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `I would like detailed pricing, floor plans, and payment schedules for ${project?.title}.`
  });

  if (!project) return null;

  const handleDownloadBrochure = () => {
    setBrochureDownloading(true);
    setTimeout(() => {
      setBrochureDownloading(false);
      setBrochureDownloaded(true);
      // create simulated download
      const element = document.createElement("a");
      const file = new Blob([
        `AR HOMES - ${project.title} OFFICIAL BROCHURE & ARCHITECTURAL OVERVIEW\n\n` +
        `RERA Registration: ${project.rera}\n` +
        `Location: ${project.subtitle}\n` +
        `Land Extent: ${project.landExtent}\n` +
        `Configurations: ${project.configurations}\n` +
        `Price Range: ${currency === 'INR' ? project.priceInr : project.priceUsd}\n` +
        `Possession: ${project.possession}\n\n` +
        `Key Highlights:\n` + project.highlights.map(h => `- ${h}`).join('\n') + `\n\n` +
        `Sales Concierge: ${BRAND_INFO.phoneDisplay} | ${BRAND_INFO.email}\n` +
        `Corporate Office: ${BRAND_INFO.address}\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${project.id}-official-brochure.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      property_interest: project.title,
      message: formData.message,
      source: 'Project Detail Modal Instant Inquiry',
      temperature: 'Hot',
      privacy_consent: true,
      terms_accepted: true,
      marketing_consent: false,
      policy_version: 'v2026.1',
      consent_timestamp: new Date().toISOString()
    });
    setEnquirySent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-luxury-dark border border-luxury-border rounded-lg shadow-2xl overflow-hidden my-8">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-luxury-black/80 hover:bg-luxury-gold text-slate-300 hover:text-luxury-black rounded-full border border-luxury-border transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Media & Highlights */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-luxury-black/40 border-b lg:border-b-0 lg:border-r border-luxury-border">
            
            {/* Active Image View */}
            <div className="relative h-64 sm:h-80 rounded-md overflow-hidden mb-4 border border-luxury-border">
              <img
                src={project.gallery[selectedImage] || project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-luxury-gold text-luxury-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                {project.badge}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-14 rounded overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === idx ? 'border-luxury-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Architectural Overview */}
            <h4 className="font-serif text-lg font-bold text-white mb-2 uppercase tracking-wide">
              Architectural Concept
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
              {project.overview}
            </p>

            {/* Key Highlights */}
            <h4 className="font-serif text-sm font-bold text-luxury-gold mb-3 uppercase tracking-wider">
              Signature Distinctions
            </h4>
            <div className="space-y-2 mb-6">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Amenities Tag Cloud */}
            <h4 className="font-serif text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              Enclave Amenities
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.amenitiesList.map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-3 py-1 bg-luxury-card border border-luxury-border rounded text-slate-300 font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>

            {/* Brochure Download CTA */}
            <div className="pt-4 border-t border-luxury-border flex items-center gap-3">
              <button
                onClick={handleDownloadBrochure}
                disabled={brochureDownloading}
                className="w-full py-3 bg-luxury-card hover:bg-luxury-border border border-luxury-gold/40 text-luxury-gold hover:text-white rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>
                  {brochureDownloading
                    ? "Generating Brochure..."
                    : brochureDownloaded
                    ? "Brochure Downloaded ✓"
                    : "Download Digital Brochure (PDF)"}
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Key Specifications & Fast Lead Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-luxury-dark">
            <div>
              {/* Header Title */}
              <div className="flex items-center gap-1.5 text-xs text-luxury-gold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.subtitle}</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-white mb-2">
                {project.title}
              </h3>
              
              {/* Price Banner */}
              <div className="p-3.5 bg-luxury-black/80 rounded border border-luxury-border mb-6">
                <div className="text-[10px] uppercase text-slate-400 tracking-wider">Pricing Range</div>
                <div className="text-xl font-serif font-bold text-luxury-gold">
                  {currency === 'INR' ? project.priceInr : project.priceUsd}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Exclusive of registration, stamp duty, and applicable maintenance.
                </div>
              </div>

              {/* RERA and Quick Specs Table */}
              <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                <div className="flex justify-between py-1.5 border-b border-luxury-border/50">
                  <span className="text-slate-400">RERA Registration</span>
                  <span className="font-mono text-luxury-gold font-semibold">{project.rera}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-luxury-border/50">
                  <span className="text-slate-400">Development Type</span>
                  <span className="text-white font-medium">{project.towers}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-luxury-border/50">
                  <span className="text-slate-400">Total Land Parcel</span>
                  <span className="text-white font-medium">{project.landExtent}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-luxury-border/50">
                  <span className="text-slate-400">Unit Configurations</span>
                  <span className="text-white font-medium">{project.configurations}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-luxury-border/50">
                  <span className="text-slate-400">Estimated Handover</span>
                  <span className="text-luxury-gold font-medium">{project.possession}</span>
                </div>
              </div>

              {/* Direct Enquiry Box */}
              <div className="bg-luxury-card p-4 rounded border border-luxury-border">
                <h4 className="font-serif text-sm font-bold text-white mb-1 uppercase tracking-wider">
                  Request Floor Plans & Cost Sheet
                </h4>
                <p className="text-[11px] text-slate-400 mb-3">
                  Our private client relationship manager will share official unit layouts within 30 minutes.
                </p>

                {enquirySent ? (
                  <div className="p-4 bg-luxury-gold/10 border border-luxury-gold/40 rounded text-center">
                    <CheckCircle2 className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                    <div className="font-serif text-sm font-bold text-white">Inquiry Received</div>
                    <p className="text-xs text-slate-300 mt-1">
                      Our Senior Property Specialist will connect with you promptly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-luxury-black/70 border border-luxury-border rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        placeholder="Phone / WhatsApp"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-luxury-black/70 border border-luxury-border rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-luxury-black/70 border border-luxury-border rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>

                    <label className="flex items-start gap-2 pt-1 cursor-pointer select-none text-[11px] text-gray-300">
                      <input
                        type="checkbox"
                        required
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          if (e.target.checked) setTermsError(false);
                        }}
                        className="mt-0.5 w-3.5 h-3.5 rounded border-gray-600 text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37] cursor-pointer shrink-0"
                      />
                      <span>
                        <span className="text-[#D4AF37] font-semibold mr-1">[Required]</span>
                        I agree to the{' '}
                        <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline font-medium">
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline font-medium">
                          Privacy Policy
                        </Link>.
                      </span>
                    </label>

                    {termsError && !termsAccepted && (
                      <div className="text-[10px] text-rose-400 font-medium">Please accept the Terms & Conditions before submitting.</div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-luxury-gold hover:bg-luxury-goldHover text-luxury-black font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-md active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Send Instant Inquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-luxury-border flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenVipModal(project);
                }}
                className="w-full py-3 bg-gradient-to-r from-luxury-gold via-luxury-goldLight to-luxury-gold text-luxury-black font-semibold text-xs tracking-wider uppercase rounded flex items-center justify-center gap-2 shadow-lg hover:shadow-luxury-gold/30 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Site Experience Tour</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
