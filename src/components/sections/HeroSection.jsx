// src/components/sections/HeroSection.jsx
// ============================================================
//  HeroSection — full-viewport cinematic hero
//  - Muted looping YouTube/Vimeo via ReactPlayer (lazy)
//  - Dark gradient overlay with warm sepia tint
//  - Cormorant Garamond name + tagline
//  - Animated scroll indicator
//  - Rangoli SVG corner ornaments
// ============================================================

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import YouTubeEmbed from '../ui/YouTubeEmbed';

// ── Rangoli corner ornament ───────────────────────────────────
function CornerOrnament({ position }) {
  const isRight  = position.includes('right');
  const isBottom = position.includes('bottom');

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...(isBottom ? { bottom: '1.5rem' } : { top: '5.5rem' }),
        ...(isRight  ? { right: '1.5rem'  } : { left: '1.5rem' }),
        opacity: 0.18,
        transform: `rotate(${isRight ? (isBottom ? 180 : 90) : isBottom ? 270 : 0}deg)`,
        pointerEvents: 'none',
      }}
    >
      <path d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z" fill="var(--saffron)" />
      <circle cx="40" cy="40" r="12" stroke="var(--gold)" strokeWidth="0.8" opacity="0.6" />
      <circle cx="40" cy="40" r="6"  stroke="var(--crimson)" strokeWidth="0.7" opacity="0.5" />
      {[0, 90, 180, 270].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={40 + 12 * Math.cos(r)}
            cy={40 + 12 * Math.sin(r)}
            r="1.8"
            fill="var(--saffron)"
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
}

// ── Animated scroll indicator ─────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
      }}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(247,240,230,0.45)',
          paddingLeft: '0.22em', // Offset letter-spacing for center alignment
        }}
      >
        scroll
      </span>

      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, rgba(232,132,26,0.6), transparent)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            background: 'var(--saffron)',
            height: '30%',
          }}
          animate={{ y: [0, 32] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.2,
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Main HeroSection ──────────────────────────────────────────
export default function HeroSection({
  videoUrl     = '',   // leave empty until you have a real URL — pass a YouTube link to enable
  name         = 'Tapan Vyas',
  tagline      = 'Crafting Stories Through Light and Motion.',
}) {
  const [videoReady, setVideoReady] = useState(false);
  const playerRef                   = useRef(null);

  return (
    <section className="hero-section" aria-label="Hero">
      {/* ── Right Media (Video/Image) ── */}
      <div className="hero-media">
        <div className="hero-media-inner">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--black)',
              zIndex: 0,
            }}
          >
            <img
              src="/image.webp"
              alt="Hero Background"
              fetchPriority="high"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            />
            {/* Only mount YouTube embed when a real URL is provided */}
            {videoUrl && (
              <YouTubeEmbed
                url={videoUrl}
                playing
                loop
                muted
                controls={false}
                onReady={() => setVideoReady(true)}
                style={{
                  opacity: videoReady ? 1 : 0,
                  transition: 'opacity 1s ease',
                  transform: 'scale(1.05)',
                }}
              />
            )}
          </div>

          {/* Gradient overlay to soften edge on desktop */}
          <div
            aria-hidden="true"
            className="hero-media-gradient"
          />

          {/* Corner rangoli ornaments */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            <CornerOrnament position="top-left"     />
            <CornerOrnament position="top-right"    />
            <CornerOrnament position="bottom-left"  />
            <CornerOrnament position="bottom-right" />
          </div>
        </div>
      </div>

      {/* ── Left Content (Text & Buttons) ── */}
      <div className="hero-content">
        <div className="hero-text-wrapper">
          {/* Name */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-title"
            >
              {name}
            </motion.h1>
          </div>

          {/* Saffron → crimson → teal gradient rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-divider"
            aria-hidden="true"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-tagline"
          >
            {tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hero-buttons"
          >
            <Link
              to="/portfolio"
              className="btn-primary"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--saffron-dim)';
                e.currentTarget.style.color = '#f7f0e6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--saffron)';
                e.currentTarget.style.color = '#06050a';
              }}
            >
              View Work
            </Link>
            <Link
              to="/contact"
              className="btn-secondary"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.color = 'var(--gold-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,169,110,0.45)';
                e.currentTarget.style.color = '#f7f0e6';
              }}
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />

      {/* ── CSS Styles ── */}
      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100dvh;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--black);
          overflow: hidden;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          padding: var(--space-8);
        }

        .hero-text-wrapper {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-media {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-media-inner {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero-media-gradient {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5); /* Contrast overlay */
          z-index: 1;
        }

        .hero-eyebrow {
          font-family: var(--font-devanagari);
          font-size: var(--text-sm);
          letter-spacing: 0.25em;
          color: var(--saffron);
          opacity: 0.75;
          margin-bottom: 0.75rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 300;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1;
          color: #f7f0e6;
          padding-left: 0.08em;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }

        .hero-divider {
          width: 100%;
          max-width: 400px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--saffron), var(--crimson), var(--teal), transparent);
          margin: 1.4rem 0;
          transform-origin: center;
        }

        .hero-tagline {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          letter-spacing: 0.06em;
          color: #f7f0e6;
          margin-bottom: 0.4rem;
          text-shadow: 0 1px 15px rgba(0,0,0,0.8);
        }

        .hero-tagline-hindi {
          font-family: var(--font-devanagari);
          font-size: var(--text-base);
          color: var(--saffron);
          opacity: 0.8;
          letter-spacing: 0.08em;
        }

        .hero-buttons {
          margin-top: 2.5rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #06050a;
          background: var(--saffron);
          border: 1px solid var(--saffron);
          padding: 0.65rem 1.8rem;
          text-decoration: none;
          transition: background 220ms ease, color 220ms ease;
        }

        .btn-secondary {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #f7f0e6;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(200,169,110,0.6);
          padding: 0.65rem 1.8rem;
          text-decoration: none;
          transition: border-color 220ms ease, color 220ms ease, background 220ms ease;
        }

        .btn-secondary:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </section>
  );
}