import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';

/**
 * Reusable, legal-grade Privacy Consent Group for AR Homes forms.
 * Compliant with Digital Personal Data Protection Act (DPDPA) 2023 & RERA guidelines.
 * 
 * Order of elements:
 * 1. Privacy notice text with clickable link to /privacy-policy
 * 2. Mandatory privacy consent checkbox (unchecked by default, blocks submission)
 * 3. Terms & conditions checkbox (unchecked by default, clickable link)
 * 4. Optional marketing consent checkbox (unchecked by default, non-blocking)
 * 5. Honeypot anti-spam input (hidden from humans)
 */
export const PrivacyConsentGroup = ({
  privacyConsent,
  setPrivacyConsent,
  termsAccepted,
  setTermsAccepted,
  marketingConsent,
  setMarketingConsent,
  honeypot,
  setHoneypot,
  hasError = false,
  errorMessage = '',
  companyName = 'AR Homes',
  policyVersion = 'v2026.1',
  variant = 'default' // 'default' (dark) or 'modal' (emerald)
}) => {
  return (
    <div className="space-y-3.5 pt-2 text-left">
      
      {/* 1. Privacy Notice */}
      <div className={`p-3 sm:p-3.5 rounded-xl border text-[11.5px] leading-relaxed transition-colors ${
        variant === 'modal' 
          ? 'bg-[#002719]/80 border-[#205843] text-slate-300' 
          : 'bg-white/[0.03] border-white/10 text-gray-300'
      }`}>
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p>
            We collect and process the information you provide to respond to your enquiry, provide requested information, and communicate with you regarding our services. For more information about how we collect, use, store, and protect your personal data, please read our{' '}
            <Link 
              to="/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#e8c868] underline underline-offset-2 font-medium"
            >
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>

      {/* 2. Mandatory Privacy Consent Checkbox */}
      <div className="space-y-1">
        <label 
          htmlFor="consent-privacy"
          className="flex items-start gap-3 cursor-pointer select-none group"
        >
          <input
            id="consent-privacy"
            name="privacy_consent"
            type="checkbox"
            required
            checked={Boolean(privacyConsent)}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-600 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 focus:ring-1 accent-[#D4AF37] cursor-pointer shrink-0 transition-transform active:scale-95"
            aria-required="true"
            aria-invalid={hasError && !privacyConsent}
          />
          <span className="text-xs text-gray-200 group-hover:text-white leading-snug">
            <span className="text-[#D4AF37] font-semibold mr-1">[Required]</span>
            I consent to <strong className="font-semibold text-white">{companyName}</strong> collecting and processing the personal information provided in this form for the purpose of responding to my enquiry and providing the requested information, in accordance with the{' '}
            <Link 
              to="/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#e8c868] underline underline-offset-2 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </Link>.
          </span>
        </label>

        {/* Validation error message if user tries to submit without checking */}
        {hasError && !privacyConsent && (
          <div 
            role="alert" 
            className="flex items-center gap-1.5 text-rose-400 text-[11px] font-medium pl-7 pt-1"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage || 'You must consent to data processing before submitting your enquiry.'}</span>
          </div>
        )}
      </div>

      {/* 3. Separate Terms & Conditions Checkbox */}
      <div className="space-y-1">
        <label 
          htmlFor="consent-terms"
          className="flex items-start gap-3 cursor-pointer select-none group"
        >
          <input
            id="consent-terms"
            name="terms_accepted"
            type="checkbox"
            checked={Boolean(termsAccepted)}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-600 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 focus:ring-1 accent-[#D4AF37] cursor-pointer shrink-0 transition-transform active:scale-95"
          />
          <span className="text-xs text-gray-300 group-hover:text-white leading-snug">
            I have read and agree to the{' '}
            <Link 
              to="/terms-and-conditions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#e8c868] underline underline-offset-2 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Terms & Conditions
            </Link>.
          </span>
        </label>
      </div>

      {/* 4. Optional Marketing Consent Checkbox */}
      <div className="space-y-1">
        <label 
          htmlFor="consent-marketing"
          className="flex items-start gap-3 cursor-pointer select-none group"
        >
          <input
            id="consent-marketing"
            name="marketing_consent"
            type="checkbox"
            checked={Boolean(marketingConsent)}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-600 text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0 focus:ring-1 accent-[#D4AF37] cursor-pointer shrink-0 transition-transform active:scale-95"
          />
          <span className="text-xs text-gray-400 group-hover:text-gray-300 leading-snug">
            <span className="text-gray-400 font-normal mr-1">(Optional)</span>
            I would like to receive updates, exclusive property offers, educational market insights, and promotional communications from <strong className="font-medium text-gray-300">{companyName}</strong> via email, phone, SMS, or WhatsApp.
          </span>
        </label>
      </div>

      {/* 5. Anti-Spam Hidden Honeypot Field */}
      <div 
        aria-hidden="true" 
        style={{ 
          opacity: 0, 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          height: 0, 
          width: 0, 
          zIndex: -1, 
          pointerEvents: 'none', 
          overflow: 'hidden' 
        }}
      >
        <label htmlFor="website_fax_hp">Leave this field blank if you are human</label>
        <input
          id="website_fax_hp"
          type="text"
          name="website_fax_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot || ''}
          onChange={(e) => setHoneypot && setHoneypot(e.target.value)}
        />
      </div>

      {/* Compliance Stamp / Version reference */}
      <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
        <span>Privacy Standard: DPDPA 2023 & RAJ-RERA</span>
        <span>Version {policyVersion}</span>
      </div>

    </div>
  );
};

export default PrivacyConsentGroup;
