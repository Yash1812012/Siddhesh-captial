import type { GroundingResult } from '../types/corporate';

/**
 * Executes Google Search Grounding via backend proxy (/api/search)
 */
export async function fetchSearchGrounding(query: string): Promise<GroundingResult> {
  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to retrieve grounded search results.');
  }

  return {
    text: data.text || '',
    sources: data.sources || [],
    searchQueries: data.searchQueries || [],
  };
}

/**
 * Executes Google Maps Grounding via backend proxy (/api/maps)
 */
export async function fetchMapsGrounding(query: string): Promise<GroundingResult> {
  const res = await fetch('/api/maps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to retrieve grounded maps results.');
  }

  return {
    text: data.text || '',
    sources: data.sources || [],
  };
}
