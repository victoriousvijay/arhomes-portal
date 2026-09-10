import React, { useState, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND } from '../data/projectsData';
import { PrivacyConsentGroup } from '../components/PrivacyConsentGroup';
import { Phone, Mail, MapPin, MessageSquare, Clock, CheckCircle2, Send, ShieldCheck, Sparkles } from 'lucide-react';

export const ContactPage = () => {
  const { settings, addLead } = useSiteData();
  const phoneVal = settings?.phone || BRAND.phone;
  const phoneDisplayVal = settings?.phone_display || settings?.phone || BRAND.phoneDisplay;
  const whatsappVal = settings?.whatsapp || BRAND.whatsapp;
  const emailVal = settings?.email || BRAND.email;
  const addressVal = settings?.corporate_address || BRAND.corporateAddress;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'buy-residential',
    budget: '3-5cr',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Legal Consent & Anti-Spam States (Unchecked by default)
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [consentError, setConsentError] = useState(false);
  const formLoadTimeRef = useRef(Date.now());

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Anti-spam honeypot detection
    if (honeypot && honeypot.trim().length > 0) {
      console.warn('Spam bot flagged via honeypot input.');
      setSubmitted(true);
      return;
    }

    // 2. Anti-spam submission velocity check (< 1.5 seconds)
    const elapsed = Date.now() - formLoadTimeRef.current;
    if (elapsed < 1500) {
      console.warn('Suspiciously rapid form submission blocked.');
      setSubmitted(true);
      return;
    }

    // 3. Mandatory Privacy Consent validation (must be checked)
    if (!privacyConsent) {
      setConsentError(true);
      return;
    }

    setConsentError(false);
    setIsSubmitting(true);
    
    // Push lead to CRM in real-time with full consent audit record
    addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      property_interest: `Contact Page: ${formData.purpose}`,
      budget: formData.budget,
      message: formData.message,
      source: 'Contact Page Advisory Form',
      temperature: 'Warm',
      privacy_consent: true,
      marketing_consent: marketingConsent,
      terms_accepted: termsAccepted,
      policy_version: 'v2026.1',
      consent_timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Banner */}
      <PageHeader
        badge="Get in Touch"
        title="Connect with Our"
        highlight="Advisory Team"
        subtitle="Whether you are planning to acquire a signature independent floor, schedule a private walkthrough, or discuss bespoke architectural upgrades, our advisory team is at your service."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Office Locations & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
                Corporate Offices
              </span>
              <h2 className="font-serif text-3xl font-normal text-white mb-4">
                Visit Our Experience Lounges
              </h2>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Experience our curated physical sample galleries, scale models, and material palettes at our client lounges.
              </p>
            </div>

            {/* Office 1: Jaipur Headquarters */}
            <div className="p-6 rounded-2xl bg-[#0b1612] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-serif text-lg font-bold">
                <MapPin className="w-5 h-5 shrink-0" />
                <h4>Jaipur Headquarters</h4>
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                2nd Floor, Royal Enclave, Civil Lines / C-Scheme, Jaipur, Rajasthan - 302006
              </p>
              <div className="text-xs text-gray-400 pt-2 border-t border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Monday - Sunday: 9:30 AM - 7:30 PM</span>
              </div>
            </div>

            {/* Office 2: Vaishali Nagar Experience Lounge */}
            <div className="p-6 rounded-2xl bg-[#0b1612] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37] font-serif text-lg font-bold">
                <MapPin className="w-5 h-5 shrink-0" />
                <h4>Vaishali Nagar Experience Lounge</h4>
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Amrapali Circle, Vaishali Nagar, Jaipur, Rajasthan - 302021
              </p>
              <div className="text-xs text-gray-400 pt-2 border-t border-white/10 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Monday - Sunday: 10:00 AM - 7:00 PM</span>
              </div>
            </div>

            {/* Direct Connect Pills */}
            <div className="space-y-3 pt-4">
              <a
                href={`tel:${phoneVal}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#013724] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">Direct Phone Helpline</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">{phoneDisplayVal}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${whatsappVal}?text=Hi%20AR%20Homes%2C%20I%20would%20like%20to%20enquire%20about%20your%20properties.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#013724] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">Official WhatsApp Desk</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">Instant Chat Connect</span>
                </div>
              </a>

              <a
                href={`mailto:${emailVal}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#013724] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">Email Correspondence</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">{emailVal}</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Full Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0b1612] border border-white/15 shadow-2xl relative">
              
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                  <Sparkles className="w-3 h-3" /> Priority Response
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Request Consultation or Private Presentation
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light mt-2">
                  Leave your requirements below and a senior relationship manager will contact you within 60 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#013724] border border-[#D4AF37] text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Thank You, We Have Received Your Enquiry.
                  </h4>
                  <p className="text-xs text-gray-300 font-light max-w-md mx-auto">
                    A senior relationship manager has been assigned to your request and will call you shortly on <strong>{formData.phone}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Contact Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Requirement Type</label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        <option value="buy-residential">Buy: Luxury Independent Floor</option>
                        <option value="buy-villa">Buy: Private Villa & Triplex Mansion</option>
                        <option value="buy-apartment">Buy: High-Rise Penthouse / Apartment</option>
                        <option value="buy-commercial">Buy: Grade-A Commercial Tower</option>
                        <option value="buy-plots">Buy: Freehold Land & Plots</option>
                        <option value="loan-finance">Loan & Banking Advisory</option>
                        <option value="other">Other High-Net-Worth Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Expected Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                      >
                        <option value="1.5-2.5cr">₹1.50 Cr - ₹2.50 Cr</option>
                        <option value="2.5-4cr">₹2.50 Cr - ₹4.00 Cr</option>
                        <option value="4-7cr">₹4.00 Cr - ₹7.00 Cr</option>
                        <option value="7cr+">₹7.00 Cr+ (Ultra-Luxury & Estates)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Specific Notes or Questions</label>
                    <textarea
                      rows="4"
                      placeholder="Tell us about your preferred sector, possession timeline, or any specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#050e0a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    ></textarea>
                  </div>

                  <PrivacyConsentGroup
                    privacyConsent={privacyConsent}
                    setPrivacyConsent={(val) => {
                      setPrivacyConsent(val);
                      if (val) setConsentError(false);
                    }}
                    termsAccepted={termsAccepted}
                    setTermsAccepted={setTermsAccepted}
                    marketingConsent={marketingConsent}
                    setMarketingConsent={setMarketingConsent}
                    honeypot={honeypot}
                    setHoneypot={setHoneypot}
                    hasError={consentError}
                    errorMessage="You must consent to AR Homes collecting and processing your information before submitting."
                    companyName="AR Homes"
                    variant="default"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#D4AF37] hover:bg-white text-[#013724] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Securing Transmission...' : 'Submit Consultation Request'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
