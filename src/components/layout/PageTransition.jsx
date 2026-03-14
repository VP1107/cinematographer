// src/components/layout/PageTransition.jsx
// ============================================================
//  PageTransition — Framer Motion 12 film-cut style wrapper
//  Used by AnimatePresence in App.jsx
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
  },
  enter: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(100% 0 0% 0)',
    transition: {
      duration: 0.4,
      ease: [0.55, 0, 0.78, 0],
    },
  },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ minHeight: '100dvh' }}
    >
      {children}
    </motion.div>
  );
}