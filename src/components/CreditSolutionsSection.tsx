import { Building2, Layers, Coins, Repeat, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface CreditSolutionsSectionProps {
  onSelectSolution: (solutionName: string, defaultAmount: number) => void;
}

export const SOLUTIONS = [
  {
    id: 'structured-debt',
    title: 'Structured Commercial Debt',
    ticket: '₹10 Cr – ₹50 Cr',
    tenor: '24 to 60 Months',
    icon: Layers,
    tag: 'Flagship Facility',
    description:
      'Bespoke senior and mezzanine credit solutions structured to align with corporate cash flows, capex expansion timelines, and infrastructure deployment with moratorium options.',
    highlights: [
      'Flexible quarterly or balloon principal servicing',
      'Tailored covenant structures for mid-market corporates',
      'Security: Fixed assets, plant & machinery, or corporate guarantee',
      'Turnaround: 10 to 14 business days post-due diligence',
    ],
    defaultAmount: 25,
  },
  {
    id: 'lap',
    title: 'Commercial Loan Against Property (LAP)',
    ticket: '₹5 Cr – ₹40 Cr',
    tenor: '36 to 84 Months',
    icon: Building2,
    tag: 'Collateral-Backed',
    description:
      'High-LTV credit lines unlocking trapped liquidity from commercial office towers, industrial factories, and prime Mumbai MMR real estate at highly competitive coupon rates.',
    highlights: [
      'Up to 65% LTV on prime verified commercial titles',
      'Longer repayment horizons up to 7 years',
      'Option to convert into revolving overdraft facility',
      'In-house legal title and technical valuation desk',
    ],
    defaultAmount: 15,
  },
  {
    id: 'working-capital',
    title: 'Working Capital Demand Facilities',
    ticket: '₹5 Cr – ₹30 Cr',
    tenor: '12 to 36 Months',
    icon: Coins,
    tag: 'Liquidity Lines',
    description:
      'Uninterrupted operational liquidity to manage debtor turnaround, supply chain vendor discounting, GST liability matching, and high-volume raw material procurement.',
    highlights: [
      'Revolving credit facilities with monthly interest servicing',
      'Quick drawdowns against verified purchase orders & receivables',
      'Minimal commitment charges on unutilized lines',
      'Annual renewal based on audited turnover performance',
    ],
    defaultAmount: 10,
  },
  {
    id: 'promoter-funding',
    title: 'Promoter Financing & Bridge Equity',
    ticket: '₹10 Cr – ₹50 Cr',
    tenor: '12 to 36 Months',
    icon: Repeat,
    tag: 'Strategic Capital',
    description:
      'Confidential capital for business promoters, directors, and majority shareholders to fund stake consolidation, open offer requirements, or pre-IPO equity bridge.',
    highlights: [
      'Structured against listed / unlisted equities or promoter guarantees',
      'Customized margin-call and top-up mechanisms',
      'Strict confidentiality and non-disruptive voting rights',
      'Fast-track committee approval for time-critical buyouts',
    ],
    defaultAmount: 20,
  },
  {
    id: 'icds',
    title: 'Inter-Corporate Deposits (ICDs)',
    ticket: '₹5 Cr – ₹25 Cr',
    tenor: '3 to 12 Months',
    icon: CheckCircle2,
    tag: 'Section 186 Compliant',
    description:
      'Statutory-compliant short-to-medium term liquidity placements between eligible corporate entities strictly governed under the provisions of Companies Act, 2013.',
    highlights: [
      'Available only to creditworthy entities with proven balance sheets',
      'Fixed coupon servicing with prompt maturity return',
      'Board resolution & statutory disclosure templates provided',
      'Zero equity dilution with pristine credit legal documentation',
    ],
    defaultAmount: 10,
  },
  {
    id: 'bridge-funding',
    title: 'Special Situations & Bridge Capital',
    ticket: '₹15 Cr – ₹50 Cr',
    tenor: '6 to 24 Months',
    icon: ShieldAlert,
    tag: 'Rapid Execution',
    description:
      'Swift, decisive intervention financing for acquisitions, resolving banking transition bottlenecks, debt consolidation, or closing high-value time-sensitive opportunities.',
    highlights: [
      'Disbursal in as few as 7 business days for clean titles',
      'Structured exit mechanisms via institutional take-out or equity',
      'Senior lien on underlying enterprise cash flows',
      'Direct partner-level engagement and underwriting',
    ],
    defaultAmount: 30,
  },
];

export function CreditSolutionsSection({ onSelectSolution }: CreditSolutionsSectionProps) {
  return (
    <section id="solutions" className="relative z-10 py-16 px-4 sm:px-8 bg-black/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-neutral-300 mb-3">
            <span>NIC Code 6592 &bull; Commercial Lending Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Institutional Credit Facilities Built for Indian Enterprises
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            From our headquarters at Nariman Point, Mumbai, Siddhesh Capital structures bespoke commercial
            loans, working capital liquidity, and asset-backed credit designed around the regulatory
            framework of Indian corporate finance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 mb-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-500 block">Facility Ticket</span>
                      <span className="font-mono text-white font-semibold">{item.ticket}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-neutral-500 block">Tenor Window</span>
                      <span className="font-mono text-emerald-400 font-semibold">{item.tenor}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-6">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectSolution(item.title, item.defaultAmount)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Simulate &amp; Apply for Facility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
