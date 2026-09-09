import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  Settings, 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Share2, 
  Save, 
  CheckCircle2, 
  Sliders, 
  Globe, 
  Sparkles,
  ExternalLink,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export const CMSSettings = () => {
  const { settings, updateSettings } = useSiteData();
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleEnquiryFieldToggle = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      enquiry_fields: {
        ...(prev.enquiry_fields || {}),
        [fieldName]: !(prev.enquiry_fields?.[fieldName])
      }
    }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            <Settings className="w-4 h-4" />
            <span>Global Master Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Global Site Settings & Sync
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Single control center: update contact info or social links here to instantly reflect across the entire website.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Website Synced Across All Pages!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Global Contact Details */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#091a13]/90 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                <span>Unified Contact Information</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Modifying these values instantly propagates to the Header, Footer, Contact Page, WhatsApp triggers, and Mobile Bar.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#013724] text-[#D4AF37] text-[10px] font-bold uppercase border border-[#D4AF37]/30">
              Live Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* Direct Phone Number */}
            <div>
              <label className="block text-gray-300 font-bold mb-1.5 flex items-center justify-between">
                <span>Primary Calling Phone Number *</span>
                <span className="text-[10px] text-gray-500 font-normal">e.g. +91 98290 12345</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98290 12345"
                  className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Used for all tel: dialer links and header hotline display.
              </p>
            </div>

            {/* WhatsApp Business Number */}
            <div>
              <label className="block text-gray-300 font-bold mb-1.5 flex items-center justify-between">
                <span>WhatsApp Business Number *</span>
                <span className="text-[10px] text-gray-500 font-normal">Digits only with country code</span>
              </label>
              <div className="relative">
                <MessageCircle className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                <input
                  type="text"
                  required
                  value={formData.whatsapp || ''}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="919829012345"
                  className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Powers all instant WhatsApp chats & concierge inquiry links.
              </p>
            </div>

            {/* Official Concierge Email */}
            <div>
              <label className="block text-gray-300 font-bold mb-1.5">
                Official Concierge Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="concierge@arhomes.in"
                  className="w-full pl-9 pr-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Reflected in contact page, footer, and mailto triggers.
              </p>
            </div>

            {/* Corporate Head Office Address */}
            <div>
              <label className="block text-gray-300 font-bold mb-1.5">
                Corporate Head Office Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <textarea
                  rows={2}
                  required
                  value={formData.corporate_address || ''}
                  onChange={(e) => setFormData({ ...formData, corporate_address: e.target.value })}
                  placeholder="AR Homes Corporate Office, Civil Lines, Jaipur, Rajasthan 302006"
                  className="w-full pl-9 pr-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Social Media Handles */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#091a13]/90 border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#D4AF37]" />
              <span>Social Media & Public Channels</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Sync company social profile URLs in the header, footer, and mobile drawer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            <div>
              <label className="block text-gray-300 font-bold mb-1.5">Instagram Profile Link</label>
              <input
                type="url"
                value={formData.instagram || ''}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/arhomesjaipur"
                className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1.5">Facebook Page Link</label>
              <input
                type="url"
                value={formData.facebook || ''}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                placeholder="https://facebook.com/arhomesjaipur"
                className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1.5">LinkedIn Profile Link</label>
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/arhomes"
                className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Enquiry Form Builder & Controls */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#091a13]/90 border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#D4AF37]" />
              <span>Enquiry Form Field Configuration</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Control which optional qualification fields appear on the public property enquiry modal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Budget Range Selection</span>
                <span className="text-[11px] text-gray-400">Ask buyer their preferred investment scale</span>
              </div>
              <button
                type="button"
                onClick={() => handleEnquiryFieldToggle('budget')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.enquiry_fields?.budget ? 'bg-emerald-500' : 'bg-white/10'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    formData.enquiry_fields?.budget ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Property / Land Type Selector</span>
                <span className="text-[11px] text-gray-400">Allow selecting Villas, Floors, Land, Commercial</span>
              </div>
              <button
                type="button"
                onClick={() => handleEnquiryFieldToggle('propertyType')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.enquiry_fields?.propertyType ? 'bg-emerald-500' : 'bg-white/10'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    formData.enquiry_fields?.propertyType ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Site Visit Date Preference</span>
                <span className="text-[11px] text-gray-400">Prompt for convenient weekend or weekday inspection date</span>
              </div>
              <button
                type="button"
                onClick={() => handleEnquiryFieldToggle('visitDate')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.enquiry_fields?.visitDate ? 'bg-emerald-500' : 'bg-white/10'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    formData.enquiry_fields?.visitDate ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Custom Buyer Message / Notes</span>
                <span className="text-[11px] text-gray-400">Include free-form query or special loan requirement box</span>
              </div>
              <button
                type="button"
                onClick={() => handleEnquiryFieldToggle('message')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.enquiry_fields?.message ? 'bg-emerald-500' : 'bg-white/10'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    formData.enquiry_fields?.message ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#040d08]/95 backdrop-blur-xl border border-[#D4AF37]/40 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Click save to immediately update all phone, email, and social fields site-wide.</span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#aa8c2c] text-[#013724] font-black text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Syncing...' : 'Save Global Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CMSSettings;
