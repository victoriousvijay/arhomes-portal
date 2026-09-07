import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const PageHeader = ({
  badge = 'AR Homes Luxury',
  title = 'Explore',
  highlight = 'Residences',
  subtitle = 'Discover spaces designed with quality that lasts.',
  breadcrumbs = []
}) => {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#021c13] via-[#01140d] to-black border-b border-[#205843]/40 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#01472E]/30 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-[#D4AF37] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#D4AF37] font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge & Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>{badge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-tight mb-4">
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A880] italic">{highlight}</span>
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
