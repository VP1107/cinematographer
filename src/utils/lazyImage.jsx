// src/utils/lazyImage.js
// ============================================================
//  lazyImage — native lazy-load helper + onLoad swap pattern
//
//  Use the LazyImage React component for all <img> tags.
//  It shows a dark shimmer placeholder at the correct
//  aspect ratio until the real image loads, then cross-fades.
//
//  Props:
//    src           {string}  — image URL
//    alt           {string}  — alt text (required for a11y)
//    aspectRatio   {string}  — CSS aspect-ratio e.g. '16/9', '1/1'
//    width         {number}  — intrinsic width for CLS (default 1920)
//    height        {number}  — intrinsic height for CLS (default 1080)
//    fetchpriority {string}  — 'high' for LCP images, 'low' for offscreen
//    eager         {bool}    — skip lazy loading (for above-fold images)
//    className     {string}
//    style         {object}
//    imgStyle      {object}  — styles applied to the <img> itself
//    haldi         {bool}    — apply warm sepia tint (default false)
// ============================================================

import React, { useState } from 'react';

export function LazyImage({
  src,
  alt,
  aspectRatio = '16/9',
  width       = 1920,
  height      = 1080,
  fetchpriority,
  eager       = false,
  className   = '',
  style: styleProp = {},
  imgStyle    = {},
  haldi       = false,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        background: 'var(--gray-dark)',
        ...styleProp,
      }}
    >
      {/* Shimmer placeholder — visible until image loads */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, var(--gray-dark) 0%, var(--gray-mid) 50%, var(--gray-dark) 100%)',
          backgroundSize: '200% 100%',
          animation: loaded ? 'none' : 'shimmer 2s ease-in-out infinite',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={fetchpriority}
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 500ms ease',
          // Haldi warm-sepia tint for Indian aesthetic
          filter: haldi
            ? 'sepia(0.18) saturate(1.1) contrast(1.05)'
            : undefined,
          ...imgStyle,
        }}
      />
    </div>
  );
}

export default LazyImage;