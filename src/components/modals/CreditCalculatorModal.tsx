import { useState, useMemo } from 'react';
import { Briefcase, Check, Copy } from 'lucide-react';
import type { User } from 'firebase/auth';

interface CreditCalculatorModalProps {
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
}

export function CreditCalculatorModal({
  currentUser,
  savingInquiry,
  inquirySuccessMsg,
  onSubmitInquiry,
  onCopySummary,
}: CreditCalculatorModalProps) {
  const [calcAmount, setCalcAmount] = useState<number>(15); // in Crore
  const [calcTenor, setCalcTenor] = useState<number>(36); // in Months
  const [calcRate] = useState<number>(11.5); // % p.a.
  const [calcFacilityType, setCalcFacilityType] = useState<string>('Structured Commercial Debt');
  const [calcNotes, setCalcNotes] = useState<string>('');

  const calcResults = useMemo(() => {
    const principal = calcAmount * 10000000;
    const monthlyRate = calcRate / 12 / 100;
    const months = calcTenor;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalOutflow = emi * months;
    const totalInterest = totalOutflow - principal;
    const quarterlyServicing = emi * 3;

    return {
      principalInCrore: calcAmount,
      monthlyEmiLakhs: (emi / 100000).toFixed(2),
      quarterlyServicingLakhs: (quarterlyServicing / 100000).toFixed(2),
      totalInterestCrore: (totalInterest / 10000000).toFixed(2),
      totalPayableCrore: (totalOutflow / 10000000).toFixed(2),
    };
  }, [calcAmount, calcTenor, calcRate]);

  const handleSubmit = async () => {
    await onSubmitInquiry({
      facilityType: calcFacilityType,
      amountCrore: calcAmount,
      tenorMonths: calcTenor,
      monthlyEmiLakhs: calcResults.monthlyEmiLakhs,
      totalPayableCrore: calcResults.totalPayableCrore,
      notes: calcNotes,
      status: 'Submitted',
    });
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
            Facility Structure (NIC 6592)
          </label>
          <select
            value={calcFacilityType}
            onChange={(e) => setCalcFacilityType(e.target.value)}
            className="w-full bg-neutral-900 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white cursor-pointer"
          >
            <option value="Structured Commercial Debt">Structured Commercial Debt</option>
            <option value="Institutional Term Loan">Institutional Term Loan</option>
            <option value="Commercial Credit Line">Commercial Credit Line / Working Capital</option>
            <option value="Asset-Backed Bridge Facility">Asset-Backed Bridge Facility</option>
          </select>
        </div>

        {/* Amount Slider */}
        <div>
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Facility Size:</span>
            <span className="font-mono text-emerald-400 font-semibold text-sm">
              ₹{calcAmount} Crore
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={calcAmount}
            onChange={(e) => setCalcAmount(parseInt(e.target.value, 10))}
            className="w-full accent-white cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
            <span>₹5 Cr</span>
            <span>₹25 Cr</span>
            <span>₹50 Cr</span>
          </div>
        </div>

        {/* Tenor Slider */}
        <div>
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Duration / Tenor:</span>
            <span className="font-mono text-emerald-400 font-semibold text-sm">
              {calcTenor} Months ({Math.round(calcTenor / 12)} Yrs)
            </span>
          </div>
          <input
            type="range"
            min="12"
            max="60"
            step="6"
            value={calcTenor}
            onChange={(e) => setCalcTenor(parseInt(e.target.value, 10))}
            className="w-full accent-white cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
            <span>12 Mo</span>
            <span>36 Mo</span>
            <span>60 Mo</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Commercial Context / Purpose (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Infrastructure refinancing, capex expansion"
            value={calcNotes}
            onChange={(e) => setCalcNotes(e.target.value)}
            className="w-full bg-neutral-900 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Outputs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="p-3 rounded-lg bg-neutral-900 border border-white/10">
          <span className="text-[10px] uppercase text-neutral-400 block">Monthly Servicing</span>
          <span className="text-base font-semibold text-white font-mono tabular-nums">
            ₹{calcResults.monthlyEmiLakhs} L
          </span>
        </div>
        <div className="p-3 rounded-lg bg-neutral-900 border border-white/10">
          <span className="text-[10px] uppercase text-neutral-400 block">Quarterly Cashflow</span>
          <span className="text-base font-semibold text-white font-mono tabular-nums">
            ₹{calcResults.quarterlyServicingLakhs} L
          </span>
        </div>
        <div className="p-3 rounded-lg bg-neutral-900 border border-white/10 col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase text-neutral-400 block">Total Facility Outflow</span>
          <span className="text-base font-semibold text-emerald-400 font-mono tabular-nums">
            ₹{calcResults.totalPayableCrore} Cr
          </span>
        </div>
      </div>

      {inquirySuccessMsg && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{inquirySuccessMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={savingInquiry}
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <Briefcase className="w-4 h-4" />
          <span>
            {currentUser
              ? savingInquiry
                ? 'Submitting to Firestore...'
                : 'Submit & Save to My Account'
              : 'Sign In to Submit Application'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onCopySummary(
              `Facility Inquiry: ${calcFacilityType} of ₹${calcAmount} Crore for ${calcTenor} months. Estimated Monthly Servicing: ₹${calcResults.monthlyEmiLakhs} Lakhs.`,
            );
          }}
          className="px-5 py-2.5 rounded-full text-xs sm:text-sm border border-white/20 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Summary</span>
        </button>
      </div>
    </div>
  );
}
