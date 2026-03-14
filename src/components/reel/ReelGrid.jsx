import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReelCard from './ReelCard';
import { categories } from '../../data/reels';
import { cn } from '../../utils/cn';

export default function ReelGrid({ reels }) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = useMemo(() => {
        if (activeCategory === 'All') return reels;
        return reels.filter((r) => r.category === activeCategory);
    }, [reels, activeCategory]);

    return (
        <div>
            {/* Filter tabs */}
            <div className="mb-8 flex flex-wrap gap-2 md:mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                            activeCategory === cat
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((reel, i) => (
                        <ReelCard key={reel.id} reel={reel} index={i} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
