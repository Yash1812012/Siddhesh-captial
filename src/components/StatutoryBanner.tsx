import { ShieldCheck, Phone, MapPin, Building, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface StatutoryBannerProps {
  cin: string;
  phone: string;
  onCopyCin: () => void;
  onCopyPhone: () => void;
}

export function StatutoryBanner({ cin, phone, onCopyCin, onCopyPhone }: StatutoryBannerProps) {
  const [cinCopied, setCinCopied] = useState(false);

  const handleCinCopy = () => {
    onCopyCin();
    setCinCopied(true);
    setTimeout(() => setCinCopied(false), 2000);
  };

  return (
    <aside aria-label="Statutory compliance and registration notices" className="bg-neutral-950 text-neutral-300 border-b border-white/10 text-[11px] sm:text-xs py-2 px-4 sm:px-8 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left: Ministry of Corporate Affairs status */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MCA Registered &bull; RoC-Mumbai (Active)</span>
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <button
            type="button"
            onClick={handleCinCopy}
            className="hover:text-white transition-colors font-mono inline-flex items-center gap-1 cursor-pointer"
            title="Click to copy Corporate Identification Number"
          >
            <span>CIN: {cin}</span>
            {cinCopied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 opacity-60" />
            )}
          </button>
        </div>

        {/* Right: Nariman Point and Direct Desk */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-neutral-400">
          <span className="inline-flex items-center gap-1">
            <Building className="w-3 h-3 text-amber-400/80" />
            <span>122, Maker Chambers III, Nariman Point, Mumbai</span>
          </span>
          <span className="text-white/20 hidden md:inline">|</span>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1 text-white hover:text-emerald-400 font-mono transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>Direct Desk: {phone}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
