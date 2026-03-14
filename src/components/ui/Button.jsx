// src/components/ui/Button.jsx
// ============================================================
//  Button — multiple variants with Indian cinema styling
//
//  Variants:
//    'primary'   — saffron fill
//    'secondary' — crimson fill
//    'teal'      — peacock teal fill
//    'outline'   — transparent + gold border
//    'ghost'     — no border, text only with underline
//
//  Sizes:
//    'sm' | 'md' (default) | 'lg'
//
//  Props:
//    variant    {string}
//    size       {string}
//    as         {string|component}  — 'button' | 'a' | Link etc.
//    href       {string}            — for <a> usage
//    to         {string}            — for React Router Link
//    disabled   {bool}
//    icon       {ReactNode}         — icon before label
//    iconRight  {ReactNode}         — icon after label
//    fullWidth  {bool}
//    children   {ReactNode}
//    ...rest    — forwarded to element
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';

// ── Variant style map ────────────────────────────────────────
const VARIANTS = {
  primary: {
    background:       'var(--saffron)',
    color:            'var(--black)',
    border:           '1px solid var(--saffron)',
    hoverBackground:  'var(--saffron-dim)',
    hoverBorder:      '1px solid var(--saffron-dim)',
    hoverColor:       'var(--white)',
  },
  secondary: {
    background:       'var(--crimson)',
    color:            'var(--white)',
    border:           '1px solid var(--crimson)',
    hoverBackground:  'var(--crimson-dim)',
    hoverBorder:      '1px solid var(--crimson-dim)',
    hoverColor:       'var(--white)',
  },
  teal: {
    background:       'var(--teal)',
    color:            'var(--white)',
    border:           '1px solid var(--teal)',
    hoverBackground:  'var(--teal-dim)',
    hoverBorder:      '1px solid var(--teal-dim)',
    hoverColor:       'var(--white)',
  },
  outline: {
    background:       'transparent',
    color:            'var(--white)',
    border:           '1px solid rgba(200,169,110,0.45)',
    hoverBackground:  'rgba(200,169,110,0.08)',
    hoverBorder:      '1px solid var(--gold)',
    hoverColor:       'var(--gold-light)',
  },
  ghost: {
    background:       'transparent',
    color:            'var(--white-dim)',
    border:           '1px solid transparent',
    hoverBackground:  'transparent',
    hoverBorder:      '1px solid transparent',
    hoverColor:       'var(--saffron-light)',
  },
};

// ── Size map ─────────────────────────────────────────────────
const SIZES = {
  sm: { padding: '0.4rem 1rem',   fontSize: 'var(--text-xs)', gap: '0.4rem' },
  md: { padding: '0.65rem 1.6rem', fontSize: 'var(--text-sm)', gap: '0.5rem' },
  lg: { padding: '0.85rem 2.2rem', fontSize: 'var(--text-base)', gap: '0.6rem' },
};

export default function Button({
  variant   = 'primary',
  size      = 'md',
  as,
  href,
  to,
  disabled  = false,
  icon,
  iconRight,
  fullWidth = false,
  children,
  style: styleProp = {},
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);

  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size]       ?? SIZES.md;

  const baseStyle = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            s.gap,
    padding:        s.padding,
    fontSize:       s.fontSize,
    fontFamily:     'var(--font-body)',
    fontWeight:     400,
    letterSpacing:  '0.1em',
    textTransform:  'uppercase',
    borderRadius:   'var(--radius-sm)',
    textDecoration: 'none',
    cursor:         disabled ? 'not-allowed' : 'none',
    opacity:        disabled ? 0.45 : 1,
    width:          fullWidth ? '100%' : undefined,
    transition:     'background 220ms ease, color 220ms ease, border-color 220ms ease, opacity 220ms ease',

    // Dynamic hover vs base
    background:     hovered && !disabled ? v.hoverBackground : v.background,
    color:          hovered && !disabled ? v.hoverColor : v.color,
    border:         hovered && !disabled ? v.hoverBorder : v.border,

    // Ghost variant gets an underline
    ...(variant === 'ghost' && {
      paddingInline: '0',
      borderBottom:  hovered ? '1px solid var(--saffron)' : '1px solid transparent',
      borderRadius:  '0',
    }),

    ...styleProp,
  };

  const inner = (
    <>
      {icon && <span style={{ lineHeight: 0, flexShrink: 0 }}>{icon}</span>}
      {children}
      {iconRight && <span style={{ lineHeight: 0, flexShrink: 0 }}>{iconRight}</span>}
    </>
  );

  const handlers = {
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  // ── Render as React Router Link ───────────────────────────
  if (to) {
    return (
      <Link to={to} style={baseStyle} {...handlers} {...rest}>
        {inner}
      </Link>
    );
  }

  // ── Render as <a> ─────────────────────────────────────────
  if (href || as === 'a') {
    return (
      <a href={href} style={baseStyle} {...handlers} {...rest}>
        {inner}
      </a>
    );
  }

  // ── Default: <button> ────────────────────────────────────
  const Tag = as ?? 'button';
  return (
    <Tag
      disabled={disabled}
      style={baseStyle}
      {...handlers}
      {...rest}
    >
      {inner}
    </Tag>
  );
}