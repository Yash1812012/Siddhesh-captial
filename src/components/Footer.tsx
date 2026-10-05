import { Landmark, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants/companyDetails';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-white/10 text-neutral-400 text-xs py-14 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
              <span>SIDDHESH CAPITAL</span>
              <span className="text-amber-400 text-xl">&#10035;&#xFE0E;</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Siddhesh Capital Market Services Private Limited is a premier Indian financial credit
              intermediation firm incorporated on 26 May 1995. Registered with RoC-Mumbai under CIN{' '}
              <span className="text-white font-mono">U65923MH1995PTC088811</span>.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
                ₹74.85 Cr Paid-Up Equity Capital
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Credit Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#facilities" className="hover:text-emerald-400 transition-colors">
                  Working Capital &amp; CC
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-emerald-400 transition-colors">
                  Structured Commercial Debt
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-emerald-400 transition-colors">
                  Capex Term Loans
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-emerald-400 transition-colors">
                  Securities Financing
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition-colors">
                  Loan EMI Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Governance &amp; MCA
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#capital" className="hover:text-emerald-400 transition-colors">
                  Capital Structure (₹80 Cr Auth)
                </a>
              </li>
              <li>
                <a href="#capital" className="hover:text-emerald-400 transition-colors">
                  Board of Directors (8)
                </a>
              </li>
              <li>
                <a href="#capital" className="hover:text-emerald-400 transition-colors">
                  RoC-Mumbai Registry
                </a>
              </li>
              <li>
                <a href="#market-intelligence" className="hover:text-blue-400 transition-colors">
                  Market Search Grounding
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-emerald-400 transition-colors">
                  Nariman Point Verification
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Mumbai Credit Desk
            </h4>
            <p className="text-xs text-neutral-300">
              122, Maker Chambers III, Nariman Point, Mumbai 400021
            </p>
            <p className="text-xs font-mono text-white">
              Call: <a href="tel:09919805234" className="hover:text-emerald-400">099198 05234</a>
            </p>
            <p className="text-xs font-mono text-neutral-400 truncate">
              reshma@sekhsaria.com
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            &copy; 1995 – 2026 Siddhesh Capital Market Services Private Limited. All rights reserved.
          </p>
          <p className="font-mono text-neutral-400">
            CIN: U65923MH1995PTC088811 &bull; NIC Code: 6592
          </p>
        </div>
      </div>
    </footer>
  );
}
