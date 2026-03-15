// src/components/ui/VideoPlaceholder.jsx
// ============================================================
//  VideoPlaceholder — dark shimmer skeleton for every video
//  slot. Shows until real media loads or user clicks play.
//
//  Props:
//    thumbnailUrl {string}   — image to show in the background
//    title        {string}   — optional label at bottom-left
//    titleHindi   {string}   — optional Hindi subtitle
//    aspectRatio  {string}   — CSS aspect-ratio, default "16/9"
//    onPlay       {fn}       — called when user clicks the play btn
//    showPlay     {bool}     — show play button (default true)
//    category     {string}   — category badge top-right
//    accentColor  {string}   — CSS color for play ring (default saffron)
//    className    {string}
//    style        {object}
// ============================================================

import React, { useState } from 'react';
import LazyImage from '../../utils/lazyImage';

// ── Mandala-ring play button ─────────────────────────────────
function PlayButton({ accent = 'var(--saffron)', hovered }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '64px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 300ms var(--ease-circ)',
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
      }}
    >
      {/* Outer decorative ring */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        style={{
          position: 'absolute',
          inset: 0,
          transition: 'opacity 300ms ease',
          opacity: hovered ? 1 : 0.6,
        }}
        aria-hidden="true"
      >
        {/* Dashed ring */}
        <circle
          cx="32" cy="32" r="29"
          stroke={accent}
          strokeWidth="0.8"
          strokeDasharray="5 3"
          opacity="0.6"
        />
        {/* Solid inner ring */}
        <circle
          cx="32" cy="32" r="22"
          stroke={accent}
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Rangoli dots at cardinal points */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 32 + 29 * Math.cos(rad);
          const cy = 32 + 29 * Math.sin(rad);
          return (
            <circle key={angle} cx={cx} cy={cy} r="2" fill={accent} opacity="0.8" />
          );
        })}
        {/* Diagonal dots */}
        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 32 + 29 * Math.cos(rad);
          const cy = 32 + 29 * Math.sin(rad);
          return (
            <circle key={angle} cx={cx} cy={cy} r="1.2" fill="var(--crimson)" opacity="0.6" />
          );
        })}
      </svg>

      {/* Centre circle + play triangle */}
      <div
        style={{
          position: 'relative',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: hovered
            ? `rgba(232,132,26,0.18)`
            : 'rgba(247,240,230,0.08)',
          border: `1.5px solid ${accent}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 300ms ease, border-color 300ms ease',
        }}
      >
        {/* Play triangle */}
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
          <path
            d="M1 1.5L13 8L1 14.5V1.5Z"
            fill={hovered ? accent : 'rgba(247,240,230,0.7)'}
            stroke={hovered ? accent : 'rgba(247,240,230,0.5)'}
            strokeWidth="0.8"
            style={{ transition: 'fill 300ms ease' }}
          />
        </svg>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function VideoPlaceholder({
  thumbnailUrl,
  title,
  titleHindi,
  aspectRatio = '16/9',
  onPlay,
  showPlay = true,
  category,
  accentColor = 'var(--saffron)',
  className = '',
  style: styleProp = {},
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (onPlay) onPlay();
  };

  return (
    <div
      className={className}
      role={onPlay ? 'button' : undefined}
      aria-label={onPlay ? `Play ${title ?? 'video'}` : undefined}
      tabIndex={onPlay ? 0 : undefined}
      onKeyDown={onPlay ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); } : undefined}
      onClick={onPlay ? handleClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        background: 'var(--gray-dark)',
        overflow: 'hidden',
        cursor: onPlay ? 'none' : 'default',
        ...styleProp,
      }}
    >
      {/* ── Background Image — native lazy load ── */}
      {thumbnailUrl && (
        <LazyImage
          src={thumbnailUrl}
          alt={title || 'Video thumbnail'}
          aspectRatio={aspectRatio}
          style={{ position: 'absolute', inset: 0 }}
        />
      )}

      {/* ── Shimmer sweep (fallback/loading state) ── */}
      {!thumbnailUrl && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, var(--gray-dark) 0%, var(--gray-mid) 50%, var(--gray-dark) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.2s ease-in-out infinite',
          }}
        />
      )}

      {/* ── Sepia/haldi warm tint overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(200,120,20,0.04)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Subtle rangoli watermark ── */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      >
        <circle cx="40" cy="40" r="36" stroke="var(--gold)" strokeWidth="0.6" />
        <circle cx="40" cy="40" r="24" stroke="var(--gold)" strokeWidth="0.6" />
        <circle cx="40" cy="40" r="12" stroke="var(--gold)" strokeWidth="0.6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={40 + 12 * Math.cos(r)} y1={40 + 12 * Math.sin(r)}
              x2={40 + 36 * Math.cos(r)} y2={40 + 36 * Math.sin(r)}
              stroke="var(--gold)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* ── Hover overlay darken ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6,5,10,0.3)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 300ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Category badge ── */}
      {category && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '3px 10px',
            background: 'rgba(6,5,10,0.7)',
            border: '1px solid rgba(232,132,26,0.3)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--saffron-light)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {category}
        </div>
      )}

      {/* ── Play button (centred) ── */}
      {showPlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlayButton accent={accentColor} hovered={hovered} />
        </div>
      )}

      {/* ── Title block ── */}
      {(title || titleHindi) && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem 1rem 0.9rem',
            background: 'linear-gradient(to top, rgba(6,5,10,0.85) 0%, transparent 100%)',
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            opacity: hovered ? 1 : 0.7,
            transition: 'transform 300ms var(--ease-circ), opacity 300ms ease',
          }}
        >
          {titleHindi && (
            <p
              style={{
                fontFamily: 'var(--font-devanagari)',
                fontSize: 'var(--text-xs)',
                color: accentColor,
                letterSpacing: '0.08em',
                marginBottom: '0.15rem',
                opacity: 0.8,
              }}
            >
              {titleHindi}
            </p>
          )}
          {title && (
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-md)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'var(--white)',
                lineHeight: 1.2,
              }}
            >
              {title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}