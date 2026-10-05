import { Landmark, TrendingUp, ShieldCheck, CheckCircle2, Bookmark, BookmarkCheck } from 'lucide-react';
import type { CapitalStructure, CompanyIdentity, OperationsDetails } from '../types/corporate';

interface CapitalStructureSectionProps {
  capital: CapitalStructure;
  identity: CompanyIdentity;
  operations: OperationsDetails;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function CapitalStructureSection({
  capital,
  identity,
  operations,
  isBookmarked,
  onToggleBookmark,
}: CapitalStructureSectionProps) {
  return (
    <section id="capital" className="relative z-10 py-16 px-4 sm:px-8 bg-neutral-900/40 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-neutral-300 mb-2">
              <span>Financial Solidity &bull; Capital Adequacy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Capital &amp; Financial Structure
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              A ₹74.85 Crore paid-up equity foundation provides strong balance sheet solvency,
              robust credit underwriting capacity, and institutional stability.
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleBookmark}
            className="self-start md:self-auto px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors text-xs font-medium flex items-center gap-2 cursor-pointer"
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Capital Profile Saved</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Bookmark Capital Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-2">
            <span className="text-xs uppercase tracking-wider text-neutral-400">Authorized Share Capital</span>
            <p className="text-3xl font-bold text-white font-mono">{capital.authorizedCapitalWords}</p>
            <p className="text-xs text-neutral-400 font-mono">{capital.authorizedCapital} INR</p>
            <p className="text-[11px] text-neutral-500 pt-2 border-t border-white/5">
              Registered with Ministry of Corporate Affairs, RoC-Mumbai
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-emerald-500/30 space-y-2">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
              Paid-Up Equity Capital
            </span>
            <p className="text-3xl font-bold text-emerald-400 font-mono">{capital.paidUpCapitalWords}</p>
            <p className="text-xs text-neutral-400 font-mono">{capital.paidUpCapital} INR</p>
            <p className="text-[11px] text-emerald-400/80 pt-2 border-t border-white/5">
              {capital.paidUpPercentage}% capital deployment ratio
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-2">
            <span className="text-xs uppercase tracking-wider text-neutral-400">Annual Revenue Bracket</span>
            <p className="text-2xl sm:text-3xl font-bold text-white">{capital.operatingRevenue}</p>
            <p className="text-xs text-neutral-400">{capital.fiscalYear}</p>
            <p className="text-[11px] text-neutral-500 pt-2 border-t border-white/5">
              Last Annual General Meeting (AGM): {operations.lastAgmDate}
            </p>
          </div>
        </div>

        {/* Capitalization Progress Bar Card */}
        <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="text-neutral-300 font-medium">
              Paid-Up Equity vs. Authorized Capitalization Ratio
            </span>
            <span className="font-mono text-emerald-400 font-bold text-base">
              {capital.paidUpPercentage}% Paid-Up (₹74.85 Cr of ₹80.00 Cr)
            </span>
          </div>
          <div className="w-full h-4 rounded-full bg-neutral-800 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${capital.paidUpPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-400 pt-1">
            <p>
              &bull; <strong>High Equity Cushion:</strong> The high paid-up capital of ₹74.85 Crore ensures
              substantial loss-absorption buffers and robust solvency for large-ticket commercial loan
              syndications and structured credit facilities.
            </p>
            <p>
              &bull; <strong>Regulatory Standing:</strong> Compliant with MCA and RoC-Mumbai filing guidelines.
              All statutory financial disclosures and audited balances are kept in full legal alignment.
            </p>
          </div>
        </div>

        {/* Corporate Constitution Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5">
            <span className="text-neutral-500 block mb-1">Company Class</span>
            <span className="text-white font-medium">{identity.classOfCompany}</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5">
            <span className="text-neutral-500 block mb-1">Company Category</span>
            <span className="text-white font-medium">{identity.category}</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5">
            <span className="text-neutral-500 block mb-1">Company Sub-Category</span>
            <span className="text-white font-medium">{identity.subCategory}</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5">
            <span className="text-neutral-500 block mb-1">Date of Incorporation</span>
            <span className="text-white font-medium">{identity.dateOfIncorporation}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
