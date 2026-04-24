import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock Firebase
vi.mock('./lib/firebase', () => ({
  logVoterStatus: vi.fn(),
  db: {},
  analytics: {}
}));

// Mock Google Maps
vi.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: any) => <div>{children}</div>,
  LoadScript: ({ children }: any) => <div>{children}</div>,
  Marker: () => <div>Marker</div>,
  InfoWindow: ({ children }: any) => <div>{children}</div>
}));

describe('App Integration', () => {
  it('navigates through the full voter journey', async () => {
    render(<App />);
    
    // 1. Landing Page - Select "First-Time Voter"
    const firstTimeCard = screen.getByText(/First-Time Voter/i);
    fireEvent.click(firstTimeCard);
    
    // 2. Timeline Page - Check if Timeline is visible
    await waitFor(() => {
      expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
    });
    const timelineTitles = screen.getAllByText(/Voter Registration/i);
    expect(timelineTitles.length).toBeGreaterThan(0);
    
    // 3. Expert Guide - Check if tips are visible
    expect(screen.getByText(/Election Expert/i)).toBeInTheDocument();
    
    // 4. Map - Check if Polling Station Finder is visible
    expect(screen.getAllByText(/Polling Station Finder/i).length).toBeGreaterThan(0);
    
    // 5. Reset - Click Start Over
    const startOverBtn = screen.getByText(/Start Over/i);
    fireEvent.click(startOverBtn);
    
    // 6. Back to Landing
    expect(screen.getByText(/How will you/i)).toBeInTheDocument();
  });
});
