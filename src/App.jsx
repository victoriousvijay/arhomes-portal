import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import { ScrollToTop } from './components/ScrollToTop';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickySideMenu } from './components/StickySideMenu';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ClickSpark } from './components/ClickSpark';
import { EnquiryModal } from './components/EnquiryModal';
import { ResidenceModal } from './components/ResidenceModal';

// Dedicated Public Pages
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { FaqsPage } from './pages/FaqsPage';

// Admin Portal Pages (CMS & CRM)
import { AdminLayout } from './pages/admin/AdminLayout';
import { CRMLeads } from './pages/admin/CRMLeads';
import { CRMAnalytics } from './pages/admin/CRMAnalytics';
import { CRMRevenue } from './pages/admin/CRMRevenue';
import { CMSProperties } from './pages/admin/CMSProperties';
import { CMSPages } from './pages/admin/CMSPages';
import { CMSSettings } from './pages/admin/CMSSettings';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

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
    <ClickSpark
      sparkColor="#D4AF37"
      sparkSize={10}
      sparkRadius={18}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black relative">
        
        {/* Render Public Navbar when not on /admin */}
        {!isAdmin && (
          <Navbar onStartChat={handleOpenEnquiry} onOpenEnquiry={handleOpenEnquiry} />
        )}

        {/* Dynamic Route Pages */}
        <div className={`flex-1 ${!isAdmin ? 'pb-16 md:pb-0' : ''}`}>
          <Routes>
            {/* Public Routes */}
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
            {/* Redirect /rent to /buy since AR Homes only deals in properties for sale and development */}
            <Route path="/rent" element={<Navigate to="/buy" replace />} />
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

            {/* Admin Portal Nested Routes (CMS & CRM) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<CRMLeads />} />
              <Route path="crm" element={<Navigate to="/admin" replace />} />
              <Route path="analytics" element={<CRMAnalytics />} />
              <Route path="revenue" element={<CRMRevenue />} />
              <Route path="deals" element={<Navigate to="/admin/revenue" replace />} />
              <Route path="properties" element={<CMSProperties />} />
              <Route path="cms" element={<Navigate to="/admin/properties" replace />} />
              <Route path="pages" element={<CMSPages />} />
              <Route path="settings" element={<CMSSettings />} />
            </Route>

            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Public Footer */}
        {!isAdmin && <Footer onOpenEnquiry={handleOpenEnquiry} />}

        {/* Signature Right-Side Sticky Vertical Quick-Action Bar (Desktop/Tablet) */}
        {!isAdmin && <StickySideMenu onOpenCallback={handleOpenEnquiry} />}

        {/* Dedicated Mobile-First Sticky Action Bar (Phone Viewers) */}
        {!isAdmin && <MobileBottomBar onOpenCallback={handleOpenEnquiry} />}

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
    </ClickSpark>
  );
}

export function App() {
  return (
    <Router>
      <SiteDataProvider>
        <ScrollToTop />
        <SmoothScroll />
        <AppContent />
      </SiteDataProvider>
    </Router>
  );
}

export default App;

