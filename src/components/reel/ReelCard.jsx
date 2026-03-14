// src/components/reel/ReelCard.jsx
// ============================================================
//  ReelCard — shared card used on Home featured grid AND
//  the full Portfolio page. Clicking always navigates to
//  /portfolio/[slug] — never opens a modal.
//
//  Props:
//    reel   {object}  — item from /data/reels.js
//    index  {number}  — stagger index for entrance animation
// ============================================================

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoPlaceholder from '../ui/VideoPlaceholder';

// ── Accent colour cycling ────────────────────────────────────
const ACCENTS = [
  'var(--saffron)',
  'var(--crimson)',
  'var(--teal-light)',
  'var(--gold)',
];

export default function ReelCard({ reel, index = 0 }) {
  const navigate  = useNavigate();
  const cardRef   = useRef(null);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  const handleNavigate = () => {
    navigate(`/portfolio/${reel.slug}`);
  };

  // ── Entrance animation variants ──────────────────────────
  const cardVariants = {
    hidden:  { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleNavigate}
      role="link"
      aria-label={`View project: ${reel.title}`}
      style={{
        position: 'relative',
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* ── Thumbnail / video placeholder ── */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-sm)',
          // Subtle glow on hover matching accent
          boxShadow: hovered
            ? `0 8px 40px ${accent.replace(')', ', 0.2)').replace('var(', 'rgba(').replace('--saffron', '232,132,26').replace('--crimson', '181,21,43').replace('--teal-light', '38,168,190').replace('--gold', '200,169,110')}`
            : '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'box-shadow 400ms ease',
        }}
      >
        {/* Scale-up wrapper on hover */}
        <div
          style={{
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 600ms var(--ease-circ)',
          }}
        >
          <VideoPlaceholder
            title={reel.title}
            titleHindi={reel.titleHindi}
            onPlay={handleNavigate}
            category={reel.category}
            accentColor={accent}
            showPlay
          />
        </div>

        {/* Thin accent line at bottom on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 300ms ease',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Meta: year + category ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '2px',
        }}
      >
        {/* Title + Hindi subtitle */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 400,
              letterSpacing: '0.03em',
              color: hovered ? 'var(--white)' : 'var(--white-dim)',
              transition: 'color 250ms ease',
              lineHeight: 1.2,
            }}
          >
            {reel.title}
          </p>
          {reel.titleHindi && (
            <p
              style={{
                fontFamily: 'var(--font-devanagari)',
                fontSize: 'var(--text-xs)',
                color: accent,
                opacity: hovered ? 0.85 : 0.5,
                letterSpacing: '0.06em',
                marginTop: '1px',
                transition: 'opacity 250ms ease',
              }}
            >
              {reel.titleHindi}
            </p>
          )}
        </div>

        {/* Year badge */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.12em',
            color: 'var(--white-muted)',
            flexShrink: 0,
            marginLeft: '1rem',
          }}
        >
          {reel.year}
        </span>
      </div>
    </motion.article>
  );
}