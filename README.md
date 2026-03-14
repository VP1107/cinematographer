# Cinematographer Portfolio

A high-end, cinematic portfolio website designed for cinematographers and filmmakers. This project features a modern editorial aesthetic, smooth animations, and a focus on visual storytelling.

## ✨ Features

- **Cinematic Hero**: Full-viewport hero section with muted video looping and dynamic text entry.
- **Smooth Motion**: Native-feeling smooth scrolling powered by **Lenis**.
- **Editorial Design**: A "Bollywood Golden Age meets Modern Editorial" design system.
- **Project Filtering**: Interactive portfolio grid with category filtering.
- **Dynamic Storytelling**: Scrolled-based parallax and pinned storytelling sections using **GSAP**.
- **Responsive**: Fully optimized for mobile and desktop displays.

## 🛠️ Tech Stack

- **Core**: React 19 + Vite
- **Animations**: Framer Motion 12 + GSAP 3
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with a bespoke Indian Cinema Design System
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
   - Do **not** initialize it with a README, license, or gitignore (since we already have them).

3. **Link Local Repository to GitHub**:
   Copy the URL of your new GitHub repo (e.g., `https://github.com/your-username/your-repo-name.git`) and run:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   ```

4. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

From now on, you can simply use:
- `git add .`
- `git commit -m "your message"`
- `git push`

---

## 🌎 Deployment (GitHub Pages)

This project is configured for easy deployment to GitHub Pages:

1. **Install GH Pages Utility**:
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Settings**: On GitHub, go to **Settings > Pages** and ensure "Build and deployment" is set to "Deploy from a branch" and the branch is set to `gh-pages`.

> [!NOTE]
> This project uses `HashRouter` to ensure routes work correctly on static hosting like GitHub Pages without extra configuration.
