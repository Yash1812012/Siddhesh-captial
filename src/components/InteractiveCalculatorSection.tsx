import { useState, useMemo } from 'react';
import { Calculator, Briefcase, Copy, Check, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import type { User } from 'firebase/auth';

interface InteractiveCalculatorSectionProps {
  currentUser: User | null;
  savingInquiry: boolean;
  inquirySuccessMsg: string | null;
  initialFacilityType?: string;
  initialAmount?: number;
  onSubmitInquiry: (inquiryData: {
    facilityType: string;
    amountCrore: number;
    tenorMonths: number;
    monthlyEmiLakhs: string;
    totalPayableCrore: string;
    notes?: string;
    status: 'Submitted';
  }) => Promise<boolean>;
  onCopyBrief: (text: string) => void;
  onOpenAuth: () => void;
}

export function InteractiveCalculatorSection({
  currentUser,
  savingInquiry,
  inquirySuccessMsg,
  initialFacilityType = 'Structured Commercial Debt',
  initialAmount = 15,
  onSubmitInquiry,
  onCopyBrief,
  onOpenAuth,
}: InteractiveCalculatorSectionProps) {
  const [facilityType, setFacilityType] = useState<string>(initialFacilityType);
  const [amount, setAmount] = useState<number>(initialAmount); // in Crore
  const [tenor, setTenor] = useState<number>(36); // in Months
  const [interestRate, setInterestRate] = useState<number>(11.5); // % p.a.
  const [borrowerNotes, setBorrowerNotes] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'simulator' | 'checklist'>('simulator');
  const [copied, setCopied] = useState<boolean>(false);

  // Computations
  const results = useMemo(() => {
    const principal = amount * 10000000;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenor;
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
    };
  }, [amount, tenor, interestRate]);

  const handleApply = async () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    await onSubmitInquiry({
      facilityType,
      amountCrore: amount,
      tenorMonths: tenor,
      monthlyEmiLakhs: results.monthlyEmiLakhs,
      totalPayableCrore: results.totalPayableCrore,
      notes: borrowerNotes,
      status: 'Submitted',
    });
  };

  const handleCopySummary = () => {
    const text = `SIDDHESH CAPITAL MARKET SERVICES PVT. LTD. (CIN: U65923MH1995PTC088811)
INDICATIVE COMMERCIAL CREDIT FACILITY SUMMARY
---------------------------------------------------------
Facility Category: ${facilityType}
Principal Sizing: ₹${amount} Crore (INR ${amount * 10} Million)
Tenor Duration: ${tenor} Months (${(tenor / 12).toFixed(1)} Years)
Indicative Coupon: ${interestRate}% p.a.
Estimated Monthly Servicing: ₹${results.monthlyEmiLakhs} Lakhs / month
Estimated Quarterly Servicing: ₹${results.quarterlyServicingLakhs} Lakhs
Total Interest Outflow: ₹${results.totalInterestCrore} Crore
Total Facility Payable: ₹${results.totalPayableCrore} Crore
---------------------------------------------------------
Registered Office: 122, Maker Chambers III, Nariman Point, Mumbai 400021
Official Contact: reshma@sekhsaria.com | 099198 05234`;

    onCopyBrief(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="calculator" className="relative z-10 py-16 px-4 sm:px-8 bg-neutral-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Institutional Loan Underwriting Model</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Commercial Credit Facility Sizer &amp; Debt Servicing Simulator
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              Model indicative commercial loan structures in Indian Rupees (₹ Crores &amp; Lakhs).
              Save facility requirements directly to our credit review desk powered by Cloud Firestore.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Credit Simulator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Borrower Checklist (KYC/Audit)
            </button>
          </div>
        </div>

        {activeTab === 'simulator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Select Facility Category (NIC 6592)
                </label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value="Structured Commercial Debt">Structured Commercial Debt (Senior/Mezzanine)</option>
                  <option value="Commercial Loan Against Property (LAP)">Commercial Loan Against Property (LAP)</option>
                  <option value="Working Capital Demand Facilities">Working Capital Demand Facilities</option>
                  <option value="Promoter Financing & Bridge Equity">Promoter Financing &amp; Bridge Equity</option>
                  <option value="Inter-Corporate Deposits (ICDs)">Inter-Corporate Deposits (Section 186)</option>
                  <option value="Special Situations & Bridge Capital">Special Situations &amp; Bridge Capital</option>
                </select>
              </div>

              {/* Amount Slider */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-300 font-medium">Facility Principal Sizing:</span>
                  <span className="font-mono text-xl font-bold text-emerald-400">
                    ₹{amount} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                  <span>₹5 Cr (Min)</span>
                  <span>₹25 Cr</span>
                  <span>₹50 Cr (Max Ticket)</span>
                </div>
              </div>

              {/* Tenor Slider */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-300 font-medium">Facility Tenor Horizon:</span>
                  <span className="font-mono text-xl font-bold text-white">
                    {tenor} Months <span className="text-xs text-neutral-400 font-normal">({(tenor / 12).toFixed(1)} Yrs)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="6"
                  value={tenor}
                  onChange={(e) => setTenor(parseInt(e.target.value, 10))}
                  className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                  <span>12 Months (1 Yr)</span>
                  <span>36 Months (3 Yrs)</span>
                  <span>60 Months (5 Yrs)</span>
                </div>
              </div>

              {/* Indicative Rate */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-300 font-medium">Indicative Annual Coupon:</span>
                  <span className="font-mono text-lg font-bold text-amber-400">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="9.5"
                  max="14.5"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                  <span>9.50% (Prime AAA)</span>
                  <span>11.50% (Mid-Market)</span>
                  <span>14.50% (Mezzanine)</span>
                </div>
              </div>

              {/* Borrower Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Corporate Borrower Context / Collateral Brief (Optional)
                </label>
                <textarea
                  rows={2}
                  value={borrowerNotes}
                  onChange={(e) => setBorrowerNotes(e.target.value)}
                  placeholder="e.g., Working capital expansion for pharmaceutical export order; commercial property security in Lower Parel, Mumbai."
                  className="w-full bg-neutral-950 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white resize-none"
                />
              </div>
            </div>

            {/* Calculations & Submission Card (Right Column) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-emerald-500/30 shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono">
                  Debt Servicing Schedule
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">₹{amount} Crore Facility</h3>
                <p className="text-xs text-neutral-400">{facilityType}</p>
              </div>

              {/* Key Output Metrics */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 block">Monthly Debt Servicing</span>
                    <span className="text-xs text-neutral-500 font-mono">Estimated Principal + Interest</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                      ₹{results.monthlyEmiLakhs} L
                    </span>
                    <span className="text-[10px] text-neutral-400 block font-mono">/ month</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-300">Quarterly Servicing Outflow:</span>
                  <span className="font-mono font-semibold text-white">₹{results.quarterlyServicingLakhs} Lakhs</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-300">Total Interest Payable:</span>
                  <span className="font-mono font-semibold text-white">₹{results.totalInterestCrore} Crore</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-300">Total Facility Outflow:</span>
                  <span className="font-mono font-semibold text-emerald-400 text-sm">₹{results.totalPayableCrore} Crore</span>
                </div>
              </div>

              {inquirySuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{inquirySuccessMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={savingInquiry}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-500/20"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {currentUser
                      ? savingInquiry
                        ? 'Recording Application...'
                        : 'Submit Application to Firestore'
                      : 'Sign In to Submit Application'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Term Sheet Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Formatted Term Sheet Brief</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-neutral-400 leading-relaxed text-center">
                *Indicative commercial sizing strictly subject to title verification, RoC MCA scrutiny,
                audited balance sheet analysis, and approval by the Credit Committee of Siddhesh Capital.
              </p>
            </div>
          </div>
        ) : (
          /* Borrower Checklist View */
          <div className="p-8 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-semibold text-white">
                Statutory Borrower Document Checklist (Corporate Credit Assessment)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                To expedite fast-track loan sanctioning within 7–14 days, Indian corporate applicants are
                advised to keep the following certified documents prepared:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category 1 */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>1. Corporate Constitution &amp; KYC</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Certificate of Incorporation (COI) &amp; PAN Card of Entity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Memorandum &amp; Articles of Association (MOA &amp; AOA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>PAN, Aadhaar, &amp; DIN of all Directors / Key Promoters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Updated Shareholding Pattern &amp; Board Resolution for Borrowing</span>
                  </li>
                </ul>
              </div>

              {/* Category 2 */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>2. Financials &amp; Statutory Audits</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Last 3 Years CA-Audited Balance Sheet &amp; P&amp;L Statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Tax Audit Reports (Form 3CA/3CD) &amp; Statutory Notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Latest Provisional / Half-Yearly Financials signed by Directors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Debt Profile: Existing loan sanction letters &amp; repayment track</span>
                  </li>
                </ul>
              </div>

              {/* Category 3 */}
              <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>3. Tax Filings &amp; Banking Records</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Last 12 Months GSTR-3B &amp; GSTR-1 returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Income Tax Returns (ITR-V) with Computation of Income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Form 26AS &amp; AIS/TIS statement of the company</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>Last 12 Months operative Bank Statements in original PDF</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Confidential Submission:</strong> All borrower disclosures are processed under strict
                non-disclosure obligations. You may email the document docket directly to{' '}
                <a href="mailto:reshma@sekhsaria.com" className="underline font-mono">
                  reshma@sekhsaria.com
                </a>{' '}
                or discuss with our credit desk at{' '}
                <a href="tel:09919805234" className="underline font-mono">
                  099198 05234
                </a>.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
