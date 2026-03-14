// src/App.jsx
// ============================================================
//  Root App — Router, Lazy Pages, Page Transitions
//  Indian Cinema Editorial Theme
// ============================================================

import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar          from './components/layout/Navbar';
import Footer          from './components/layout/Footer';
import PageTransition  from './components/layout/PageTransition';
import LoadingScreen   from './components/layout/LoadingScreen';
import CustomCursor    from './components/ui/CustomCursor';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';

import './styles/globals.css';

// ── Lazy-loaded pages (route-based code splitting) ──────────
const Home      = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ReelPage  = lazy(() => import('./pages/ReelPage'));
const About     = lazy(() => import('./pages/About'));
const Services  = lazy(() => import('./pages/Services'));
const Contact   = lazy(() => import('./pages/Contact'));

// ── Page Fallback ────────────────────────────────────────────
function PageFallback() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--black)',
      }}
    >
      {/* Minimal rangoli-dot loader */}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <circle
            key={angle}
            cx={24 + 16 * Math.cos((angle * Math.PI) / 180)}
            cy={24 + 16 * Math.sin((angle * Math.PI) / 180)}
            r="3"
            fill="var(--saffron)"
            opacity={0.3 + i * 0.09}
            style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
        <style>{`
          @keyframes pulse { to { opacity: 1; r: 4; } }
        `}</style>
      </svg>
    </div>
  );
}

// ── Animated Routes (needs access to location for AnimatePresence) ──
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Suspense fallback={<PageFallback />}>
                <Home />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PageTransition>
              <Suspense fallback={<PageFallback />}>
                <Portfolio />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/portfolio/:slug"
          element={
            <PageTransition>
              <Suspense fallback={<PageFallback />}>
                <ReelPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <Suspense fallback={<PageFallback />}>
                <About />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Suspense fallback={<PageFallback />}>
                <Services />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Suspense fallback={<PageFallback />}>
                <Contact />
              </Suspense>
            </PageTransition>
          }
        />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// ── 404 Page ─────────────────────────────────────────────────
function NotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-devanagari)',
          fontSize: 'var(--text-sm)',
          color: 'var(--saffron)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        ॐ
      </span>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-4xl)',
          color: 'var(--white)',
        }}
      >
        404
      </h1>
      <p style={{ color: 'var(--white-muted)' }}>
        This frame doesn't exist.
      </p>
      <a
        href="/"
        style={{
          color: 'var(--saffron-light)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--saffron)',
          paddingBottom: '2px',
          transition: 'color 200ms ease',
        }}
      >
        Return Home
      </a>
    </div>
  );
}

// ── Root App ─────────────────────────────────────────────────
export default function App() {
  return (
    <HashRouter>
      <SmoothScrollProvider>
        {/* Custom cursor — rendered outside page flow */}
        <CustomCursor />

        {/* Initial loading screen */}
        <LoadingScreen />

        {/* Site shell */}
        <Navbar />

        <main id="main-content">
          <AnimatedRoutes />
        </main>

        <Footer />
      </SmoothScrollProvider>
    </HashRouter>
  );
}