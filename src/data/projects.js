// src/data/projects.js
// ============================================================
//  Selected Projects — shown on Home page "Selected Projects"
//  section and as large-card highlights. Separate from the
//  full reel list in reels.js.
// ============================================================

export const projects = [
  {
    slug: 'roshni-brand-film',        // must match a slug in reels.js
    title: 'Roshni',

    subtitle: 'Brand Film — Sustainable Textiles',
    year: 2024,
    client: 'Sundari Handlooms',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    videoUrl: 'https://vimeo.com/123456789',
    description:
      'A meditation on light and craft — shot across three days in Varanasi during the winter fog season. The brief was simple: make the world see what handloom weavers already know.',
    accentColor: 'var(--saffron)',
  },
  {
    slug: 'kahaani-short-film',
    title: 'Kahāni',

    subtitle: 'Short Film — MAMI Selection 2023',
    year: 2023,
    client: 'Dhoop Films',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
    videoUrl: 'https://vimeo.com/345678901',
    description:
      "Selected for Mumbai's MAMI Film Festival. A quiet, devastating portrait of departure — shot entirely on natural light through the windows of a Rajasthan-bound train.",
    accentColor: 'var(--crimson)',
  },
  {
    slug: 'nritya-performance',
    title: 'Nritya',

    subtitle: 'Performance Film — Bharatanatyam',
    year: 2022,
    client: 'Tandav Arts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80',
    videoUrl: 'https://vimeo.com/789012345',
    description:
      'High-speed and single-source lighting documentation of Bharatanatyam movement. The film became a reference piece for the intersection of classical Indian performance and cinematic form.',
    accentColor: 'var(--teal)',
  },
  {
    slug: 'raag-music-video',
    title: 'Raag',

    subtitle: 'Music Video — Hindustani Fusion',
    year: 2024,
    client: 'Indigo Pictures',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    videoUrl: 'https://vimeo.com/234567890',
    description:
      'Chaos and precision in the same frame — a music video that refuses to choose between Hindustani classical tradition and electronic modernity, just like the music itself.',
    accentColor: 'var(--gold)',
  },
];