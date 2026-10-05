import { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Users,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../constants/companyDetails';
import type { DirectorCategory } from '../types/corporate';

interface CapitalGovernanceSectionProps {
  onCopyText: (text: string, label: string) => void;
  copiedItem: string | null;
}

export function CapitalGovernanceSection({
  onCopyText,
  copiedItem,
}: CapitalGovernanceSectionProps) {
  const [activeTab, setActiveTab] = useState<'capital' | 'board' | 'mca'>('capital');
  const [directorFilter, setDirectorFilter] = useState<'all' | DirectorCategory>('all');

  const { identity, capital, management, operations } = COMPANY_DETAILS;

  const filteredManagement = management.filter((member) => {
    if (directorFilter === 'all') return true;
    return member.category === directorFilter;
  });

  return (
    <section id="capital" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-3">
          <Landmark className="w-3.5 h-3.5" />
          <span>Statutory &amp; Institutional Solvency</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Capital Structure &amp; Governance
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Backed by a ₹74.85 Crore paid-up equity base, 30-year operating heritage, and an experienced 8-member
          governing board registered with the Ministry of Corporate Affairs (RoC-Mumbai).
        </p>

        {/* Tab switchers */}
        <div className="inline-flex p-1 rounded-xl bg-neutral-900 border border-white/10 mt-6">
          <button
            type="button"
            onClick={() => setActiveTab('capital')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'capital'
                ? 'bg-emerald-500 text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Capital &amp; Solvency
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('board')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'board'
                ? 'bg-emerald-500 text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Board of Directors (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mca')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'mca'
                ? 'bg-emerald-500 text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            MCA &amp; Statutory Registry
          </button>
        </div>
      </div>

      {/* Tab 1: Capital Structure */}
      {activeTab === 'capital' && (
        <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
          {/* Main Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-neutral-900/80 border border-white/10 hover:border-white/20 hover:-translate-y-1 rounded-2xl p-6 relative overflow-hidden transition-all duration-300">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-mono">
                Authorized Share Capital
              </span>
              <p className="text-3xl font-bold text-white font-mono mt-2">
                {capital.authorizedCapitalWords}
              </p>
              <p className="text-xs text-neutral-500 font-mono mt-1">{capital.authorizedCapital}</p>
              <span className="text-[11px] text-neutral-400 mt-3 block">
                Total equity registered with RoC-Mumbai
              </span>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950/40 border border-emerald-500/40 hover:border-emerald-500/60 hover:-translate-y-1 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 shadow-lg shadow-emerald-950/20">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 block font-mono">
                Paid-Up Equity Capital
              </span>
              <p className="text-3xl font-bold text-emerald-400 font-mono mt-2">
                {capital.paidUpCapitalWords}
              </p>
              <p className="text-xs text-emerald-300/70 font-mono mt-1">{capital.paidUpCapital}</p>
              <span className="text-[11px] text-emerald-400/80 mt-3 block font-semibold">
                93.56% Paid-up Ratio &bull; High Solvency Buffer
              </span>
            </div>

            <div className="bg-neutral-900/80 border border-white/10 hover:border-white/20 hover:-translate-y-1 rounded-2xl p-6 relative overflow-hidden transition-all duration-300">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-mono">
                Operating Revenue Bracket
              </span>
              <p className="text-2xl font-bold text-white font-mono mt-2">
                {capital.operatingRevenue}
              </p>
              <p className="text-xs text-neutral-500 mt-1">{capital.fiscalYear}</p>
              <span className="text-[11px] text-neutral-400 mt-3 block">
                Audited commercial credit balance sheet
              </span>
            </div>
          </div>

          {/* Capitalization Progress Bar */}
          <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-white font-medium">
                  Paid-up Equity: <strong>₹74.85 Cr ({capital.paidUpPercentage}%)</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span>Unissued Equity: ₹5.15 Cr (6.44%)</span>
              </div>
            </div>

            <div className="w-full h-3.5 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                style={{ width: `${capital.paidUpPercentage}%` }}
              />
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              With an exceptional paid-up equity capitalization ratio of <strong>93.56%</strong> against an
              authorized ceiling of ₹80 Crore, Siddhesh Capital maintains a significant proprietary capital
              cushion to absorb credit cycle volatility and ensure uninterrupted commercial credit disbursals.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Board of Directors */}
      {activeTab === 'board' && (
        <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'all', label: 'All Leadership (8)' },
              { id: 'executive', label: 'Executive Directors (2)' },
              { id: 'board', label: 'Board Directors (3)' },
              { id: 'additional', label: 'Additional Directors (2)' },
              { id: 'secretary', label: 'Company Secretary (1)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDirectorFilter(f.id as any)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  directorFilter === f.id
                    ? 'bg-emerald-500 text-black font-semibold border-emerald-400'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Directors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredManagement.map((member, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/80 border border-white/10 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {member.tenure}
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">
                      {member.category}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white">{member.name}</h4>
                  <p className="text-xs text-emerald-300/80 font-medium mt-0.5">
                    {member.designation}
                  </p>

                  <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span>Siddhesh Capital</span>
                  <span>RoC-Mumbai</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: MCA Registry & Disclosures */}
      {activeTab === 'mca' && (
        <div className="max-w-4xl mx-auto bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono">
                Ministry of Corporate Affairs (MCA) Record
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{identity.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active &bull; Compliant
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                Corporate Identification Number (CIN)
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-white text-sm font-semibold">{identity.cin}</span>
                <button
                  type="button"
                  onClick={() => onCopyText(identity.cin, 'CIN')}
                  className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
                  title="Copy CIN"
                >
                  {copiedItem === 'CIN copied' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                Registrar of Companies (RoC)
              </span>
              <p className="font-mono text-white text-sm font-semibold">
                {identity.rocCode} (Reg No: {identity.registrationNumber})
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                Date of Incorporation
              </span>
              <p className="text-white text-sm font-semibold">{identity.dateOfIncorporation}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                Company Category &amp; Class
              </span>
              <p className="text-white text-sm font-semibold">
                {identity.category} &bull; {identity.classOfCompany}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                Principal Activity / NIC 2008
              </span>
              <p className="text-white text-sm font-semibold">
                NIC {operations.nicCode} — {operations.principalActivity}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">
                Last Annual General Meeting (AGM)
              </span>
              <p className="text-white text-sm font-semibold">{operations.lastAgmDate}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
