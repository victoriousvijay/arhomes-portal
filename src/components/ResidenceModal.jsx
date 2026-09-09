import React, { useState } from 'react';
import { X, CheckCircle2, Download, ArrowRight, Home, Maximize, Wind, Sun, MapPin } from 'lucide-react';
import { BRAND } from '../data/projectsData';

export const ResidenceModal = ({ residence, onClose, onOpenEnquiry }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!residence) return null;

  const handleDownloadBrochure = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      const element = document.createElement("a");
      const file = new Blob([
        `AR HOMES - ${residence.title.toUpperCase()} OFFICIAL SPECIFICATIONS\n\n` +
        `Location: ${residence.location}\n` +
        `Built Form: ${residence.builtForm}\n` +
        `RERA Registration: ${residence.rera}\n` +
        `Price: ${residence.price}\n` +
        `Status: ${residence.status}\n\n` +
        `Overview:\n${residence.overview}\n\n` +
        `Key Features:\n` + residence.features.map(f => `- ${f.label}`).join('\n') + `\n\n` +
        `Contact Concierge: ${BRAND.phoneDisplay} | ${BRAND.email}\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${residence.id}-specification-brochure.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#013724] border border-[#205843] rounded-2xl shadow-2xl overflow-hidden my-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-[#002719] hover:bg-[#D4AF37] text-white hover:text-[#013724] rounded-full border border-[#205843] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: Image Container */}
          <div className="lg:col-span-6 h-52 sm:h-72 lg:h-auto relative">
            <img
              src={residence.image}
              alt={residence.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#013724] via-transparent to-transparent lg:hidden" />
            <div className="absolute top-3 left-3 bg-[#01472E] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
              {residence.status}
            </div>
          </div>

          {/* Right: Detailed Specs */}
          <div className="lg:col-span-6 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{residence.location}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
                {residence.title}
              </h3>
              
              <div className="text-xs font-mono text-slate-300 mb-4 pb-3 border-b border-[#205843]">
                RERA: <span className="text-[#D4AF37]">{residence.rera}</span> • Built Form: {residence.builtForm}
              </div>

              <p className="text-xs text-slate-200 font-light leading-relaxed mb-6">
                {residence.overview}
              </p>

              {/* 4 Feature Tags */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {residence.features.map((feat, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#002719] border border-[#205843] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase tracking-wider text-slate-200 font-semibold">{feat.label}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#002719] border border-[#205843] rounded mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#94B8A8]">Pricing</span>
                <div className="font-serif text-xl font-normal text-[#D4AF37]">{residence.price}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-[#205843]">
              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry(residence);
                }}
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C86C] text-[#013724] font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Enquire For This Residence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleDownloadBrochure}
                disabled={downloading}
                className="w-full py-2.5 border border-white/30 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] text-xs uppercase tracking-wider rounded font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloading ? "Preparing..." : downloaded ? "Brochure Downloaded ✓" : "Download Brochure (PDF/Text)"}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
