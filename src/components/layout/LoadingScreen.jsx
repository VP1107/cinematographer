// src/components/layout/LoadingScreen.jsx
// ============================================================
//  Cinematic Preloader: Shutter → Clapperboard → Iris Reveal
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME     = 'TAPAN VYAS';
const N_BLADES = 9;
const T_CLOSE  = 180;
const T_BLACK  = 250;
const T_OPEN   = 1000;

// ── 9-Blade Realistic Aperture ─────────────────────────────
function ApertureIris({ closeFrac, isClosing }) {
  const S = 540, cx = 270, cy = 270;
  const outerR = 240;
  const lensR  = 214;
  const openR  = 190;

  // Mechanical rotation: blades rotate more as they close
  // When closeFrac is 1, they meet in the center.
  // Base rotation for each blade to create the "fan" look
  const baseRot = 360 / N_BLADES;
  
  // Animation values:
  // We don't scale to 0. We rotate the blades so they overlap towards the middle.
  const irisRotation = closeFrac * 42; // Adjust for perfect closure
  const trDur = isClosing
    ? `${T_CLOSE}ms ease-in`
    : `${T_OPEN}ms cubic-bezier(0.1, 0.9, 0.2, 1)`;

  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}
      style={{ overflow: 'visible', flexShrink: 0 }} aria-hidden="true">
      <defs>
        <linearGradient id="blade-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2a2a2a" />
          <stop offset="40%"  stopColor="#111" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <radialGradient id="lens-shimmer" cx="40%" cy="40%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Lens Barrel */}
      <circle cx={cx} cy={cy} r={outerR + 25} fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={outerR + 22} fill="none" stroke="#333" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={outerR + 12} fill="#0d0d0d" />
      
      {/* Markings ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="#111" stroke="#222" strokeWidth="1" />
      <defs>
        <path id="textPath" d={`M ${cx - lensR},${cy} A ${lensR},${lensR} 0 1,1 ${cx + lensR},${cy} A ${lensR},${lensR} 0 1,1 ${cx - lensR},${cy}`} />
      </defs>
      <text fill="rgba(255,255,255,0.45)" fontSize="13" fontFamily="monospace" letterSpacing="2.5">
        <textPath href="#textPath" startOffset="0%">ZOOM LENS  70-300mm  1:2.8  IS USM</textPath>
        <textPath href="#textPath" startOffset="50%">LENS  MADE  IN  JAPAN  ø 77mm</textPath>
      </text>

      {/* Inner Bezel Shadows */}
      <circle cx={cx} cy={cy} r={openR + 10} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="4" />

      {/* Blades Group */}
      <g style={{ transition: `transform ${trDur}` }}>
        {Array.from({ length: N_BLADES }).map((_, i) => (
          <g key={i} style={{ 
            transform: `rotate(${i * baseRot + irisRotation}deg)`, 
            transformOrigin: `${cx}px ${cy}px`,
            transition: `transform ${trDur}`
          }}>
            <path
              d={`
                M ${cx} ${cy - (openR * 1.1)}
                C ${cx + openR * 0.6} ${cy - openR * 1.1}, ${cx + openR * 1.2} ${cy - openR * 0.4}, ${cx + openR} ${cy}
                L ${cx + outerR} ${cy}
                C ${cx + outerR} ${cy - outerR * 0.6}, ${cx + outerR * 0.6} ${cy - outerR}, ${cx} ${cy - outerR}
                Z
              `}
              fill="url(#blade-grad)"
              stroke="#000"
              strokeWidth="0.4"
            />
          </g>
        ))}
      </g>

      {/* Center Darkness (behind blades) */}
      <circle cx={cx} cy={cy} r={openR - 5} fill="#000" style={{ zIndex: -1 }} />

      {/* Inner glass shimmer */}
      <circle cx={cx} cy={cy} r={openR} fill="url(#lens-shimmer)" pointerEvents="none" opacity={1 - closeFrac} style={{ transition: `opacity ${trDur}` }} />
      
      {/* Tick marks */}
      {Array.from({ length: 72 }, (_, i) => {
        const a  = (2 * Math.PI / 72) * i;
        const r1 = outerR - 4;
        const r2 = outerR - (i % 8 === 0 ? 15 : i % 2 === 0 ? 8 : 5);
        return (
          <line key={i}
            x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
            stroke="rgba(255,255,255,0.2)" strokeWidth={i % 8 === 0 ? 1.8 : 0.7}
          />
        );
      })}
    </svg>
  );
}

// ── Larger Premium Clapperboard ──────────────────────────────
function Clapperboard({ slam }) {
  return (
    <div style={{ width: 480, fontFamily: 'monospace', userSelect: 'none' }}>
      <motion.div
        initial={{ rotate: -58 }}
        animate={slam ? { rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 680, damping: 14, delay: 0.05 }}
        style={{
          width: 480, height: 72,
          transformOrigin: '0% 50%',
          overflow: 'hidden',
          border: '2.5px solid rgba(255,255,255,0.2)',
          borderRadius: '4px 4px 0 0',
          boxShadow: '0 8px 35px rgba(0,0,0,0.95)',
          position: 'relative', zIndex: 2,
        }}
      >
        <div style={{
          width: '100%', height: '100%',
          background: 'repeating-linear-gradient(-45deg,#111 0,#111 24px,#eee 24px,#eee 48px)',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '28%', height: '100%',
          background: 'repeating-linear-gradient(-45deg,#b30000 0,#b30000 24px,#eee 24px,#eee 48px)',
        }} />
      </motion.div>

      <div style={{
        background: '#0d0b11',
        border: '2.5px solid rgba(255,255,255,0.14)', borderTop: 'none',
        borderRadius: '0 0 6px 6px',
        padding: '22px 30px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.95)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <Field label="PRODUCTION" value={NAME} />
          <Field label="DATE" value={new Date().getFullYear()} align="right" />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between' }}>
          <Field label="SCENE" value="001" />
          <Field label="TAKE"  value="01" />
          <Field label="ROLL"  value="A01" align="right" />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, align = 'left' }) {
  return (
    <div style={{ textAlign: align }}>
      <div style={{ fontSize: '0.65rem', color: 'rgba(200,169,110,0.6)', letterSpacing: '0.28em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: '1.3rem', color: '#f7f0e6', letterSpacing: '0.1em', fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}

// ── Sprocket strip ────────────────────────────────────────────
function SprocketStrip() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 46,
      display: 'flex', alignItems: 'center',
      borderTop: '1px solid rgba(200,169,110,0.1)',
      background: 'rgba(0,0,0,0.3)',
    }} aria-hidden="true">
      <div style={{ display: 'flex', gap: 10, paddingLeft: 16, flexShrink: 0 }}>
        {Array.from({ length: 7 }, (_, i) => <Hole key={i} />)}
      </div>
      <div style={{ flex: 1, textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.26em', color: 'rgba(200,169,110,0.38)', whiteSpace: 'nowrap' }}>
        35mm · 1.85:1 · ACADEMY FLAT
      </div>
      <div style={{ display: 'flex', gap: 10, paddingRight: 16, flexShrink: 0 }}>
        {Array.from({ length: 7 }, (_, i) => <Hole key={i} />)}
      </div>
    </div>
  );
}
function Hole() {
  return <div style={{ width: 8, height: 12, borderRadius: 2, border: '1px solid rgba(200,169,110,0.3)', background: 'rgba(0,0,0,0.5)' }} />;
}

// ── Main ──────────────────────────────────────────────────────
export default function LoadingScreen() {
  const [visible,   setVisible]   = useState(false);
  const [phase,     setPhase]     = useState('shutter'); // shutter | clapper | reveal
  const [closeFrac, setCloseFrac] = useState(1); // Start CLOSED as requested
  const [isClosing, setIsClosing] = useState(false);
  const [clapSlam,  setClapSlam]  = useState(false);
  const [holeR,     setHoleR]     = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sessionStorage.getItem('ls_seen')) return;
    setVisible(true);

    // Phase 1: Start Closed -> Open -> Snap Close -> Open
    // 1. Initial Open after slight delay
    setTimeout(() => {
      setIsClosing(false);
      setCloseFrac(0);

      // 2. Snap Close after 600ms of being open
      setTimeout(() => {
        setIsClosing(true);
        setCloseFrac(1);

        // 3. Open back up after black hold
        setTimeout(() => {
          setIsClosing(false);
          setCloseFrac(0);

          // Phase 2: Clapperboard after blades fully open
          setTimeout(() => {
            setPhase('clapper');
            setTimeout(() => setClapSlam(true), 80);

            // Phase 3: Iris reveal
            setTimeout(() => {
              setPhase('reveal');
              doReveal();
            }, 1400);
          }, T_OPEN);
        }, T_CLOSE + T_BLACK);
      }, 600);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function doReveal() {
    const maxR  = Math.ceil(Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) + 50;
    const start = performance.now();
    const dur   = 850;

    function frame(now) {
      const t     = Math.min((now - start) / dur, 1);
      const eased = t < 1 ? 1 - Math.pow(2, -10 * t) : 1;
      setHoleR(eased * maxR);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem('ls_seen', '1');
        }, 150);
      }
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const maskStyle = phase === 'reveal' ? {
    maskImage:       `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${holeR}px, #06050a ${holeR + 2}px)`,
    WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${holeR}px, #06050a ${holeR + 2}px)`,
  } : {};

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ls"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#06050a',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem', overflow: 'hidden',
            ...maskStyle,
          }}
        >
          {/* Shutter phase */}
          {phase === 'shutter' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ApertureIris closeFrac={closeFrac} isClosing={isClosing} />
            </motion.div>
          )}

          {/* Clapperboard phase */}
          {phase === 'clapper' && (
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Clapperboard slam={clapSlam} />
            </motion.div>
          )}

          <SprocketStrip />

          {/* Scan-line overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)',
            mixBlendMode: 'overlay', opacity: 0.5,
          }} aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}