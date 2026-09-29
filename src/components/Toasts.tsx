import { Check } from 'lucide-react';

interface ToastProps {
  copiedItem: string | null;
  videoNotification: string | null;
}

export function Toasts({ copiedItem, videoNotification }: ToastProps) {
  return (
    <>
      {/* Copy Notification Toast */}
      {copiedItem && (
        <div className="fixed bottom-16 right-6 z-50 bg-white text-black px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{copiedItem}</span>
        </div>
      )}

      {/* Video Update Toast */}
      {videoNotification && (
        <div className="fixed bottom-16 left-6 z-50 bg-white text-black px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2 animate-pulse">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{videoNotification}</span>
        </div>
      )}
    </>
  );
}
