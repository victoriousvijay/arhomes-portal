import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { LoanCalculator } from '../components/LoanCalculator';
import { 
  Landmark, 
  Briefcase, 
  Wallet, 
  TrendingUp, 
  FileCheck, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall,
  ShieldCheck,
  Building,
  Home
} from 'lucide-react';

const SERVICES_CATALOG = [
  {
    icon: Landmark,
    title: 'Home Loans & Instant Pre-Approvals',
    desc: 'Exclusive builder-subsidized tie-ups with SBI, HDFC, ICICI, and Axis Bank. Fast-track sanction with transparent legal due diligence and zero processing friction.',
    highlights: ['Preferential 8.35% Base Rates', 'Same-Week In-Principle Sanction', 'Tax Savings Optimization'],
    category: 'Finance & Lending'
  },
  {
    icon: Briefcase,
    title: 'Business Loans & Commercial Finance',
    desc: 'Capital financing for enterprise expansion, corporate office floor acquisition, and commercial property investment backed by flexible tenure and structured repayment.',
    highlights: ['Commercial Asset Financing', 'Working Capital Lines', 'MSME & Corporate Loan Desk'],
    category: 'Commercial Funding'
  },
  {
    icon: Wallet,
    title: 'Personal Loans & Liquid Credit Assistance',
    desc: 'Unsecured high-value personal credit lines designed for bespoke interior staging, Italian marble upgrades, furnishings, and emergency financial liquidity.',
    highlights: ['Collateral-Free Disbursement', '12 to 60 Months Flexible Tenure', 'Minimal Doorstep Paperwork'],
    category: 'Personal Finance'
  },
  {
    icon: TrendingUp,
    title: 'CIBIL Score Improvisation Desk',
    desc: 'Professional credit health audits to help buyers elevate their credit rating above 750+. We rectify reporting discrepancies, restructure debt ratios, and secure lower interest rates.',
    highlights: ['Credit Report Dispute Redressal', 'Debt-to-Income Optimization', 'Rate-Reduction Consulting'],
    category: 'Credit Advisory'
  },
  {
    icon: FileCheck,
    title: 'All-Loans Assistance & Banking Desk',
    desc: 'Comprehensive, end-to-end loan coordination. From document collection and property valuation to title search and bank disbursement, our dedicated banking officers handle everything.',
    highlights: ['100% Dedicated Relationship Manager', 'Doorstep Verification & Pickup', 'Zero Hidden Advisory Charges'],
    category: 'Banking Concierge'
  },
  {
    icon: Compass,
    title: 'Property & Land Acquisition Advisory',
    desc: 'Verified acquisition consulting for buyers seeking prime Jaipur real estate. We curate high-return independent floors, luxury villas, apartments, commercial suites, and freehold plots.',
    highlights: ['Villas & Triplex Mansions', 'Apartments & Commercial Towers', 'Freehold Plots & Estate Land'],
    category: 'Property Portfolio'
  }
];

export const ServicesPage = ({ onOpenEnquiry }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      {/* Light Minimal Header */}
      <PageHeader
        theme="light"
        badge="Financial & Property Services"
        title="Comprehensive Advisory &"
        highlight="Loan Assistance"
        subtitle="From home, business, and personal loans to CIBIL score enhancement and verified land acquisitions across Jaipur."
        breadcrumbs={[{ label: 'Services & Loan Assistance' }]}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-14 sm:py-20">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#013724] font-bold block mb-2">
            One-Stop Client Advisory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 tracking-tight">
            How AR Homes <span className="text-[#013724] italic font-medium">Assists You</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 leading-relaxed">
            Whether securing competitive capital for your enterprise, improving your credit score, or acquiring prime residential land, our advisory desk guides you every step of the way.
          </p>
        </div>

        {/* Minimal 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {SERVICES_CATALOG.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#013724] group-hover:bg-[#013724] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {svc.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#013724] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div>
                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-5">
                    {svc.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenEnquiry && onOpenEnquiry({ title: `Assistance Request: ${svc.title}` })}
                    className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#013724] bg-slate-50 hover:bg-[#013724] text-slate-800 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 group-hover:shadow-sm"
                  >
                    <span>Request Assistance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrated Real-Time Mortgage & CIBIL Calculator */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#013724] font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Financial Estimator
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Calculate Loan EMIs with Real-Time CIBIL Score & Interest
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Evaluate monthly outflows, tenure options, and interest savings across multiple credit tiers.
            </p>
          </div>

          <LoanCalculator onOpenEnquiry={onOpenEnquiry} defaultAmount={25000000} />
        </div>

        {/* Minimal Consultation Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#013724] border border-[#205843] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Need Personalized Financial or Property Advice?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
              Speak directly with our senior financial advisors and property consultants. We evaluate your documentation and negotiate preferred rates with top national banks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Schedule Advisory Desk Consultation' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#013724] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Book Free Consultation
            </button>
            <a
              href="tel:+918450984509"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Advisory Desk</span>
            </a>
          </div>
        </div>

      </div>

      {/* Subtle bottom gradient to footer */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default ServicesPage;
