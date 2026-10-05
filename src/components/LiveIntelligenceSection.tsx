import { useState } from 'react';
import { Search, Compass, Sparkles, Navigation, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { fetchSearchGrounding, fetchMapsGrounding } from '../services/api';
import type { GroundingResult } from '../types/corporate';

export function LiveIntelligenceSection() {
  const [activeTab, setActiveTab] = useState<'search' | 'maps'>('search');

  // Search State
  const [searchQuery, setSearchQuery] = useState(
    'Latest MCA regulations and lending benchmarks for private credit companies in Maharashtra 2026',
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<GroundingResult | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Maps State
  const [mapsQuery, setMapsQuery] = useState(
    'Major commercial banks, institutional headquarters, and transit connectivity around Maker Chambers III Nariman Point Mumbai',
  );
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<GroundingResult | null>(null);
  const [mapsError, setMapsError] = useState<string | null>(null);

  const handleRunSearch = async (prompt?: string) => {
    const q = prompt || searchQuery;
    if (!q.trim()) return;

    try {
      setSearchLoading(true);
      setSearchError(null);
      setSearchResult(null);
      const res = await fetchSearchGrounding(q);
      setSearchResult(res);
    } catch (err: any) {
      setSearchError(err.message || 'Search grounding request failed.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRunMaps = async (prompt?: string) => {
    const q = prompt || mapsQuery;
    if (!q.trim()) return;

    try {
      setMapsLoading(true);
      setMapsError(null);
      setMapsResult(null);
      const res = await fetchMapsGrounding(q);
      setMapsResult(res);
    } catch (err: any) {
      setMapsError(err.message || 'Maps grounding request failed.');
    } finally {
      setMapsLoading(false);
    }
  };

  return (
    <section id="intelligence" className="relative z-10 py-16 px-4 sm:px-8 bg-neutral-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Grounding Engine &bull; Google Search &amp; Google Maps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Institutional Intelligence &amp; Nariman Point Verification
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              Live Indian financial regulatory research grounded via Google Search index, alongside
              geospatial and transit verification for our headquarters at 122, Maker Chambers III, Nariman Point.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Live Search Intelligence</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('maps')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'maps'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Nariman Point HQ (Maps)</span>
            </button>
          </div>
        </div>

        {activeTab === 'search' ? (
          /* TAB 1: SEARCH GROUNDING */
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-6">
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-neutral-400">
                Query Indian Capital Markets, RoC-Mumbai circulars, or Benchmark Rates
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunSearch()}
                  placeholder="e.g. Current commercial debt lending benchmarks in India 2026"
                  className="flex-1 bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleRunSearch()}
                  disabled={searchLoading}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>{searchLoading ? 'Grounding...' : 'Query Google Search'}</span>
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="text-neutral-500 text-xs self-center">Instant Scenarios:</span>
                <button
                  type="button"
                  onClick={() => {
                    const q = 'Latest MCA guidelines for commercial credit granting and corporate loans in India';
                    setSearchQuery(q);
                    handleRunSearch(q);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer border border-white/5"
                >
                  MCA Credit Guidelines
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = 'Commercial lending rates, MCLR, and corporate debt trends in India 2026';
                    setSearchQuery(q);
                    handleRunSearch(q);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer border border-white/5"
                >
                  2026 Corporate Debt Benchmarks
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = 'Siddhesh Capital Market Services Private Limited corporate records RoC-Mumbai';
                    setSearchQuery(q);
                    handleRunSearch(q);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer border border-white/5"
                >
                  RoC-Mumbai Filings
                </button>
              </div>
            </div>

            {searchLoading && (
              <div className="p-10 text-center space-y-3 bg-black/40 rounded-xl border border-white/5">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-neutral-400">Grounding query with live Google Search index...</p>
              </div>
            )}

            {searchError && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                {searchError}
              </div>
            )}

            {searchResult && !searchLoading && (
              <div className="space-y-4 pt-2">
                <div className="p-6 rounded-xl bg-black/80 border border-blue-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Grounded Financial Intelligence Summary:</span>
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {searchResult.text}
                  </div>
                </div>

                {searchResult.sources && searchResult.sources.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                      Verified Web References &amp; Regulatory Citations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 text-blue-400 shrink-0" />
                          <span className="max-w-[240px] truncate">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* TAB 2: MAPS GROUNDING */
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>
                  Registered Address: 122, Maker Chambers III, Nariman Point, Mumbai, Maharashtra 400021
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={mapsQuery}
                  onChange={(e) => setMapsQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunMaps()}
                  placeholder="e.g. Major banks, Reserve Bank of India, or Churchgate transit around Maker Chambers III"
                  className="flex-1 bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleRunMaps()}
                  disabled={mapsLoading}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{mapsLoading ? 'Locating...' : 'Query Google Maps'}</span>
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="text-neutral-500 text-xs self-center">Instant Landmarks:</span>
                <button
                  type="button"
                  onClick={() => {
                    const q = 'Major bank headquarters and financial institutions in Nariman Point near Maker Chambers III';
                    setMapsQuery(q);
                    handleRunMaps(q);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer border border-white/5"
                >
                  Nearby Bank HQs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = 'Transit options to Maker Chambers III Nariman Point: Churchgate, CSMT, and Metro Line 3 Vidhan Bhavan';
                    setMapsQuery(q);
                    handleRunMaps(q);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer border border-white/5"
                >
                  Churchgate &amp; Metro Line 3 Transit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const q = 'Corporate towers and financial landmarks in Nariman Point Mumbai 400021';
                    setMapsQuery(q);
                    handleRunMaps(q);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer border border-white/5"
                >
                  Nariman Point Commercial Hub
                </button>
              </div>
            </div>

            {mapsLoading && (
              <div className="p-10 text-center space-y-3 bg-black/40 rounded-xl border border-white/5">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-neutral-400">Grounding spatial information with Google Maps...</p>
              </div>
            )}

            {mapsError && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                {mapsError}
              </div>
            )}

            {mapsResult && !mapsLoading && (
              <div className="space-y-4 pt-2">
                <div className="p-6 rounded-xl bg-black/80 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <Compass className="w-4 h-4" />
                    <span>Google Maps Grounded Location Brief:</span>
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {mapsResult.text}
                  </div>
                </div>

                {mapsResult.sources && mapsResult.sources.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                      Direct Google Maps Pins &amp; Navigation Links:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {mapsResult.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="max-w-[240px] truncate">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Direct Map Card */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-white">Visiting Maker Chambers III, Nariman Point?</p>
                <p className="text-neutral-400">
                  Located in Mumbai&apos;s premier legacy financial district, accessible via Marine Drive and Maharshi Karve Road.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Maker+Chambers+III+Nariman+Point+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
