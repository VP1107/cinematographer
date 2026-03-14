// src/main.jsx
// ============================================================
//  Entry Point — React DOM render
//  Lenis smooth scroll is initialised inside SmoothScrollProvider
//  so this file stays intentionally minimal.
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global styles are imported inside App.jsx so that Vite's
// CSS code-splitting works correctly with lazy routes.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);