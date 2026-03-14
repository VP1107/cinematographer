// src/components/ui/SkeletonCard.jsx
// ============================================================
//  SkeletonCard — shimmer loading placeholder that matches
//  a ReelCard's visual footprint. Used in Suspense boundaries
//  and while data is loading.
//
//  Props:
//    aspectRatio {string}  — default '16/9'
//    showMeta    {bool}    — show title/year skeleton rows
// ============================================================

import React from 'react';

export default function SkeletonCard({
  aspectRatio = '16/9',
  showMeta    = true,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Thumbnail skeleton */}
      <div
        style={{
          width: '100%',
          aspectRatio,
          borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(90deg, var(--gray-dark) 0%, var(--gray-mid) 50%, var(--gray-dark) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {showMeta && (
        <div style={{ paddingInline: '2px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {/* Title bar */}
          <div
            style={{
              height: '14px',
              width: '65%',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, var(--gray-dark) 0%, var(--gray-mid) 50%, var(--gray-dark) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s ease-in-out infinite 0.1s',
            }}
            aria-hidden="true"
          />
          {/* Hindi subtitle bar */}
          <div
            style={{
              height: '10px',
              width: '35%',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, var(--gray-dark) 0%, var(--gray-mid) 50%, var(--gray-dark) 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s ease-in-out infinite 0.2s',
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}