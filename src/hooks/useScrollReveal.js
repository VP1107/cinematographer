// src/hooks/useScrollReveal.js
// ============================================================
//  useScrollReveal — attach scroll-triggered entrance to a ref
//
//  Usage:
//    const ref = useScrollReveal();
//    <div ref={ref}>...</div>
//
//  The hook adds/removes the CSS class "visible" which pairs
//  with the .reveal base styles in globals.css:
//    opacity: 0; transform: translateY(24px);  →  visible state
//
//  Options:
//    threshold  {number}   0–1, default 0.15
//    rootMargin {string}   default '-40px'
//    once       {bool}     only trigger once (default true)
//    delay      {number}   ms CSS transition-delay to inject
// ============================================================

import { useEffect, useRef } from 'react';

export default function useScrollReveal({
  threshold  = 0.15,
  rootMargin = '-40px',
  once       = true,
  delay      = 0,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply base reveal class + optional delay
    el.classList.add('reveal');
    if (delay) el.style.transitionDelay = `${delay}ms`;

    // Skip animation on reduced motion — just show immediately
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('visible');
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, rootMargin, once, delay]);

  return ref;
}


// ============================================================
//  useIntersection — low-level IntersectionObserver hook
//  Returns { ref, isIntersecting }
//
//  Usage:
//    const { ref, isIntersecting } = useIntersection({ threshold: 0.5 });
// ============================================================

export function useIntersection({
  threshold  = 0,
  rootMargin = '0px',
  once       = false,
} = {}) {
  const ref                          = useRef(null);
  const [isIntersecting, setIsIntersecting] = useStateRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.unobserve(el);
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin, once]); // eslint-disable-line

  return { ref, isIntersecting };
}

// helper: useState that returns setter directly (keeps eslint happy)
import { useState } from 'react';
function useStateRef(initial) {
  const [val, setVal] = useState(initial);
  return [val, setVal];
}