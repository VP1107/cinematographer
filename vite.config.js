import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor: React core (cached separately from app code)
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          // Vendor: Router + animation
          if (id.includes('node_modules/react-router') || id.includes('node_modules/framer-motion')) {
            return 'vendor-ui';
          }
          // Vendor: Scroll libraries
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) {
            return 'vendor-scroll';
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
  },
})
