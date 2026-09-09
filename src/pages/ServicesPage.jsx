import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { LuxuryAmenities } from '../components/LuxuryAmenities';
import { ShieldCheck, Compass, Sparkles, Building, KeyRound, Scale, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';

const SERVICES_LIST = [
  {
    icon: Compass,
    title: 'Architectural Tailoring & Customization',
    desc: 'Collaborate with our senior design architects to reconfigure internal partitions, select imported Italian marble varieties, and plan bespoke lighting palettes before structural freeze.',
    benefits: ['Bespoke Floor Plan Tweaks', 'Material & Marble Upgrades', 'Integrated HVAC & VRV Routing']
  },
  {
    icon: Sparkles,
    title: 'Turnkey Interior Staging & Furnishing',
    desc: 'From custom European modular kitchens with integrated Miele appliances to walk-in dressing suites crafted from fine teak and fluted glass.',
    benefits: ['European Modular Joinery', 'Designer Lighting Audits', 'Acoustic Wall Paneling']
  },
  {
    icon: Clock,
    title: '24/7 White-Glove Resident Concierge',
    desc: 'Private valet assistance, priority clubhouse bookings, guest luggage handling, courier logistics, and event hosting coordination.',
    benefits: ['Dedicated Relationship Manager', 'Airport Transfer Booking', 'Private Banquet Reservations']
  },
  {
    icon: ShieldCheck,
    title: '5-Tier Biometric Security & Access Control',
    desc: 'Underground RFID boom barriers, elevator floor-locking biometric scanners, perimeter infrared intrusion sensors, and command center surveillance.',
    benefits: ['Biometric Resident Access', 'Digital Visitor Pre-Clearance', 'Round-the-Clock Patrol Units']
  },
  {
    icon: Building,
    title: 'Asset Lifecycle & Facility Management',
    desc: 'Comprehensive post-handover care including preventive HVAC maintenance, water filtration testing, DG backup servicing, and landscaped garden upkeep.',
    benefits: ['10-Year Structural Warranty', 'Preventive Annual Servicing', 'Solar & Green Energy Audits']
  },
  {
    icon: Scale,
    title: 'Legal, Title & RERA Advisory',
    desc: 'Transparent legal due-diligence, encumbrance verification, deed registration support, and structured NRI foreign exchange remittance guidance.',
    benefits: ['100% Clear Title Guarantee', 'Rajasthan RERA Compliance Support', 'NRI Taxation Consultation']
  }
];

export const ServicesPage = ({ onOpenEnquiry }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      {/* Header Banner in Light Trustworthy Theme */}
      <PageHeader
        theme="light"
        badge="Bespoke Resident Services"
        title="Excellence in Every"
        highlight="Detail & Service"
        subtitle="At AR Homes, luxury is an end-to-end experience. Discover bespoke architectural consultation, turnkey interior staging, and 24/7 resident concierge."
        breadcrumbs={[{ label: 'Services & Amenities' }]}
      />

      {/* Main Services Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#013724] font-bold block mb-2">
            End-To-End Living Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900">
            Comprehensive Property <span className="text-[#013724] italic font-medium">Ecosystem</span>
          </h2>
          <p className="text-sm text-slate-600 font-normal mt-4 leading-relaxed">
            We do not simply build residences — we engineer a lifetime of effortless, refined living backed by dedicated specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((svc, idx) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#013724] mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-emerald-800" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-[#013724] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 space-y-2">
                  {svc.benefits.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* World-Class Amenities Section (Light Theme) */}
      <LuxuryAmenities theme="light" />

      {/* Consultation Call to Action */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-20">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#013724] border border-[#205843] text-white flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
              Personalized Consultation
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-3">
              Need Custom Architecture or Interior Planning?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
              Schedule a private session with our principal design team to review structural blueprints, customization options, and tailored material catalogs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Schedule Architecture & Services Consultation' })}
            className="px-8 py-4 bg-[#D4AF37] text-[#013724] hover:bg-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xl shrink-0"
          >
            Book Free Consultation
          </button>
        </div>
      </div>

      {/* Subtle light to dark transition border for footer harmony */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default ServicesPage;
