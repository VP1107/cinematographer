# Tapan Vyas - Cinematographer Portfolio

A professional portfolio website for cinematographer Tapan Vyas, showcasing his feature films, ad films, and short films. Built with a modern tech stack to provide a smooth, engaging, and premium user experience.

## Features

- **Dynamic Animations**: Smooth scroll and scroll-triggered animations powered by Lenis and GSAP.
- **Modern UI**: Styled with Tailwind CSS for a sleek, responsive design.
- **Interactive Elements**: Page transitions and interactive components built with Framer Motion.
- **Video Integration**: Embedded video trailers and showreels using React Player.
- **Responsive Layout**: Optimized for all devices, from desktop to mobile.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

## Getting Started

1. **Clone the repository** (if applicable) or download the source code.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173`).

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to catch code issues.
- `npm run deploy`: Deploys the application to GitHub Pages (uses the `gh-pages` branch).

## Project & Folder Architecture

This section details the internal architecture of the project to help an AI or developer quickly understand where components, styles, data, and configuration reside.

```text
cinematographer/
├── package.json              # Project metadata, dependencies, and scripts
├── vite.config.js            # Vite configuration
├── README.md                 # Project documentation
├── public/                   # Static assets that bypass the build system
└── src/                      # Main source code directory
    ├── main.jsx              # Application entry point; mounts the React app
    ├── App.jsx               # Root component, sets up routing and global providers
    │
    ├── assets/               # Images, fonts, and other compiled static assets
    │
    ├── components/           # Reusable React components
    │   ├── layout/           # Structural page components
    │   │   ├── Navbar.jsx    # Top navigation bar
    │   │   ├── Footer.jsx    # Bottom page footer
    │   │   ├── LoadingScreen.jsx # App loading overlay
    │   │   ├── PageTransition.jsx # Framer Motion route transition wrapper
    │   │   ├── ScrollToTop.jsx # Utility to scroll to top on route change
    │   │   └── SmoothScrollProvider.jsx # Lenis wrapper for smooth scrolling
    │   │
    │   ├── sections/         # Complex page sections
    │   │   ├── HeroSection.jsx
    │   │   ├── FeaturedWork.jsx
    │   │   └── StorytellingSection.jsx
    │   │
    │   ├── ui/               # Primitive, reusable UI elements
    │   │   ├── Button.jsx    # Custom button component
    │   │   ├── CustomCursor.jsx # Custom mouse cursor component
    │   │   ├── SectionHeading.jsx # Typography for sections
    │   │   ├── SkeletonCard.jsx # Loading placeholder for items
    │   │   └── VideoPlaceholder.jsx # Fallback state for videos
    │   │
    │   └── reel/             # Components specific to showreels or video playback
    │
    ├── pages/                # Top-level route components
    │   ├── Home.jsx          # Landing page
    │   ├── Portfolio.jsx     # Main portfolio grid
    │   ├── ReelPage.jsx      # Video reel showcase
    │   ├── Services.jsx      # Offered services page
    │   ├── About.jsx         # About the cinematographer
    │   ├── Contact.jsx       # Contact form and details
    │   └── CMSDashboard.jsx  # Internal CMS or dashboard page
    │
    ├── data/                 # JSON and JS data files (Content)
    │   ├── portfolio.json    # Core project data (films, ads)
    │   ├── projects.js       # Array of projects
    │   ├── reels.js          # Array of video reels
    │   ├── services.js       # Array of services offered
    │   └── socialLinks.js    # Social media endpoints
    │
    ├── hooks/                # Custom React Hooks
    │   ├── useLenis.js       # Hook to access Lenis instance
    │   ├── useScrollReveal.js # Hook for scroll-triggered GSAP animations
    │   ├── useIntersection.js # Intersection Observer hook
    │   └── useTheme.jsx      # Theme management (light/dark mode)
    │
    ├── styles/               # Global styling
    │   └── globals.css       # Tailwind directives and custom CSS variables
    │
    └── utils/                # Helper functions and utilities
        ├── cn.js             # Utility for conditional Tailwind class merging
        └── lazyImage.jsx     # Component/utility for lazy loading images
```

### Key Architectural Concepts

- **Component Hierarchy**: The app follows a clear separation between `pages` (route level components), `components/layout` (globals like Navbar/Footer), `components/sections` (large chunks of pages), and `components/ui` (small reusable parts).
- **Styling**: Relies heavily on Tailwind CSS for utility classes. Custom themes or global overrides are placed in `src/styles/globals.css`. Class merging is handled via `src/utils/cn.js` (typically using `clsx` and `tailwind-merge`).
- **Animations**: Driven by `framer-motion` for page transitions/interactions and `gsap` (with `ScrollTrigger`) for complex scroll-linked animations. These logic blocks often reside in custom hooks inside `src/hooks`.
- **Data Layer**: Content is largely static and sourced from files in `src/data`. Adding a new portfolio item simply requires modifying `portfolio.json`.
- **Performance**: Heavy media elements utilize `lazyImage.jsx` and `VideoPlaceholder.jsx` to ensure fast initial loads.

## License

This project is proprietary. All content and media are the property of their respective owners.
