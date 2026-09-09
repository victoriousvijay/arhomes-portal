import React from 'react';
import { Link } from 'react-router-dom';
import { LoanCalculator } from '../components/LoanCalculator';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND } from '../data/projectsData';
import { 
  Landmark, 
  Briefcase, 
  Wallet, 
  TrendingUp, 
  FileCheck, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall
} from 'lucide-react';

const SERVICES_CATALOG = [
  {
    icon: Landmark,
    title: 'Home Loans & Instant Pre-Approvals',
    desc: 'Exclusive builder-subsidized tie-ups with SBI, HDFC, ICICI, and Axis Bank. Fast-track sanction with transparent legal due diligence and zero processing friction.',
    highlights: ['Preferential 8.35% Base Rates', 'Same-Week In-Principle Sanction', 'Tax Savings Optimization'],
    category: 'Finance & Lending',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Briefcase,
    title: 'Business Loans & Commercial Finance',
    desc: 'Capital financing for enterprise expansion, corporate office floor acquisition, and commercial property investment backed by flexible tenure and structured repayment.',
    highlights: ['Commercial Asset Financing', 'Working Capital Lines', 'MSME & Corporate Loan Desk'],
    category: 'Commercial Funding',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Wallet,
    title: 'Personal Loans & Liquid Credit Assistance',
    desc: 'Unsecured high-value personal credit lines designed for bespoke interior staging, Italian marble upgrades, furnishings, and emergency financial liquidity.',
    highlights: ['Collateral-Free Disbursement', '12 to 60 Months Flexible Tenure', 'Minimal Doorstep Paperwork'],
    category: 'Personal Finance',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: TrendingUp,
    title: 'CIBIL Score Improvisation Desk',
    desc: 'Professional credit health audits to help buyers elevate their credit rating above 750+. We rectify reporting discrepancies, restructure debt ratios, and secure lower interest rates.',
    highlights: ['Credit Report Dispute Redressal', 'Debt-to-Income Optimization', 'Rate-Reduction Consulting'],
    category: 'Credit Advisory',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: FileCheck,
    title: 'All-Loans Assistance & Banking Desk',
    desc: 'Comprehensive, end-to-end loan coordination. From document collection and property valuation to title search and bank disbursement, our dedicated banking officers handle everything.',
    highlights: ['100% Dedicated Relationship Manager', 'Doorstep Verification & Pickup', 'Zero Hidden Advisory Charges'],
    category: 'Banking Concierge',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Compass,
    title: 'Property & Land Acquisition Advisory',
    desc: 'Verified acquisition consulting for buyers seeking prime Jaipur real estate. We curate high-return independent floors, luxury villas, apartments, commercial suites, and freehold plots.',
    highlights: ['Villas & Triplex Mansions', 'Apartments & Commercial Towers', 'Freehold Plots & Estate Land'],
    category: 'Property Portfolio',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  }
];

export const ServicesPage = ({ onOpenEnquiry }) => {
  const { settings } = useSiteData();
  const phoneVal = settings?.phone || BRAND.phone;
  const phoneDisplayVal = settings?.phone_display || settings?.phone || BRAND.phoneDisplay;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-8 sm:py-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
          <Link to="/" className="hover:text-[#013724] transition-colors">Home</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">Services & Loan Assistance</span>
        </nav>

        {/* 1. First at Top: How AR Homes Assists You */}
        <div className="text-center max-w-3xl mx-auto pt-2 pb-12 sm:pb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#013724] font-bold block mb-2.5">
            ONE-STOP CLIENT ADVISORY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 tracking-tight">
            How AR Homes <span className="text-[#013724] italic font-medium">Assists You</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 leading-relaxed">
            Whether securing competitive capital for your enterprise, improving your credit score, or acquiring prime residential land, our advisory desk guides you every step of the way.
          </p>
        </div>

        {/* 2. After this: Integrated Real-Time Mortgage & CIBIL Calculator */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#013724] font-bold bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              Financial Estimator
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Calculate Loan EMIs with Real-Time CIBIL Score & Interest
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Evaluate monthly outflows, tenure options, and interest savings across multiple credit tiers.
            </p>
          </div>

          <LoanCalculator onOpenEnquiry={onOpenEnquiry} defaultAmount={25000000} />
        </div>

        {/* 3. Then after this: Compact Service Cards with Relevant Images */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#013724] font-bold bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              Our Advisory Desks
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Comprehensive Financial & Acquisition Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Direct liaison with premier national banks and legal due diligence on every transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_CATALOG.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between shadow-sm hover:-translate-y-1"
                >
                  {/* Card Image Header with Badges */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Top Category Badge */}
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-[#D4AF37] border border-white/20">
                      {svc.category}
                    </span>

                    {/* Bottom Floating Icon */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#013724] shadow-md">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Compact Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#013724] transition-colors line-clamp-1">
                        {svc.title}
                      </h3>

                      <p className="text-xs text-slate-600 font-normal leading-relaxed mt-1.5 line-clamp-2">
                        {svc.desc}
                      </p>
                    </div>

                    <div>
                      <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                        {svc.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{h}</span>
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
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Minimal Consultation Banner */}
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
              href={`tel:${phoneVal}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Advisory Desk ({phoneDisplayVal})</span>
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
