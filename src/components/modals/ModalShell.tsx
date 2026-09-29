import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalShellProps {
  title: string;
  subtitle: string;
  badge?: string;
  cin?: string;
  onClose: () => void;
  children: ReactNode;
}

export function ModalShell({
  title,
  subtitle,
  badge = 'MCA • RoC-Mumbai',
  cin = 'U65923MH1995PTC088811',
  onClose,
  children,
}: ModalShellProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Siddhesh Capital Market Services Pvt. Ltd.</span>
              <span>·</span>
              <span>{badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">{title}</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>

        {/* Footer */}
        <div className="pt-2 flex justify-between items-center border-t border-white/10 text-xs">
          <span className="text-[11px] text-neutral-500 font-mono">CIN: {cin}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full font-medium bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
