import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('renders nothing', () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('scrolls to the top instantly on mount', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
      </MemoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  });

  it('scrolls to the top again when navigating to a new route', () => {
    function Wrapper({ path }) {
      return (
        <MemoryRouter initialEntries={[path]}>
          <ScrollToTop />
        </MemoryRouter>
      );
    }

    const { rerender } = render(<Wrapper path="/" />);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    rerender(<Wrapper path="/about" />);
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
