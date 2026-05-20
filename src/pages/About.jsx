// src/pages/About.jsx
// ============================================================
//  About Page
//  - Two-column desktop: portrait left, bio right
//  - Film-grain + haldi CSS overlay on portrait
//  - Cinematic career narrative
//  - Horizontal scrolling brand logos strip
//  - Awards / press mentions
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import LazyImage from '../utils/lazyImage';
import useScrollReveal from '../hooks/useScrollReveal';
import { useTitle } from '../hooks/useTitle';



// ── Portrait with film-grain + haldi overlay ─────────────────
function Portrait() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
      }}
    >
      {/* Image */}
      <LazyImage
        src="/profile_picture.webp"
        alt="Tapan Vyas, Cinematographer"
        aspectRatio="3/4"
        haldi
        style={{ borderRadius: '2px' }}
      />

      {/* Film grain texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          mixBlendMode: 'overlay',
          opacity: 0.06,
          borderRadius: '2px',
          pointerEvents: 'none',
        }}
      />

      {/* Saffron corner bracket — bottom right */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          opacity: 0.55,
        }}
      >
        <path d="M48 48 L48 28 L46 28 L46 46 L28 46 L28 48 Z" fill="var(--saffron)" />
        <path d="M42 42 L42 34 L34 42 Z" fill="var(--crimson)" opacity="0.4" />
      </svg>

      {/* Top-left bracket */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          opacity: 0.45,
        }}
      >
        <path d="M0 0 L0 18 L2 18 L2 2 L18 2 L18 0 Z" fill="var(--gold)" />
      </svg>


    </div>
  );
}

// ── Bio text ──────────────────────────────────────────────────
function BioSection() {
  const paraRef1 = useScrollReveal({ delay: 0 });
  const paraRef2 = useScrollReveal({ delay: 100 });
  const paraRef3 = useScrollReveal({ delay: 200 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      <SectionHeading
        eyebrow="About"
        heading="Light is the language I speak."
        accentColor="var(--saffron)"
        animate={false}
      />

      <p
        ref={paraRef1}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          fontWeight: 300,
          color: 'var(--white-dim)',
          lineHeight: 1.85,
        }}
      >
        I was shaped by cinema, guided by light, and drawn to the hidden soul that quietly breathes inside every story.
      </p>

      <p
        ref={paraRef2}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          fontWeight: 300,
          color: 'var(--white-dim)',
          lineHeight: 1.85,
        }}
      >
        Trained in cinematography at Film and Television Institute of India, Pune, and graduated in Chemical Engineering, I carry both the poetry of images and the precision of science. Over 20+ years, done 35+ feature films and 100+ business films.
      </p>

      <p
        ref={paraRef3}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          fontWeight: 300,
          color: 'var(--white-dim)',
          lineHeight: 1.85,
        }}
      >
        My craft lies in cinematography, storytelling, scripting, and direction — but my true purpose is to find the heartbeat of a story and turn it into a film that reveals what truly matters.
      </p>

      <Link
        to="/contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--saffron-light)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--saffron)',
          paddingBottom: '2px',
          width: 'fit-content',
          transition: 'color 220ms ease',
        }}
      >
        Work with me
      </Link>
    </div>
  );
}

// ── Showreel Section ──────────────────────────────────────────
function ShowreelSection() {
  const ref = useScrollReveal({ delay: 0 });
  return (
    <section
      style={{
        paddingTop: 'var(--space-16)',
        width: '100%',
      }}
      aria-label="Tapan Vyas Journey"
    >
      <div ref={ref}>
        <SectionHeading
          eyebrow="The Journey"
          heading="Cinematic Identity"
          accentColor="var(--saffron)"
          style={{ marginBottom: 'var(--space-12)' }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="showreel-grid"
        >
          {/* Text Left */}
          <div style={{ paddingRight: '1rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 300,
                letterSpacing: '0.03em',
                lineHeight: 1.4,
                color: 'var(--white)',
                marginBottom: '1.2rem',
              }}
            >
              From Chemical Engineering to crafting visual symphonies.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 300,
                color: 'var(--white)',
                lineHeight: 1.8,
              }}
            >
              A Film and Television Institute of India, Pune alumnus, Tapan Vyas brings analytical rigor and artistic instinct to every frame. With a foundation built in precision and trained under the finest cinematic minds, he has redefined the visual landscape of Gujarati cinema through acclaimed films like <em>O Taareee!</em>, <em>Love Ni Bhavai</em>, <em>Mijaaj</em>, <em>Paaghadi</em>, and <em>Lakiro</em>. His work isn't just about capturing light—it's about sculpting emotion and movement to elevate the story.
            </p>
          </div>

          {/* Video Right */}
          <div>
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%', /* 16:9 */
                height: 0,
                overflow: 'hidden',
                borderRadius: '4px',
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/1193650792?title=0&byline=0&portrait=0&dnt=1"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .showreel-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .showreel-grid > div:first-child {
            padding-right: 0 !important;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function About() {
  useTitle('About');
  useScrollReveal();

  return (
    <div
      style={{
        paddingTop: '6rem',
        background: 'var(--black)',
        minHeight: '100dvh',
      }}
    >
      {/* ── Two-col hero ── */}
      <div
        className="container"
        style={{ padding: 'var(--space-8) clamp(1.5rem, 6vw, 5rem) var(--space-16)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          <Portrait />
          <BioSection />
        </div>

        {/* ── Showreel Section ── */}
        <ShowreelSection />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}