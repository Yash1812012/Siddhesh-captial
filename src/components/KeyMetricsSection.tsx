import { TrendingUp, Landmark, ShieldCheck, Calendar, Briefcase, Award } from 'lucide-react';
import type { CompanyDetails } from '../types/corporate';

interface KeyMetricsSectionProps {
  company: CompanyDetails;
  onOpenModal: (title: string, subtitle: string, type: any) => void;
}

export function KeyMetricsSection({ company, onOpenModal }: KeyMetricsSectionProps) {
  return (
    <section className="relative z-10 py-12 px-4 sm:px-8 border-y border-white/10 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ministry of Corporate Affairs &bull; Statutory Standing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Institutional Capital &amp; Solvency Profile
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Backed by substantial paid-up equity and over three decades of unbroken regulatory compliance
              under Registrar of Companies (RoC-Mumbai), serving corporate borrowers across India.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                onOpenModal(
                  'Capital & Financial Structure',
                  'Detailed capitalization overview and financial bracket.',
                  'capital',
                )
              }
              className="text-xs px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white/10 text-neutral-200 transition-colors cursor-pointer"
            >
              View Capital Breakdown &rarr;
            </button>
          </div>
        </div>

        {/* 6 Key Statutory Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Metric 1: Paid-up Capital */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider">Paid-up Capital</span>
              <Landmark className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">₹74.85 Cr</p>
            <p className="text-[11px] text-neutral-400 mt-1">
              93.56% of Auth Capital
            </p>
          </div>

          {/* Metric 2: Authorized Capital */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider">Authorized Capital</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-white font-mono">₹80.00 Cr</p>
            <p className="text-[11px] text-neutral-400 mt-1">₹80,00,00,000 Equity Base</p>
          </div>

          {/* Metric 3: Operating Revenue */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider">Annual Revenue</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-white">₹100 – 500 Cr</p>
            <p className="text-[11px] text-neutral-400 mt-1">FY Ending Mar 31, 2026</p>
          </div>

          {/* Metric 4: Operational Legacy */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider">Incorporated</span>
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-white">26 May 1995</p>
            <p className="text-[11px] text-neutral-400 mt-1">30+ Years Standing</p>
          </div>

          {/* Metric 5: NIC Code */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider">Activity Code</span>
              <Briefcase className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-white font-mono">NIC 6592</p>
            <p className="text-[11px] text-neutral-400 mt-1">Credit &amp; Commercial Loans</p>
          </div>

          {/* Metric 6: RoC Status */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider">RoC Jurisdiction</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-white">RoC-Mumbai</p>
            <p className="text-[11px] text-emerald-400 mt-1 font-medium">&bull; Active &amp; Compliant</p>
          </div>
        </div>
      </div>
    </section>
  );
}
