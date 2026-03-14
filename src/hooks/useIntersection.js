import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the target element enters the viewport.
 * @param {object} options – IntersectionObserver options
 * @returns {[React.RefObject, boolean]}
 */
export function useIntersection({ threshold = 0.1, rootMargin = '0px' } = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, isVisible];
}
