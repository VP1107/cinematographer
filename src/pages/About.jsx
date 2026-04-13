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
import SectionHeading  from '../components/ui/SectionHeading';
import { LazyImage }   from '../utils/lazyImage.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

// ── Placeholder brand logos (swap for real SVG/img) ──────────
const BRANDS = [
  'Sundari Handlooms', 'Indigo Pictures', 'Dhoop Films',
  'Tandav Arts',       'Noor Creative',   'Red Masala Films',
  'Patan Records',     'MAMI',            'IFFK',
];

const AWARDS = [
  { year: '2023', title: 'Best Cinematography',    org: 'MAMI Film Festival',     project: 'Kahāni'  },
  { year: '2023', title: 'Official Selection',     org: 'IFFK — Kerala',          project: 'Nritya'  },
  { year: '2022', title: 'Best Short Film — DOP',  org: 'Chitrabharati Film Fest', project: 'Udān'   },
  { year: '2022', title: 'Jury Commendation',      org: 'Vikalp — Mumbai',        project: 'Nritya'  },
];

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
        src="/profile_picture.png"
        alt="Portrait of cinematographer"
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
  const paraRef1 = useScrollReveal({ delay: 0   });
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
        I grew up watching sunlight move through the jhaalars of Ahmedabad's Pol
        houses — that slow, certain daily cinema convinced me that every space
        already contains a film. It just needs someone to notice it.
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
        After studying at FTII Pune, I worked as a camera assistant on
        three Bollywood productions before DPing my first independent short,
        which screened at MAMI in 2019. Since then, I have shot across
        Rajasthan, Kerala, the Andamans, and in studios in Mumbai — always
        trying to bring the same quality of attention that I learned watching
        that light move across those old stone walls.
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
        Notable collaborations include directors{' '}
        <em style={{ color: 'var(--white)', fontStyle: 'normal' }}>Arjun Mehta</em>,{' '}
        <em style={{ color: 'var(--white)', fontStyle: 'normal' }}>Sanya Kapoor</em>, and{' '}
        <em style={{ color: 'var(--white)', fontStyle: 'normal' }}>Kabir Singh</em>.
        Clients span sustainable fashion, luxury FMCG, OTT platforms, and
        independent music labels across India.
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

// ── Brand logos strip ─────────────────────────────────────────
function BrandsStrip() {
  return (
    <section
      style={{
        padding: 'var(--space-16) 0',
        borderTop: '1px solid rgba(200,169,110,0.08)',
        borderBottom: '1px solid rgba(200,169,110,0.08)',
        overflow: 'hidden',
      }}
      aria-label="Clients and collaborators"
    >
      <div className="container" style={{ marginBottom: '1.2rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--saffron)',
            opacity: 0.6,
          }}
        >
          Clients & Collaborators
        </p>
      </div>

      {/* Scrolling ticker */}
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          animation: 'scroll-ticker 22s linear infinite',
          width: 'max-content',
        }}
        aria-hidden="true"
      >
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Rangoli dot separator */}
            <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
              <polygon points="3,0 6,3 3,6 0,3" fill="var(--saffron)" opacity="0.4" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                color: 'var(--white-muted)',
              }}
            >
              {brand}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="scroll-ticker"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

// ── Awards list ───────────────────────────────────────────────
function AwardsList() {
  return (
    <section
      style={{ padding: 'var(--space-16) 0' }}
      aria-label="Awards and recognition"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Recognition"
          heading="Awards & Press"
          accentColor="var(--crimson)"
          style={{ marginBottom: 'var(--space-8)' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {AWARDS.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.2rem 0',
                borderBottom: '1px solid rgba(200,169,110,0.07)',
              }}
            >
              {/* Year */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--crimson)',
                  opacity: 0.7,
                }}
              >
                {award.year}
              </span>

              {/* Title + org */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-md)',
                    fontWeight: 400,
                    color: 'var(--white)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {award.title}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--white-muted)',
                    letterSpacing: '0.06em',
                    marginTop: '0.2rem',
                  }}
                >
                  {award.org}
                </p>
              </div>

              {/* Project */}
              <span
                style={{
                  fontFamily: 'var(--font-devanagari)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--saffron)',
                  opacity: 0.6,
                  whiteSpace: 'nowrap',
                }}
              >
                {award.project}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function About() {
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
        style={{ padding: 'var(--space-16) clamp(1.5rem, 6vw, 5rem)' }}
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
      </div>

      <BrandsStrip />
      <AwardsList />

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}