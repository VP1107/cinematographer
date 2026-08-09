import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from './SectionHeading';

describe('SectionHeading', () => {
  it('renders the heading text', () => {
    render(<SectionHeading heading="Featured Work" animate={false} />);
    expect(
      screen.getByRole('heading', { level: 2, name: /featured work/i })
    ).toBeInTheDocument();
  });

  it('renders eyebrow and sub text when provided', () => {
    render(
      <SectionHeading
        heading="About"
        eyebrow="Introduction"
        sub="A short biography."
        animate={false}
      />
    );
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('A short biography.')).toBeInTheDocument();
  });

  it('does not render eyebrow or sub text when omitted', () => {
    render(<SectionHeading heading="Contact" animate={false} />);
    expect(screen.queryByText(/introduction/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/short biography/i)).not.toBeInTheDocument();
  });
});
