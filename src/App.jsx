import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickySideMenu } from './components/StickySideMenu';
import { MobileBottomBar } from './components/MobileBottomBar';
import { EnquiryModal } from './components/EnquiryModal';
import { ResidenceModal } from './components/ResidenceModal';

// Dedicated Pages
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { RentPage } from './pages/RentPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { FaqsPage } from './pages/FaqsPage';

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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black relative">
        
        {/* Persistent Floating Navbar across all pages */}
        <Navbar onStartChat={handleOpenEnquiry} onOpenEnquiry={handleOpenEnquiry} />

        {/* Dynamic Route Pages */}
        <div className="flex-1 pb-16 md:pb-0">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenEnquiry={handleOpenEnquiry}
                  onSelectResidence={setActiveResidenceModal}
                />
              }
            />
            <Route
              path="/buy"
              element={
                <BuyPage
                  onOpenEnquiry={handleOpenEnquiry}
                  onSelectResidence={setActiveResidenceModal}
                />
              }
            />
            <Route
              path="/rent"
              element={
                <RentPage
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />
            <Route
              path="/services"
              element={
                <ServicesPage
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />
            <Route
              path="/gallery"
              element={
                <GalleryPage
                  onOpenEnquiry={handleOpenEnquiry}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactPage />
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PrivacyPolicyPage />
              }
            />
            <Route
              path="/terms-and-conditions"
              element={
                <TermsConditionsPage />
              }
            />
            <Route
              path="/faqs"
              element={
                <FaqsPage onOpenEnquiry={handleOpenEnquiry} />
              }
            />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer onOpenEnquiry={handleOpenEnquiry} />

        {/* Signature Right-Side Sticky Vertical Quick-Action Bar (Desktop/Tablet) */}
        <StickySideMenu onOpenCallback={handleOpenEnquiry} />

        {/* Dedicated Mobile-First Sticky Action Bar (Phone Viewers) */}
        <MobileBottomBar onOpenCallback={handleOpenEnquiry} />

        {/* Global Modals */}
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
    </Router>
  );
}

export default App;
