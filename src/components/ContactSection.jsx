import React, { useState, useRef } from 'react';
import { BRAND_INFO, getWhatsAppUrl } from '../data/projectsData';
import { useSiteData } from '../context/SiteDataContext';
import { PrivacyConsentGroup } from './PrivacyConsentGroup';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const ContactSection = () => {
  const { addLead } = useSiteData();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Legal Consent & Anti-Spam States (Unchecked by default)
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [consentError, setConsentError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const formLoadTimeRef = useRef(Date.now());

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'AR Homes Rise',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Anti-spam honeypot
    if (honeypot && honeypot.trim().length > 0) {
      console.warn('Bot submission blocked via honeypot in ContactSection.');
      setFormSubmitted(true);
      return;
    }

    // 2. Anti-spam velocity check (< 1.5s)
    const elapsed = Date.now() - formLoadTimeRef.current;
    if (elapsed < 1500) {
      console.warn('Rapid bot submission blocked in ContactSection.');
      setFormSubmitted(true);
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

    // Save lead into CRM with consent metadata
    addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      property_interest: formData.interest,
      budget: 'Unspecified',
      message: formData.message,
      source: 'Inline Homepage Contact Section',
      temperature: 'Warm',
      privacy_consent: true,
      marketing_consent: marketingConsent,
      terms_accepted: termsAccepted,
      policy_version: 'v2026.1',
      consent_timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-luxury-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-semibold">
              Private Client Relations
            </span>
            <span className="w-8 h-[1px] bg-luxury-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Initiate a <span className="text-gold-gradient font-normal italic">Dialogue</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm font-light leading-relaxed">
            Whether seeking an off-plan acquisition, customized penthouse layout, or site inspection, our senior client directors are at your service.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Office & Direct Hotline Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Sales Galleria Card */}
            <div className="glass-card p-6 rounded-lg border border-luxury-border space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">Experience Centre & Corporate Galleria</h4>
                  <span className="text-[11px] text-luxury-gold font-medium uppercase tracking-wider">Civil Lines / C-Scheme, Jaipur, Rajasthan</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-300 space-y-3 font-light">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <span>{BRAND_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-luxury-gold shrink-0" />
                  <span>Monday — Sunday: 9:30 AM to 7:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="p-4 rounded bg-luxury-card border border-luxury-border hover:border-luxury-gold transition-all block group"
              >
                <div className="flex items-center gap-2 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-1">
                  <Phone className="w-4 h-4" />
                  <span>Direct Sales Desk</span>
                </div>
                <div className="text-sm font-bold text-white group-hover:text-luxury-gold transition-colors">
                  {BRAND_INFO.phoneDisplay}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Instant connect with relation manager</div>
              </a>

              <a
                href={getWhatsAppUrl(BRAND_INFO.whatsapp, 'Hello AR Homes, I would like information regarding your luxury properties.')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded bg-luxury-card border border-emerald-900/50 hover:border-emerald-500 transition-all block group"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Chat in Real-Time
                </div>
                <div className="text-[10px] text-slate-400 mt-1">24/7 Digital response team</div>
              </a>
            </div>

            {/* Corporate Email */}
            <div className="p-4 rounded bg-luxury-card border border-luxury-border">
              <div className="flex items-center gap-2 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-1">
                <Mail className="w-4 h-4" />
                <span>Client Communications</span>
              </div>
              <div className="text-xs text-slate-300 font-mono">
                {BRAND_INFO.email} / {BRAND_INFO.salesEmail}
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="p-4 bg-luxury-black/60 rounded border border-luxury-border/60 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-luxury-gold shrink-0" />
              <p className="text-[11px] text-slate-400 font-light">
                {BRAND_INFO.reraCert}. All sales agreements adhere strictly to approved RERA draft formats.
              </p>
            </div>

          </div>

          {/* Right Column: Callback & Consultation Request Form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-xl border border-luxury-border flex flex-col justify-between">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-luxury-gold/20 border-2 border-luxury-gold flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-luxury-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Consultation Initiated</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry regarding <strong className="text-luxury-gold">{formData.interest}</strong> has been logged. Our Senior Relationship Director will contact you within 30 minutes.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-luxury-card border border-luxury-border hover:border-luxury-gold text-xs uppercase text-slate-300 hover:text-white rounded"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2 uppercase">
                  Request Private Consultation
                </h3>
                <p className="text-xs text-slate-400 font-light mb-6">
                  Complete the credentials below for personalized pricing schedules, unit availability charts, and investment guidance.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                        Project of Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
                      >
                        <option value="AR Homes Rise">AR Homes Rise (Kollur)</option>
                        <option value="AR Homes Altura">AR Homes Altura (35 Storey Icon)</option>
                        <option value="AR Signature Estates">AR Signature Estates (Private Villas)</option>
                        <option value="The Horizon Sky Penthouses">The Horizon Sky Penthouses</option>
                        <option value="Custom Bespoke Home Construction">Custom Bespoke Home Construction</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                      Message / Special Queries
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Please share details regarding preferred unit facing, floor height, or payment schemes..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-luxury-gold resize-none"
                    />
                  </div>

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
                    variant="default"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-luxury-gold via-luxury-goldLight to-luxury-gold text-luxury-black font-semibold text-xs tracking-wider uppercase rounded shadow-lg shadow-luxury-gold/20 hover:shadow-luxury-gold/40 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Securing Transmission...' : 'Submit Consultation Request'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
