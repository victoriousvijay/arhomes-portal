import React from 'react';
import { Hero } from '../components/Hero';
import { MoreThanFourWalls } from '../components/MoreThanFourWalls';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { InteractiveFloorPlans } from '../components/InteractiveFloorPlans';
import { LuxuryAmenities } from '../components/LuxuryAmenities';
import { ParallaxQuote } from '../components/ParallaxQuote';
import { RealEstateJournal } from '../components/RealEstateJournal';

export const HomePage = ({ onOpenEnquiry, onSelectResidence }) => {
  return (
    <main>
      {/* Full-Screen Hero */}
      <Hero onStartChat={onOpenEnquiry} onOpenEnquiry={onOpenEnquiry} />

      {/* Philosophy: More Than Four Walls */}
      <MoreThanFourWalls />

      {/* Featured Projects Showcase */}
      <FeaturedProjects
        onSelectResidence={onSelectResidence}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* Interactive 3D Floor Plans */}
      <InteractiveFloorPlans onOpenEnquiry={onOpenEnquiry} />

      {/* World-Class Amenities */}
      <LuxuryAmenities />

      {/* Parallax Quote */}
      <ParallaxQuote />

      {/* Real Estate Journal & Insights */}
      <RealEstateJournal />
    </main>
  );
};

export default HomePage;
