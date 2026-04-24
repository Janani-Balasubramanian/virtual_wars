import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VoterStatusSelector from './VoterStatusSelector';

describe('VoterStatusSelector', () => {
  it('renders all voter status options', () => {
    render(<VoterStatusSelector onSelect={() => {}} />);
    
    expect(screen.getByText(/First-Time Voter/i)).toBeInTheDocument();
    expect(screen.getByText(/General Voter/i)).toBeInTheDocument();
    expect(screen.getByText(/Overseas \(NRI\)/i)).toBeInTheDocument();
  });

  it('calls onSelect when a status is clicked', () => {
    const onSelect = vi.fn();
    render(<VoterStatusSelector onSelect={onSelect} />);
    
    const firstTimeCard = screen.getByText(/First-Time Voter/i);
    fireEvent.click(firstTimeCard);
    
    expect(onSelect).toHaveBeenCalledWith('first-time');
  });
});
