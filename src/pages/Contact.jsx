// src/pages/Contact.jsx
// ============================================================
//  Contact Page
//  - Left: heading, email, city, social icons
//  - Right: contact form (mailto: or swap action for Formspree)
//  - Rangoli ornamental border
//  - All inputs styled to match Indian cinema dark aesthetic
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Film, Send } from 'lucide-react';
import { socialLinks, contactInfo } from '../data/socialLinks';
import useScrollReveal from '../hooks/useScrollReveal';

// ── Vimeo icon (Lucide doesn't include it) ───────────────────
function VimeoIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7.42c-.09 2-1.5 4.75-4.2 8.22C15 19.3 12.66 21 10.7 21c-1.2 0-2.22-1.1-3.06-3.32l-1.67-6.1C5.3 9.36 4.7 8.3 4.07 8.3c-.14 0-.62.29-1.44.86L1.5 7.9c.9-.8 1.8-1.6 2.67-2.4 1.2-1.04 2.1-1.58 2.7-1.63 1.42-.14 2.3.84 2.63 2.92.35 2.24.6 3.63.72 4.18.4 1.8.84 2.7 1.33 2.7.37 0 .94-.6 1.7-1.77.75-1.18 1.15-2.08 1.2-2.7.1-.97-.27-1.45-1.2-1.45-.43 0-.87.1-1.33.3.88-2.9 2.57-4.31 5.06-4.22 1.84.06 2.71 1.25 2.62 3.57z" />
    </svg>
  );
}

const ICON_MAP = {
  instagram: Instagram,
  youtube:   Youtube,
  linkedin:  Linkedin,
  film:      Film,
  vimeo:     VimeoIcon,
};

// ── Form field ────────────────────────────────────────────────
function Field({ label, name, type = 'text', multiline = false, required = false, value, onChange }) {
  const [focused, setFocused] = useState(false);

  const baseStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: focused
      ? '1px solid var(--saffron)'
      : '1px solid rgba(200,169,110,0.2)',
    padding: '0.75rem 0',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    fontWeight: 300,
    color: 'var(--white)',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 220ms ease',
    letterSpacing: '0.03em',
    display: 'block',
    WebkitAppearance: 'none',
  };

  return (
    <div style={{ marginBottom: '1.8rem' }}>
      <label
        htmlFor={name}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: focused ? 'var(--saffron-light)' : 'var(--white-muted)',
            transition: 'color 220ms ease',
          }}
        >
          {label}
        </span>

        {required && (
          <span style={{ color: 'var(--crimson)', fontSize: '0.8em' }} aria-hidden="true">*</span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={5}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...baseStyle, lineHeight: 1.7 }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const leftRef                   = useScrollReveal({ delay: 0 });
  const rightRef                  = useScrollReveal({ delay: 100 });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Form submit — swap action URL for Formspree/Netlify ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Fallback: open mailto if no backend configured
    const FORMSPREE_URL = ''; // e.g. 'https://formspree.io/f/YOUR_ID'

    if (FORMSPREE_URL) {
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) setSubmitted(true);
      } catch {
        // fallback to mailto
        window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;
      }
    } else {
      // Default mailto fallback
      window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(form.subject || 'Project Enquiry')}&body=${encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)}`;
    }

    setSending(false);
  };

  return (
    <div
      style={{
        paddingTop: '6rem',
        paddingBottom: 'var(--space-32)',
        background: 'var(--black)',
        minHeight: '100dvh',
      }}
    >
      <div className="container contact-grid">
        {/* ── Left column ── */}
        <div ref={leftRef}>
          {/* Eyebrow */}


          {/* Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              color: 'var(--white)',
              marginBottom: '2rem',
            }}
          >
            Let's talk.
          </h1>

          {/* Ornament line */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}
            aria-hidden="true"
          >
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--saffron))' }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="var(--saffron)" opacity="0.7" /></svg>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, var(--saffron), transparent)' }} />
          </div>

          {/* Email */}
          <a
            href={`mailto:${contactInfo.email}`}
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              color: 'var(--white)',
              textDecoration: 'none',
              marginBottom: '0.5rem',
              transition: 'color 220ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--saffron-light)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--white)'; }}
          >
            {contactInfo.email}
          </a>

          {/* City / availability */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--white-muted)',
              letterSpacing: '0.06em',
              marginBottom: '0.4rem',
            }}
          >
            {contactInfo.baseCity}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--white-muted)',
              letterSpacing: '0.06em',
              opacity: 0.6,
              marginBottom: '2.5rem',
            }}
          >
            {contactInfo.availability}
          </p>

          {/* Social icons */}
          <div
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            aria-label="Social media links"
          >
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
                    width: '44px',
                    height: '44px',
                    border: '1px solid rgba(200,169,110,0.18)',
                    borderRadius: '2px',
                    color: 'var(--white-muted)',
                    transition: 'all 220ms ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--saffron)';
                    e.currentTarget.style.color = 'var(--saffron)';
                    e.currentTarget.style.background = 'rgba(232,132,26,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.18)';
                    e.currentTarget.style.color = 'var(--white-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>


        </div>

        {/* ── Right column: form ── */}
        <div ref={rightRef}>
          {submitted ? (
            // Success state
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '3rem 2rem',
                border: '1px solid rgba(232,132,26,0.25)',
                borderRadius: '2px',
                textAlign: 'center',
              }}
            >
              {/* Mandala tick */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: '0 auto 1.5rem' }} aria-hidden="true">
                <circle cx="32" cy="32" r="28" stroke="var(--saffron)" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.5" />
                <circle cx="32" cy="32" r="18" stroke="var(--gold)" strokeWidth="0.6" opacity="0.4" />
                <path d="M20 32l8 8 16-16" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 300,
                  color: 'var(--white)',
                  marginBottom: '1rem',
                }}
              >
                Message sent.
              </p>
              <p style={{ color: 'var(--white-muted)', fontSize: 'var(--text-sm)' }}>
                I'll be in touch within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <Field
                label="Name"

                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
              <Field
                label="Email"

                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <Field
                label="Subject"

                name="subject"
                value={form.subject}
                onChange={handleChange}
              />
              <Field
                label="Message"

                name="message"
                multiline
                required
                value={form.message}
                onChange={handleChange}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--black)',
                  background: sending ? 'var(--saffron-dim)' : 'var(--saffron)',
                  border: '1px solid var(--saffron)',
                  padding: '0.75rem 2rem',
                  cursor: sending ? 'wait' : 'none',
                  opacity: sending ? 0.75 : 1,
                  transition: 'background 220ms ease, color 220ms ease, border-color 220ms ease',
                  marginTop: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  if (!sending) {
                    e.currentTarget.style.background = 'var(--crimson)';
                    e.currentTarget.style.borderColor = 'var(--crimson)';
                    e.currentTarget.style.color = 'var(--white)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = sending ? 'var(--saffron-dim)' : 'var(--saffron)';
                  e.currentTarget.style.borderColor = 'var(--saffron)';
                  e.currentTarget.style.color = 'var(--black)';
                }}
              >
                <Send size={15} />
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: clamp(2.5rem, 6vw, 5rem);
          padding-top: var(--space-12);
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        /* Auto-fill background fix for dark inputs */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill {
          -webkit-text-fill-color: var(--white) !important;
          -webkit-box-shadow: 0 0 0px 1000px var(--black) inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}