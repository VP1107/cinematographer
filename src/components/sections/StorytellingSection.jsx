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
import LazyImage from '../../utils/lazyImage';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    id: 'p1',

    english: 'Every frame\ntells a story.',
    sub: 'The foundation of engineering brings precision; FTII Pune training instills cinematic soul. Every frame is a deliberately structured narrative.',
    accent: 'var(--saffron)',
    imageUrl: './assets/every_frame_story.webp',
  },
  {
    id: 'p2',
    english: 'Emotion through\nlighting.',
    sub: 'Light doesn\'t just illuminate—it speaks. Whether it\'s the golden warmth in Love Ni Bhavai or the stark contrasts of Mijaaj, lighting shapes the psychological landscape of the scene.',
    accent: 'var(--crimson)',
    imageUrl: './assets/tpanvyas panel 3.jpeg',
  },
  {
    id: 'p3',
    english: 'Movement through\ncinema.',
    sub: 'The camera is not an observer — it is a participant. Transitioning smoothly between raw realism and stylized elegance, every move has intention.',
    accent: 'var(--teal-light)',
    imageUrl: './assets/tapanvyas panel2.jpeg',
  },
];

export default function StorytellingSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current;
      if (!panels.length || !trackRef.current) return;

      // Pin the section and scrub panels horizontally
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Use a fixed duration for track sliding so we can sync text animations
      tl.to(trackRef.current, {
        xPercent: -100 * (panels.length - 1) / panels.length,
        ease: 'none',
        duration: 1,
      }, 0);

      // Fade + slide text in per panel
      panels.forEach((panel, i) => {
        const textEl = panel.querySelector('.panel-text');
        const mediaEl = panel.querySelector('.panel-media');
        
        // i=0 is centered at 0, i=1 at 0.5, i=2 at 1.0
        const centerTime = i / (panels.length - 1);

        if (i > 0) {
          if (textEl) {
            tl.fromTo(
              textEl,
              { opacity: 0, x: 40 },
              { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
              centerTime - 0.2 // Starts slightly before center
            );
          }
          if (mediaEl) {
            tl.fromTo(
              mediaEl,
              { opacity: 0, scale: 0.94 },
              { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
              centerTime - 0.2
            );
          }
        } else {
          // Panel 0 (already visible, just slightly animate media)
          if (mediaEl) {
            tl.fromTo(
              mediaEl,
              { opacity: 0, scale: 0.94 },
              { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
              0
            );
          }
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
          width: 'max-content',
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
                  color: 'var(--white)',
                  lineHeight: 1.7,
                  maxWidth: '42ch',
                }}
              >
                {panel.sub}
              </p>


            </div>

            {/* Right: video or images */}
            <div
              className="panel-media"
              style={{ height: '70vh', minHeight: '400px', width: '100%' }}
            >
              {panel.imageUrl && (
                <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={panel.imageUrl}
                    alt={panel.english.replace('\n', ' ')}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 10,
      }} aria-hidden="true">
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--white-dim)', opacity: 0.65,
        }}>Scroll down</span>
        <svg width="9" height="22" viewBox="0 0 9 22" fill="none">
          <path d="M4.5 0v20M1 16l3.5 4 3.5-4" stroke="var(--saffron)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Reduced-motion fallback — stacked vertical layout */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .story-panel {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .story-panel {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto 1fr !important;
            align-items: start !important;
            padding-top: 6rem !important;
            gap: 1.5rem !important;
          }
          .panel-media {
            height: auto !important;
            min-height: 250px !important;
            max-height: 50vh !important;
          }
        }
      `}</style>
    </section>
  );
}