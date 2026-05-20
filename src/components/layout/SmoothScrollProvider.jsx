import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LenisContext = React.createContext(null);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Skip on reduced-motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08, // Physics-based linear interpolation for fluid motion
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true, // Native touch scrolling feel
    });

    lenisRef.current = lenis;

    // Check if the preloader will be visible
    const lsSeen = sessionStorage.getItem('ls_seen');
    if (!lsSeen) {
      // Pause Lenis until the loader-complete event fires
      lenis.stop();
    }

    const handleLoaderComplete = () => {
      lenis.start();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('loader-complete', handleLoaderComplete);

    // Hook into GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Hook into GSAP ticker so ScrollTrigger stays in sync
    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('loader-complete', handleLoaderComplete);
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}