import {
  Calculator,
  Briefcase,
  Landmark,
  Search,
  Compass,
  Phone,
  Mail,
  User as UserIcon,
  X,
} from 'lucide-react';
import type { ModalType } from '../types/corporate';

interface MobileDrawerProps {
  isOpen: boolean;
  phone: string;
  onClose: () => void;
  onOpenModal: (title: string, subtitle: string, type: ModalType) => void;
}

export function MobileDrawer({ isOpen, phone, onClose, onOpenModal }: MobileDrawerProps) {
  const handleNavClick = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/95 backdrop-blur-2xl flex flex-col justify-between px-6 py-8 transition-all duration-300 z-50 lg:hidden overflow-y-auto ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span>SIDDHESH CAPITAL</span>
              <span className="text-amber-400">&#10035;&#xFE0E;</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
              CIN: U65923MH1995PTC088811 &bull; RoC-Mumbai
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-3 text-base font-medium text-white">
          <button
            type="button"
            onClick={() => handleNavClick('calculator')}
            className="text-left py-2.5 px-3 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-between hover:bg-emerald-500/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Calculator className="w-4 h-4" />
              <span>Loan &amp; EMI Calculator</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
              Interactive
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('facilities')}
            className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-neutral-400" />
              <span>Credit Facilities</span>
            </div>
            <span className="text-xs font-mono text-neutral-400">NIC 6592</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('capital')}
            className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Landmark className="w-4 h-4 text-neutral-400" />
              <span>Capital &amp; Board</span>
            </div>
            <span className="text-xs font-mono text-neutral-400">₹74.85 Cr</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('market-intelligence')}
            className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-blue-400" />
              <span>Live Market Search</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
              Search Grounded
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('location')}
            className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Nariman Point HQ</span>
            </div>
            <span className="text-xs font-mono text-neutral-400">Mumbai 400021</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="text-left py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>Contact Credit Desk</span>
            </div>
            <span className="text-xs text-neutral-400">Direct Form</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenModal(
                'Client & Account Portal',
                'Your saved facility inquiries, active simulations, and corporate bookmarks.',
                'userPortal',
              );
            }}
            className="text-left py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer flex items-center gap-2.5 mt-2"
          >
            <UserIcon className="w-4 h-4 text-emerald-400" />
            <span>My Account &amp; Saved Inquiries</span>
          </button>
        </nav>
      </div>

      {/* Bottom Direct Call */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 text-black font-semibold text-sm flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <span>Call Mumbai Desk: {phone}</span>
        </a>
        <p className="text-[11px] text-neutral-400 text-center font-mono">
          Official Email: reshma@sekhsaria.com
        </p>
      </div>
    </div>
  );
}
