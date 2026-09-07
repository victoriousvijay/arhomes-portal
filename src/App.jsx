import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { MoreThanFourWalls } from './components/MoreThanFourWalls';
import { FeaturedProjects } from './components/FeaturedProjects';
import { InteractiveFloorPlans } from './components/InteractiveFloorPlans';
import { LuxuryAmenities } from './components/LuxuryAmenities';
import { ParallaxQuote } from './components/ParallaxQuote';
import { RealEstateJournal } from './components/RealEstateJournal';
import { Footer } from './components/Footer';
import { StickySideMenu } from './components/StickySideMenu';
import { EnquiryModal } from './components/EnquiryModal';
import { ResidenceModal } from './components/ResidenceModal';

export function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedResidenceForEnquiry, setSelectedResidenceForEnquiry] = useState(null);
  const [activeResidenceModal, setActiveResidenceModal] = useState(null);

  const handleOpenEnquiry = (item) => {
    setSelectedResidenceForEnquiry(item || null);
    setEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setEnquiryModalOpen(false);
    setSelectedResidenceForEnquiry(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* AR Homes Full-Screen Hero with Video Background & Liquid Glass Navbar */}
      <Hero onStartChat={handleOpenEnquiry} onOpenEnquiry={handleOpenEnquiry} />

      {/* 3. Philosophy & Horizontal Gallery: "More Than Four Walls" */}
      <MoreThanFourWalls />

      {/* 4. Property Showcase: "Find your dream home." */}
      <FeaturedProjects
        onSelectResidence={setActiveResidenceModal}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* 5. Floor Plans Section (3D Render & Materials) */}
      <InteractiveFloorPlans onOpenEnquiry={handleOpenEnquiry} />

      {/* 5.5 Luxury Amenities & Services */}
      <LuxuryAmenities />

      {/* 6. Fixed Background Scrolling Quote */}
      <ParallaxQuote />

      {/* 7. Insights & Updates (Vertical Gold Typography Layout) */}
      <RealEstateJournal />

      {/* 8. Official Emarat-Style Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* 9. Signature Right-Side Sticky Vertical Green Bar */}
      <StickySideMenu onOpenCallback={handleOpenEnquiry} />

      {/* Modals */}
      {enquiryModalOpen && (
        <EnquiryModal
          initialProject={selectedResidenceForEnquiry}
          onClose={handleCloseEnquiry}
        />
      )}

      {activeResidenceModal && (
        <ResidenceModal
          residence={activeResidenceModal}
          onClose={() => setActiveResidenceModal(null)}
          onOpenEnquiry={handleOpenEnquiry}
        />
      )}

    </div>
  );
}

export default App;
