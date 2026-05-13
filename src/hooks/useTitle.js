import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Tapan Vyas` : 'Tapan Vyas — Cinematographer';
  }, [title]);
}
