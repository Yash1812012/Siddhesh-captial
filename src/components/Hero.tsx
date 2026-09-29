import { Calculator, Search, Compass, Copy } from 'lucide-react';
import type { ModalType } from '../types/corporate';

interface HeroProps {
  headlineText: string;
  buttonsVisible: boolean;
  copiedPhone: boolean;
  phone: string;
  onOpenModal: (title: string, subtitle: string, type: ModalType) => void;
  onCopyPhone: () => void;
}

export function Hero({
  headlineText,
  buttonsVisible,
  copiedPhone,
  phone,
  onOpenModal,
  onCopyPhone,
}: HeroProps) {
  return (
    <main className="relative z-1 h-screen flex flex-col justify-end pb-16 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-2xl relative z-10">
        {/* Metadata quiet row */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mb-3 tracking-wide">
          <span>Siddhesh Capital Market Services Pvt. Ltd.</span>
          <span aria-hidden="true">·</span>
          <span>RoC-Mumbai</span>
          <span aria-hidden="true">·</span>
          <span>Est. 1995</span>
        </div>

        {/* Staggered letter reveal headline */}
        <p
          className="text-white mb-6 font-normal min-h-[54px]"
          style={{
            fontSize: 'clamp(18px, 3.8vw, 25px)',
            lineHeight: 1.38,
          }}
        >
          <span className="inline" aria-label={headlineText}>
            {headlineText.split(' ').map((word, wordIdx, wordsArr) => {
              const prevChars = wordsArr
                .slice(0, wordIdx)
                .reduce((sum, w) => sum + w.length + 1, 0);

              return (
                <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.26em]">
                  {word.split('').map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="animate-letter-reveal"
                      style={{
                        animationDelay: `${0.04 + (prevChars + charIdx) * 0.01}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              );
            })}
          </span>
        </p>

        {/* Action pill buttons dock */}
        <div
          className={`flex flex-wrap gap-y-1.5 transition-all duration-400 ease-out ${
            buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'
          }`}
        >
          {/* Pill 1: Paid-up Capital */}
          <button
            type="button"
            onClick={() =>
              onOpenModal(
                'Capital & Financial Structure',
                'Detailed capitalization overview and financial bracket.',
                'capital',
              )
            }
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.32em] mx-[0.2em] mb-[0.35em] whitespace-nowrap hover:bg-neutral-200 transition-colors duration-200 cursor-pointer font-medium"
          >
            ₹74.85 Cr Paid-up Capital
          </button>

          {/* Pill 2: Board & Leadership */}
          <button
            type="button"
            onClick={() =>
              onOpenModal(
                'Board of Directors & Signatories',
                'Executive leadership, directors, and key management personnel.',
                'management',
              )
            }
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.32em] mx-[0.2em] mb-[0.35em] whitespace-nowrap hover:bg-neutral-200 transition-colors duration-200 cursor-pointer font-medium"
          >
            Board of Directors (8)
          </button>

          {/* Pill 3: Credit Calculator */}
          <button
            type="button"
            onClick={() =>
              onOpenModal(
                'Commercial Credit Facility Estimator',
                'Simulate institutional credit lines, term debt, and debt servicing under NIC 6592.',
                'calculator',
              )
            }
            className="inline-flex items-center gap-1.5 justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.32em] mx-[0.2em] mb-[0.35em] whitespace-nowrap hover:bg-neutral-200 transition-colors duration-200 cursor-pointer font-medium"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Credit Facility Sizer</span>
          </button>

          {/* Pill 4: Search Grounding (Live Data) */}
          <button
            type="button"
            onClick={() =>
              onOpenModal(
                'Google Search Grounding',
                'Live web intelligence and market regulatory data grounded with Google Search.',
                'searchGrounding',
              )
            }
            className="inline-flex items-center gap-1.5 justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.32em] mx-[0.2em] mb-[0.35em] whitespace-nowrap hover:bg-neutral-200 transition-colors duration-200 cursor-pointer font-medium"
          >
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Search Grounding</span>
          </button>

          {/* Pill 5: Maps Grounding (Nariman Point) */}
          <button
            type="button"
            onClick={() =>
              onOpenModal(
                'Google Maps Grounding',
                'Real-time geographic verification, transit, and business district intelligence.',
                'mapsGrounding',
              )
            }
            className="inline-flex items-center gap-1.5 justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.32em] mx-[0.2em] mb-[0.35em] whitespace-nowrap hover:bg-neutral-200 transition-colors duration-200 cursor-pointer font-medium"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Maps Grounding</span>
          </button>

          {/* Pill 6: Reach us phone copy */}
          <button
            type="button"
            onClick={onCopyPhone}
            title="Click to copy phone number"
            className="inline-flex items-center justify-center text-white bg-transparent border border-white/80 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.32em] mx-[0.2em] mb-[0.35em] whitespace-nowrap gap-2 sm:gap-2.5 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer group"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1 font-mono">
                {copiedPhone ? 'Copied to clipboard!' : phone}
              </span>
            </span>
            <Copy className="w-3 h-3 shrink-0 opacity-70 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </main>
  );
}
