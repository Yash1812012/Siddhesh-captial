import { Calculator, ArrowRight, Phone, Copy, Check, ShieldCheck, Landmark } from 'lucide-react';
import type { ModalType } from '../types/corporate';

interface HeroProps {
  headlineText?: string;
  buttonsVisible?: boolean;
  copiedPhone: boolean;
  phone: string;
  onOpenModal: (title: string, subtitle: string, type: ModalType) => void;
  onCopyPhone: () => void;
}

export function Hero({
  copiedPhone,
  phone,
  onOpenModal,
  onCopyPhone,
}: HeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center min-h-[85vh]">
      {/* Short Capital Tag - Crisp, clean, with subtle shimmer */}
      <div
        className="animate-fade-in-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-medium w-fit mb-6 shadow-sm shimmer-badge"
        style={{ animationDelay: '0ms' }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono">₹74.85 Cr Paid-Up Capital</span>
        <span className="text-white/30">&bull;</span>
        <span>Mumbai</span>
        <span className="text-white/30">&bull;</span>
        <span>Est. 1995</span>
      </div>

      {/* Main Bold Headline with Staggered Entrance */}
      <h1
        className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.12]"
        style={{ animationDelay: '120ms' }}
      >
        Commercial Credit &amp; Capital Solutions
      </h1>

      {/* Short, Punchy Intro for USERS (not dry client jargon) */}
      <p
        className="animate-fade-in-up text-neutral-300 text-base sm:text-lg max-w-2xl mt-5 leading-relaxed"
        style={{ animationDelay: '220ms' }}
      >
        Structured debt, working capital lines, and flexible growth capital for Indian businesses.
        Calculate your facility EMI, explore borrowing options, and connect directly with our Mumbai credit desk.
      </p>

      {/* Direct User Actions with Smooth Lift Animations */}
      <div
        className="animate-fade-in-up flex flex-wrap items-center gap-3 sm:gap-4 mt-8"
        style={{ animationDelay: '320ms' }}
      >
        {/* Primary CTA: Calculate Loan EMI */}
        <button
          type="button"
          onClick={() => scrollTo('calculator')}
          className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
        >
          <Calculator className="w-4 h-4" />
          <span>Calculate Loan EMI</span>
        </button>

        {/* Secondary CTA: Explore Credit Facilities */}
        <button
          type="button"
          onClick={() => scrollTo('facilities')}
          className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/15 transition-all duration-200 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Explore Facilities</span>
          <ArrowRight className="w-4 h-4 text-neutral-400" />
        </button>

        {/* Call Nariman Point Button */}
        <button
          type="button"
          onClick={onCopyPhone}
          title="Click to copy phone number or dial"
          className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all duration-200 flex items-center gap-2 cursor-pointer group hover:-translate-y-0.5 active:translate-y-0"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span className="font-mono">
            {copiedPhone ? 'Copied: ' + phone : 'Desk: ' + phone}
          </span>
          <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* 4 Clean High-Trust Institutional Metrics with Staggered Entrance and Hover Elevation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10">
        <div
          className="animate-fade-in-up p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 shadow-sm"
          style={{ animationDelay: '420ms' }}
        >
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block">
            Paid-Up Equity
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">₹74.85 Cr</p>
          <span className="text-xs text-emerald-400 font-medium mt-0.5 block">
            93.56% of ₹80 Cr Auth
          </span>
        </div>

        <div
          className="animate-fade-in-up p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 shadow-sm"
          style={{ animationDelay: '500ms' }}
        >
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block">
            Track Record
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">30+ Years</p>
          <span className="text-xs text-neutral-400 mt-0.5 block">
            Incorporated 26 May 1995
          </span>
        </div>

        <div
          className="animate-fade-in-up p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 shadow-sm"
          style={{ animationDelay: '580ms' }}
        >
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block">
            MCA Registry
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono mt-1">Active</p>
          <span className="text-xs text-neutral-400 font-mono mt-0.5 block truncate">
            CIN: U65923MH1995PTC088811
          </span>
        </div>

        <div
          className="animate-fade-in-up p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 shadow-sm"
          style={{ animationDelay: '660ms' }}
        >
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block">
            Headquarters
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1">Nariman Pt.</p>
          <span className="text-xs text-neutral-400 mt-0.5 block">
            Maker Chambers III, Mumbai
          </span>
        </div>
      </div>
    </section>
  );
}
