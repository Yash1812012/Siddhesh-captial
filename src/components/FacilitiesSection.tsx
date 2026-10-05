import {
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building,
  Coins,
  CheckCircle2,
} from 'lucide-react';

interface FacilitiesSectionProps {
  onSelectFacilityForCalc: (facilityName: string, defaultAmount: number) => void;
}

const FACILITIES_DATA = [
  {
    id: 'wc',
    title: 'Working Capital & Cash Credit Lines',
    tag: 'Operational Liquidity',
    ticket: '₹1 Cr – ₹25 Cr',
    tenor: '12 – 36 Months (Renewable)',
    security: 'Current Assets / Book Debts / Corporate Guarantee',
    description:
      'Seamless revolving lines designed to finance inventory holding cycles, vendor payouts, and day-to-day trade obligations without straining core equity.',
    features: [
      'Sub-limits for Letter of Credit (LC) & Bank Guarantees (BG)',
      'Interest charged exclusively on utilized facility balance',
      'Flexible drawing power tied to monthly stock audits',
    ],
    defaultAmount: 5,
  },
  {
    id: 'debt',
    title: 'Structured Commercial Debt',
    tag: 'Growth Capital',
    ticket: '₹5 Cr – ₹50 Cr',
    tenor: '24 – 60 Months',
    security: 'Fixed Charge on Assets / Cash Flow Escrow',
    description:
      'Custom-tailored medium to long-term amortized debt structures for mid-market corporate expansion, acquisitions, and strategic capacity scaling.',
    features: [
      'Bespoke amortisation schedules tailored to business cash cycles',
      'Optional moratorium periods for greenfield / brownfield ramp-ups',
      'Transparent single-window underwriting from Nariman Point desk',
    ],
    defaultAmount: 15,
  },
  {
    id: 'term',
    title: 'Asset & Capex Term Loans',
    tag: 'Infrastructure & Machinery',
    ticket: '₹2 Cr – ₹35 Cr',
    tenor: '36 – 84 Months',
    security: 'Hypothecation of Plant, Machinery or Commercial Property',
    description:
      'Long-term capital expenditure financing for modernizing machinery, manufacturing plant expansion, logistics fleet, and industrial workspaces.',
    features: [
      'Competitive floating or fixed interest rate structures',
      'High loan-to-value (LTV) on verified commercial equipment',
      'Structured repayment mapped to project milestone revenues',
    ],
    defaultAmount: 10,
  },
  {
    id: 'bridge',
    title: 'Promoter & Securities Liquidity',
    tag: 'Fast Turnaround',
    ticket: '₹1 Cr – ₹20 Cr',
    tenor: '6 – 24 Months',
    security: 'Listed / Unlisted Securities, Financial Instruments',
    description:
      'Rapid-turnaround liquidity credit against promoter shareholdings, mutual fund holdings, and institutional paper to bridge immediate financing gaps.',
    features: [
      'Disbursal within 3 to 5 business days upon custody lien',
      'Zero prepay penalties on structured bullet repayment',
      'Daily mark-to-market monitoring with clear margin buffers',
    ],
    defaultAmount: 8,
  },
];

export function FacilitiesSection({ onSelectFacilityForCalc }: FacilitiesSectionProps) {
  return (
    <section id="facilities" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Credit Intermediation &bull; NIC 6592</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Commercial Credit Facilities
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Flexible, transparent debt solutions structured for Indian enterprises, manufacturers, contractors,
          and growing businesses.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {FACILITIES_DATA.map((facility) => (
          <div
            key={facility.id}
            className="group bg-neutral-900/60 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-emerald-950/30 hover:-translate-y-1.5"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {facility.tag}
                </span>
                <span className="text-xs text-neutral-400 font-mono">NIC 6592</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {facility.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 leading-relaxed">
                {facility.description}
              </p>

              {/* Parameters list */}
              <div className="grid grid-cols-2 gap-3 my-5 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[11px]">Ticket Size</span>
                  <span className="text-white font-semibold font-mono">{facility.ticket}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Typical Tenor</span>
                  <span className="text-white font-semibold font-mono">{facility.tenor}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-white/5">
                  <span className="text-neutral-500 block text-[11px]">Security / Collateral</span>
                  <span className="text-neutral-300">{facility.security}</span>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2 mb-6">
                {facility.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() => onSelectFacilityForCalc(facility.title, facility.defaultAmount)}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-black text-white text-xs font-semibold border border-white/10 hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn"
            >
              <span>Model This Facility in Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
