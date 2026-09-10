import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Plus,
  Trash2,
  ListPlus,
  HelpCircle,
  Eye,
  Check,
  X
} from 'lucide-react';

export const CMSSettings = () => {
  const { settings, updateSettings, addCustomEnquiryField, removeCustomEnquiryField } = useSiteData();
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(prev => ({ ...prev, ...settings }));
    }
  }, [settings]);

  // New Custom Field Creator State
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const [newField, setNewField] = useState({
    label: '',
    type: 'text', // 'text', 'select', 'number', 'date'
    optionsStr: '',
    required: false,
    placeholder: ''
  });

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleEnquiryFieldToggle = (fieldName) => {
    const updated = {
      ...formData,
      enquiry_fields: {
        ...(formData.enquiry_fields || {}),
        [fieldName]: !(formData.enquiry_fields?.[fieldName])
      }
    };
    setFormData(updated);
    updateSettings(updated);
  };

  // Add Custom Field Handler
  const handleCreateField = async (e) => {
    e.preventDefault();
    if (!newField.label.trim()) return;

    let options = [];
    if (newField.type === 'select' && newField.optionsStr) {
      options = newField.optionsStr.split(',').map(s => s.trim()).filter(Boolean);
    }

    const created = await addCustomEnquiryField({
      label: newField.label.trim(),
      type: newField.type,
      options: options.length > 0 ? options : ['Option 1', 'Option 2'],
      required: newField.required,
      placeholder: newField.placeholder || ''
    });

    // Update local form state
    const currentFields = formData.enquiry_fields || {};
    const currentCustom = currentFields.custom_fields || [];
    setFormData({
      ...formData,
      enquiry_fields: {
        ...currentFields,
        custom_fields: [...currentCustom, created]
      }
    });

    setNewField({
      label: '',
      type: 'text',
      optionsStr: '',
      required: false,
      placeholder: ''
    });
    setIsAddFieldOpen(false);
  };

  const handleDeleteCustomField = async (fieldId) => {
    await removeCustomEnquiryField(fieldId);
    const currentFields = formData.enquiry_fields || {};
    const currentCustom = currentFields.custom_fields || [];
    setFormData({
      ...formData,
      enquiry_fields: {
        ...currentFields,
        custom_fields: currentCustom.filter(f => f.id !== fieldId)
      }
    });
  };

  const customFieldsList = formData.enquiry_fields?.custom_fields || [];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20 font-sans">
      {/* Top Header - Friendly & Minimal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            <Settings className="w-4 h-4 text-[#D4AF37]" />
            <span>Easy Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Website Settings & Form Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Change phone numbers, email, or customize enquiry questions. Everything syncs instantly with the live website.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Website Synced Across All Pages!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Global Contact Details */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#013724]" />
                <span>Contact Details (Syncs Everywhere)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update here once, and it changes on the Header, Footer, Contact Page, WhatsApp chat, and Mobile bar.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase border border-emerald-200">
              Live Everywhere
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* Direct Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">
                Calling Phone Number (with Country Code) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 88755 66970"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-[#013724]"
                />
              </div>
              <p className="text-[10px] text-slate-500">When visitors click "Call", this number dials.</p>
            </div>

            {/* WhatsApp Business Number */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">
                WhatsApp Chat Number (Digits Only) *
              </label>
              <div className="relative">
                <MessageCircle className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" />
                <input
                  type="text"
                  required
                  value={formData.whatsapp || ''}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="918875566970"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-[#013724]"
                />
              </div>
              <p className="text-[10px] text-slate-500">Powers all WhatsApp chat buttons on the website.</p>
            </div>

            {/* Official Email */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">
                Company Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="arhomesjaipur@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#013724]"
                />
              </div>
              <p className="text-[10px] text-slate-500">Shown in footer and contact page.</p>
            </div>

            {/* Office Address */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">
                Jaipur Office Address *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <textarea
                  rows={2}
                  required
                  value={formData.corporate_address || ''}
                  onChange={(e) => setFormData({ ...formData, corporate_address: e.target.value })}
                  placeholder="Shop No. 1&2, opposed Chaska restaurant & BAR, Saket Vihar, Hatoj - Kalwar - Jaipur Rd, Jaipur, Rajasthan 302012"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#013724]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Social Media Links */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#013724]" />
              <span>Social Media Profiles</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Update links for your company social channels (Instagram, Facebook, YouTube, LinkedIn).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Instagram Profile</label>
              <input
                type="url"
                value={formData.instagram || ''}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://www.instagram.com/arhomesindia/?hl=en"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#013724]"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Facebook Page</label>
              <input
                type="url"
                value={formData.facebook || ''}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                placeholder="https://www.facebook.com/arhomesjaipur/reels/"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#013724]"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">YouTube Channel</label>
              <input
                type="url"
                value={formData.youtube || ''}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                placeholder="https://www.youtube.com/@ARHOMES"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#013724]"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">LinkedIn Page</label>
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/arhomes"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-[#013724]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: ENQUIRY FORM BUILDER (Add, Remove, Toggle Fields) */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#013724]" />
                <span>Enquiry Form Builder & Custom Fields</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Toggle standard questions or add brand new questions to your website enquiry popup.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddFieldOpen(!isAddFieldOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#013724] hover:bg-[#024d33] text-white font-bold text-xs shadow transition-all cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Custom Field / Question</span>
            </button>
          </div>

          {/* ADD FIELD DRAWER / CARD */}
          {isAddFieldOpen && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <h3 className="text-xs font-bold text-[#013724] uppercase tracking-wider flex items-center gap-1.5">
                  <ListPlus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Create New Question / Input Field</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddFieldOpen(false)}
                  className="p-1 rounded bg-slate-200 text-slate-600 hover:text-slate-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Question / Field Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Preferred Calling Time, or Do you need home loan?"
                    value={newField.label}
                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#013724]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Input Type *
                  </label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#013724]"
                  >
                    <option value="text">Text (Short Answer)</option>
                    <option value="select">Dropdown (Client picks from list)</option>
                    <option value="number">Number (e.g. Budget or Units)</option>
                    <option value="date">Date Picker</option>
                  </select>
                </div>
              </div>

              {/* If select dropdown, ask for options */}
              {newField.type === 'select' && (
                <div className="text-xs">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Dropdown Choices (comma-separated) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Morning (10 AM - 1 PM), Evening (4 PM - 7 PM), Weekend Only"
                    value={newField.optionsStr}
                    onChange={(e) => setNewField({ ...newField, optionsStr: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-[#013724]"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Separate choices with a comma.</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={newField.required}
                    onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                    className="rounded text-[#013724]"
                  />
                  <span>Mark as Mandatory / Required field</span>
                </label>

                <button
                  type="button"
                  onClick={handleCreateField}
                  className="px-4 py-1.5 rounded-xl bg-[#013724] hover:bg-[#024d33] text-white font-bold text-xs cursor-pointer shadow"
                >
                  ✓ Save & Add to Enquiry Form
                </button>
              </div>
            </div>
          )}

          {/* Standard Core Fields Toggles */}
          <div className="space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-[#013724] font-bold">
              Standard Built-In Questions (Toggle on/off)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">Budget Range Selector</span>
                  <span className="text-[10px] text-slate-500">Ask client for investment scale</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleEnquiryFieldToggle('budget')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                    formData.enquiry_fields?.budget ? 'bg-[#013724]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      formData.enquiry_fields?.budget ? 'left-5' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">Property / Project Selector</span>
                  <span className="text-[10px] text-slate-500">Allows choosing specific listing</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleEnquiryFieldToggle('propertyType')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                    formData.enquiry_fields?.propertyType ? 'bg-[#013724]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      formData.enquiry_fields?.propertyType ? 'left-5' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">Site Visit Date Request</span>
                  <span className="text-[10px] text-slate-500">Prompt for convenient visit date</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleEnquiryFieldToggle('visitDate')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                    formData.enquiry_fields?.visitDate ? 'bg-[#013724]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      formData.enquiry_fields?.visitDate ? 'left-5' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">Message / Special Notes</span>
                  <span className="text-[10px] text-slate-500">Free text queries from buyer</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleEnquiryFieldToggle('message')}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                    formData.enquiry_fields?.message ? 'bg-[#013724]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      formData.enquiry_fields?.message ? 'left-5' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Active Custom Questions List */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] uppercase tracking-wider text-[#013724] font-bold flex items-center justify-between">
              <span>Your Custom Questions ({customFieldsList.length})</span>
              <span className="text-[10px] text-slate-500 font-normal">Appears in public Enquiry popup</span>
            </div>

            {customFieldsList.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
                No custom questions added yet. Click "+ Add Custom Field / Question" to add your own.
              </div>
            ) : (
              <div className="space-y-2">
                {customFieldsList.map((cf) => (
                  <div
                    key={cf.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#013724] text-white">
                        {cf.type}
                      </span>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate">{cf.label}</span>
                        {cf.options && cf.options.length > 0 && (
                          <span className="text-[10px] text-slate-500 truncate block">
                            Options: {cf.options.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cf.required && (
                        <span className="text-[10px] text-amber-800 font-semibold px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
                          Mandatory
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomField(cf.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                        title="Delete this question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Click save to immediately update all contact and form fields site-wide.</span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#013724] hover:bg-[#024d33] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Syncing...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CMSSettings;
