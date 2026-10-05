import { useState, useMemo } from 'react';
import {
  Calculator,
  Check,
  Copy,
  Send,
  Building2,
  TrendingUp,
  Percent,
  Calendar,
  Sparkles,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import type { User } from 'firebase/auth';

interface CalculatorSectionProps {
  currentUser: User | null;
  savingInquiry: boolean;
  inquirySuccessMsg: string | null;
  onSubmitInquiry: (inquiryData: {
    facilityType: string;
    amountCrore: number;
    tenorMonths: number;
    monthlyEmiLakhs: string;
    totalPayableCrore: string;
    notes?: string;
    status: 'Submitted';
  }) => Promise<boolean>;
  onCopySummary: (text: string) => void;
  onBookmarkFacility?: (title: string, summary: string) => void;
}

const FACILITY_OPTIONS = [
  {
    name: 'Structured Commercial Debt',
    rate: 11.5,
    tag: 'Popular',
    desc: 'Senior and subordinate growth capital for business expansion.',
  },
  {
    name: 'Working Capital / CC Limit',
    rate: 10.75,
    tag: 'Low Rate',
    desc: 'Revolving line for inventory, payroll, and cash flow cycles.',
  },
  {
    name: 'Capex Term Loan',
    rate: 11.0,
    tag: 'Long Tenor',
    desc: 'Long-term financing for plant, machinery, and commercial real estate.',
  },
  {
    name: 'Loan Against Securities / Shares',
    rate: 9.75,
    tag: 'Quick Disbursal',
    desc: 'Immediate liquidity backed by listed/unlisted promoter shares.',
  },
];

export function CalculatorSection({
  currentUser,
  savingInquiry,
  inquirySuccessMsg,
  onSubmitInquiry,
  onCopySummary,
  onBookmarkFacility,
}: CalculatorSectionProps) {
  const [selectedFacility, setSelectedFacility] = useState(FACILITY_OPTIONS[0]);
  const [amountCrore, setAmountCrore] = useState<number>(10); // in ₹ Crore
  const [tenorMonths, setTenorMonths] = useState<number>(36); // in Months
  const [notes, setNotes] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Financial Calculations
  const results = useMemo(() => {
    const principal = amountCrore * 10000000;
    const monthlyRate = selectedFacility.rate / 12 / 100;
    const months = tenorMonths;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalOutflow = emi * months;
    const totalInterest = totalOutflow - principal;
    const quarterlyServicing = emi * 3;

    return {
      monthlyEmiLakhs: (emi / 100000).toFixed(2),
      quarterlyServicingLakhs: (quarterlyServicing / 100000).toFixed(2),
      totalInterestCrore: (totalInterest / 10000000).toFixed(2),
      totalPayableCrore: (totalOutflow / 10000000).toFixed(2),
      rawEmi: emi,
    };
  }, [amountCrore, tenorMonths, selectedFacility]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmitInquiry({
      facilityType: selectedFacility.name,
      amountCrore,
      tenorMonths,
      monthlyEmiLakhs: results.monthlyEmiLakhs,
      totalPayableCrore: results.totalPayableCrore,
      notes: notes.trim() || undefined,
      status: 'Submitted',
    });
    if (success) {
      setFormSubmitted(true);
      setNotes('');
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const handleCopy = () => {
    const text = `Siddhesh Capital Facility Estimate:\nFacility: ${selectedFacility.name}\nAmount: ₹${amountCrore} Crore\nTenor: ${tenorMonths} Months\nIndicative Rate: ${selectedFacility.rate}% p.a.\nEstimated EMI: ₹${results.monthlyEmiLakhs} Lakh/month\nTotal Outflow: ₹${results.totalPayableCrore} Crore\nDesk: 099198 05234 (122 Maker Chambers III, Nariman Point, Mumbai)`;
    onCopySummary(text);
  };

  return (
    <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Commercial Credit Sizer</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Calculate Your Facility &amp; Monthly EMI
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Simulate commercial debt, working capital limits, and repayment schedules in Indian Rupees with
          transparent institutional benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Calculator Inputs */}
        <div className="lg:col-span-7 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 space-y-7 shadow-2xl">
          {/* Facility Type Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium mb-3">
              1. Select Facility Structure
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FACILITY_OPTIONS.map((facility) => {
                const isSelected = selectedFacility.name === facility.name;
                return (
                  <button
                    key={facility.name}
                    type="button"
                    onClick={() => setSelectedFacility(facility)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative hover:-translate-y-0.5 ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-950/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{facility.name}</span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {facility.rate}% p.a.
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{facility.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                2. Facility Amount Required
              </label>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
                  ₹{amountCrore}
                </span>
                <span className="text-emerald-400 text-base font-semibold ml-1.5">Crore</span>
                <span className="text-xs text-neutral-400 ml-2 font-mono">
                  (₹{(amountCrore * 100).toFixed(0)} Lakhs)
                </span>
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={amountCrore}
              onChange={(e) => setAmountCrore(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[2, 5, 10, 20, 35, 50].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmountCrore(val)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer font-mono hover:scale-105 active:scale-95 ${
                    amountCrore === val
                      ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  ₹{val} Cr
                </button>
              ))}
            </div>
          </div>

          {/* Tenor Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                3. Facility Tenor
              </label>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
                  {tenorMonths}
                </span>
                <span className="text-neutral-300 text-base font-medium ml-1.5">Months</span>
                <span className="text-xs text-neutral-400 ml-2 font-mono">
                  ({(tenorMonths / 12).toFixed(1)} Years)
                </span>
              </div>
            </div>

            <input
              type="range"
              min={12}
              max={60}
              step={6}
              value={tenorMonths}
              onChange={(e) => setTenorMonths(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            {/* Tenor presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[12, 24, 36, 48, 60].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTenorMonths(val)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer font-mono hover:scale-105 active:scale-95 ${
                    tenorMonths === val
                      ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  {val} Months ({val / 12}Y)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Summary & Submission */}
        <div className="lg:col-span-5 space-y-6">
          {/* Output Card */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/50 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                  Indicative Repayment
                </span>
                <p className="text-base font-semibold text-white mt-0.5">{selectedFacility.name}</p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                title="Copy breakdown to clipboard"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>

            {/* Big Monthly EMI with Ambient Glow */}
            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 text-center shadow-[0_0_25px_rgba(16,185,129,0.12)]">
              <span className="text-xs uppercase tracking-wider text-neutral-400">
                Estimated Monthly Outflow
              </span>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  ₹{results.monthlyEmiLakhs}
                </span>
                <span className="text-sm font-semibold text-white">Lakh / month</span>
              </div>
              <span className="text-[11px] text-neutral-500 mt-1 block font-mono">
                Quarterly Servicing: ~₹{results.quarterlyServicingLakhs} Lakh
              </span>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">Total Interest</span>
                <span className="text-base font-semibold text-white font-mono mt-0.5 block">
                  ₹{results.totalInterestCrore} Cr
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">Total Outflow</span>
                <span className="text-base font-semibold text-white font-mono mt-0.5 block">
                  ₹{results.totalPayableCrore} Cr
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">Benchmark Rate</span>
                <span className="text-base font-semibold text-emerald-400 font-mono mt-0.5 block">
                  {selectedFacility.rate}% p.a.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">Amortisation</span>
                <span className="text-base font-semibold text-white font-mono mt-0.5 block">
                  Monthly Reducing
                </span>
              </div>
            </div>

            {/* Fast Application Form */}
            <form onSubmit={handleApply} className="space-y-3 pt-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional: Enter purpose, company name, or city (e.g. Pune manufacturing expansion)"
                rows={2}
                className="w-full text-xs bg-black/60 border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 resize-none"
              />

              <button
                type="submit"
                disabled={savingInquiry}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50"
              >
                {savingInquiry ? (
                  <span>Recording Facility Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {currentUser ? 'Submit Inquiry to Mumbai Desk' : 'Submit & Connect with Credit Team'}
                    </span>
                  </>
                )}
              </button>

              {formSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Your inquiry of ₹{amountCrore} Cr has been logged! Our team will contact you.
                  </span>
                </div>
              )}

              <p className="text-[11px] text-neutral-500 text-center">
                Non-binding indicative estimate. Subject to credit underwriting &amp; KYC verification.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
