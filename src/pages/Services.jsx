// src/pages/Services.jsx
// ============================================================
//  Services Page — Horizontal film-reel scroll
//  - GSAP timeline drives track.x (smooth, works with Lenis)
//  - Typewriter on every panel via containerAnimation
//  - Inter-panel flash/blur on accent overlay
// ============================================================

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

// ── Accents ───────────────────────────────────────────────────
const ACCENTS = [
  { primary: 'var(--saffron)',    rgb: '232,132,26'  },
  { primary: 'var(--crimson)',    rgb: '181,21,43'   },
  { primary: 'var(--teal-light)', rgb: '38,168,190'  },
  { primary: 'var(--gold)',       rgb: '200,169,110' },
  { primary: 'var(--saffron)',    rgb: '232,132,26'  },
  { primary: 'var(--teal-light)', rgb: '38,168,190'  },
];

// ── Icons ─────────────────────────────────────────────────────
const ICONS = {
  camera:       () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  film:         () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  music:        () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  clapperboard: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1-.3 2.1.3 2.4 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 3.9"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>,
  compass:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  palette:      () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
};

// ── Sprocket dots ─────────────────────────────────────────────
function SprocketDots({ color }) {
  return (
    <div style={{
      position: 'absolute', top: 0, bottom: 0, left: 0,
      width: '28px', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-around', alignItems: 'center',
      padding: '3rem 0', pointerEvents: 'none',
    }} aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          width: '7px', height: '11px', borderRadius: '2px',
          border: `1px solid ${color}`, opacity: 0.15,
        }} />
      ))}
    </div>
  );
}

// ── Typewriter text ───────────────────────────────────────────
// chars start invisible; GSAP reveals them via containerAnimation
function TypewriterText({ text }) {
  return (
    <span aria-label={text}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="tw-char" 
          style={{ 
            opacity: 0, 
            whiteSpace: char === ' ' ? 'pre-wrap' : 'normal'
          }} 
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// ── Single panel ──────────────────────────────────────────────
function ServicePanel({ service, index, accent, totalPanels }) {
  const Icon = ICONS[service.icon] || ICONS.film;

  return (
    <div
      className="service-panel"
      style={{
        position: 'relative',
        width: '100vw', height: '100%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        borderRight: '1px solid rgba(200,169,110,0.05)',
      }}
    >
      {/* Giant bg name */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', overflow: 'hidden',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 20vw, 18rem)', fontWeight: 700,
          letterSpacing: '-0.03em', textTransform: 'uppercase',
          color: `rgba(${accent.rgb}, 0.045)`,
          whiteSpace: 'nowrap', userSelect: 'none', lineHeight: 1,
        }}>
          {service.name}
        </span>
      </div>

      {/* Vertical Hindi watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '2.5rem',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-devanagari)',
        fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)',
        color: accent.primary, opacity: 0.25,
        letterSpacing: '0.14em',
        writingMode: 'vertical-rl', textOrientation: 'mixed',
        userSelect: 'none',
      }}>
      </div>

      {/* Faded index */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '3rem', right: '3.5rem',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 10vw, 9rem)', fontWeight: 300,
        color: `rgba(${accent.rgb}, 0.05)`,
        lineHeight: 1, userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Sprockets */}
      <SprocketDots color={accent.primary} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '28px' }}>
        <SprocketDots color={accent.primary} />
      </div>

      {/* ── Content — centred, max 680px, symmetric padding ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: '680px',
        padding: '0 0', boxSizing: 'border-box',
      }}>

        {/* Icon + counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.6rem' }}>
          <span style={{ color: accent.primary, lineHeight: 0, opacity: 0.85 }}><Icon /></span>
          <div style={{
            width: '36px', height: '1px',
            background: `linear-gradient(90deg, ${accent.primary}, transparent)`, opacity: 0.55,
          }} />
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: accent.primary, opacity: 0.75,
          }}>
            {String(index + 1).padStart(2, '0')} / {String(totalPanels).padStart(2, '0')}
          </span>
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 300,
          letterSpacing: '0.04em', lineHeight: 1.05,
          color: 'var(--white)', marginBottom: '0.5rem',
        }}>
          {service.name}
        </h2>

        {/* Hindi subtitle */}
        <p style={{
          fontFamily: 'var(--font-devanagari)', fontSize: 'var(--text-sm)',
          color: accent.primary, opacity: 0.55,
          letterSpacing: '0.06em', marginBottom: '1.6rem',
        }}>
        </p>

        {/* Ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.8rem' }} aria-hidden="true">
          <div style={{ width: '20px', height: '1px', background: `linear-gradient(90deg, transparent, ${accent.primary})` }} />
          <svg width="7" height="7" viewBox="0 0 7 7">
            <polygon points="3.5,0 7,3.5 3.5,7 0,3.5" fill={accent.primary} opacity="0.7" />
          </svg>
          <div style={{ width: '55px', height: '1px', background: `linear-gradient(90deg, ${accent.primary}, transparent)` }} />
        </div>

        {/* Long description — typewriter via GSAP containerAnimation */}
        <p
          className={`tw-block tw-block-${index}`}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', fontWeight: 300,
            lineHeight: 1.9, color: 'var(--white)', opacity: 0.82,
          }}
        >
          <TypewriterText text={service.longDesc} />
        </p>

        {/* Short tag */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em', color: accent.primary,
          opacity: 0.65, marginTop: '1.4rem', fontStyle: 'italic'
        }}>
          {service.shortDesc}
        </p>
      </div>

      {/* Bottom line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '28px', right: '28px',
        height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(${accent.rgb},0.25), transparent)`,
      }} aria-hidden="true" />
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────
function ProgressBar({ wrapperRef }) {
  const barRef = useRef(null);
  useEffect(() => {
    if (!barRef.current || !wrapperRef.current) return;
    const scrollDist = (services.length - 1) * window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 64px', // matching the fixed header height
          end: () => `+=${scrollDist}`,
          scrub: true,
        },
      });
    });
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: '2px', background: 'rgba(200,169,110,0.07)', zIndex: 300,
    }} aria-hidden="true">
      <div ref={barRef} style={{
        height: '100%',
        background: 'linear-gradient(90deg, var(--saffron), var(--crimson), var(--teal))',
        transformOrigin: 'left center', transform: 'scaleX(0)',
      }} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function Services() {
  const wrapperRef = useRef(null);
  const trackRef   = useRef(null);
  const sectionRef = useRef(null);
  const flashRef   = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) { gsap.set('.tw-char', { opacity: 1 }); return; }

    const ctx = gsap.context(() => {
      const panels     = gsap.utils.toArray('.service-panel');
      const n          = panels.length;
      if (n < 1) return;

      const scrollDist = (n - 1) * window.innerWidth;

      // ── 1. Master timeline — drives track.x ──────────────
      // Using a timeline pinned to sectionRef gives GSAP full
      // control of the x value; Lenis only handles the wheel
      // -> scroll position mapping which GSAP then reads via scrub.
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger:   sectionRef.current,
          start:     'top top',
          end:       () => `+=${scrollDist}`,
          scrub:     0.8,           // smooth but not laggy
          pin:       true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      masterTl.to(trackRef.current, {
        x: -scrollDist,
        ease: 'none',
        duration: n - 1,
      });

      // passing masterTl to containerAnimation

      // ── 2. Typewriter per panel via containerAnimation ────
      // containerAnimation tells GSAP to use mainST's scroll
      // position as the driving input instead of the window scroll,
      // so the chars scrub correctly inside the pinned section.
      panels.forEach((panel, i) => {
        const chars = panel.querySelectorAll('.tw-char');
        if (!chars.length) return;

        // Each panel occupies 1/(n-1) of the total timeline duration.
        // Start typewriter 10% into the panel, finish at 80%.
        const panelDur  = 1 / (n - 1);           // duration per panel in tl units
        const twStart   = i * panelDur + panelDur * 0.08;
        const twEnd     = i * panelDur + panelDur * 0.82;

        gsap.fromTo(
          chars,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: { each: (twEnd - twStart) / chars.length },
            ease: 'none',
            duration: twEnd - twStart,
            delay: twStart,
            scrollTrigger: {
              containerAnimation: masterTl,
              trigger:  panel,
              start:    'left 90%',
              end:      'left 10%',
              scrub:    true,
            },
          }
        );
      });

      // ── 3. Flash transition at each panel boundary ────────
      panels.forEach((panel, i) => {
        if (i === 0) return;
        const acc = ACCENTS[i % ACCENTS.length];

        ScrollTrigger.create({
          containerAnimation: masterTl,
          trigger:  panel,
          start:    'left 55%',
          end:      'left 45%',
          onEnter:      () => doFlash(acc.primary),
          onEnterBack:  () => doFlash(ACCENTS[(i - 1) % ACCENTS.length].primary),
        });
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  function doFlash(color) {
    const el = flashRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.set(el, { backgroundColor: color, opacity: 0 });
    gsap.to(el, {
      opacity: 0.14, duration: 0.1, ease: 'power1.out',
      onComplete: () => gsap.to(el, { opacity: 0, duration: 0.3, ease: 'power1.in' }),
    });
  }

  return (
    <>
      <ProgressBar wrapperRef={wrapperRef} />

      <div ref={wrapperRef} style={{ background: 'var(--black)',paddingTop: '4rem'}}>

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', top: '4rem', zIndex: 100,
            width: '100%',
            padding: '0 clamp(1.5rem, 4vw, 3rem)', height: '4rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'var(--nav-bg-scrolled)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: 'var(--border-ornament)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '1px', height: '16px', background: 'var(--gold)' , opacity: 0.4 }} />
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
              fontWeight: 300, letterSpacing: '0.1em',
              color: 'var(--white)', textTransform: 'uppercase',
            }}>What I Do </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-hidden="true">
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--white-dim)', marginLeft: '10px',
              opacity: 0.65,
            }}> Scroll to explore</span>
            <svg width="22" height="9" viewBox="0 0 22 9" fill="none">
              <path d="M0 4.5h20M16 1l4 3.5-4 3.5" stroke="var(--saffron)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
            
        {/* Pinned section */}
        <div
          ref={sectionRef}
          style={{ height: '100dvh', overflow: 'hidden', position: 'relative' }}
          aria-label="Services"
        >
          {/* Flash overlay */}
          <div ref={flashRef} style={{
            position: 'absolute', inset: 0, zIndex: 10,
            pointerEvents: 'none', opacity: 0,
            mixBlendMode: 'screen',
          }} aria-hidden="true" />

          {/* Track */}
          <div ref={trackRef} style={{
            display: 'flex', height: '100%',
            width: `${services.length * 100}vw`,
            willChange: 'transform',
          }}>
            {services.map((service, i) => (
              <ServicePanel
                key={service.id}
                service={service}
                index={i}
                accent={ACCENTS[i % ACCENTS.length]}
                totalPanels={services.length}
              />
            ))}
          </div>
        </div>

        {/* ── Services Index Grid (All visible at once) ── */}
        <section
          className="container"
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) 0',
            background: 'var(--black)',
            position: 'relative',
            zIndex: 10,
            borderTop: '1px solid rgba(200,169,110,0.08)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{
              fontFamily: 'var(--font-devanagari)', fontSize: 'var(--text-xs)',
              color: 'var(--saffron)', opacity: 0.6, letterSpacing: '0.15em',
              marginBottom: '0.5rem'
            }}></p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
              fontWeight: 300, color: 'var(--white)', letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Services Index
            </h2>
            <div style={{
              width: '40px', height: '1px', background: 'var(--saffron)',
              margin: '1rem auto 0', opacity: 0.5
            }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {services.map((service, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              const Icon = ICONS[service.icon] || ICONS.film;

              return (
                <div
                  key={service.id}
                  style={{
                    background: 'var(--off-black)',
                    border: 'var(--border-ornament)',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.3s ease, transform 0.3s ease, background 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${accent.rgb}, 0.35)`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Subtle Top Accent Line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                    background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)`,
                    opacity: 0.4
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '4px',
                      background: `rgba(${accent.rgb}, 0.08)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: accent.primary, border: `1px solid rgba(${accent.rgb}, 0.15)`
                    }}>
                      <Icon />
                    </div>
                    
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
                      fontWeight: 300, color: `rgba(${accent.rgb}, 0.15)`,
                      lineHeight: 1
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-devanagari)', fontSize: '0.75rem',
                    color: accent.primary, opacity: 0.8, letterSpacing: '0.12em',
                    marginBottom: '0.4rem'
                  }}>
                    {service.nameHindi}
                  </span>

                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2vw, 1.6rem)',
                    fontWeight: 300, color: 'var(--white)', lineHeight: 1.2,
                    marginBottom: '1rem', letterSpacing: '0.02em',
                  }}>
                    {service.name}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                    fontWeight: 300, lineHeight: 1.6, color: 'var(--white-dim)',
                    marginTop: 'auto'
                  }}>
                    {service.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: 'clamp(4rem, 10vw, 8rem) 0',
          background: 'var(--off-black)', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          borderTop: '1px solid rgba(200,169,110,0.08)',
        }}>
          <p aria-hidden="true" style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'var(--font-devanagari)',
            fontSize: 'clamp(6rem, 20vw, 14rem)',
            color: 'var(--saffron)', opacity: 0.03,
            pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
          }}>TAPAN VYAS</p>

          <div className="container" style={{ position: 'relative' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300,
              letterSpacing: '0.04em', color: 'var(--white)',
              lineHeight: 1.2, marginBottom: '2.5rem',
              maxWidth: '22ch', marginInline: 'auto',
            }}>Let's start a conversation.</h2>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '10px', marginBottom: '2.5rem',
            }} aria-hidden="true">
              <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--crimson))' }} />
              <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="var(--crimson)" opacity="0.7"/></svg>
              <svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2" fill="var(--saffron)" opacity="0.5"/></svg>
              <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="var(--crimson)" opacity="0.7"/></svg>
              <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, var(--crimson), transparent)' }} />
            </div>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--black)', background: 'var(--saffron)',
                border: '1px solid var(--saffron)', padding: '0.8rem 2.4rem',
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
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .tw-char { opacity: 1 !important; }
        }
      `}</style>
    </>
  );
}