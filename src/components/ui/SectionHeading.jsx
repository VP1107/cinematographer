// src/components/ui/SectionHeading.jsx
// ============================================================
//  SectionHeading — editorial section header with:
//    - optional Devanagari eyebrow label
//    - Cormorant Garamond display headline
//    - optional sub-text
//    - ornamental rangoli dot + line divider
//
//  Props:
//    eyebrow      {string}  — small label above heading (English)
//    heading      {string}  — main headline (required)
//    sub          {string}  — optional subtext below
//    align        {string}  — 'left' | 'center' | 'right' (default 'left')
//    accentColor  {string}  — CSS color for ornaments
//    className    {string}
//    style        {object}
//    animate      {bool}    — use whileInView entrance (default true)
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';

// ── Ornamental divider ───────────────────────────────────────
function OrnamentLine({ align, accent }) {
  const isCenter = align === 'center';
  const isRight  = align === 'right';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
        marginTop: '1rem',
      }}
      aria-hidden="true"
    >
      {/* Left line (hidden on right-align) */}
      {!isRight && (
        <div
          style={{
            width: isCenter ? '48px' : '32px',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${accent})`,
          }}
        />
      )}

      {/* Rangoli diamond */}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <polygon points="5,0 10,5 5,10 0,5" fill={accent} opacity="0.8" />
      </svg>

      {/* Small dots */}
      <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
        <circle cx="2" cy="2" r="1.5" fill={accent} opacity="0.5" />
      </svg>
      <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
        <circle cx="2" cy="2" r="1.5" fill={accent} opacity="0.3" />
      </svg>

      {/* Right line */}
      <div
        style={{
          width: isCenter ? '48px' : '80px',
          height: '1px',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />
    </div>
  );
}

export default function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = 'left',
  accentColor = 'var(--saffron)',
  className = '',
  style: styleProp = {},
  animate = true,
}) {
  const textAlign = align;

  const containerVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate
    ? {
        variants: containerVariants,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-40px' },
      }
    : {};

  return (
    <Wrapper
      className={className}
      style={{ textAlign, ...styleProp }}
      {...wrapperProps}
    >
      {/* ── Eyebrow labels ── */}
      {eyebrow && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            justifyContent:
              align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
            marginBottom: '0.6rem',
          }}
        >
          {/* Accent dot */}
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: accentColor,
              flexShrink: 0,
            }}
            aria-hidden="true"
          />

          {eyebrow && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: accentColor,
                fontWeight: 400,
              }}
            >
              {eyebrow}
            </span>
          )}


        </div>
      )}

      {/* ── Main heading ── */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 300,
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          color: 'var(--white)',
        }}
      >
        {heading}
      </h2>

      {/* ── Ornamental line ── */}
      <OrnamentLine align={align} accent={accentColor} />

      {/* ── Sub text ── */}
      {sub && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-md)',
            fontWeight: 300,
            color: 'var(--white-dim)',
            lineHeight: 1.7,
            marginTop: '1.2rem',
            maxWidth: align === 'center' ? '52ch' : '60ch',
            marginInline: align === 'center' ? 'auto' : undefined,
          }}
        >
          {sub}
        </p>
      )}
    </Wrapper>
  );
}