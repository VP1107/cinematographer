// src/data/reels.js
// ============================================================
//  All reel / portfolio items live here.
//  Swap thumbnailUrl and videoUrl with real CDN/Vimeo/YouTube
//  links when going live.
// ============================================================

export const reels = [
  {
    slug: 'roshni-brand-film',
    title: 'Roshni — Brand Film',

    category: 'Commercial',
    year: 2024,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    videoUrl: 'https://vimeo.com/123456789',
    description:
      'A meditative brand film for a sustainable Indian textiles label. Shot across the ghats of Varanasi at golden hour, the film celebrates the quiet dignity of handloom weavers and the warmth of natural dyes.',
    credits: {
      director: 'Arjun Mehta',
      production: 'Amber Frame Studio',
      dop: 'Your Name Here',
      editor: 'Priya Nair',
    },
    featured: true,
  },
  {
    slug: 'raag-music-video',
    title: 'Raag — Music Video',

    category: 'Music Video',
    year: 2024,
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    videoUrl: 'https://vimeo.com/234567890',
    description:
      'Visual accompaniment for an indie fusion artist blending Hindustani classical ragas with electronic production. High-contrast lighting, slow-motion tabla sequences, and peacock-blue chroma work.',
    credits: {
      director: 'Your Name Here',
      production: 'Indigo Pictures',
      dop: 'Your Name Here',
      editor: 'Rohan Das',
    },
    featured: true,
  },
  {
    slug: 'kahaani-short-film',
    title: 'Kahāni — Short Film',

    category: 'Short Film',
    year: 2023,
    thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    videoUrl: 'https://vimeo.com/345678901',
    description:
      'Award-winning short following a retired railway conductor on his last journey through Rajasthan. Intimate handheld cinematography, natural window light, and a warm sepia grade that feels like old Kodak.',
    credits: {
      director: 'Sanya Kapoor',
      production: 'Dhoop Films',
      dop: 'Your Name Here',
      editor: 'Vikram Rao',
    },
    featured: true,
  },
  {
    slug: 'saarang-fashion-film',
    title: 'Sārang — Fashion Film',

    category: 'Commercial',
    year: 2023,
    thumbnailUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    videoUrl: 'https://vimeo.com/456789012',
    description:
      'A high-fashion editorial for a couture bridal label. Shot in a crumbling haveli in Jodhpur, the film juxtaposes ancient Rajput architecture with ultra-modern silhouettes.',
    credits: {
      director: 'Your Name Here',
      production: 'Noor Creative',
      dop: 'Your Name Here',
      editor: 'Aisha Bose',
    },
    featured: false,
  },
  {
    slug: 'udaan-documentary',
    title: 'Udān — Documentary',

    category: 'Documentary',
    year: 2023,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    videoUrl: 'https://vimeo.com/567890123',
    description:
      'A short documentary portrait of kite-makers in Ahmedabad during Uttarayan. Long lenses, rooftop light, and the chaos of ten thousand kites in an Amdavadi sky.',
    credits: {
      director: 'Your Name Here',
      production: 'Self-produced',
      dop: 'Your Name Here',
      editor: 'Manish Joshi',
    },
    featured: false,
  },
  {
    slug: 'aanch-commercial',
    title: 'Āñch — Brand Spot',

    category: 'Commercial',
    year: 2022,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    videoUrl: 'https://vimeo.com/678901234',
    description:
      'A 60-second brand spot for a premium Indian spice company. Macro cinematography of whole spices, steam, and flame — a sensory film that smells through the screen.',
    credits: {
      director: 'Kabir Singh',
      production: 'Red Masala Films',
      dop: 'Your Name Here',
      editor: 'Tara Menon',
    },
    featured: false,
  },
  {
    slug: 'nritya-performance',
    title: 'Nritya — Performance Film',

    category: 'Creative Direction',
    year: 2022,
    thumbnailUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    videoUrl: 'https://vimeo.com/789012345',
    description:
      'A performance film for a Bharatanatyam dancer — capturing mudras, footwork, and expression with high-speed cameras and dramatic single-source lighting. Premiered at the MAMI Film Festival.',
    credits: {
      director: 'Your Name Here',
      production: 'Tandav Arts',
      dop: 'Your Name Here',
      editor: 'Shreya Pillai',
    },
    featured: false,
  },
  {
    slug: 'patang-music-video-2',
    title: 'Patang — Music Video',

    category: 'Music Video',
    year: 2022,
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    videoUrl: 'https://vimeo.com/890123456',
    description:
      'Aerial and street-level cinematography for an Ahmedabad-based indie band. The video weaves rooftop life, Old City alleyways, and the Sabarmati riverfront into a love letter to the city.',
    credits: {
      director: 'Your Name Here',
      production: 'Patan Records',
      dop: 'Your Name Here',
      editor: 'Dev Shah',
    },
    featured: false,
  },
];

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