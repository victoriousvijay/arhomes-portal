import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail } from 'lucide-react';
import { BRAND, RESIDENCES } from '../data/projectsData';

export const EnquiryModal = ({ initialProject, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: initialProject?.title || RESIDENCES[0].title,
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#013724] border border-[#D4AF37]/40 rounded-lg shadow-2xl p-6 sm:p-8 my-8 text-white">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#002719] hover:bg-[#D4AF37] text-white hover:text-[#013724] rounded-full border border-[#205843] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#01472E] border-2 border-[#D4AF37] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-white">
              Enquiry Submitted
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Your enquiry for <strong className="text-[#D4AF37]">{formData.project}</strong> has been received. Our sales relationship director will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-[#013724] font-bold text-xs uppercase tracking-wider rounded"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
              AR HOMES CLIENT SERVICES
            </div>
            <h3 className="font-serif text-3xl font-normal text-white mb-2">
              Request Information
            </h3>
            <p className="text-xs text-slate-300 font-light mb-6">
              Connect with our dedicated relationship managers for personalized floor plans, site walkthroughs, and price sheets.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#002719] border border-[#205843] rounded px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#002719] border border-[#205843] rounded px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#002719] border border-[#205843] rounded px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1">
                  Select Residence
                </label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-[#002719] border border-[#205843] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {RESIDENCES.map((r) => (
                    <option key={r.id} value={r.title} className="bg-[#002719]">
                      {r.title} — {r.location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-300 block mb-1">
                  Message / Queries
                </label>
                <textarea
                  rows="3"
                  placeholder="Share details regarding preferred unit facing, floor height, or schedule a visit..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#002719] border border-[#205843] rounded px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#E5C86C] text-[#013724] font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md active:scale-98"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
