// src/components/layout/Navbar.jsx
// ============================================================
//  Navbar — Fixed, backdrop-blur, Indian cinema editorial
//  React Router v7 NavLink | Framer Motion 12 hamburger menu
// ============================================================

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

// ── Nav links ────────────────────────────────────────────────
const NAV_LINKS = [
  { to: '/',          label: 'Home',     labelHindi: 'होम'       },
  { to: '/portfolio', label: 'Work',     labelHindi: 'काम'       },
  { to: '/about',     label: 'About',    labelHindi: 'परिचय'    },
  { to: '/services',  label: 'Services', labelHindi: 'सेवाएँ'  },
  { to: '/contact',   label: 'Contact',  labelHindi: 'संपर्क'  },
];

// ── Rangoli SVG logo mark ────────────────────────────────────
function RangoliMark({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="var(--saffron)" strokeWidth="0.8" opacity="0.6" />
      <circle cx="20" cy="20" r="11" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5" />
      <circle cx="20" cy="20" r="4" fill="var(--saffron)" opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 20 + 6 * Math.cos(rad);
        const y1 = 20 + 6 * Math.sin(rad);
        const x2 = 20 + 16 * Math.cos(rad);
        const y2 = 20 + 16 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--gold)"
            strokeWidth="0.6"
            opacity="0.5"
          />
        );
      })}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 20 + 13 * Math.cos(rad);
        const cy = 20 + 13 * Math.sin(rad);
        return (
          <circle key={angle} cx={cx} cy={cy} r="1.5" fill="var(--crimson)" opacity="0.8" />
        );
      })}
    </svg>
  );
}

// ── Theme Toggle Button ──────────────────────────────────────
function ThemeToggle({ size = 20, style = {} }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.2rem',
        height: '2.2rem',
        borderRadius: '50%',
        border: '1px solid var(--border-ornament)',
        background: isDark
          ? 'rgba(232, 132, 26, 0.08)'
          : 'rgba(201, 107, 0, 0.1)',
        color: 'var(--saffron)',
        transition: 'background 300ms ease, border-color 300ms ease, color 300ms ease',
        flexShrink: 0,
        ...style,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', lineHeight: 0 }}
        >
          {isDark ? <Sun size={size} strokeWidth={1.5} /> : <Moon size={size} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

// ── Mobile menu overlay ──────────────────────────────────────
function MobileMenu({ isOpen, onClose }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit:   { opacity: 0, transition: { duration: 0.3, ease: [0.55, 0, 0.78, 0] } },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
    exit:   { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -20, transition: { duration: 0.25 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            background: isLight
              ? 'rgba(240, 233, 218, 0.97)'
              : 'rgba(6, 5, 10, 0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={onClose}
        >
          {/* Rangoli bg decoration */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23c8a96e' stroke-width='0.4' opacity='0.06'%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Cline x1='10' y1='40' x2='70' y2='40'/%3E%3Cline x1='40' y1='10' x2='40' y2='70'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '80px 80px',
              pointerEvents: 'none',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              color: 'var(--white-dim)',
              padding: '0.5rem',
              transition: 'color 200ms ease',
            }}
          >
            <X size={28} />
          </button>

          {/* Links */}
          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ to, label, labelHindi }) => (
              <motion.div key={to} variants={itemVariants}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
                    fontWeight: 300,
                    letterSpacing: '0.04em',
                    lineHeight: 1.2,
                    color: isActive ? 'var(--saffron-light)' : 'var(--white)',
                    marginBottom: '0.5rem',
                    transition: 'color 200ms ease',
                    textDecoration: 'none',
                  })}
                >
                  {label}
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-devanagari)',
                      fontSize: '0.32em',
                      color: 'var(--saffron)',
                      letterSpacing: '0.12em',
                      opacity: 0.7,
                      marginTop: '-0.2em',
                    }}
                  >
                    {labelHindi}
                  </span>
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          {/* Bottom ornament + theme toggle in mobile menu */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-devanagari)',
                fontSize: '1.5rem',
                color: 'var(--saffron)',
                opacity: 0.3,
                letterSpacing: '0.5em',
              }}
            >
              ॐ
            </span>
            <ThemeToggle size={22} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main Navbar ──────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location                  = useLocation();
  const { theme }                 = useTheme();
  const isLight                   = theme === 'light';

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Detect scroll to intensify navbar bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)',
          background: scrolled
            ? 'var(--nav-bg-scrolled)'
            : 'var(--nav-bg-top)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: scrolled
            ? `1px solid var(--nav-border)`
            : '1px solid transparent',
          boxShadow: scrolled && isLight
            ? '0 2px 20px rgba(124, 90, 32, 0.12)'
            : 'none',
          transition: 'background 400ms ease, border-color 400ms ease, box-shadow 400ms ease',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
            maxWidth: 'none', // Allow it to stretch full-screen
          }}
        >
          {/* ── Logo / Wordmark ── */}
          <NavLink
            to="/"
            aria-label="Home"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
          >
            <RangoliMark size={28} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: 'var(--white)',
                textTransform: 'uppercase',
              }}
            >
              Your Name
            </span>
          </NavLink>

          {/* ── Desktop Links ── */}
          <nav
            aria-label="Main navigation"
            style={{ display: 'flex', gap: '4rem', alignItems: 'center', justifyContent: 'space-between' }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--saffron-light)' : 'var(--white-dim)',
                  textDecoration: 'none',
                  paddingBottom: '3px',
                  borderBottom: isActive
                    ? '1px solid var(--saffron)'
                    : '1px solid transparent',
                  transition: 'color 200ms ease, border-color 200ms ease',
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.classList.contains('active')) {
                    e.currentTarget.style.color = 'var(--white)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.style.color?.includes('saffron')) {
                    e.currentTarget.style.color = 'var(--white-dim)';
                  }
                }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Theme Toggle (desktop) ── */}
          <ThemeToggle size={18} style={{ marginLeft: '-2rem' }} />

          {/* ── Mobile Hamburger ── */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: 'none',
              color: 'var(--white)',
              padding: '0.25rem',
              background: 'none',
              border: 'none',
            }}
            className="hamburger"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'block', lineHeight: 0 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Thin saffron progress line at very bottom of nav */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--saffron) 30%, var(--crimson) 70%, transparent)',
            opacity: scrolled ? 0.4 : 0,
            transition: 'opacity 400ms ease',
          }}
        />
      </header>

      {/* Mobile full-screen overlay */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Responsive styles via <style> injection */}
      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .hamburger     { display: block !important; }
        }
        @media (min-width: 768px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}