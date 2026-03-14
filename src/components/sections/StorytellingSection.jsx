// src/components/sections/StorytellingSection.jsx
// ============================================================
//  StorytellingSection — GSAP ScrollTrigger pinned container
//  Three panels scrub in as user scrolls:
//    1. "हर फ्रेम एक कहानी है" — Every frame tells a story
//    2. "रोशनी में भावना"       — Emotion through lighting
//    3. "सिनेमा में गति"       — Movement through cinema
//
//  Degrades gracefully on prefers-reduced-motion (static layout)
// ============================================================

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoPlaceholder from '../ui/VideoPlaceholder';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    id:          'p1',

    english:     'Every frame\ntells a story.',
    sub:         'The image before the cut is just as important as the image after it. Silence, held.',
    accent:      'var(--saffron)',
  },
  {
    id:          'p2',

    english:     'Emotion through\nlighting.',
    sub:         'A single shaft of afternoon light through a Rajasthani jharokha says more than dialogue.',
    accent:      'var(--crimson)',
  },
  {
    id:          'p3',

    english:     'Movement through\ncinema.',
    sub:         'The camera is not an observer — it is a participant. Every move has intention.',
    accent:      'var(--teal-light)',
  },
];

export default function StorytellingSection() {
  const sectionRef   = useRef(null);
  const trackRef     = useRef(null);
  const panelRefs    = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current;
      if (!panels.length || !trackRef.current) return;

      // Pin the section and scrub panels horizontally
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:  sectionRef.current,
          start:    'top top',
          end:      () => `+=${window.innerWidth * (PANELS.length - 1)}`,
          scrub:    1,
          pin:      true,
          anticipatePin: 1,
        },
      });

      // Slide track leftward
      tl.to(trackRef.current, {
        x: () => -(window.innerWidth * (PANELS.length - 1)),
        ease: 'none',
      });

      // Fade + slide text in per panel
      panels.forEach((panel, i) => {
        const textEl  = panel.querySelector('.panel-text');
        const mediaEl = panel.querySelector('.panel-media');

        if (i > 0 && textEl) {
          tl.fromTo(
            textEl,
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
            i - 1,
          );
        }
        if (mediaEl) {
          tl.fromTo(
            mediaEl,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
            i > 0 ? i - 0.8 : 0,
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100dvh',
        overflow: 'hidden',
        background: 'var(--black)',
        position: 'relative',
      }}
      aria-label="Cinematic philosophy"
    >
      {/* Scrolling track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          height: '100%',
          width: `${PANELS.length * 100}vw`,
          willChange: 'transform',
        }}
      >
        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            ref={(el) => (panelRefs.current[i] = el)}
            style={{
              width: '100vw',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              padding: '0 clamp(1.5rem, 6vw, 5rem)',
              gap: '3rem',
              position: 'relative',
            }}
            className="story-panel"
          >
            {/* Left: text */}
            <div className="panel-text">


              {/* English heading */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                  color: 'var(--white)',
                  whiteSpace: 'pre-line',
                  marginBottom: '1.5rem',
                }}
              >
                {panel.english}
              </h2>

              {/* Ornament line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1.5rem',
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    width: '32px',
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${panel.accent})`,
                  }}
                />
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <polygon points="4,0 8,4 4,8 0,4" fill={panel.accent} opacity="0.8" />
                </svg>
                <div
                  style={{
                    width: '60px',
                    height: '1px',
                    background: `linear-gradient(90deg, ${panel.accent}, transparent)`,
                  }}
                />
              </div>

              {/* Sub text */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                  fontWeight: 300,
                  color: 'var(--white-dim)',
                  lineHeight: 1.7,
                  maxWidth: '42ch',
                }}
              >
                {panel.sub}
              </p>

              {/* Panel number */}
              <p
                style={{
                  position: 'absolute',
                  bottom: '2.5rem',
                  left: 'clamp(1.5rem, 6vw, 5rem)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: 300,
                  color: panel.accent,
                  opacity: 0.06,
                  lineHeight: 1,
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </p>
            </div>

            {/* Right: video placeholder */}
            <div
              className="panel-media"
              style={{ height: 'clamp(240px, 50vh, 520px)' }}
            >
              <VideoPlaceholder
                aspectRatio="16/9"
                accentColor={panel.accent}
                showPlay={false}
                style={{ height: '100%', borderRadius: '2px' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reduced-motion fallback — stacked vertical layout */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .story-panel {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 680px) {
          .story-panel {
            grid-template-columns: 1fr !important;
            overflow-y: auto;
          }
        }
      `}</style>
    </section>
  );
}