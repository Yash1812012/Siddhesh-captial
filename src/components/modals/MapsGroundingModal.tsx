import { useState } from 'react';
import { Navigation, MapPin, Compass, ExternalLink } from 'lucide-react';
import { fetchMapsGrounding } from '../../services/api';
import type { GroundingResult } from '../../types/corporate';

export function MapsGroundingModal() {
  const [query, setQuery] = useState(
    '122 Maker Chambers III Nariman Point Mumbai financial institutions and transit',
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GroundingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLocate = async (mapsPrompt?: string) => {
    const q = mapsPrompt || query;
    if (!q.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      const res = await fetchMapsGrounding(q);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Maps grounding request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">
            Registered Headquarters: 122, Maker Chambers III, Nariman Point, Mumbai 400021
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLocate()}
            placeholder="e.g. Nearest banks, RBI headquarters, or transit stations to Maker Chambers III"
            className="flex-1 bg-neutral-900 border border-white/20 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white"
          />
          <button
            type="button"
            onClick={() => handleLocate()}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{loading ? 'Locating...' : 'Locate'}</span>
          </button>
        </div>

        {/* Preset prompts */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => {
              const q = 'Major bank branches and institutional lenders near Maker Chambers III Nariman Point Mumbai';
              setQuery(q);
              handleLocate(q);
            }}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          >
            Nearby Banks &amp; Lenders
          </button>
          <button
            type="button"
            onClick={() => {
              const q = 'Nearest railway and metro connectivity from Nariman Point Maker Chambers III (Churchgate, CSMT, Aqua Line 3)';
              setQuery(q);
              handleLocate(q);
            }}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          >
            Transit &amp; Metro Connectivity
          </button>
          <button
            type="button"
            onClick={() => {
              const q = 'Corporate towers and financial landmarks surrounding Nariman Point Mumbai 400021';
              setQuery(q);
              handleLocate(q);
            }}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          >
            Nariman Point Financial District
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-8 text-center space-y-3">
          <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-neutral-400">Grounding spatial details with Google Maps...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 space-y-3 max-h-[42vh] overflow-y-auto">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Compass className="w-4 h-4" />
              <span>Google Maps Grounded Location Insights:</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
              {result.text}
            </div>
          </div>

          {result.sources && result.sources.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                Google Maps Pin &amp; Location Links
              </span>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                    <span className="max-w-[200px] truncate">{src.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
