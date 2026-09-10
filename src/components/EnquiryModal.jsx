import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle2, Phone, Mail, Calendar, Sparkles } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND, RESIDENCES } from '../data/projectsData';
import { PrivacyConsentGroup } from './PrivacyConsentGroup';

export const EnquiryModal = ({ initialProject, onClose }) => {
  const { addLead, properties, settings } = useSiteData();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Legal Consent & Anti-Spam States (Unchecked by default)
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [consentError, setConsentError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const formLoadTimeRef = useRef(Date.now());

  const propertyOptions = properties && properties.length > 0 ? properties : RESIDENCES;
  const defaultProjectTitle = initialProject?.title || propertyOptions[0]?.title || 'Signature Residencies';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: defaultProjectTitle,
    budget: '₹3.5 - 5 Cr',
    visitDate: '',
    message: ''
  });

  const [customResponses, setCustomResponses] = useState({});

  const enquiryFields = settings?.enquiry_fields || {
    budget: true,
    propertyType: true,
    visitDate: true,
    message: true,
    custom_fields: []
  };

  const customFields = enquiryFields.custom_fields || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Anti-spam honeypot detection
    if (honeypot && honeypot.trim().length > 0) {
      console.warn('Spam bot flagged via honeypot input in modal.');
      setSubmitted(true);
      return;
    }

    // 2. Anti-spam velocity check (< 1.5s)
    const elapsed = Date.now() - formLoadTimeRef.current;
    if (elapsed < 1500) {
      console.warn('Fast submission blocked in modal.');
      setSubmitted(true);
      return;
    }

    // 3. Mandatory Privacy Consent & Terms acceptance check
    let hasValidationError = false;
    if (!privacyConsent) {
      setConsentError(true);
      hasValidationError = true;
    } else {
      setConsentError(false);
    }

    if (!termsAccepted) {
      setTermsError(true);
      hasValidationError = true;
    } else {
      setTermsError(false);
    }

    if (hasValidationError) {
      return;
    }

    setIsSubmitting(true);
    
    // Format all custom fields answers
    const customSummary = Object.entries(customResponses)
      .filter(([_, v]) => Boolean(v))
      .map(([k, v]) => `${k}: ${v}`)
      .join(' | ');

    // Auto-capture enquiry directly into CRM with consent metadata
    addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      property_interest: formData.project,
      budget: formData.budget,
      message: `${formData.visitDate ? `[Requested Visit Date: ${formData.visitDate}] ` : ''}${formData.message || ''}`,
      notes: customSummary ? `Client Preferences: ${customSummary}` : '',
      source: 'Website Enquiry Modal',
      temperature: 'Hot', // High-intent direct enquiry
      privacy_consent: true,
      marketing_consent: marketingConsent,
      terms_accepted: termsAccepted,
      policy_version: 'v2026.1',
      consent_timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const scrollContainerRef = useRef(null);

  // Lock background body scroll while modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Forward touchpad / mouse wheel anywhere on the modal to the internal scroll container
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      if (!scrollContainerRef.current.contains(e.target)) {
        scrollContainerRef.current.scrollTop += e.deltaY;
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in font-sans"
      data-lenis-prevent
      onWheel={handleWheel}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[90vh] bg-[#013724] border border-[#D4AF37]/40 rounded-3xl shadow-2xl flex flex-col text-white overflow-hidden my-auto"
        data-lenis-prevent
      >
        {/* Sticky Header with Close Button */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[#205843]/60 flex items-start justify-between shrink-0 bg-[#013724] relative z-10">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-0.5">
              AR HOMES CLIENT SERVICES
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-1">
              {submitted ? 'Enquiry Status' : 'Request Information'}
            </h3>
            <p className="text-xs text-slate-300 font-light">
              {submitted 
                ? 'Your request has been routed to our direct VIP advisory desk.' 
                : 'Connect directly with our relationship managers for floor plans, private walkthroughs, and official price sheets.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="ml-3 p-2 bg-[#002719] hover:bg-[#D4AF37] text-white hover:text-[#013724] rounded-full border border-[#205843] transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div 
          ref={scrollContainerRef}
          className="p-5 sm:p-6 pt-4 overflow-y-auto overscroll-contain flex-1 custom-modal-scroll"
          data-lenis-prevent
          tabIndex={0}
        >
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#01472E] border-2 border-[#D4AF37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-white">
                Enquiry Submitted Successfully
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry for <strong className="text-[#D4AF37]">{formData.project}</strong> has been logged in our CRM. Our sales director will contact you shortly on <strong>{formData.phone}</strong>.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#D4AF37] hover:bg-[#e8c868] text-[#013724] font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* Full Name */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Dynamic Property Selection */}
              {enquiryFields.propertyType !== false && (
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                    Property or Land Development
                  </label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {propertyOptions.map((r) => (
                      <option key={r.id} value={r.title} className="bg-[#002719]">
                        {r.title} {r.location ? `— ${r.location}` : ''}
                      </option>
                    ))}
                    <option value="General Property Consultation" className="bg-[#002719]">
                      General Portfolio / Freehold Land Consultation
                    </option>
                  </select>
                </div>
              )}

              {/* Optional Budget Field controlled by CMS Settings */}
              {enquiryFields.budget !== false && (
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                    Preferred Investment Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="₹1.5 - 2.5 Cr" className="bg-[#002719]">₹1.50 Cr - ₹2.50 Cr</option>
                    <option value="₹2.5 - 4 Cr" className="bg-[#002719]">₹2.50 Cr - ₹4.00 Cr</option>
                    <option value="₹4 - 7 Cr" className="bg-[#002719]">₹4.00 Cr - ₹7.00 Cr</option>
                    <option value="₹7 Cr+" className="bg-[#002719]">₹7.00 Cr+ (Ultra-Luxury & Mansions)</option>
                  </select>
                </div>
              )}

              {/* Optional Preferred Visit Date */}
              {enquiryFields.visitDate !== false && (
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                    Preferred Site Visit Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              )}

              {/* DYNAMIC CUSTOM FIELDS ADDED VIA CMS */}
              {customFields.map((cf) => (
                <div key={cf.id} className={customFields.length === 1 ? "col-span-1" : "col-span-1"}>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                    {cf.label} {cf.required && <span className="text-[#D4AF37]">*</span>}
                  </label>

                  {cf.type === 'select' ? (
                    <select
                      required={cf.required}
                      value={customResponses[cf.label] || ''}
                      onChange={(e) => setCustomResponses({ ...customResponses, [cf.label]: e.target.value })}
                      className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="">{cf.placeholder || 'Select an option...'}</option>
                      {(cf.options || []).map((opt, oIdx) => (
                        <option key={oIdx} value={opt} className="bg-[#002719]">{opt}</option>
                      ))}
                    </select>
                  ) : cf.type === 'date' ? (
                    <input
                      type="date"
                      required={cf.required}
                      value={customResponses[cf.label] || ''}
                      onChange={(e) => setCustomResponses({ ...customResponses, [cf.label]: e.target.value })}
                      className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  ) : cf.type === 'number' ? (
                    <input
                      type="number"
                      required={cf.required}
                      placeholder={cf.placeholder || 'Enter number'}
                      value={customResponses[cf.label] || ''}
                      onChange={(e) => setCustomResponses({ ...customResponses, [cf.label]: e.target.value })}
                      className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  ) : (
                    <input
                      type="text"
                      required={cf.required}
                      placeholder={cf.placeholder || 'Enter details...'}
                      value={customResponses[cf.label] || ''}
                      onChange={(e) => setCustomResponses({ ...customResponses, [cf.label]: e.target.value })}
                      className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  )}
                </div>
              ))}

              {/* Optional Message Field */}
              {enquiryFields.message !== false && (
                <div className="col-span-full">
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1 font-semibold">
                    Message / Special Requests
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Preferred facing, floor level, loan assistance, or specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#002719] border border-[#205843] rounded-xl px-3.5 py-2 text-sm sm:text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>
              )}

              <div className="col-span-full pt-1 space-y-3">
                <PrivacyConsentGroup
                  privacyConsent={privacyConsent}
                  setPrivacyConsent={(val) => {
                    setPrivacyConsent(val);
                    if (val) setConsentError(false);
                  }}
                  termsAccepted={termsAccepted}
                  setTermsAccepted={(val) => {
                    setTermsAccepted(val);
                    if (val) setTermsError(false);
                  }}
                  marketingConsent={marketingConsent}
                  setMarketingConsent={setMarketingConsent}
                  honeypot={honeypot}
                  setHoneypot={setHoneypot}
                  hasError={consentError}
                  errorMessage="You must consent to AR Homes collecting and processing your information before submitting."
                  hasTermsError={termsError}
                  termsErrorMessage="You must read and agree to our Terms & Conditions before submitting."
                  companyName="AR Homes"
                  variant="modal"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C86C] to-[#D4AF37] text-[#013724] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Transmitting Securely...' : 'Submit Enquiry to Concierge'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
