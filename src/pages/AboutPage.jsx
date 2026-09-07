import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { BRAND } from '../data/projectsData';
import { ShieldCheck, Heart, Award, Users, CheckCircle, ArrowRight, Building, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-black text-white">
      {/* Header Banner */}
      <PageHeader
        badge="Our Story & Heritage"
        title="Crafting Spaces Where"
        highlight="Families Flourish"
        subtitle="AR Homes was founded on the belief that a luxury residence should be warm, enduring, and meticulously built for the people who call it home."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Philosophy Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-24 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-3">
              {BRAND.philosophy}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight mb-6">
              Where True Luxury Meets <br />
              <span className="text-[#D4AF37] italic">Family Warmth</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6">
              {BRAND.philosophyText}
            </p>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
              Whether it is the gentle morning sunlight filtering across three open facades in Civil Lines, or the expansive panoramic sunset from a terrace residence in Vaishali Nagar and C-Scheme, Jaipur — AR Homes builds residences where everyday life feels elevated and peaceful.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/buy"
                className="px-6 py-3 bg-[#D4AF37] text-[#013724] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg inline-flex items-center gap-2"
              >
                <span>Explore Residences</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry(null)}
                className="px-6 py-3 border border-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                Schedule Private Tour
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="AR Homes Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Quote Badge */}
            <div className="absolute -bottom-8 -left-4 sm:left-8 bg-[#013724]/95 backdrop-blur-xl border border-[#205843] p-6 rounded-2xl shadow-2xl max-w-sm">
              <p className="font-serif text-sm italic text-white mb-2">
                "Quality is not an accident. It is always the result of sincere intention, intelligent direction, and skillful execution."
              </p>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                AR Homes Leadership
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="bg-[#012217] border-b border-[#205843]/60 py-16">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((st, sIdx) => (
            <div key={sIdx} className="space-y-2">
              <span className="font-serif text-3xl sm:text-5xl font-bold text-[#D4AF37] block">
                {st.value}
              </span>
              <span className="text-xs text-slate-300 uppercase tracking-wider font-light block max-w-[200px] mx-auto">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Pillars / Values */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
            Our Core Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
            Built with Integrity, <span className="text-[#D4AF37] italic">Loved by Families</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, vIdx) => {
            const IconComp = val.icon;
            return (
              <div
                key={vIdx}
                className="p-8 rounded-2xl bg-[#0b1612] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#013724] border border-[#205843] flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
