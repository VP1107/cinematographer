// src/pages/ReelPage.jsx
// ============================================================
//  ReelPage — /portfolio/:slug
//  - Full-width ReactPlayer embed (YouTube / Vimeo)
//  - Dark placeholder until user clicks play
//  - Project title, year, description, credits
//  - Next / Previous project navigation
//  - "Back to Portfolio" link
// ============================================================

import React, { useState, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

import { getReelBySlug, getAdjacentReels } from '../data/reels';
import useScrollReveal from '../hooks/useScrollReveal';

const ReactPlayer = lazy(() => import('react-player'));

// ── Mandala credit divider ────────────────────────────────────
function CreditDivider({ accent = 'var(--gold)' }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2rem 0' }}
      aria-hidden="true"
    >
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${accent})` }} />
      <svg width="10" height="10" viewBox="0 0 10 10">
        <polygon points="5,0 10,5 5,10 0,5" fill={accent} opacity="0.7" />
      </svg>
      <svg width="6" height="6" viewBox="0 0 6 6">
        <circle cx="3" cy="3" r="2" fill={accent} opacity="0.4" />
      </svg>
      <svg width="10" height="10" viewBox="0 0 10 10">
        <polygon points="5,0 10,5 5,10 0,5" fill={accent} opacity="0.7" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  );
}

// ── Video embed section ───────────────────────────────────────
function VideoEmbed({ reel }) {
  const [playing,   setPlaying]   = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        background: 'var(--gray-dark)',
        overflow: 'hidden',
      }}
    >
      {/* ── Placeholder shown until play is clicked ── */}
      {!playing && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background: 'var(--off-black)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Shimmer */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, var(--gray-dark) 0%, var(--gray-mid) 50%, var(--gray-dark) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2.2s ease-in-out infinite',
              opacity: 0.5,
            }}
          />

          {/* Rangoli ring play button */}
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${reel.title}`}
            style={{
              position: 'relative',
              zIndex: 1,
              background: 'none',
              border: 'none',
              cursor: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
            }}
          >
            {/* Animated rings */}
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1px solid rgba(232,132,26,0.3)',
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '12px',
                  borderRadius: '50%',
                  border: '1px solid rgba(232,132,26,0.5)',
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
              {/* Centre circle */}
              <div
                style={{
                  position: 'absolute',
                  inset: '24px',
                  borderRadius: '50%',
                  background: 'rgba(232,132,26,0.12)',
                  border: '1.5px solid var(--saffron)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 300ms ease',
                }}
              >
                <Play size={20} fill="var(--saffron)" color="var(--saffron)" />
              </div>
            </div>

            {/* Labels */}
            <div style={{ textAlign: 'center' }}>
              {reel.titleHindi && (
                <p
                  style={{
                    fontFamily: 'var(--font-devanagari)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--saffron)',
                    opacity: 0.7,
                    marginBottom: '0.3rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  {reel.titleHindi}
                </p>
              )}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 300,
                  color: 'var(--white)',
                  letterSpacing: '0.04em',
                }}
              >
                {reel.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--white-muted)',
                  marginTop: '0.4rem',
                }}
              >
                Click to play
              </p>
            </div>
          </button>
        </div>
      )}

      {/* ── ReactPlayer — only mounts when playing ── */}
      {playing && (
        <Suspense fallback={null}>
          <ReactPlayer
            url={reel.videoUrl}
            playing={playing}
            controls
            width="100%"
            height="100%"
            onReady={() => setPlayerReady(true)}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: playerReady ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

// ── Credits grid ─────────────────────────────────────────────
function CreditsSection({ credits, accentColor }) {
  const LABEL_MAP = {
    director:   { en: 'Director'          },
    production: { en: 'Production'        },
    dop:        { en: 'Director of Photography' },
    editor:     { en: 'Editor'            },
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem',
      }}
    >
      {Object.entries(credits).map(([key, value]) => {
        const labels = LABEL_MAP[key] || { en: key, hi: '' };
        return (
          <div key={key}>
            <p
              style={{
                fontFamily: 'var(--font-devanagari)',
                fontSize: 'var(--text-xs)',
                color: accentColor,
                opacity: 0.65,
                letterSpacing: '0.06em',
                marginBottom: '0.2rem',
              }}
            >
              {labels.hi}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--white-muted)',
                marginBottom: '0.25rem',
              }}
            >
              {labels.en}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-md)',
                fontWeight: 400,
                color: 'var(--white)',
                letterSpacing: '0.03em',
              }}
            >
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ── Adjacent reel nav card ────────────────────────────────────
function AdjacentCard({ reel: adjReel, direction }) {
  const isNext = direction === 'next';
  return (
    <Link
      to={`/portfolio/${adjReel.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isNext ? 'flex-end' : 'flex-start',
        gap: '0.4rem',
        textDecoration: 'none',
        padding: '1rem',
        border: '1px solid rgba(200,169,110,0.1)',
        borderRadius: '2px',
        flex: 1,
        transition: 'border-color 220ms ease, background 220ms ease',
        maxWidth: '320px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(232,132,26,0.35)';
        e.currentTarget.style.background = 'rgba(232,132,26,0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(200,169,110,0.1)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          flexDirection: isNext ? 'row-reverse' : 'row',
        }}
      >
        {isNext ? <ArrowRight size={14} color="var(--saffron)" /> : <ArrowLeft size={14} color="var(--saffron)" />}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--saffron)',
          }}
        >
          {isNext ? 'Next' : 'Previous'}
        </span>
      </div>
      {adjReel.titleHindi && (
        <p
          style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: 'var(--text-xs)',
            color: 'var(--saffron)',
            opacity: 0.6,
          }}
        >
          {adjReel.titleHindi}
        </p>
      )}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-md)',
          fontWeight: 400,
          color: 'var(--white)',
          letterSpacing: '0.03em',
        }}
      >
        {adjReel.title}
      </p>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function ReelPage() {
  const { slug }           = useParams();
  const navigate           = useNavigate();
  const reel               = getReelBySlug(slug);
  const { prev, next }     = reel ? getAdjacentReels(slug) : {};
  const infoRef            = useScrollReveal({ delay: 0 });

  // 404 state
  if (!reel) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          paddingTop: '6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          background: 'var(--black)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: 'var(--text-2xl)',
            color: 'var(--saffron)',
            opacity: 0.4,
          }}
        >
          ॐ
        </p>
        <h1
          style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--white)' }}
        >
          Project not found.
        </h1>
        <button
          onClick={() => navigate('/portfolio')}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--saffron-light)',
            background: 'none',
            border: 'none',
            borderBottom: '1px solid var(--saffron)',
            paddingBottom: '2px',
            cursor: 'none',
          }}
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  // Pick accent by category
  const ACCENT_MAP = {
    Commercial:          'var(--saffron)',
    'Music Video':       'var(--teal-light)',
    'Short Film':        'var(--crimson)',
    Documentary:         'var(--gold)',
    'Creative Direction':'var(--saffron)',
  };
  const accent = ACCENT_MAP[reel.category] || 'var(--saffron)';

  return (
    <div
      style={{
        paddingTop: '4rem',
        background: 'var(--black)',
        minHeight: '100dvh',
      }}
    >
      {/* ── Back link ── */}
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1rem' }}>
        <Link
          to="/portfolio"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--white-muted)',
            textDecoration: 'none',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--saffron-light)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--white-muted)'; }}
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>
      </div>

      {/* ── Full-width player ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', background: 'var(--off-black)' }}
      >
        <VideoEmbed reel={reel} />
      </motion.div>

      {/* ── Info section ── */}
      <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
        <div
          ref={infoRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2rem',
            alignItems: 'start',
            marginBottom: 'var(--space-8)',
          }}
          className="reel-info-grid"
        >
          {/* Title block */}
          <div>
            {reel.titleHindi && (
              <p
                style={{
                  fontFamily: 'var(--font-devanagari)',
                  fontSize: 'var(--text-base)',
                  color: accent,
                  opacity: 0.75,
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                }}
              >
                {reel.titleHindi}
              </p>
            )}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 300,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                color: 'var(--white)',
                marginBottom: '0.5rem',
              }}
            >
              {reel.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: accent,
                opacity: 0.75,
              }}
            >
              {reel.category} — {reel.year}
            </p>
          </div>

          {/* Year badge */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 300,
              color: accent,
              opacity: 0.08,
              lineHeight: 1,
              userSelect: 'none',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {reel.year}
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-md)',
            fontWeight: 300,
            color: 'var(--white-dim)',
            lineHeight: 1.8,
            maxWidth: '68ch',
            marginBottom: 'var(--space-8)',
          }}
        >
          {reel.description}
        </p>

        {/* Credits */}
        {reel.credits && (
          <>
            <CreditDivider accent={accent} />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: accent,
                marginBottom: '1rem',
              }}
            >
              Credits
            </p>
            <CreditsSection credits={reel.credits} accentColor={accent} />
          </>
        )}

        {/* Next / Prev navigation */}
        <div
          style={{
            marginTop: 'var(--space-16)',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid rgba(200,169,110,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {prev ? <AdjacentCard reel={prev} direction="prev" /> : <div />}
          {next && <AdjacentCard reel={next} direction="next" />}
        </div>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .reel-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}