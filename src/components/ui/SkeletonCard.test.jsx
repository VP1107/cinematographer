import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SkeletonCard from './SkeletonCard';

describe('SkeletonCard', () => {
  it('renders without crashing with default props', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders meta skeleton rows by default (thumbnail + title + subtitle)', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(3);
  });

  it('omits meta skeleton rows when showMeta is false', () => {
    const { container } = render(<SkeletonCard showMeta={false} />);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBe(1);
  });
});
