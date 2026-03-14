// src/pages/Services.jsx
// ============================================================
//  Services Page
//  - Full-screen dark hero with large heading
//  - Stacked full-width service rows with separator lines
//  - Subtle parallax video placeholder on each row (right side)
//  - CTA links to Contact
// ============================================================

import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { services }     from '../data/services';
import VideoPlaceholder from '../components/ui/VideoPlaceholder';
import SectionHeading   from '../components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

// ── Icon SVGs (Lucide not used to avoid bundle overhead here) ─
const SERVICE_ICONS = {
  camera:      () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
  ),
  film:        () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
  ),
  music:       () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  ),
  clapperboard:() => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1-.3 2.1.3 2.4 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 3.9"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>
  ),
  compass:     () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  ),
  palette:     () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
  ),
};

// ── Accent per service ────────────────────────────────────────
const ACCENT_CYCLE = [
  'var(--saffron)',
  'var(--crimson)',
  'var(--teal-light)',
  'var(--gold)',
  'var(--saffron)',
  'var(--teal-light)',
];

// ── Single service row ────────────────────────────────────────
function ServiceRow({ service, index }) {
  const rowRef      = useRef(null);
  const mediaRef    = useRef(null);
  const accent      = ACCENT_CYCLE[index % ACCENT_CYCLE.length];
  const [expanded, setExpanded] = React.useState(false);
  const IconComp    = SERVICE_ICONS[service.icon] || SERVICE_ICONS.film;

  // Parallax on media placeholder
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
        { y: -24 },
        {
          y: 24,
          ease: 'none',
          scrollTrigger: {
            trigger:  rowRef.current,
            start:    'top bottom',
            end:      'bottom top',
            scrub:    1.2,
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2rem',
        alignItems: 'center',
        padding: 'clamp(1.5rem, 3vw, 2.5rem) 0',
        borderBottom: '1px solid rgba(200,169,110,0.08)',
        cursor: 'none',
      }}
      className="service-row"
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Left: text */}
      <div>
        {/* Number + icon row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.6rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-sm)',
              color: accent,
              opacity: 0.5,
              letterSpacing: '0.1em',
            }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            style={{ color: accent, opacity: 0.7, lineHeight: 0 }}
            aria-hidden="true"
          >
            <IconComp />
          </span>

        </div>

        {/* Service name */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: expanded ? '1rem' : 0,
            transition: 'margin 300ms ease',
          }}
        >
          {service.name}
        </h3>

        {/* Expanded description */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 300,
              color: 'var(--white-dim)',
              lineHeight: 1.75,
              maxWidth: '64ch',
              paddingBottom: '0.5rem',
            }}
          >
            {service.longDesc}
          </p>
        </motion.div>
      </div>

      {/* Right: parallax video placeholder (hidden on mobile) */}
      <div
        ref={mediaRef}
        style={{
          width: 'clamp(120px, 18vw, 240px)',
          overflow: 'hidden',
          borderRadius: '2px',
          flexShrink: 0,
        }}
        className="service-media"
        aria-hidden="true"
      >
        <VideoPlaceholder
          aspectRatio="16/9"
          showPlay={false}
          accentColor={accent}
        />
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function Services() {
  return (
    <div
      style={{
        background: 'var(--black)',
        minHeight: '100dvh',
      }}
    >
      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: '6rem',
          paddingBottom: 'var(--space-16)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >


        <div className="container" style={{ position: 'relative' }}>


          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              color: 'var(--white)',
            }}
          >
            What I Do.
          </motion.h1>
        </div>
      </section>

      {/* ── Service rows ── */}
      <section
        style={{ padding: '0 0 var(--space-24)' }}
        aria-label="Services"
      >
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--white-muted)',
              paddingBottom: '1.2rem',
              borderBottom: '1px solid rgba(200,169,110,0.08)',
              marginBottom: 0,
              opacity: 0.5,
            }}
          >
            Click any service to expand details
          </p>

          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: 'var(--space-24) 0',
          background: 'var(--off-black)',
          textAlign: 'center',
          borderTop: '1px solid rgba(200,169,110,0.08)',
        }}
      >
        <div className="container">
          <SectionHeading
            eyebrow="Ready to collaborate?"

            heading="Let's start a conversation."
            align="center"
            accentColor="var(--crimson)"
            style={{ marginBottom: 'var(--space-8)' }}
          />

          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--black)',
              background: 'var(--saffron)',
              border: '1px solid var(--saffron)',
              padding: '0.8rem 2.2rem',
              textDecoration: 'none',
              transition: 'background 220ms ease, color 220ms ease, border-color 220ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--crimson)';
              e.currentTarget.style.borderColor = 'var(--crimson)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--saffron)';
              e.currentTarget.style.borderColor = 'var(--saffron)';
              e.currentTarget.style.color = 'var(--black)';
            }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .service-media { display: none !important; }
          .service-row   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}