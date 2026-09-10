import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND } from '../data/projectsData';
import { Phone, Mail, MapPin, Shield, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Footer = ({ onOpenEnquiry }) => {
  const { settings } = useSiteData();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const phoneVal = settings?.phone || BRAND.phone;
  const phoneDisplayVal = settings?.phone_display || settings?.phone || BRAND.phoneDisplay;
  const emailVal = settings?.email || BRAND.email;
  const addressVal = settings?.corporate_address || BRAND.corporateAddress;
  const whatsappVal = settings?.whatsapp || BRAND.whatsapp;
  const instagramVal = settings?.instagram || 'https://instagram.com';
  const facebookVal = settings?.facebook || 'https://facebook.com';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#013724] text-white border-t border-[#205843] pt-16 sm:pt-20 pb-28 sm:pb-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#205843]/60">
          
          {/* Brand Col */}
          <ScrollReveal animation="up" delay={0} duration={850} className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/ar-homes-logo.jpg"
                alt="AR Homes Logo"
                className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/50 shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-sans text-sm font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                  {BRAND.name}
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-light uppercase">
                  Ghar Bethe, Ghar Dekho
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-light leading-relaxed max-w-sm">
              AR Homes builds residences where quality is the foundation, not a feature. Dedicated to crafting low-density independent floors, luxury villas, and iconic residences across prime corridors of Jaipur, Rajasthan.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2 font-light">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`tel:${phoneVal}`} className="hover:text-[#D4AF37] transition-colors">{phoneDisplayVal}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`mailto:${emailVal}`} className="hover:text-[#D4AF37] transition-colors">{emailVal}</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{addressVal}</span>
              </div>
            </div>

            {/* Social Channels (WhatsApp, Phone, Mail, Instagram, Facebook) */}
            <div className="pt-3 border-t border-[#205843]/60">
              <span className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-2.5">
                Connect Directly
              </span>
              <div className="flex items-center gap-2.5">
                {/* 1. WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappVal}?text=Hello%20AR%20Homes,%20I%20am%20interested%20in%20your%20luxury%20properties.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#002719] hover:bg-[#25D366] text-[#D4AF37] hover:text-white border border-[#205843] hover:border-[#25D366] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 cursor-pointer"
                  title="Chat on WhatsApp"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>

                {/* 2. Phone */}
                <a
                  href={`tel:${phoneVal}`}
                  className="w-9 h-9 rounded-full bg-[#002719] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#013724] border border-[#205843] hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 cursor-pointer"
                  title={`Call: ${phoneDisplayVal}`}
                  aria-label="Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {/* 3. Mail */}
                <a
                  href={`mailto:${emailVal}`}
                  className="w-9 h-9 rounded-full bg-[#002719] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#013724] border border-[#205843] hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 cursor-pointer"
                  title={`Email: ${emailVal}`}
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* 4. Instagram */}
                <a
                  href={instagramVal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#002719] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-[#D4AF37] hover:text-white border border-[#205843] hover:border-transparent flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 cursor-pointer"
                  title="Follow on Instagram"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* 5. Facebook */}
                <a
                  href={facebookVal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#002719] hover:bg-[#1877F2] text-[#D4AF37] hover:text-white border border-[#205843] hover:border-[#1877F2] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 cursor-pointer"
                  title="Follow on Facebook"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal animation="up" delay={120} duration={850}>
            <h4 className="font-serif text-sm font-normal text-[#D4AF37] uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-light">
              <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li><Link to="/buy" className="hover:text-[#D4AF37] transition-colors">Buy Properties & Land</Link></li>
              <li><Link to="/services" className="hover:text-[#D4AF37] transition-colors">Services & Loan Assistance</Link></li>
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link to="/gallery" className="hover:text-[#D4AF37] transition-colors">Visual Gallery</Link></li>
              <li><Link to="/faqs" className="hover:text-[#D4AF37] transition-colors">FAQs & Knowledge Base</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact & Enquiry</Link></li>
            </ul>
          </ScrollReveal>

          {/* Newsletter / Enquiry CTA */}
          <ScrollReveal animation="up" delay={200} duration={850} className="lg:pr-10">
            <h4 className="font-serif text-sm font-normal text-[#D4AF37] uppercase tracking-widest mb-4">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-300 font-light mb-4 leading-relaxed">
              Subscribe to receive Jaipur project launch notifications and construction milestone updates.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#01472E] border border-[#D4AF37] rounded text-xs text-[#D4AF37]">
                ✓ Thank you for subscribing.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#002719] border border-[#205843] rounded px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#D4AF37] hover:bg-[#E5C86C] text-[#013724] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
                <p className="text-[10px] text-gray-400 font-light leading-tight pt-1">
                  By subscribing, you agree to our{' '}
                  <Link to="/terms-and-conditions" className="text-[#D4AF37] hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-[#D4AF37] hover:underline">
                    Privacy Policy
                  </Link>.
                </p>
              </form>
            )}

            <button
              onClick={() => onOpenEnquiry(null)}
              className="mt-4 w-full py-2 border border-white/40 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              ENQUIRE NOW
            </button>
          </ScrollReveal>

        </div>

        {/* Bottom Disclaimer & RERA */}
        <ScrollReveal animation="fade" delay={100} duration={900}>
          <div className="pt-8 text-[11px] text-slate-400 font-light space-y-4">
            <p className="leading-relaxed">
              <strong className="text-slate-300 uppercase">Disclaimer:</strong> {BRAND.reraDisclaimer}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#205843]/40 text-[11px]">
              <div>
                © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1.5 text-slate-400">
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
                <span>•</span>
                <Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link>
                <span>•</span>
                <Link to="/admin" className="hover:text-[#D4AF37] transition-colors font-medium flex items-center gap-1">
                  <span>Executive Portal (CMS/CRM)</span>
                </Link>
                <span>•</span>
                <span className="text-[#D4AF37] font-medium">Jaipur, Rajasthan</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};
