import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { CapitalStructure } from '../../types/corporate';

interface CapitalModalProps {
  capital: CapitalStructure;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function CapitalModal({ capital, isBookmarked, onToggleBookmark }: CapitalModalProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[11px] uppercase tracking-wider text-neutral-400">
            Authorized Share Capital
          </span>
          <p className="text-2xl font-semibold text-white mt-1 tabular-nums font-mono">
            {capital.authorizedCapitalWords}
          </p>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">{capital.authorizedCapital}</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[11px] uppercase tracking-wider text-neutral-400">
            Paid-Up Equity Capital
          </span>
          <p className="text-2xl font-semibold text-emerald-400 mt-1 tabular-nums font-mono">
            {capital.paidUpCapitalWords}
          </p>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">{capital.paidUpCapital}</p>
        </div>
      </div>

      {/* Capitalization Bar */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
        <div className="flex justify-between text-xs text-neutral-300">
          <span>
            Paid-up Equity Ratio: <strong>{capital.paidUpPercentage}%</strong>
          </span>
          <span className="text-neutral-400">Unissued: ₹5.15 Cr (6.44%)</span>
        </div>
        <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${capital.paidUpPercentage}%` }}
          />
        </div>
        <p className="text-[11px] text-neutral-400">
          High paid-up equity capitalization provides substantial solvency cushion for non-banking
          commercial lending operations.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-neutral-400">
            Operating Revenue Bracket
          </span>
          <p className="text-xl font-medium text-white mt-1">{capital.operatingRevenue}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{capital.fiscalYear}</p>
        </div>
        <button
          type="button"
          onClick={onToggleBookmark}
          className="p-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          title="Bookmark to your Firestore database"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-emerald-400" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
