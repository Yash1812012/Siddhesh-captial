import { LogIn, X, BookmarkCheck, Calculator, CheckCircle2 } from 'lucide-react';
import type { User } from 'firebase/auth';
import type { SavedCreditInquiry, UserBookmark } from '../../firebase';

interface UserPortalModalProps {
  currentUser: User | null;
  userInquiries: SavedCreditInquiry[];
  userBookmarks: UserBookmark[];
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenCalculator: () => void;
  onRemoveBookmark: (id: string) => void;
}

export function UserPortalModal({
  currentUser,
  userInquiries,
  userBookmarks,
  onSignIn,
  onSignOut,
  onOpenCalculator,
  onRemoveBookmark,
}: UserPortalModalProps) {
  if (!currentUser) {
    return (
      <div className="p-8 text-center space-y-4 bg-white/5 border border-white/10 rounded-2xl">
        <LogIn className="w-10 h-10 mx-auto text-emerald-400" />
        <div>
          <h4 className="text-lg font-semibold text-white">Sign In to Your Account</h4>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
            Sign in with Google to save your loan calculations, store company bookmarks, and track inquiries
            securely across sessions.
          </p>
        </div>
        <button
          type="button"
          onClick={onSignIn}
          className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
        >
          {/* Google G icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* User Profile Card */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName || ''}
              className="w-12 h-12 rounded-full object-cover border border-white/20"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-lg">
              {currentUser.displayName?.[0] || 'U'}
            </div>
          )}
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">
              {currentUser.displayName || 'User'}
            </p>
            <p className="text-xs text-neutral-400 font-mono">{currentUser.email}</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Connected with Firebase &amp; Firestore
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Section 1: Saved Loan Estimates & Inquiries */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
            Saved Loan Estimates ({userInquiries.length})
          </span>
          <button
            type="button"
            onClick={onOpenCalculator}
            className="text-xs text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>+ New Estimate</span>
          </button>
        </div>

        {userInquiries.length === 0 ? (
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 text-center text-xs text-neutral-400">
            No saved estimates yet. Use the Loan Calculator to estimate amounts and save them here.
          </div>
        ) : (
          <div className="space-y-2 max-h-[32vh] overflow-y-auto pr-1">
            {userInquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">₹{inq.amountCrore} Crore</span>
                    <span className="text-xs text-neutral-400">&bull; {inq.facilityType}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Tenor: {inq.tenorMonths} Months &bull; Est. Servicing: ₹{inq.monthlyEmiLakhs} Lakhs/mo
                  </p>
                  {inq.notes && (
                    <p className="text-[11px] text-neutral-400 mt-1 italic">&ldquo;{inq.notes}&rdquo;</p>
                  )}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-medium self-start sm:self-center">
                  {inq.status || 'Saved'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Bookmarks */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium block">
          Saved Bookmarks ({userBookmarks.length})
        </span>
        {userBookmarks.length === 0 ? (
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 text-center text-xs text-neutral-400">
            Click the bookmark icon on any card to quickly access company details here.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[22vh] overflow-y-auto pr-1">
            {userBookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between gap-2"
              >
                <div>
                  <p className="text-xs font-medium text-white">{bm.title}</p>
                  <p className="text-[11px] text-neutral-400">{bm.detail}</p>
                </div>
                <button
                  type="button"
                  onClick={() => bm.id && onRemoveBookmark(bm.id)}
                  className="text-neutral-500 hover:text-rose-400 p-1 cursor-pointer"
                  title="Remove bookmark"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
