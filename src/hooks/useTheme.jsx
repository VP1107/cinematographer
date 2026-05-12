// src/hooks/useTheme.jsx
// ============================================================
//  Theme Context — Light / Warm Cream Edition (Single Theme)
// ============================================================

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme] = useState('light');

  // Ensure the html element always carries the light theme attribute
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light'; // hint to browser chrome (scrollbars, inputs)
  }, []);

  const toggleTheme = () => {}; // no-op for compatibility

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
