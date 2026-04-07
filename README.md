# Manushree Rao - Cinematographer Portfolio

A high-end, cinematic portfolio website designed for Manushree Rao, a cinematographer based in Mumbai / Ahmedabad. This project features a modern editorial aesthetic, smooth animations, and a focus on visual storytelling.

## ✨ Features

- **Cinematic Hero**: Full-viewport hero section with muted video looping and dynamic text entry.
- **Smooth Motion**: Native-feeling smooth scrolling powered by **Lenis**.
- **Editorial Design**: A minimalist and aesthetic design system built with **Tailwind CSS**.
- **Project Filtering**: Interactive portfolio grid with category filtering.
- **Dynamic Storytelling**: Scrolled-based parallax and pinned storytelling sections using **GSAP** and **Framer Motion**.
- **Responsive Navigation**: Fully optimized for mobile and desktop displays.

## 🛠️ Tech Stack

- **Core**: React 19 + Vite
- **Animations**: Framer Motion 12 + GSAP 3
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4
- **Routing**: React Router 7
- **Video**: React Player

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `/src/components`: Reusable UI components (layout elements, UI widgets, etc.).
- `/src/pages`: Top-level page components (e.g., Home, Services, Portfolio).
- `/src/data`: Static JSON data (`portfolio.json`) driving the portfolio items, reels, and services.
- `/src/hooks`: Custom React hooks for shared logic.
- `/src/utils`: Utility functions and helper scripts.

---

## 🔗 Connecting to GitHub

To store your project on GitHub and keep track of your changes, follow these steps:

1. **Initialize Git (if not already done)**:
   Open your terminal in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initialize project"
   ```

2. **Create a Repository on GitHub**:
   - Go to [GitHub.com](https://github.com) and create a new repository.
   - Do **not** initialize it with a README, license, or gitignore.

3. **Link Local Repository to GitHub**:
   Copy the URL of your new GitHub repo and run:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   ```

4. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

## 🌎 Deployment (GitHub Pages)

This project is configured for easy deployment to GitHub Pages via the `gh-pages` branch.

1. **Verify `gh-pages` is installed**:
   It is already included in `devDependencies`. Ensure you have run `npm install`.

2. **Deploy**:
   Run the deployment script, which will automatically build and push to the `gh-pages` branch.
   ```bash
   npm run deploy
   ```

3. **Settings**: On GitHub, navigate to **Settings > Pages**. Ensure the source is set to **Deploy from a branch** and select `gh-pages` as your core branch for deployment.

> [!NOTE]
> This project works out of the box with static hosting, optimized for lightweight, fast deployment.
