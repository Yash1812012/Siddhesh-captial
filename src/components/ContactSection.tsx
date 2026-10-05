import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants/companyDetails';
import type { User } from 'firebase/auth';

interface ContactSectionProps {
  currentUser: User | null;
  onSubmitInquiry: (inquiryData: any) => Promise<boolean>;
  onCopyText: (text: string, label: string) => void;
  copiedItem: string | null;
}

export function ContactSection({
  currentUser,
  onSubmitInquiry,
  onCopyText,
  copiedItem,
}: ContactSectionProps) {
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [facilityReq, setFacilityReq] = useState('Working Capital / Cash Credit');
  const [amountReq, setAmountReq] = useState('₹10 Crore');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const numAmount = parseFloat(amountReq.replace(/[^0-9.]/g, '')) || 10;
      await onSubmitInquiry({
        facilityType: facilityReq,
        amountCrore: numAmount,
        tenorMonths: 36,
        monthlyEmiLakhs: 'To be quoted',
        totalPayableCrore: 'To be structured',
        notes: `Direct Contact Form Submission:\nClient Name: ${name}\nPhone: ${phone}\nCompany: ${company}\nMessage: ${message}`,
        status: 'Submitted',
      });
      setSubmitted(true);
      setMessage('');
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
          <Phone className="w-3.5 h-3.5" />
          <span>Mumbai Commercial Credit Desk</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Connect with Our Team
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Direct dialogue with our executive credit underwriters at Nariman Point. No automated call trees,
          no opaque intermediary fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-6">
            <h3 className="text-lg font-bold text-white">Registered Headquarters</h3>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block">
                  Nariman Point Office
                </span>
                <p className="text-sm text-neutral-200 mt-1 leading-relaxed">
                  122, Maker Chambers III, Nariman Point, Mumbai, Maharashtra 400021, India
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onCopyText(COMPANY_DETAILS.contact.address, 'Registered Address')
                  }
                  className="text-xs text-emerald-400 hover:text-emerald-300 mt-1 inline-block cursor-pointer font-medium"
                >
                  {copiedItem === 'Registered Address copied' ? 'Address copied!' : 'Copy full address'}
                </button>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block">
                  Direct Desk Phone
                </span>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phone.replace(/\s+/g, '')}`}
                  className="text-base font-bold text-white hover:text-emerald-400 transition-colors font-mono mt-0.5 inline-block"
                >
                  {COMPANY_DETAILS.contact.phone}
                </a>
                <span className="text-xs text-neutral-500 block mt-0.5">
                  Mon – Fri: 10:00 AM – 6:30 PM IST
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block">
                  Official Correspondence
                </span>
                <a
                  href={`mailto:${COMPANY_DETAILS.contact.email}`}
                  className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors font-mono mt-0.5 inline-block"
                >
                  {COMPANY_DETAILS.contact.email}
                </a>
              </div>
            </div>

            {/* Disclosures note */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-neutral-400 leading-tight">
                All communications are handled confidentially by authorized company signatories under CIN{' '}
                <span className="font-mono text-white">U65923MH1995PTC088811</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Consultation Form */}
        <div className="lg:col-span-7 bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Request Facility Consultation</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Provide your facility requirements and an executive underwriter will review your brief within 1
              business day.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Company / Entity Name *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Apex Industries Pvt Ltd"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Facility Type Required
                </label>
                <select
                  value={facilityReq}
                  onChange={(e) => setFacilityReq(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Working Capital / Cash Credit">Working Capital / Cash Credit</option>
                  <option value="Structured Commercial Debt">Structured Commercial Debt</option>
                  <option value="Capex Term Loan">Capex Term Loan</option>
                  <option value="Loan Against Securities">Loan Against Securities</option>
                  <option value="Other Commercial Financing">Other Commercial Financing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Approximate Loan Size
                </label>
                <select
                  value={amountReq}
                  onChange={(e) => setAmountReq(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer font-mono"
                >
                  <option value="₹1 Crore – ₹5 Crore">₹1 Crore – ₹5 Crore</option>
                  <option value="₹5 Crore – ₹15 Crore">₹5 Crore – ₹15 Crore</option>
                  <option value="₹15 Crore – ₹30 Crore">₹15 Crore – ₹30 Crore</option>
                  <option value="₹30 Crore – ₹50 Crore">₹30 Crore – ₹50 Crore</option>
                  <option value="Above ₹50 Crore">Above ₹50 Crore</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Business Details &amp; Objectives
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly state your requirement: e.g., working capital enhancement for export orders, term loan for expanding unit in Gujarat..."
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Routing to Credit Desk...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </>
              )}
            </button>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Thank you, {name}. Your request has been transmitted to our Nariman Point credit desk.
                  We will contact you promptly at {phone || email}.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
