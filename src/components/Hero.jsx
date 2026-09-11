import React from 'react';
import { AnimatedHeading } from './AnimatedHeading';
import { FadeIn } from './FadeIn';

export const Hero = ({ onOpenEnquiry, onStartChat }) => {
  const handleChat = onStartChat || onOpenEnquiry;

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* Full-screen background video: NO dark overlay, NO gradient overlay, NO dimming */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Top Spacer for Global Fixed Navbar */}
      <div className="h-24 sm:h-28 w-full shrink-0" />

      {/* Hero Content (Bottom of viewport) */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-24 sm:pb-16 lg:pb-20">
        <div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
          
          {/* Left Column - Main content */}
          <div className="max-w-2xl xl:max-w-3xl">
            {/* Animated Character-by-Character Heading */}
            <AnimatedHeading
              text={"Where families thrive,\nand dream homes begin."}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-normal mb-5 sm:mb-6 md:mb-7 text-white leading-[1.22] sm:leading-[1.2] drop-shadow-sm"
            />

            {/* Subheading with Fade-in (800ms delay, 1000ms duration) */}
            <FadeIn delay={800} duration={1000}>
              <p className="text-sm sm:text-base md:text-lg text-slate-100/90 mb-7 sm:mb-9 max-w-xl font-light leading-relaxed drop-shadow-sm">
                Discover bespoke independent floors and luxury residences crafted for warmth, comfort, and generations to come.
              </p>
            </FadeIn>

            {/* Buttons row with Fade-in (1200ms delay, 1000ms duration) */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-row gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleChat}
                  className="flex-1 sm:flex-initial bg-white text-black px-6 sm:px-7 py-3 rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-[#013724] transition-all cursor-pointer shadow-xl text-xs sm:text-sm text-center flex items-center justify-center active:scale-95"
                >
                  Enquire Now
                </button>
                <a
                  href="#gallery"
                  className="flex-1 sm:flex-initial liquid-glass border border-white/30 text-white px-5 sm:px-7 py-3 rounded-xl font-medium hover:bg-white hover:text-black transition-all inline-flex items-center justify-center cursor-pointer text-xs sm:text-sm text-center active:scale-95"
                >
                  Explore Residences
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Tag */}
          <div className="flex items-end justify-start lg:justify-end mt-2 lg:mt-0 shrink-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl">
                <span className="text-[11px] sm:text-xs md:text-sm font-light text-white tracking-wide">
                  Family Living • Prime Residences • Modern Luxury
                </span>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
