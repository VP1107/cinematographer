// src/components/ui/CustomCursor.jsx
// ============================================================
//  CustomCursor — rangoli-inspired crosshair cursor
//  Dashed outer ring + tick marks + centre dot.
//  Saffron/crimson/teal accents on hover.
//  Hidden on touch devices. Respects prefers-reduced-motion.
// ============================================================

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const posRef    = useRef({ x: -100, y: -100 });
  const rafRef    = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch       = window.matchMedia('(hover: none)').matches;
    if (reducedMotion || isTouch) return;

    setVisible(true);

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, [tabindex]'
      );
      setHovered(!!el);
    };

    const onLeave = () => {
      posRef.current = { x: -200, y: -200 };
    };

    // Single SVG cursor — centred on pointer via 16px offset (half of 32px)
    const animate = () => {
      const el = cursorRef.current;
      if (el) {
        const { x, y } = posRef.current;
        el.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Rangoli crosshair SVG */}
      <svg
        ref={cursorRef}
        aria-hidden="true"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 'var(--z-cursor)',
          pointerEvents: 'none',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      >
        {/* Outer dashed ring */}
        <circle
          cx="16" cy="16" r="13"
          stroke={hovered ? 'var(--saffron)' : 'rgba(247,240,230,0.6)'}
          strokeWidth="0.8"
          strokeDasharray="3 2"
          style={{ transition: 'stroke 200ms ease' }}
        />

        {/* Inner solid ring */}
        <circle
          cx="16" cy="16" r="7"
          stroke={hovered ? 'var(--crimson)' : 'rgba(247,240,230,0.3)'}
          strokeWidth="0.6"
          style={{ transition: 'stroke 200ms ease' }}
        />

        {/* Cardinal tick marks — N S W E */}
        <line x1="16" y1="2"  x2="16" y2="6"
          stroke={hovered ? 'var(--saffron)' : 'rgba(247,240,230,0.7)'}
          strokeWidth="1" strokeLinecap="round"
          style={{ transition: 'stroke 200ms ease' }}
        />
        <line x1="16" y1="26" x2="16" y2="30"
          stroke={hovered ? 'var(--saffron)' : 'rgba(247,240,230,0.7)'}
          strokeWidth="1" strokeLinecap="round"
          style={{ transition: 'stroke 200ms ease' }}
        />
        <line x1="2"  y1="16" x2="6"  y2="16"
          stroke={hovered ? 'var(--saffron)' : 'rgba(247,240,230,0.7)'}
          strokeWidth="1" strokeLinecap="round"
          style={{ transition: 'stroke 200ms ease' }}
        />
        <line x1="26" y1="16" x2="30" y2="16"
          stroke={hovered ? 'var(--saffron)' : 'rgba(247,240,230,0.7)'}
          strokeWidth="1" strokeLinecap="round"
          style={{ transition: 'stroke 200ms ease' }}
        />

        {/* Centre dot — grows on hover */}
        <circle
          cx="16" cy="16"
          r={hovered ? '2.5' : '1.5'}
          fill={hovered ? 'var(--saffron)' : 'rgba(247,240,230,0.9)'}
          style={{ transition: 'r 200ms ease, fill 200ms ease' }}
        />

        {/* Diagonal rangoli accent dots */}
        <circle cx="22.5" cy="9.5"  r="1"
          fill={hovered ? 'var(--crimson)'    : 'rgba(247,240,230,0.35)'}
          style={{ transition: 'fill 200ms ease' }}
        />
        <circle cx="9.5"  cy="22.5" r="1"
          fill={hovered ? 'var(--crimson)'    : 'rgba(247,240,230,0.35)'}
          style={{ transition: 'fill 200ms ease' }}
        />
        <circle cx="22.5" cy="22.5" r="1"
          fill={hovered ? 'var(--teal-light)' : 'rgba(247,240,230,0.2)'}
          style={{ transition: 'fill 200ms ease' }}
        />
        <circle cx="9.5"  cy="9.5"  r="1"
          fill={hovered ? 'var(--teal-light)' : 'rgba(247,240,230,0.2)'}
          style={{ transition: 'fill 200ms ease' }}
        />
      </svg>

      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}