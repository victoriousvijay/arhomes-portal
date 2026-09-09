import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../data/projectsData';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Footer = ({ onOpenEnquiry }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
                <a href={`tel:${BRAND.phone}`} className="hover:text-[#D4AF37] transition-colors">{BRAND.phoneDisplay}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-[#D4AF37] transition-colors">{BRAND.email}</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{BRAND.corporateAddress}</span>
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
          <ScrollReveal animation="up" delay={200} duration={850}>
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
                  className="w-full py-2 bg-[#D4AF37] hover:bg-[#E5C86C] text-[#013724] font-semibold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Subscribe
                </button>
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
                <span className="text-[#D4AF37] font-medium">Jaipur, Rajasthan</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};
