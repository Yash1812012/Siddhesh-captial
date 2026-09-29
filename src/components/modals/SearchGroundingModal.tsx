import { useState } from 'react';
import { Search, Sparkles, ExternalLink } from 'lucide-react';
import { fetchSearchGrounding } from '../../services/api';
import type { GroundingResult } from '../../types/corporate';

export function SearchGroundingModal() {
  const [query, setQuery] = useState(
    'Siddhesh Capital Market Services Private Limited MCA filings and credit operations',
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GroundingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchPrompt?: string) => {
    const q = searchPrompt || query;
    if (!q.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      const res = await fetchSearchGrounding(q);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Search grounding request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <label className="block text-xs uppercase tracking-wider text-neutral-400">
          Query Market &amp; Regulatory Intelligence (Google Search)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. MCA regulations for credit granting companies in Maharashtra"
            className="flex-1 bg-neutral-900 border border-white/20 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white"
          />
          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{loading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>

        {/* Preset prompts */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => {
              const q = 'Latest MCA notifications and ROC Mumbai credit granting guidelines';
              setQuery(q);
              handleSearch(q);
            }}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          >
            ROC-Mumbai Guidelines
          </button>
          <button
            type="button"
            onClick={() => {
              const q = 'Commercial lending benchmarks and prime lending rates in India 2026';
              setQuery(q);
              handleSearch(q);
            }}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          >
            2026 Commercial Loan Rates
          </button>
          <button
            type="button"
            onClick={() => {
              const q = 'Siddhesh Capital Market Services Private Limited corporate records';
              setQuery(q);
              handleSearch(q);
            }}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          >
            Company Filings
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-8 text-center space-y-3">
          <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-neutral-400">Grounding query with Google Search index...</p>
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
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Google Search Grounded Response:</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
              {result.text}
            </div>
          </div>

          {/* Sources */}
          {result.sources && result.sources.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400">
                Search Citations &amp; Sources
              </span>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400 text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-blue-400" />
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
