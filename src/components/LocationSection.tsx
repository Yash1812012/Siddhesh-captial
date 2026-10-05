import { useState } from 'react';
import { Compass, MapPin, ExternalLink, Navigation, Building2, Train, Loader2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants/companyDetails';
import type { GroundingResult } from '../types/corporate';

export function LocationSection() {
  const [loading, setLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<GroundingResult | null>(null);

  const fetchMapsInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query:
            'Spatial landmarks, metro connectivity, and institutional neighbors near 122 Maker Chambers III, Nariman Point, Mumbai 400021',
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setMapsResult(data);
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '122 Maker Chambers III Nariman Point Mumbai 400021',
  )}`;

  return (
    <section id="location" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Nariman Point Financial District Hub</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Headquarters &amp; Spatial Verification
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Strategically situated in Mumbai&apos;s premier legacy financial center at Nariman Point, minutes from
          major commercial banks and the Reserve Bank of India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Registered Office Details */}
        <div className="lg:col-span-6 bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono">
                Corporate Headquarters
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Maker Chambers III, Nariman Point
              </h3>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                {COMPANY_DETAILS.contact.address}
              </p>
            </div>
          </div>

          {/* District Proximities */}
          <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">
              Key Institutional Proximities:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-neutral-400 block text-[11px]">Commercial Banks</span>
                <span className="text-white font-medium">SBI, HDFC, ICICI Corporate Towers</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-neutral-400 block text-[11px]">Central Banking</span>
                <span className="text-white font-medium">Reserve Bank of India (Fort) ~2.2 km</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-neutral-400 block text-[11px]">Transit Hub</span>
                <span className="text-white font-medium">Churchgate &amp; Aqua Line 3 Metro</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-neutral-400 block text-[11px]">Promenade</span>
                <span className="text-white font-medium">Marine Drive Waterfront ~400 m</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            {!mapsResult && (
              <button
                type="button"
                onClick={fetchMapsInsights}
                disabled={loading}
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Compass className="w-3.5 h-3.5 text-emerald-400" />}
                <span>Fetch Spatial Grounding Details</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Grounded Spatial Intelligence */}
        <div className="lg:col-span-6 bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
              Live Google Maps Grounding
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Grounded AI
            </span>
          </div>

          {mapsResult ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line bg-black/40 p-4 rounded-xl border border-white/5">
                {mapsResult.text}
              </div>

              {mapsResult.sources && mapsResult.sources.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                    Map Points of Interest:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {mapsResult.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 flex items-center gap-1.5 transition-colors"
                      >
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span className="truncate max-w-[200px]">{src.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <MapPin className="w-10 h-10 text-emerald-400/60 mx-auto" />
              <div className="max-w-sm mx-auto">
                <p className="text-sm font-medium text-white">Nariman Point Verified Office</p>
                <p className="text-xs text-neutral-400 mt-1">
                  122, Maker Chambers III is an established financial address housing institutional
                  credit, private equity, and legal advisory firms.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchMapsInsights}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                {loading ? 'Grounding spatial data...' : 'Verify Vicinity & Metro Access'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
