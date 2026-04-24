import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExpertGuide from './ExpertGuide';

describe('ExpertGuide', () => {
  it('renders general tips by default', () => {
    render(<ExpertGuide status="general" />);
    expect(screen.getByText(/Check your name in the electoral roll/i)).toBeInTheDocument();
  });

  it('renders NRI specific tips', () => {
    render(<ExpertGuide status="nri" />);
    expect(screen.getByText(/Physical presence in India is mandatory/i)).toBeInTheDocument();
  });

  it('renders Senior Citizen specific tips', () => {
    render(<ExpertGuide status="senior" />);
    expect(screen.getByText(/Dial 1950 for home voting assistance/i)).toBeInTheDocument();
  });
});
