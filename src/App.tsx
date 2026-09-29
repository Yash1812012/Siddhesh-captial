import { useState, useEffect, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { COMPANY_DETAILS } from './constants/companyDetails';
import { useVideoScrubber } from './hooks/useVideoScrubber';
import { useUserData } from './hooks/useUserData';
import type { ModalContent, ModalType } from './types/corporate';

// UI Components
import { Navbar } from './components/Navbar';
import { MobileDrawer } from './components/MobileDrawer';
import { Hero } from './components/Hero';
import { VideoHud } from './components/VideoHud';
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
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);

  // Video Scrubbing Engine
  const {
    videoSrc,
    videoRef,
    fileInputRef,
    videoDuration,
    currentVideoTime,
    isPlaying,
    scrubSensitivity,
    setScrubSensitivity,
    videoNotification,
    isDraggingVideo,
    togglePlayback,
    handleSeeked,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleVideoError,
    handleApplyNewVideoFile,
  } = useVideoScrubber();

  // Firebase Auth & Firestore Client Data
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

  // Entrance animation for action pills
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

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

  const heroHeadlineText =
    'Siddhesh Capital Market Services — incorporated May 26, 1995 (CIN: U65923MH1995PTC088811, RoC-Mumbai). Anchored at Nariman Point, stewarding commercial credit and institutional capital.';

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden select-none font-body">
      {/* Hidden file input for uploading custom video */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleApplyNewVideoFile(e.target.files[0]);
          }
        }}
      />

      {/* BACKGROUND VIDEO (mouse-scrub controlled) */}
      <video
        ref={videoRef}
        key={videoSrc}
        onSeeked={handleSeeked}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onError={handleVideoError}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 object-cover pointer-events-none w-full h-full"
        style={{ objectPosition: '70% center' }}
      />

      {/* Subtle overlay vignette for contrast and depth */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/35 to-black/50"
        aria-hidden="true"
      />

      {/* Drag & Drop Indicator */}
      {isDraggingVideo && (
        <div className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md border-2 border-dashed border-white/60 flex flex-col items-center justify-center pointer-events-none transition-all">
          <div className="bg-neutral-900/95 text-white px-8 py-6 rounded-2xl border border-white/20 text-center shadow-2xl space-y-3">
            <Upload className="w-10 h-10 mx-auto text-white animate-bounce" />
            <p className="text-lg font-medium">Drop custom video file here</p>
            <p className="text-xs text-neutral-400">Instantly replaces background and persists locally</p>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        authLoading={authLoading}
        inquiryCount={userInquiries.length}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onOpenModal={openModal}
        onSignIn={login}
        onSignOut={logout}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenModal={openModal}
      />

      {/* Main Hero Interface */}
      <Hero
        headlineText={heroHeadlineText}
        buttonsVisible={buttonsVisible}
        copiedPhone={copiedItem === 'Phone number copied'}
        phone={COMPANY_DETAILS.contact.phone}
        onOpenModal={openModal}
        onCopyPhone={() => copyToClipboard(COMPANY_DETAILS.contact.phone, 'Phone number')}
      />

      {/* Bottom Video HUD */}
      <VideoHud
        isPlaying={isPlaying}
        currentVideoTime={currentVideoTime}
        videoDuration={videoDuration}
        scrubSensitivity={scrubSensitivity}
        onTogglePlayback={togglePlayback}
        onChangeSensitivity={setScrubSensitivity}
        onTriggerFileInput={() => fileInputRef.current?.click()}
      />

      {/* Notification Toasts */}
      <Toasts copiedItem={copiedItem} videoNotification={videoNotification} />

      {/* Active Modal Dialogs */}
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
              onCopySummary={(text) => copyToClipboard(text, 'Facility brief')}
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
              onOpenCalculator={() =>
                openModal(
                  'Commercial Credit Facility Estimator',
                  'Simulate institutional credit lines, term debt, and debt servicing under NIC 6592.',
                  'calculator',
                )
              }
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
