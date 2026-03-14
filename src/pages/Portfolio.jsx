// src/pages/Portfolio.jsx
// ============================================================
//  Portfolio / Work Page
//  - Category filter bar with smooth fade/reorder
//  - Full masonry-style grid of all reels
//  - All from /data/reels.js
// ============================================================

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/ui/SectionHeading';
import ReelCard from '../components/reel/ReelCard';
import { reels, reelCategories } from '../data/reels';

// ── Filter pill ───────────────────────────────────────────────
function FilterPill({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-pressed={active}
            style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.4rem 1.1rem',
                borderRadius: '2px',
                border: active
                    ? '1px solid var(--saffron)'
                    : '1px solid rgba(200,169,110,0.2)',
                background: active
                    ? 'rgba(232,132,26,0.12)'
                    : 'transparent',
                color: active ? 'var(--saffron-light)' : 'var(--white-muted)',
                cursor: 'none',
                transition: 'all 220ms ease',
                whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
                if (!active) {
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.5)';
                    e.currentTarget.style.color = 'var(--white-dim)';
                }
            }}
            onMouseLeave={(e) => {
                if (!active) {
                    e.currentTarget.style.borderColor = 'rgba(200,169,110,0.2)';
                    e.currentTarget.style.color = 'var(--white-muted)';
                }
            }}
        >
            {label}
        </button>
    );
}

export default function Portfolio() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = useMemo(
        () =>
            activeCategory === 'All'
                ? reels
                : reels.filter((r) => r.category === activeCategory),
        [activeCategory]
    );

    return (
        <div
            style={{
                paddingTop: '6rem',  // clear fixed navbar
                paddingBottom: 'var(--space-32)',
                background: 'var(--black)',
                minHeight: '100dvh',
            }}
        >
            <div className="container">

                {/* ── Page heading ── */}
                <SectionHeading
                    eyebrow="Portfolio"
                    heading="Work"
                    sub="All films, commercials, music videos, and creative direction projects."
                    accentColor="var(--teal-light)"
                    animate={false}
                    style={{ marginBottom: 'var(--space-8)' }}
                />

                {/* ── Filter bar ── */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.6rem',
                        marginBottom: 'var(--space-12)',
                        paddingBottom: 'var(--space-8)',
                        borderBottom: '1px solid rgba(200,169,110,0.08)',
                    }}
                    role="group"
                    aria-label="Filter by category"
                >
                    {reelCategories.map((cat) => (
                        <FilterPill
                            key={cat}
                            label={cat}
                            active={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)}
                        />
                    ))}
                </div>

                {/* ── Reel grid with AnimatePresence ── */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1.5rem',
                    }}
                    className="portfolio-grid"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((reel, i) => (
                            <motion.div
                                key={reel.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.04,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <ReelCard reel={reel} index={i} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: 'var(--space-24) 0',
                        }}
                    >
                        <p
                            style={{
                                color: 'var(--white-muted)',
                                marginTop: '0.5rem',
                                fontSize: 'var(--text-sm)',
                            }}
                        >
                            No projects found in this category.
                        </p>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 900px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div >
    );
}