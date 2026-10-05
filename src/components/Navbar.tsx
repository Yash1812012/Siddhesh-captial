import { Search, Compass, LogOut, Phone, Calculator, Users, Landmark, Mail } from 'lucide-react';
import type { User } from 'firebase/auth';
import type { ModalType } from '../types/corporate';

interface NavbarProps {
  currentUser: User | null;
  authLoading: boolean;
  inquiryCount: number;
  mobileMenuOpen: boolean;
  phone: string;
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
  phone,
  onToggleMobileMenu,
  onOpenModal,
  onSignIn,
  onSignOut,
}: NavbarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-30 px-4 sm:px-8 py-3.5 flex justify-between items-center backdrop-blur-xl bg-black/75 border-b border-white/10 transition-all">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            SIDDHESH CAPITAL
          </span>
          <span className="text-amber-400 text-xl leading-none select-none">&#10035;&#xFE0E;</span>
          <span className="hidden md:inline-block text-[10px] text-neutral-400 font-mono pl-1 border-l border-white/20">
            Est. 1995 &bull; Nariman Point
          </span>
        </a>
      </div>

      {/* Nav Links */}
      <nav className="hidden lg:flex items-center text-xs sm:text-sm text-neutral-300 font-medium tracking-tight gap-1">
        <button
          type="button"
          onClick={() => scrollTo('calculator')}
          className="text-emerald-400 hover:text-emerald-300 hover:bg-white/5 transition-all px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Calculator</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo('facilities')}
          className="hover:text-white hover:bg-white/5 transition-all px-3 py-1.5 rounded-lg cursor-pointer"
        >
          Facilities
        </button>

        <button
          type="button"
          onClick={() => scrollTo('capital')}
          className="hover:text-white hover:bg-white/5 transition-all px-3 py-1.5 rounded-lg cursor-pointer"
        >
          Capital &amp; Board
        </button>

        <button
          type="button"
          onClick={() => scrollTo('market-intelligence')}
          className="hover:text-white hover:bg-white/5 transition-all px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1"
        >
          <Search className="w-3.5 h-3.5 text-blue-400" />
          <span>Market Search</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo('location')}
          className="hover:text-white hover:bg-white/5 transition-all px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Nariman Pt. HQ</span>
        </button>

        <button
          type="button"
          onClick={() => scrollTo('contact')}
          className="hover:text-white hover:bg-white/5 transition-all px-3 py-1.5 rounded-lg cursor-pointer"
        >
          Contact Desk
        </button>
      </nav>

      {/* User Auth & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Direct Call Quick Link */}
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors font-mono"
        >
          <Phone className="w-3 h-3 text-emerald-400" />
          <span>{phone}</span>
        </a>

        {currentUser ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onOpenModal(
                  'My Account',
                  'Your saved loan calculations, inquiries, and bookmarks.',
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
                {currentUser.displayName?.split(' ')[0] || 'My Account'}
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
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-colors cursor-pointer shadow-md"
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
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none cursor-pointer z-40"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-5 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>
    </header>
  );
}
