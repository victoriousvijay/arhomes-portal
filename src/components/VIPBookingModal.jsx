import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Car, Sparkles, Phone, Mail, ShieldCheck } from 'lucide-react';
import { BRAND_INFO, PROJECTS } from '../data/projectsData';

export const VIPBookingModal = ({ initialProject, onClose }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(initialProject?.id || PROJECTS[0].id);
  const [tourType, setTourType] = useState('In-Person Site Inspection');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [requestChauffeur, setRequestChauffeur] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const timeSlots = [
    '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const currentSelectedProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-luxury-dark border border-luxury-gold/40 rounded-lg shadow-2xl overflow-hidden my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-luxury-black/80 hover:bg-luxury-gold text-slate-300 hover:text-luxury-black rounded-full border border-luxury-border transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center bg-luxury-card">
            <div className="w-16 h-16 rounded-full bg-luxury-gold/20 border-2 border-luxury-gold flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-luxury-gold" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold font-bold">
              VIP Reservation Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 mb-4">
              We Await Your Visit
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light mb-8">
              Thank you, <strong className="text-white">{formData.name || 'Valued Guest'}</strong>. Your private tour for <strong className="text-luxury-gold">{currentSelectedProject.title}</strong> on <strong className="text-white">{date || 'Upcoming Date'} at {timeSlot}</strong> has been assigned to our Senior Private Relationship Director.
            </p>

            <div className="bg-luxury-black/70 p-4 rounded border border-luxury-border/80 max-w-md mx-auto text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-400">Experience Type:</span>
                <span className="text-white font-medium">{tourType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Meeting Location:</span>
                <span className="text-white font-medium">{currentSelectedProject.subtitle} Experience Centre</span>
              </div>
              {requestChauffeur && (
                <div className="flex justify-between text-luxury-gold font-semibold">
                  <span>Chauffeur Service:</span>
                  <span>Complimentary Luxury Sedan Scheduled</span>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-luxury-gold text-luxury-black font-semibold text-xs uppercase tracking-wider rounded shadow-lg"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-semibold">
                  Private Client Services
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase">
                Schedule a VIP Tour
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">
                Experience the spatial grandeur and view sample residences with our private architectural consultants.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Tour Experience Type Selector */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                  Select Experience Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['In-Person Site Inspection', '1-on-1 Virtual Walkthrough'].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setTourType(mode)}
                      className={`p-3 rounded text-xs font-semibold uppercase tracking-wider border transition-all ${
                        tourType === mode
                          ? 'bg-luxury-gold text-luxury-black border-luxury-gold'
                          : 'bg-luxury-black/60 border-luxury-border text-slate-300 hover:border-luxury-borderLight'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Selection */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                  Preferred Project
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-luxury-gold"
                >
                  {PROJECTS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-luxury-dark">
                      {p.title} — {p.subtitle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1 block">
                    Available Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-luxury-gold"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts} className="bg-luxury-dark">{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Chauffeur Pick-up Toggle */}
              {tourType === 'In-Person Site Inspection' && (
                <div
                  onClick={() => setRequestChauffeur(!requestChauffeur)}
                  className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-all ${
                    requestChauffeur ? 'bg-luxury-gold/15 border-luxury-gold' : 'bg-luxury-black/40 border-luxury-border hover:border-luxury-borderLight'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-luxury-gold shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">Request Chauffeur Pick-Up</div>
                      <div className="text-[10px] text-slate-400">Available from Hyderabad Airport (RGIA) or Gachibowli Hotels</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={requestChauffeur}
                    onChange={() => {}}
                    className="accent-luxury-gold w-4 h-4 cursor-pointer"
                  />
                </div>
              )}

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-luxury-gold placeholder-slate-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-luxury-gold placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Official Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-luxury-gold placeholder-slate-500"
                />
              </div>

              <div>
                <textarea
                  rows="2"
                  placeholder="Any specific architectural preferences or unit requirements?"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-luxury-black border border-luxury-border rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-luxury-gold placeholder-slate-500 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-luxury-gold via-luxury-goldLight to-luxury-gold text-luxury-black font-semibold text-xs tracking-wider uppercase rounded shadow-lg shadow-luxury-gold/20 hover:shadow-luxury-gold/40 transition-all active:scale-[0.99]"
                >
                  Confirm VIP Reservation
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
