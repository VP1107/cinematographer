// src/components/layout/LoadingScreen.jsx
// ============================================================
//  LoadingScreen — Cinematic intro: mandala spins in,
//  name fades up, then entire screen fades out.
//  Max 1.5s. Skipped on prefers-reduced-motion.
//  Uses sessionStorage so it only plays ONCE per session.
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Spinning mandala SVG ─────────────────────────────────────
function MandalaSVG() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={{ position: 'absolute' }}
    >
      {/* Outer ring */}
      <motion.circle
        cx="60" cy="60" r="55"
        stroke="var(--gold)"
        strokeWidth="0.6"
        strokeDasharray="8 4"
        opacity="0.4"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '60px 60px' }}
      />

      {/* Middle ring — counter-rotate */}
      <motion.circle
        cx="60" cy="60" r="40"
        stroke="var(--saffron)"
        strokeWidth="0.5"
        strokeDasharray="4 6"
        opacity="0.5"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '60px 60px' }}
      />

      {/* Inner petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 60 + 18 * Math.cos(rad);
        const y1 = 60 + 18 * Math.sin(rad);
        const x2 = 60 + 30 * Math.cos(rad);
        const y2 = 60 + 30 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--crimson)"
            strokeWidth="0.7"
            opacity="0.6"
          />
        );
      })}

      {/* Dot ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 46 * Math.cos(rad);
        const cy = 60 + 46 * Math.sin(rad);
        return (
          <circle key={angle} cx={cx} cy={cy} r="2" fill="var(--saffron)" opacity="0.7" />
        );
      })}

      {/* Crimson dot ring */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 46 * Math.cos(rad);
        const cy = 60 + 46 * Math.sin(rad);
        return (
          <circle key={angle} cx={cx} cy={cy} r="1.5" fill="var(--crimson)" opacity="0.5" />
        );
      })}

      {/* Centre */}
      <circle cx="60" cy="60" r="6" fill="var(--saffron)" opacity="0.9" />
      <circle cx="60" cy="60" r="3" fill="var(--crimson)" opacity="0.9" />
    </svg>
  );
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Only show once per browser session
    const seen = sessionStorage.getItem('ls_seen');
    if (seen) return;

    setVisible(true);

    // Hide after 1.5 s
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('ls_seen', '1');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'var(--black)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Mandala container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <MandalaSVG />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--white)',
              }}
            >
              Your Name
            </p>

          </motion.div>

          {/* Thin saffron → teal gradient line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 'min(280px, 60vw)',
              height: '1px',
              background: 'linear-gradient(90deg, var(--saffron), var(--crimson), var(--teal))',
              transformOrigin: 'left center',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}