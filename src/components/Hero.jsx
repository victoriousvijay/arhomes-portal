import React from 'react';
import { Navbar } from './Navbar';
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

      {/* Navbar at top */}
      <Navbar onStartChat={handleChat} />

      {/* Hero Content (Bottom of viewport) */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
        <div className="w-full lg:grid lg:grid-cols-2 lg:items-end gap-8">
          
          {/* Left Column - Main content */}
          <div>
            {/* Animated Character-by-Character Heading */}
            <AnimatedHeading
              text={"Shaping tomorrow\nwith vision and action."}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
            />

            {/* Subheading with Fade-in (800ms delay, 1000ms duration) */}
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            {/* Buttons row with Fade-in (1200ms delay, 1000ms duration) */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleChat}
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Start a Chat
                </button>
                <a
                  href="#explore"
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center cursor-pointer"
                >
                  Explore Now
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Tag */}
          <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
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
