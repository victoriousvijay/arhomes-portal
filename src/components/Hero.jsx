import React from 'react';
import { FadeIn } from './FadeIn';

export const Hero = ({ onOpenEnquiry, onStartChat }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-black text-white px-4 sm:px-8 select-none">
      
      {/* Top Spacer for Global Fixed Navbar */}
      <div className="h-24 sm:h-28 w-full shrink-0" />

      {/* Center Hero Content (Middle and Centre of Viewport) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center py-8">
        
        {/* Subtle Brand Kicker */}
        <FadeIn delay={200} duration={800}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#013724]/80 border border-[#D4AF37]/40 backdrop-blur-md mb-5 sm:mb-7 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              AR HOMES • JAIPUR
            </span>
          </div>
        </FadeIn>

        {/* Masked Video Heading: "Designed in the details" */}
        <FadeIn delay={400} duration={1000}>
          <div
            className="relative w-full max-w-3xl lg:max-w-4xl mx-auto h-[150px] sm:h-[220px] md:h-[280px] lg:h-[330px] flex items-center justify-center overflow-hidden rounded-2xl"
            style={{ isolation: 'isolate' }}
          >
            {/* Cinematic Video Layer Inside the Text */}
            <video
              className="absolute inset-0 w-full h-full object-cover scale-105"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Black Knockout Multiply Overlay: Only the white text lets the video through */}
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center mix-blend-multiply pointer-events-none px-2">
              <h1 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[112px] leading-[0.92] tracking-tight text-white text-center">
                Designed in<br />the details
              </h1>
            </div>
          </div>
        </FadeIn>

        {/* Subheading: 1-2 Lines Related to AR Homes */}
        <FadeIn delay={700} duration={900}>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 font-light max-w-xl sm:max-w-2xl mx-auto leading-relaxed mt-5 sm:mt-8 px-4">
            Bespoke independent floors and luxury residences crafted for warmth, comfort, and generations to come across Jaipur, Rajasthan.
          </p>
        </FadeIn>

      </div>

      {/* Bottom Scroll Indicator (Subtle & Elegant, No Buttons) */}
      <div className="relative z-10 pb-20 md:pb-8 shrink-0 flex flex-col items-center">
        <FadeIn delay={1000} duration={800}>
          <a
            href="#gallery"
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors group cursor-pointer"
            aria-label="Scroll to residences"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
              Explore Residences
            </span>
            <div className="w-5 h-8 rounded-full border border-white/25 group-hover:border-[#D4AF37] transition-colors flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
            </div>
          </a>
        </FadeIn>
      </div>

    </section>
  );
};

export default Hero;
