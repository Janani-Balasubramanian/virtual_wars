import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ElectionTimeline from './ElectionTimeline';

describe('ElectionTimeline', () => {
  it('renders the first step by default', () => {
    render(<ElectionTimeline status="first-time" />);
    const titles = screen.getAllByText(/Voter Registration/i);
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
  });

  it('changes steps when a step button is clicked', async () => {
    render(<ElectionTimeline status="first-time" />);
    
    // Click on Step 2 (Field Verification)
    const step2Button = screen.getByText(/Field Verification/i);
    fireEvent.click(step2Button);
    
    expect(await screen.findByText(/Authenticating your residency/i)).toBeInTheDocument();
  });

  it('renders correctly for NRI status', () => {
    render(<ElectionTimeline status="nri" />);
    const titles = screen.getAllByText(/Form 6A Submission/i);
    expect(titles.length).toBeGreaterThan(0);
    expect(titles[0]).toBeInTheDocument();
  });
});
