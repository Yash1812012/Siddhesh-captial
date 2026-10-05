import { useState } from 'react';
import { Search, Sparkles, ExternalLink, Loader2, ArrowRight } from 'lucide-react';
import type { GroundingResult } from '../types/corporate';

const PRESET_QUERIES = [
  'Current RBI repo rate and commercial lending benchmarks India',
  'Commercial working capital interest rate trends in Mumbai',
  'NBFC commercial credit regulations and borrowing guidelines',
  'Siddhesh Capital Market Services Private Limited corporate standing',
];

export function MarketIntelligenceSection() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GroundingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve search grounded intelligence');
      }

      const data: GroundingResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="market-intelligence" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time Google Search Grounding</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Live Market &amp; Regulatory Intelligence
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Ground your commercial borrowing decisions with real-time interest rate benchmarks, RBI policies,
          and credit market dynamics powered by Google Search.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executeSearch(query);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search RBI benchmark rates, commercial credit rules, or lending trends..."
              className="w-full bg-black/60 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Search</span>}
          </button>
        </form>

        {/* Preset Queries */}
        <div>
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-2 font-mono">
            Popular Market Inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => executeSearch(q)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer text-left disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {loading && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
            <p className="text-xs text-neutral-400">Grounding intelligence via Google Search...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
            {error}
          </div>
        )}

        {result && !loading && (
          <div className="space-y-4 pt-4 border-t border-white/10 animate-fadeIn">
            <div className="p-5 rounded-xl bg-black/40 border border-white/5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 block mb-2">
                Synthesized Market Intelligence
              </span>
              <div className="text-sm text-neutral-200 leading-relaxed whitespace-pre-line space-y-2">
                {result.text}
              </div>
            </div>

            {/* Citations & Web Sources */}
            {result.sources && result.sources.length > 0 && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                  Verified Grounding Sources:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between gap-2 text-xs text-neutral-300 hover:text-white transition-colors group"
                    >
                      <span className="truncate">{src.title || src.url}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-blue-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
