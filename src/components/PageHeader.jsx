import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const PageHeader = ({
  badge = 'AR Homes Luxury',
  title = 'Explore',
  highlight = 'Residences',
  subtitle = 'Discover spaces designed with quality that lasts.',
  breadcrumbs = [],
  theme = 'dark'
}) => {
  const isLight = theme === 'light';

  return (
    <div 
      className={`relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden ${
        isLight
          ? 'bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200 text-slate-900'
          : 'bg-gradient-to-b from-[#021c13] via-[#01140d] to-black border-b border-[#205843]/40 text-white'
      }`}
    >
      {/* Subtle background glow */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-[120px] pointer-events-none rounded-full ${
          isLight ? 'bg-emerald-500/10' : 'bg-[#01472E]/30'
        }`} 
      />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className={`flex items-center gap-2 text-xs mb-6 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
          <Link 
            to="/" 
            className={`transition-colors flex items-center gap-1 ${
              isLight ? 'hover:text-[#013724]' : 'hover:text-[#D4AF37]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className={`w-3 h-3 ${isLight ? 'text-slate-400' : 'text-gray-600'}`} />
              {crumb.href ? (
                <Link 
                  to={crumb.href} 
                  className={`transition-colors ${isLight ? 'hover:text-[#013724]' : 'hover:text-[#D4AF37]'}`}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={`font-medium ${isLight ? 'text-[#013724]' : 'text-[#D4AF37]'}`}>
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge & Title */}
        <div className="max-w-3xl">
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.25em] font-semibold mb-4 ${
              isLight
                ? 'bg-emerald-50 border border-emerald-200 text-[#013724]'
                : 'bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-emerald-600' : 'bg-[#D4AF37] animate-pulse'}`} />
            <span>{badge}</span>
          </div>

          <h1 className={`font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {title}{' '}
            <span className={`italic ${
              isLight
                ? 'text-[#013724] font-medium'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A880]'
            }`}>
              {highlight}
            </span>
          </h1>

          {subtitle && (
            <p className={`text-sm sm:text-base font-normal leading-relaxed max-w-2xl ${
              isLight ? 'text-slate-600' : 'text-gray-300 font-light'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
