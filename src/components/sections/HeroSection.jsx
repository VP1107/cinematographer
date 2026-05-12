// src/components/sections/HeroSection.jsx
// ============================================================
//  HeroSection — full-viewport cinematic hero
//  - Muted looping YouTube/Vimeo via ReactPlayer (lazy)
//  - Dark gradient overlay with warm sepia tint
//  - Cormorant Garamond name + tagline
//  - Animated scroll indicator
//  - Rangoli SVG corner ornaments
// ============================================================

import React, { useState, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ReactPlayer = lazy(() => import('react-player'));

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
  videoUrl     = '',   // leave empty until you have a real URL — pass a YouTube/Vimeo link to enable
  name         = 'Tapan Vyas',
  tagline      = 'Crafting Stories Through Light and Motion.',
  taglineHindi = '',
}) {
  const [videoReady, setVideoReady] = useState(false);
  const playerRef                   = useRef(null);

  return (
    <section className="hero-section" aria-label="Hero">
      {/* ── Left Content (Text & Buttons) ── */}
      <div className="hero-content">
        <div className="hero-text-wrapper">
          {/* Devanagari eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hero-eyebrow"
          >
          </motion.p>

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

          {taglineHindi && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="hero-tagline-hindi"
            >
              {taglineHindi}
            </motion.p>
          )}

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
                e.currentTarget.style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--saffron)';
                e.currentTarget.style.color = 'var(--black)';
              }}
            >
              View Work
            </Link>
            <Link
              to="/contact"
              className="btn-secondary"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.color = 'var(--gold-dim)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,169,110,0.45)';
                e.currentTarget.style.color = 'var(--white)';
              }}
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Right Media (Video/Image) ── */}
      <div className="hero-media">
        <div className="hero-media-inner">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--black)',
              backgroundImage: 'url("/image.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}
          >
            {/* Only mount ReactPlayer when a real URL is provided */}
            {videoUrl && (
              <Suspense fallback={null}>
                <ReactPlayer
                  ref={playerRef}
                  url={videoUrl}
                  playing
                  loop
                  muted
                  controls={false}
                  playsinline
                  width="100%"
                  height="100%"
                  onReady={() => setVideoReady(true)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: videoReady ? 1 : 0,
                    transition: 'opacity 1s ease',
                    transform: 'scale(1.05)',
                  }}
                  config={{
                    youtube: { playerVars: { modestbranding: 1, rel: 0 } },
                    vimeo:   { playerOptions: { background: true } },
                  }}
                />
              </Suspense>
            )}
          </div>

          {/* Gradient overlay to soften edge on desktop */}
          <div
            aria-hidden="true"
            className="hero-media-gradient"
          />

          {/* Corner rangoli ornaments */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            <CornerOrnament position="top-right"    />
            <CornerOrnament position="bottom-right" />
          </div>
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
          flex-direction: column-reverse;
          background: var(--black);
          overflow: hidden;
        }

        .hero-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-8);
          position: relative;
          z-index: 3;
          text-align: center;
        }

        .hero-text-wrapper {
          max-width: 600px;
          margin-top: -4rem; /* Lift text slightly on mobile */
        }

        .hero-media {
          flex: 1;
          position: relative;
          min-height: 45vh;
        }

        .hero-media-inner {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero-media-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--black) 0%, transparent 20%);
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
          color: var(--white);
          padding-left: 0.08em;
          text-shadow: 0 2px 40px rgba(0,0,0,0.1);
        }

        .hero-divider {
          width: 100%;
          max-width: 320px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--saffron), var(--crimson), var(--teal), transparent);
          margin: 1.4rem auto;
          transform-origin: center;
        }

        .hero-tagline {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--white-dim);
          margin-bottom: 0.4rem;
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
          color: var(--black);
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
          color: var(--white);
          background: transparent;
          border: 1px solid rgba(200,169,110,0.45);
          padding: 0.65rem 1.8rem;
          text-decoration: none;
          transition: border-color 220ms ease, color 220ms ease;
        }

        /* Desktop Layout */
        @media (min-width: 768px) {
          .hero-section {
            flex-direction: row;
          }

          .hero-content {
            padding-left: max(var(--space-8), calc((100vw - 1280px) / 2 + var(--space-8)));
            padding-right: var(--space-12);
            text-align: left;
            justify-content: flex-start;
          }

          .hero-text-wrapper {
             margin-top: 0;
          }

          .hero-media-gradient {
            background: linear-gradient(to right, var(--black) 0%, transparent 20%);
          }

          .hero-divider {
            margin: 1.4rem 0;
            background: linear-gradient(90deg, var(--saffron), var(--crimson), var(--teal), transparent);
          }

          .hero-buttons {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
}