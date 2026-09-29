import { useState, useMemo } from 'react';
import type { ManagementMember, DirectorCategory } from '../../types/corporate';

interface ManagementModalProps {
  management: ManagementMember[];
}

export function ManagementModal({ management }: ManagementModalProps) {
  const [filter, setFilter] = useState<'all' | DirectorCategory>('all');

  const filteredMembers = useMemo(() => {
    if (filter === 'all') return management;
    return management.filter((m) => m.category === filter);
  }, [management, filter]);

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 border border-white/10 rounded-lg text-xs">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-white text-black font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          All (8)
        </button>
        <button
          type="button"
          onClick={() => setFilter('executive')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
            filter === 'executive'
              ? 'bg-white text-black font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Executive (2)
        </button>
        <button
          type="button"
          onClick={() => setFilter('board')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
            filter === 'board'
              ? 'bg-white text-black font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Directors (3)
        </button>
        <button
          type="button"
          onClick={() => setFilter('additional')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
            filter === 'additional'
              ? 'bg-white text-black font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Additional (2)
        </button>
        <button
          type="button"
          onClick={() => setFilter('secretary')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
            filter === 'secretary'
              ? 'bg-white text-black font-medium'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Secretary (1)
        </button>
      </div>

      <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
        {filteredMembers.map((person, index) => (
          <div
            key={index}
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <p className="text-sm font-semibold text-white">{person.name}</p>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 font-mono">
                {person.tenure}
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-medium">{person.designation}</p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{person.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
