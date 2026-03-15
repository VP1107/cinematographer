import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of window on pathname change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' instead of 'smooth' to prevent visual jarring during page transitions
    });
  }, [pathname]);

  return null;
}
