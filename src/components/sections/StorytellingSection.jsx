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
    sub: 'The image before the cut is just as important as the image after it. Silence, held.',
    accent: 'var(--saffron)',
    thumbnailUrl: './assets/every_frame_story.webp',
  },
  {
    id: 'p2',
    english: 'Emotion through\nlighting.',
    sub: 'A single shaft of afternoon light through a Rajasthani jharokha says more than dialogue.',
    accent: 'var(--crimson)',
    images: ['./assets/emotion_lighting.webp', './assets/movement_cinema.webp'],
  },
  {
    id: 'p3',
    english: 'Movement through\ncinema.',
    sub: 'The camera is not an observer — it is a participant. Every move has intention.',
    accent: 'var(--teal-light)',
    isVideo: true,
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
          end: () => `+=${window.innerHeight * 2.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Slide track leftward
      tl.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
      });

      // Fade + slide text in per panel
      panels.forEach((panel, i) => {
        const textEl = panel.querySelector('.panel-text');
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
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            ref={(el) => (panelRefs.current[i] = el)}
            style={{
              width: panel.id === 'p2' ? '85vw' : '100vw',
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


            </div>

            {/* Right: video or images */}
            <div
              className="panel-media"
              style={{ height: 'clamp(240px, 50vh, 520px)' }}
            >
              {panel.isVideo ? (
                <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--gray-dark)' }}>
                  <iframe 
                    src="https://player.vimeo.com/video/1193650792?context=Vimeo%5CController%5CApi%5CResources%5CVideoController.&h=5de6bdb106&s=13d152f15880ed6aa35bd22989283e93b3b9deaa_1779311419&title=0&byline=0&portrait=0&dnt=1" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                  ></iframe>
                </div>
              ) : panel.images ? (
                <div style={{ display: 'flex', gap: '1rem', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={panel.images[0]}
                    alt="Cinematography"
                    style={{ flex: 1, width: '100%', height: '100%', minWidth: 0, objectFit: 'contain', borderRadius: '4px', display: 'block' }}
                  />
                  <img
                    src={panel.images[1]}
                    alt="Emotion through lighting"
                    style={{ flex: 1, width: '100%', height: '100%', minWidth: 0, objectFit: 'contain', borderRadius: '4px', display: 'block' }}
                  />
                </div>
              ) : (
                <VideoPlaceholder
                  thumbnailUrl={panel.thumbnailUrl}
                  aspectRatio="16/9"
                  accentColor={panel.accent}
                  showPlay={false}
                  imgStyle={{ objectFit: 'cover' }}
                  style={{ height: '100%', borderRadius: '2px' }}
                />
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