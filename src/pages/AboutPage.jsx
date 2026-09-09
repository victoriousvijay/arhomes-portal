import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { BRAND } from '../data/projectsData';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, PhoneCall, Building2, UserCheck } from 'lucide-react';

const OWNERS = [
  {
    name: 'Anand R. Verma',
    role: 'Co-Founder & Managing Director',
    expertise: 'Land Acquisitions & Master Planning',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    bio: 'Pioneered the AR Homes vision of low-density independent floors in Jaipur. With over 22 years of development leadership, Anand directs land acquisitions, master planning, and strategic partnerships across Civil Lines, C-Scheme, and Vaishali Nagar.',
    credentials: 'B.E. Civil • 22+ Years Real Estate Experience'
  },
  {
    name: 'Rajesh K. Sharma',
    role: 'Co-Founder & Director of Architecture',
    expertise: 'Structural Integrity & Design Execution',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    bio: 'Dedicated to architectural precision and European finish standards. Rajesh personally supervises structural concrete casting, seismic safety compliance, imported Italian marble joinery, and on-schedule handover across every AR Homes project.',
    credentials: 'M.Arch Architecture • 19+ Years Engineering Execution'
  },
  {
    name: 'Amit V. Rathore',
    role: 'Co-Founder & Director of Finance & Legal',
    expertise: 'Banking Alliances & RERA Compliance',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=85',
    bio: 'Guarantees 100% legal title transparency and buyer security. Amit orchestrates preferred loan alliances with SBI, HDFC, ICICI, and Axis Bank while managing statutory RERA governance and NRI real estate foreign exchange advisory.',
    credentials: 'FCA & Corporate Finance • 18+ Years Banking & Law'
  }
];

const STATS = [
  { value: '500+', label: 'Luxury Residences Delivered' },
  { value: '100%', label: 'RERA Compliance & Clear Freehold Titles' },
  { value: '3.2M+', label: 'Sq.Ft Developed & Under Construction' },
  { value: '0%', label: 'Brokerage • Deal Directly with Founders' }
];

export const AboutPage = ({ onOpenEnquiry }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      {/* Light Minimal Header */}
      <PageHeader
        theme="light"
        badge="Leadership & Heritage"
        title="Built with Integrity by"
        highlight="Visionary Founders"
        subtitle="AR Homes is steered by three hands-on entrepreneurs bringing together land development, architectural engineering, and financial governance in Jaipur."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-14 sm:py-20">
        
        {/* Philosophy Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#013724] font-bold block mb-2">
            The Founding Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 tracking-tight">
            Direct Accountability from <span className="text-[#013724] italic font-medium">The Owners</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-4 leading-relaxed">
            At AR Homes, we do not operate behind layers of impersonal sales agents. Every plot acquired, foundation poured, and deed registered is guided by our three founders.
          </p>
        </div>

        {/* The Three Owners Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {OWNERS.map((owner, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm"
            >
              <div>
                {/* Photo with subtle zoom */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={owner.image}
                    alt={owner.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#F3E5AB] block drop-shadow-md">
                      {owner.expertise}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#013724] transition-colors mb-1">
                    {owner.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#013724] block mb-3.5">
                    {owner.role}
                  </span>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                    {owner.bio}
                  </p>
                </div>
              </div>

              {/* Footer Credentials */}
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="truncate">{owner.credentials}</span>
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Stats Row */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 mb-20 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((st, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#013724] block">
                  {st.value}
                </span>
                <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold block max-w-[220px] mx-auto">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Call to Action */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#013724] border border-[#205843] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Connect Directly with AR Homes Leadership
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
              Whether you are an investor, homeowner, or NRI looking for verified real estate in Jaipur, our founders welcome direct consultations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/buy"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#013724] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg text-center"
            >
              Explore Properties
            </Link>
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Direct Meeting Request with Founders' })}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
            >
              Schedule Founder Meeting
            </button>
          </div>
        </div>

      </div>

      {/* Subtle bottom gradient to footer */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default AboutPage;
