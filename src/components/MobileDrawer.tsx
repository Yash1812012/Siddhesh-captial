import { Search, Compass } from 'lucide-react';
import type { ModalType } from '../types/corporate';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: (title: string, subtitle: string, type: ModalType) => void;
}

export function MobileDrawer({ isOpen, onClose, onOpenModal }: MobileDrawerProps) {
  const handleNavClick = (title: string, subtitle: string, type: ModalType) => {
    onClose();
    onOpenModal(title, subtitle, type);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-start px-8 gap-5 transition-all duration-300 z-20 lg:hidden ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="border-b border-white/10 pb-3 w-full">
        <span className="text-[11px] uppercase tracking-widest text-neutral-400">
          Institutional Portal
        </span>
        <p className="text-sm font-medium text-white">Siddhesh Capital Market Services Pvt. Ltd.</p>
      </div>

      <button
        type="button"
        onClick={() =>
          handleNavClick(
            'Capital & Financial Structure',
            'Authorized and paid-up capital, revenue range, and equity structure.',
            'capital',
          )
        }
        className="text-2xl font-medium text-white hover:opacity-60 text-left bg-transparent border-none p-0 cursor-pointer"
      >
        Capital Structure
      </button>

      <button
        type="button"
        onClick={() =>
          handleNavClick(
            'Board of Directors & Governance',
            'Key managerial personnel, executive directors, and statutory signatories.',
            'management',
          )
        }
        className="text-2xl font-medium text-white hover:opacity-60 text-left bg-transparent border-none p-0 cursor-pointer"
      >
        Board &amp; Leadership
      </button>

      <button
        type="button"
        onClick={() =>
          handleNavClick(
            'Commercial Credit Facility Estimator',
            'Institutional loan and commercial credit sizing under NIC Code 6592.',
            'calculator',
          )
        }
        className="text-2xl font-medium text-white hover:opacity-60 text-left bg-transparent border-none p-0 cursor-pointer"
      >
        Credit Estimator
      </button>

      <button
        type="button"
        onClick={() =>
          handleNavClick(
            'Google Search Grounding',
            'Live web intelligence and market regulatory data grounded with Google Search.',
            'searchGrounding',
          )
        }
        className="text-2xl font-medium text-white hover:opacity-60 text-left bg-transparent border-none p-0 flex items-center gap-2 cursor-pointer"
      >
        <Search className="w-5 h-5 text-blue-400" />
        <span>Search Intelligence</span>
      </button>

      <button
        type="button"
        onClick={() =>
          handleNavClick(
            'Google Maps Grounding',
            'Real-time geographic verification, transit, and business district intelligence.',
            'mapsGrounding',
          )
        }
        className="text-2xl font-medium text-white hover:opacity-60 text-left bg-transparent border-none p-0 flex items-center gap-2 cursor-pointer"
      >
        <Compass className="w-5 h-5 text-emerald-400" />
        <span>Maps Grounding</span>
      </button>

      <button
        type="button"
        onClick={() =>
          handleNavClick(
            'Client Portal & Database',
            'Your saved facility inquiries, active simulations, and corporate bookmarks.',
            'userPortal',
          )
        }
        className="text-2xl font-medium text-white underline underline-offset-4 text-left bg-transparent border-none p-0 cursor-pointer"
      >
        Client Database &amp; Auth
      </button>
    </div>
  );
}
