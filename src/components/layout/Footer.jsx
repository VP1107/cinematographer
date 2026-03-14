// src/components/layout/Footer.jsx
// ============================================================
//  Footer — dark, minimal, Indian cinema editorial
//  Rangoli SVG top border | social links | Hindi tagline
// ============================================================

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Film } from 'lucide-react';
import { socialLinks, contactInfo } from '../../data/socialLinks';

// ── Social icon map (Lucide doesn't have Vimeo) ──────────────
const ICON_MAP = {
  instagram: Instagram,
  youtube:   Youtube,
  linkedin:  Linkedin,
  film:      Film,
  vimeo:     () => (
    // Inline Vimeo SVG
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 7.42c-.09 2-1.5 4.75-4.2 8.22C15 19.3 12.66 21 10.7 21c-1.2 0-2.22-1.1-3.06-3.32l-1.67-6.1C5.3 9.36 4.7 8.3 4.07 8.3c-.14 0-.62.29-1.44.86L1.5 7.9c.9-.8 1.8-1.6 2.67-2.4 1.2-1.04 2.1-1.58 2.7-1.63 1.42-.14 2.3.84 2.63 2.92.35 2.24.6 3.63.72 4.18.4 1.8.84 2.7 1.33 2.7.37 0 .94-.6 1.7-1.77.75-1.18 1.15-2.08 1.2-2.7.1-.97-.27-1.45-1.2-1.45-.43 0-.87.1-1.33.3.88-2.9 2.57-4.31 5.06-4.22 1.84.06 2.71 1.25 2.62 3.57z"
        fill="currentColor"
      />
    </svg>
  ),
};

// ── Rangoli divider SVG ──────────────────────────────────────
function RangoliDivider() {
  return (
    <svg
      viewBox="0 0 1200 24"
      fill="none"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '24px', display: 'block' }}
      aria-hidden="true"
    >
      {/* base line */}
      <line x1="0" y1="12" x2="1200" y2="12" stroke="rgba(200,169,110,0.15)" strokeWidth="1" />
      {/* diamond chain */}
      {Array.from({ length: 24 }, (_, i) => {
        const x = 25 + i * 50;
        return (
          <g key={i}>
            <polygon
              points={`${x},8 ${x + 5},12 ${x},16 ${x - 5},12`}
              fill="none"
              stroke="rgba(232,132,26,0.35)"
              strokeWidth="0.7"
            />
            <circle cx={x} cy={12} r="1" fill="rgba(232,132,26,0.5)" />
          </g>
        );
      })}
      {/* teal centre accent */}
      <circle cx="600" cy="12" r="4" fill="none" stroke="var(--teal)" strokeWidth="0.8" opacity="0.5" />
      <circle cx="600" cy="12" r="2" fill="var(--teal)" opacity="0.6" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { to: '/',          label: 'Home'     },
  { to: '/portfolio', label: 'Work'     },
  { to: '/about',     label: 'About'    },
  { to: '/services',  label: 'Services' },
  { to: '/contact',   label: 'Contact'  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--off-black)',
        borderTop: '1px solid rgba(200,169,110,0.06)',
      }}
    >
      {/* Rangoli top border */}
      <RangoliDivider />

      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        {/* ── Top row ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: 'var(--white)',
                marginBottom: '0.5rem',
              }}
            >
              Your Name
            </p>
            <p
              style={{
                fontFamily: 'var(--font-devanagari)',
                fontSize: 'var(--text-sm)',
                color: 'var(--saffron)',
                opacity: 0.7,
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Cinematographer
            </p>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--white-muted)',
                letterSpacing: '0.06em',
              }}
            >
              {contactInfo.baseCity}
            </p>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--white-muted)',
                letterSpacing: '0.04em',
                marginTop: '0.3rem',
              }}
            >
              {contactInfo.availability}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--saffron)',
                marginBottom: '1rem',
              }}
            >
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              {FOOTER_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    letterSpacing: '0.06em',
                    color: isActive ? 'var(--saffron-light)' : 'var(--white-muted)',
                    textDecoration: 'none',
                    marginBottom: '0.5rem',
                    transition: 'color 200ms ease',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--saffron)',
                marginBottom: '1rem',
              }}
            >
              Connect
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                color: 'var(--white-dim)',
                textDecoration: 'none',
                marginBottom: '1.2rem',
                letterSpacing: '0.04em',
                transition: 'color 200ms ease',
              }}
            >
              {contactInfo.email}
            </a>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {socialLinks.map(({ id, label, url, icon }) => {
                const Icon = ICON_MAP[icon] || Film;
                return (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: '1px solid rgba(200,169,110,0.2)',
                      color: 'var(--white-muted)',
                      transition: 'color 200ms ease, border-color 200ms ease, background 200ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--saffron)';
                      e.currentTarget.style.borderColor = 'var(--saffron)';
                      e.currentTarget.style.background = 'rgba(232,132,26,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--white-muted)';
                      e.currentTarget.style.borderColor = 'rgba(200,169,110,0.2)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(200,169,110,0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--white-muted)',
              letterSpacing: '0.06em',
            }}
          >
            © {year} Your Name. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-devanagari)',
              fontSize: 'var(--text-sm)',
              color: 'var(--saffron)',
              opacity: 0.4,
              letterSpacing: '0.3em',
            }}
          >
            ॐ
          </p>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--white-muted)',
              letterSpacing: '0.06em',
              opacity: 0.5,
            }}
          >
            Crafted with light & intention.
          </p>
        </div>
      </div>
    </footer>
  );
}