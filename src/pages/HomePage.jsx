import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedProjects } from '../components/FeaturedProjects';

export const HomePage = ({ onOpenEnquiry, onSelectResidence }) => {
  return (
    <main>
      {/* Full-Screen Hero */}
      <Hero onStartChat={onOpenEnquiry} onOpenEnquiry={onOpenEnquiry} />

      {/* Property Showcase: "Find your dream home." */}
      <FeaturedProjects
        onSelectResidence={onSelectResidence}
        onOpenEnquiry={onOpenEnquiry}
      />
    </main>
  );
};

export default HomePage;
