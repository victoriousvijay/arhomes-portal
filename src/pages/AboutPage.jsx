import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { BRAND } from '../data/projectsData';
import { ShieldCheck, Heart, Award, Users, ArrowRight } from 'lucide-react';

const STATS = [
  { value: '500+', label: 'Luxury Floors Delivered' },
  { value: '100%', label: 'RERA Compliance & Timely Delivery' },
  { value: '3.2M+', label: 'Sq.Ft Developed & Under Construction' },
  { value: '4.9/5', label: 'Homeowner Delight & Referral Score' }
];

const VALUES = [
  {
    icon: Heart,
    title: 'Ghar Bethe, Ghar Dekho',
    desc: 'Our founding promise of digital transparency, verified virtual site tours, and honest construction updates ensures every family experiences absolute peace of mind.'
  },
  {
    icon: ShieldCheck,
    title: 'Quality as Foundation',
    desc: 'We never treat quality as a premium upgrade. From structural core casting to imported Italian statuario marble flooring, our standards remain uncompromising.'
  },
  {
    icon: Users,
    title: 'Low-Density Family Living',
    desc: 'Consciously prioritizing low-rise independent floors (S+4) and boutique sky mansions over congested high-density developments, giving your family maximum privacy and open air.'
  },
  {
    icon: Award,
    title: 'Generational Value',
    desc: 'Each residence is engineered with timeless neoclassical symmetry and modern European detailing to ensure lasting capital appreciation and pride of ownership.'
  }
];

export const AboutPage = ({ onOpenEnquiry }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      {/* Header Banner in Light Trustworthy Theme */}
      <PageHeader
        theme="light"
        badge="Our Story & Heritage"
        title="Crafting Spaces Where"
        highlight="Families Flourish"
        subtitle="AR Homes was founded on the belief that a luxury residence should be warm, enduring, and meticulously built for the people who call it home."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Philosophy Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-24 border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#013724] font-bold block mb-3">
              {BRAND.philosophy}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 leading-tight mb-6">
              Where True Luxury Meets <br />
              <span className="text-[#013724] italic font-medium">Family Warmth</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
              {BRAND.philosophyText}
            </p>
            <p className="text-sm text-slate-500 font-normal leading-relaxed mb-8">
              Whether it is the gentle morning sunlight filtering across three open facades in Civil Lines, or the expansive panoramic sunset from a terrace residence in Vaishali Nagar and C-Scheme, Jaipur — AR Homes builds residences where everyday life feels elevated and peaceful.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/buy"
                className="px-6 py-3.5 bg-[#013724] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#013724] transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Explore Residences</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry(null)}
                className="px-6 py-3.5 border border-slate-300 text-slate-800 bg-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
              >
                Schedule Private Tour
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="AR Homes Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Quote Badge in Trustworthy Light Styling */}
            <div className="absolute -bottom-8 -left-4 sm:left-8 bg-white/95 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl shadow-xl max-w-sm">
              <p className="font-serif text-sm italic text-slate-800 mb-2 leading-relaxed">
                "Quality is not an accident. It is always the result of sincere intention, intelligent direction, and skillful execution."
              </p>
              <span className="text-[10px] uppercase tracking-widest text-[#013724] font-bold block">
                AR Homes Leadership
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="bg-white border-b border-slate-200 py-16 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((st, sIdx) => (
            <div key={sIdx} className="space-y-2">
              <span className="font-serif text-3xl sm:text-5xl font-bold text-[#013724] block">
                {st.value}
              </span>
              <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold block max-w-[200px] mx-auto">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Pillars / Values */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#013724] font-bold block mb-2">
            Our Core Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900">
            Built with Integrity, <span className="text-[#013724] italic font-medium">Loved by Families</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, vIdx) => {
            const IconComp = val.icon;
            return (
              <div
                key={vIdx}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#013724] mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 text-emerald-800" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-[#013724] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle light to dark transition border for footer harmony */}
      <div className="h-12 bg-gradient-to-b from-[#F8FAFC] to-[#012217]" />
    </div>
  );
};

export default AboutPage;
