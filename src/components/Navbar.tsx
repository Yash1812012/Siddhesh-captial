import { Search, Compass, LogOut } from 'lucide-react';
import type { User } from 'firebase/auth';
import type { ModalType } from '../types/corporate';

interface NavbarProps {
  currentUser: User | null;
  authLoading: boolean;
  inquiryCount: number;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenModal: (title: string, subtitle: string, type: ModalType) => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Navbar({
  currentUser,
  authLoading,
  inquiryCount,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenModal,
  onSignIn,
  onSignOut,
}: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-20 px-4 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center backdrop-blur-md bg-black/25 border-b border-white/10">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          className="text-[20px] sm:text-[25px] tracking-tight text-white font-heading font-normal not-italic cursor-pointer leading-none"
          style={{ fontFamily: 'var(--font-heading)', fontStyle: 'normal' }}
        >
          SIDDHESH
        </a>
        <span
          className="text-[24px] sm:text-[28px] text-white select-none leading-none opacity-85"
          style={{ letterSpacing: '-0.02em' }}
          aria-hidden="true"
        >
          &#10035;&#xFE0E;
        </span>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center text-[17px] xl:text-[19px] text-white tracking-tight gap-1">
        <button
          type="button"
          onClick={() =>
            onOpenModal(
              'Capital & Financial Structure',
              'Authorized and paid-up capital, revenue range, and equity structure.',
              'capital',
            )
          }
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none px-2 py-1 text-white"
        >
          Capital
        </button>
        <span className="select-none text-white/30">·</span>
        <button
          type="button"
          onClick={() =>
            onOpenModal(
              'Board of Directors & Governance',
              'Key managerial personnel, executive directors, and statutory signatories.',
              'management',
            )
          }
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none px-2 py-1 text-white"
        >
          Leadership
        </button>
        <span className="select-none text-white/30">·</span>
        <button
          type="button"
          onClick={() =>
            onOpenModal(
              'Commercial Credit Facility Estimator',
              'Institutional loan and commercial credit sizing under NIC Code 6592.',
              'calculator',
            )
          }
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none px-2 py-1 text-white"
        >
          Credit Estimator
        </button>
        <span className="select-none text-white/30">·</span>
        <button
          type="button"
          onClick={() =>
            onOpenModal(
              'Google Search Grounding',
              'Live web intelligence and market regulatory data grounded with Google Search.',
              'searchGrounding',
            )
          }
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none px-2 py-1 text-white flex items-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5 text-blue-400" />
          <span>Search Data</span>
        </button>
        <span className="select-none text-white/30">·</span>
        <button
          type="button"
          onClick={() =>
            onOpenModal(
              'Google Maps Grounding',
              'Real-time geographic verification, transit, and business district intelligence.',
              'mapsGrounding',
            )
          }
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none px-2 py-1 text-white flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Maps Data</span>
        </button>
      </nav>

      {/* Zone 3: Auth & Portal Button */}
      <div className="flex items-center gap-3">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onOpenModal(
                  'Client Portal & Database',
                  'Your saved facility inquiries, active simulations, and corporate bookmarks.',
                  'userPortal',
                )
              }
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white transition-all cursor-pointer"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-[10px]">
                  {currentUser.displayName?.[0] || 'U'}
                </div>
              )}
              <span className="hidden sm:inline font-medium">
                {currentUser.displayName?.split(' ')[0] || 'My Portal'}
              </span>
              {inquiryCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  {inquiryCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onSignOut}
              title="Sign out"
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onSignIn}
            disabled={authLoading}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors cursor-pointer"
          >
            {/* Google G icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>{authLoading ? 'Signing in...' : 'Sign in'}</span>
          </button>
        )}

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none cursor-pointer z-30"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>
    </header>
  );
}
