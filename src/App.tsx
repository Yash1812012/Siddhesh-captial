import { useState, useCallback } from 'react';
import { COMPANY_DETAILS } from './constants/companyDetails';
import { useUserData } from './hooks/useUserData';
import type { ModalContent, ModalType } from './types/corporate';

// UI Components
import { Navbar } from './components/Navbar';
import { MobileDrawer } from './components/MobileDrawer';
import { Hero } from './components/Hero';
import { CalculatorSection } from './components/CalculatorSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { CapitalGovernanceSection } from './components/CapitalGovernanceSection';
import { MarketIntelligenceSection } from './components/MarketIntelligenceSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toasts } from './components/Toasts';

// Modals
import { ModalShell } from './components/modals/ModalShell';
import { CapitalModal } from './components/modals/CapitalModal';
import { ManagementModal } from './components/modals/ManagementModal';
import { CreditCalculatorModal } from './components/modals/CreditCalculatorModal';
import { SearchGroundingModal } from './components/modals/SearchGroundingModal';
import { MapsGroundingModal } from './components/modals/MapsGroundingModal';
import { UserPortalModal } from './components/modals/UserPortalModal';
import { CorporateIdentityModal } from './components/modals/CorporateIdentityModal';
import { ContactModal } from './components/modals/ContactModal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);

  // Firebase Auth & Firestore User Data
  const {
    currentUser,
    authLoading,
    userInquiries,
    userBookmarks,
    savingInquiry,
    inquirySuccessMsg,
    login,
    logout,
    submitInquiry,
    toggleBookmark,
    removeBookmark,
  } = useUserData();

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(`${label} copied`);
      setTimeout(() => setCopiedItem(null), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedItem(`${label} copied`);
      setTimeout(() => setCopiedItem(null), 2500);
    }
  }, []);

  const openModal = useCallback((title: string, subtitle: string, type: ModalType) => {
    setActiveModal({ title, subtitle, type });
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const handleSelectFacilityForCalc = (facilityName: string, defaultAmount: number) => {
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#07080c] text-white selection:bg-emerald-500 selection:text-black font-body overflow-x-hidden">
      {/* Subtle luxury ambient glow backgrounds (Clean & Modern, NO messy video scrubber) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-emerald-500/[0.05] blur-[140px] animate-float-slow" />
        <div className="absolute top-[35%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/[0.04] blur-[150px] animate-float-alt" />
        <div className="absolute bottom-[20%] left-[-10%] w-[650px] h-[650px] rounded-full bg-amber-500/[0.03] blur-[160px] animate-float-slow" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        authLoading={authLoading}
        inquiryCount={userInquiries.length}
        mobileMenuOpen={mobileMenuOpen}
        phone={COMPANY_DETAILS.contact.phone}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onOpenModal={openModal}
        onSignIn={login}
        onSignOut={logout}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        phone={COMPANY_DETAILS.contact.phone}
        onClose={() => setMobileMenuOpen(false)}
        onOpenModal={openModal}
      />

      {/* Main Content Sections for Users */}
      <main className="relative z-10">
        {/* Hero Section with Short Capital Intro */}
        <Hero
          copiedPhone={copiedItem === 'Phone number copied'}
          phone={COMPANY_DETAILS.contact.phone}
          onOpenModal={openModal}
          onCopyPhone={() => copyToClipboard(COMPANY_DETAILS.contact.phone, 'Phone number')}
        />

        {/* Live Interactive Calculator Section */}
        <CalculatorSection
          currentUser={currentUser}
          savingInquiry={savingInquiry}
          inquirySuccessMsg={inquirySuccessMsg}
          onSubmitInquiry={submitInquiry}
          onCopySummary={(text) => copyToClipboard(text, 'Facility summary')}
          onBookmarkFacility={(title, summary) =>
            toggleBookmark(title, 'financials', summary, (msg) => setCopiedItem(msg))
          }
        />

        {/* Commercial Credit Facilities */}
        <FacilitiesSection onSelectFacilityForCalc={handleSelectFacilityForCalc} />

        {/* Capital Structure & Governance */}
        <CapitalGovernanceSection
          onCopyText={copyToClipboard}
          copiedItem={copiedItem}
        />

        {/* Market Intelligence with Google Search Grounding */}
        <MarketIntelligenceSection />

        {/* Nariman Point Spatial Verification with Google Maps Grounding */}
        <LocationSection />

        {/* Direct Contact & Consultation Form */}
        <ContactSection
          currentUser={currentUser}
          onSubmitInquiry={submitInquiry}
          onCopyText={copyToClipboard}
          copiedItem={copiedItem}
        />
      </main>

      {/* Statutory Footer */}
      <Footer />

      {/* Notification Toast */}
      <Toasts copiedItem={copiedItem} videoNotification={null} />

      {/* Modals for Deep Drills / User Portal */}
      {activeModal && (
        <ModalShell
          title={activeModal.title}
          subtitle={activeModal.subtitle}
          cin={COMPANY_DETAILS.identity.cin}
          onClose={closeModal}
        >
          {activeModal.type === 'capital' && (
            <CapitalModal
              capital={COMPANY_DETAILS.capital}
              isBookmarked={userBookmarks.some((b) => b.title === 'Capital Structure Profile')}
              onToggleBookmark={() =>
                toggleBookmark(
                  'Capital Structure Profile',
                  'financials',
                  `Auth: ${COMPANY_DETAILS.capital.authorizedCapitalWords}, Paid-up: ${COMPANY_DETAILS.capital.paidUpCapitalWords}`,
                  (msg) => setCopiedItem(msg),
                )
              }
            />
          )}

          {activeModal.type === 'management' && (
            <ManagementModal management={COMPANY_DETAILS.management} />
          )}

          {activeModal.type === 'calculator' && (
            <CreditCalculatorModal
              currentUser={currentUser}
              savingInquiry={savingInquiry}
              inquirySuccessMsg={inquirySuccessMsg}
              onSubmitInquiry={submitInquiry}
              onCopySummary={(text) => copyToClipboard(text, 'Loan Estimate')}
            />
          )}

          {activeModal.type === 'searchGrounding' && <SearchGroundingModal />}

          {activeModal.type === 'mapsGrounding' && <MapsGroundingModal />}

          {activeModal.type === 'userPortal' && (
            <UserPortalModal
              currentUser={currentUser}
              userInquiries={userInquiries}
              userBookmarks={userBookmarks}
              onSignIn={login}
              onSignOut={logout}
              onOpenCalculator={() => {
                closeModal();
                const el = document.getElementById('calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onRemoveBookmark={removeBookmark}
            />
          )}

          {activeModal.type === 'identity' && (
            <CorporateIdentityModal
              identity={COMPANY_DETAILS.identity}
              onCopyCin={(cin) => copyToClipboard(cin, 'CIN')}
            />
          )}

          {activeModal.type === 'contact' && (
            <ContactModal
              contact={COMPANY_DETAILS.contact}
              onCopyAddress={(addr) => copyToClipboard(addr, 'Registered Address')}
              onCopyEmail={(email) => copyToClipboard(email, 'Official Email')}
              onCopyPhone={(phone) => copyToClipboard(phone, 'Phone number')}
            />
          )}
        </ModalShell>
      )}
    </div>
  );
}
