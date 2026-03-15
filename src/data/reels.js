// src/data/reels.js
// ============================================================
//  All reel / portfolio items live here.
//  Swap thumbnailUrl and videoUrl with real CDN/Vimeo/YouTube
//  links when going live.
// ============================================================

import portfolioData from './portfolio.json';

export const reels = portfolioData.reels;

// ── Helpers ──────────────────────────────────────────────────

/** Returns only featured reels (shown on Home page) */
export const featuredReels = reels.filter((r) => r.featured);

/** Returns all unique categories for the Portfolio filter bar */
export const reelCategories = [
  'All',
  ...Array.from(new Set(reels.map((r) => r.category))),
];

/** Look up a single reel by slug */
export function getReelBySlug(slug) {
  return reels.find((r) => r.slug === slug) ?? null;
}

/** Get next and previous reels (wrapping) */
export function getAdjacentReels(slug) {
  const idx = reels.findIndex((r) => r.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = reels[(idx - 1 + reels.length) % reels.length];
  const next = reels[(idx + 1) % reels.length];
  return { prev, next };
}