import { useState, useMemo } from 'react';
import { Users, ShieldCheck, Award, Briefcase } from 'lucide-react';
import type { ManagementMember, DirectorCategory } from '../types/corporate';

interface BoardOfDirectorsSectionProps {
  management: ManagementMember[];
}

export function BoardOfDirectorsSection({ management }: BoardOfDirectorsSectionProps) {
  const [filter, setFilter] = useState<'all' | DirectorCategory>('all');

  const filteredMembers = useMemo(() => {
    if (filter === 'all') return management;
    return management.filter((m) => m.category === filter);
  }, [management, filter]);

  return (
    <section id="leadership" className="relative z-10 py-16 px-4 sm:px-8 bg-black/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-neutral-300 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Corporate Governance &bull; Ministry of Corporate Affairs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Board of Directors &amp; Key Management Personnel
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              Fiduciary leadership, institutional credit structuring, and statutory governance registered
              under the Ministry of Corporate Affairs (RoC-Mumbai).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl text-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Signatories (8)
            </button>
            <button
              type="button"
              onClick={() => setFilter('executive')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'executive'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Executive (2)
            </button>
            <button
              type="button"
              onClick={() => setFilter('board')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'board'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Directors (3)
            </button>
            <button
              type="button"
              onClick={() => setFilter('additional')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'additional'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Additional (2)
            </button>
            <button
              type="button"
              onClick={() => setFilter('secretary')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === 'secretary'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Company Secretary (1)
            </button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredMembers.map((person, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-emerald-400 font-mono">
                    {person.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                    {person.tenure}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                  {person.name}
                </h3>
                <p className="text-xs font-medium text-emerald-400 mt-1 mb-3">
                  {person.designation}
                </p>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {person.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span>RoC-Mumbai</span>
                <span className="text-emerald-400 font-medium">&bull; Active Signatory</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
