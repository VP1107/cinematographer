// src/pages/Home.jsx
// ============================================================
//  Home Page — assembles all home sections
// ============================================================

import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import HeroSection        from '../components/sections/HeroSection';
import FeaturedWork       from '../components/sections/FeaturedWork';
import SectionHeading     from '../components/ui/SectionHeading';
import VideoPlaceholder   from '../components/ui/VideoPlaceholder';
import useScrollReveal    from '../hooks/useScrollReveal';
import { projects }       from '../data/projects';

// Lazy load heavy scroll section
const StorytellingSection = lazy(() =>
  import('../components/sections/StorytellingSection')
);

// ── Intro Section ─────────────────────────────────────────────
function IntroSection() {
  const ref = useScrollReveal({ delay: 0 });
  return (
    <section
      style={{
        padding: 'var(--space-24) 0',
        background: 'var(--black)',
      }}
      aria-label="Introduction"
    >
      <div
        className="container"
        style={{
          maxWidth: '680px',
          marginInline: 'auto',
          textAlign: 'center',
        }}
      >
        <div ref={ref}>


          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 300,
              letterSpacing: '0.03em',
              lineHeight: 1.4,
              color: 'var(--white)',
              marginBottom: '1.2rem',
            }}
          >
            Cinematographer based in Mumbai &amp; Ahmedabad —
            telling Indian stories with precision and feeling.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 300,
              color: 'var(--white-dim)',
              lineHeight: 1.8,
              marginInline: 'auto',
            }}
          >
            From the ghats of Varanasi to the rooftops of Ahmedabad,
            from Bollywood stages to quiet festival short films —
            every frame is built on light, movement, and the quiet
            dignity of the moment.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Selected Projects Section ─────────────────────────────────
function SelectedProjectCard({ project, index }) {
  const [hovered, setHovered] = React.useState(false);
  const navigate = React.useCallback(
    () => window.location.assign(`/portfolio/${project.slug}`),
    [project.slug]
  );

  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={navigate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1fr' : '1fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        cursor: 'none',
        paddingBlock: '2rem',
        borderBottom: '1px solid rgba(200,169,110,0.08)',
      }}
      className="project-card-grid"
    >
      {/* Media — left on even, right on odd */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div
          style={{
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 600ms var(--ease-circ)',
            overflow: 'hidden',
            borderRadius: '2px',
          }}
        >
          <VideoPlaceholder
            title={project.title}
            titleHindi={project.titleHindi}
            accentColor={project.accentColor || 'var(--saffron)'}
            onPlay={navigate}
            aspectRatio="16/9"
          />
        </div>
      </div>

      {/* Text */}
      <div style={{ order: isEven ? 1 : 0, padding: '0 1rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-devanagari)',
            fontSize: 'var(--text-sm)',
            color: project.accentColor || 'var(--saffron)',
            opacity: 0.75,
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}
        >
          {project.titleHindi}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: project.accentColor || 'var(--saffron)',
            opacity: 0.7,
            marginBottom: '1rem',
          }}
        >
          {project.subtitle}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            fontWeight: 300,
            color: 'var(--white-dim)',
            lineHeight: 1.7,
            maxWidth: '44ch',
          }}
        >
          {project.description}
        </p>

        {/* Arrow link */}
        <div
          style={{
            marginTop: '1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: hovered ? (project.accentColor || 'var(--saffron)') : 'var(--white-muted)',
            transition: 'color 250ms ease',
          }}
        >
          View Project
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 250ms ease',
            }}
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

function SelectedProjects() {
  return (
    <section
      style={{ padding: 'var(--space-24) 0', background: 'var(--black)' }}
      aria-label="Selected Projects"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Selected Projects"
          heading="The work that defines us."
          accentColor="var(--crimson)"
          style={{ marginBottom: 'var(--space-12)' }}
        />

        <div>
          {projects.map((project, i) => (
            <SelectedProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
          }
          .project-card-grid > * {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────
function CTASection() {
  const ref = useScrollReveal({ delay: 100 });
  return (
    <section
      style={{
        padding: 'var(--space-32) 0',
        background: 'var(--off-black)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Call to action"
    >


      <div
        className="container"
        style={{ textAlign: 'center', position: 'relative' }}
        ref={ref}
      >


        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '0.04em',
            lineHeight: 1.2,
            color: 'var(--white)',
            marginBottom: '2.5rem',
            maxWidth: '18ch',
            marginInline: 'auto',
          }}
        >
          Let's create something cinematic together.
        </h2>

        <Link
          to="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--black)',
            background: 'var(--saffron)',
            border: '1px solid var(--saffron)',
            padding: '0.8rem 2.2rem',
            textDecoration: 'none',
            transition: 'background 220ms ease, color 220ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--crimson)';
            e.currentTarget.style.borderColor = 'var(--crimson)';
            e.currentTarget.style.color = 'var(--white)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--saffron)';
            e.currentTarget.style.borderColor = 'var(--saffron)';
            e.currentTarget.style.color = 'var(--black)';
          }}
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}

// ── Page assembly ─────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturedWork />
      <Suspense fallback={
        <div style={{ height: '100dvh', background: 'var(--black)' }} />
      }>
        <StorytellingSection />
      </Suspense>
      <SelectedProjects />
      <CTASection />
    </>
  );
}