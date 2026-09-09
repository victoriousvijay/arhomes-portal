import React, { useState, useEffect, useRef } from 'react';
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
  PhoneCall,
  ShieldCheck,
  Building2
} from 'lucide-react';

const ICON_MAP = {
  Landmark,
  Briefcase,
  Wallet,
  TrendingUp,
  FileCheck,
  Compass,
  ShieldCheck,
  Building2
};

const formatGoogleDriveUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/uc\?id=)([a-zA-Z0-9_-]+)/;
  const match = trimmed.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
  }
  return trimmed;
};

// Custom typewriter hook
const useTypewriter = (text, speed = 32, startDelay = 500) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      let currentIndex = 0;
      intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayed(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
};

export const ServicesPage = ({ onOpenEnquiry }) => {
  const { settings, services } = useSiteData();
  const phoneVal = settings?.phone || BRAND.phone;
  const phoneDisplayVal = settings?.phone_display || settings?.phone || BRAND.phoneDisplay;

  // Ultra-smooth video scrub with requestAnimationFrame and lerp
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef(null);

  // Typewriter heading & subtitle text
  const typewriterText = "How AR Homes Assists You. Whether securing competitive capital for your enterprise, improving your credit score, or acquiring prime residential land, our advisory desk guides you every step of the way.";
  const { displayed, done } = useTypewriter(typewriterText, 30, 400);

  // Action pill buttons animation state
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyContact = () => {
    navigator.clipboard.writeText(phoneVal || '+918450984509');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Ultra-smooth video mouse & touch scrub engine
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const initial = (video.duration * 0.15) || 0;
      targetTimeRef.current = initial;
      currentTimeRef.current = initial;
      video.currentTime = initial;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    let prevX = null;

    const handleMouseMove = (e) => {
      if (!video || !video.duration) return;
      const currentX = e.clientX;
      if (prevX === null) {
        prevX = currentX;
        return;
      }
      const deltaX = currentX - prevX;
      prevX = currentX;

      const sensitivity = 0.85;
      const deltaSec = (deltaX / window.innerWidth) * sensitivity * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + deltaSec));
    };

    let touchStartX = null;
    const handleTouchMove = (e) => {
      if (!video || !video.duration || !e.touches[0]) return;
      const touchX = e.touches[0].clientX;
      if (touchStartX === null) {
        touchStartX = touchX;
        return;
      }
      const deltaX = touchX - touchStartX;
      touchStartX = touchX;
      const deltaSec = (deltaX / window.innerWidth) * 0.9 * video.duration;
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + deltaSec));
    };
    const handleTouchEnd = () => {
      touchStartX = null;
    };

    // Smooth continuous animation frame loop (60/120fps LERP)
    const updateVideoFrame = () => {
      if (video && video.duration && !isSeekingRef.current) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.015) {
          currentTimeRef.current += diff * 0.28;
          currentTimeRef.current = Math.max(0, Math.min(video.duration, currentTimeRef.current));
          
          isSeekingRef.current = true;
          if ('fastSeek' in video) {
            video.fastSeek(currentTimeRef.current);
          } else {
            video.currentTime = currentTimeRef.current;
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(updateVideoFrame);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    rafIdRef.current = requestAnimationFrame(updateVideoFrame);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Display services from CMS context
  const displayServices = services && services.length > 0 ? services : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#013724] selection:text-white">
      
      {/* 1. FULL-SCREEN MOUSE-SCRUB VIDEO HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-14 overflow-hidden select-none">
        
        {/* Background Video (Mouse-Scrub controlled, contained inside hero) */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-[75%_center] pointer-events-none z-0"
        />

        {/* Soft Vignette Overlay for Crisp Typography Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/30 to-transparent pointer-events-none z-[1]" />

        {/* Breadcrumb Navigation at Top-Left */}
        <div className="absolute top-24 left-6 sm:left-14 z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-700 font-medium px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-black/5 shadow-sm">
            <Link to="/" className="hover:text-[#013724] transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">Services & Advisory</span>
          </nav>
        </div>

        {/* Content Container (Shifted to LEFT side on Desktop: md:mr-auto md:ml-2 lg:ml-6) */}
        <div className="max-w-xl md:mr-auto md:ml-2 lg:ml-6 relative z-10 text-left pt-20 md:pt-0">
          
          {/* 1. Blurred Intro Label */}
          <div 
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#000',
              filter: 'blur(4px)'
            }}
          >
            <span>ONE-STOP CLIENT ADVISORY</span>
            <br />
            <span>Jaipur's Premier Property & Loan Desk</span>
          </div>

          {/* 2. Typewriter Text */}
          <p
            className="text-black mb-5 sm:mb-6 font-normal min-h-[54px] tracking-tight"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35
            }}
          >
            <span>{displayed}</span>
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
            )}
          </p>

          {/* 3. Action Pill Buttons */}
          <div
            className={`flex flex-wrap gap-y-1 transition-all duration-500 ease-out ${
              pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Advisory: Home Loans & Instant Pre-Approvals' })}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
            >
              Home Loans & Pre-Approvals
            </button>

            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Advisory: Business Loans & Commercial Finance' })}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
            >
              Business & Commercial Loans
            </button>

            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Advisory: Personal Loans & Liquid Credit' })}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
            >
              Personal Loans & Liquid Credit
            </button>

            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Advisory: CIBIL Score Improvisation Desk' })}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
            >
              CIBIL Score Improvisation (750+)
            </button>

            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry({ title: 'Advisory: Property & Land Acquisition' })}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
            >
              Property & Land Acquisition
            </button>

            {/* 1 Outline Pill Button with Copy Icon */}
            <button
              type="button"
              onClick={handleCopyContact}
              className="inline-flex items-center justify-center text-slate-900 bg-white/80 backdrop-blur-md border border-black/25 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
              title="Click to copy contact"
            >
              <span>
                Advisory Desk: <span className="underline underline-offset-1 font-semibold">{phoneDisplayVal || '+91 84509 84509'}</span>
              </span>
              {copied ? (
                <span className="text-xs font-bold text-emerald-600">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

        </div>

      </section>

      {/* 2. REAL-TIME MORTGAGE & CIBIL CALCULATOR (NO REDUNDANT HEADER) */}
      <div className="relative z-10 bg-[#F8FAFC] max-w-[1440px] mx-auto px-6 sm:px-12 pt-12 pb-20">
        
        {/* Directly flows into the Calculator */}
        <LoanCalculator onOpenEnquiry={onOpenEnquiry} defaultAmount={25000000} />

        {/* 3. DYNAMIC SERVICES CARDS GRID (SYNCED WITH CMS) */}
        <div className="mt-20 mb-20">
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
            {displayServices.map((svc, idx) => {
              const IconComponent = (svc.icon_name && ICON_MAP[svc.icon_name]) || Compass;
              return (
                <div
                  key={svc.id || idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between shadow-sm hover:-translate-y-1"
                >
                  {/* Card Image Header with Badges */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={formatGoogleDriveUrl(svc.image)}
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
                      <IconComponent className="w-4 h-4" />
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
                      {svc.highlights && svc.highlights.length > 0 && (
                        <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                          {svc.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

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
