import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Button from './Button';

describe('Button', () => {
  it('renders children as a native button by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as an anchor tag when href is provided', () => {
    render(<Button href="https://example.com">Visit</Button>);
    const link = screen.getByRole('link', { name: /visit/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders as a React Router Link when "to" is provided', () => {
    render(
      <MemoryRouter>
        <Button to="/portfolio">Portfolio</Button>
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /portfolio/i });
    expect(link).toHaveAttribute('href', '/portfolio');
  });

  it('disables the button and does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
