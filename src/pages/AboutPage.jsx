import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useSiteData } from '../context/SiteDataContext';
import { BRAND } from '../data/projectsData';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, PhoneCall, Building2 } from 'lucide-react';

const formatImageUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/uc\?id=)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
  }
  return url;
};

const OWNERS = [
  {
    id: 'owner-1',
    image: '/assets/owner-1.jpg',
  },
  {
    id: 'owner-2',
    image: '/assets/owner-2.jpg',
  },
  {
    id: 'owner-3',
    image: '/assets/owner-3.jpg',
  }
];

const STATS = [
  { value: '500+', label: 'Luxury Residences Delivered' },
  { value: '100%', label: 'RERA Compliance & Clear Freehold Titles' },
  { value: '3.2M+', label: 'Sq.Ft Developed & Under Construction' },
  { value: '0%', label: 'Brokerage • Deal Directly with Founders' }
];

export const AboutPage = ({ onOpenEnquiry }) => {
  const { owners } = useSiteData();
  const displayOwners = owners && owners.length > 0 ? owners : OWNERS;
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

        {/* The Three Owners Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {displayOwners.map((owner, idx) => {
            const fallbackImages = ['/assets/owner-1.jpg', '/assets/owner-2.jpg', '/assets/owner-3.jpg'];
            const imgSrc = (owner.image && !owner.image.includes('unsplash.com'))
              ? formatImageUrl(owner.image)
              : fallbackImages[idx % 3];

            return (
              <div
                key={owner.id || idx}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 shadow-sm"
              >
                <div className="aspect-square w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={imgSrc}
                    alt="AR Homes Leadership"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
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
