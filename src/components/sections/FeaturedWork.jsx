// src/components/sections/FeaturedWork.jsx
// ============================================================
//  FeaturedWork — 3-col responsive reel grid for the Home page
//  Pulls first 3 featured reels from /data/reels.js
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import ReelCard       from '../reel/ReelCard';
import { featuredReels } from '../../data/reels';

export default function FeaturedWork() {
  return (
    <section
      style={{
        padding: 'var(--space-24) 0',
        background: 'var(--off-black)',
        position: 'relative',
      }}
      aria-label="Featured Work"
    >
      {/* Subtle rangoli bg */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23c8a96e' stroke-width='0.4' opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Cline x1='10' y1='40' x2='70' y2='40'/%3E%3Cline x1='40' y1='10' x2='40' y2='70'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <SectionHeading
          eyebrow="Selected Work"
          eyebrowHindi="चुनी हुई कृतियाँ"
          heading="Featured Reels"
          sub="A selection of recent work spanning commercials, music videos, and short films across India."
          accentColor="var(--saffron)"
          style={{ marginBottom: 'var(--space-12)' }}
        />

        {/* 3-col grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="reel-grid"
        >
          {featuredReels.slice(0, 3).map((reel, i) => (
            <ReelCard key={reel.slug} reel={reel} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
          <Link
            to="/portfolio"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--white-dim)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(200,169,110,0.3)',
              paddingBottom: '3px',
              transition: 'color 220ms ease, border-color 220ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--saffron-light)';
              e.currentTarget.style.borderColor = 'var(--saffron)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--white-dim)';
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)';
            }}
          >
            View All Work
          </Link>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px)  { .reel-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px)  { .reel-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}