import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';
import Settings from './Settings';

describe('ButlerConsigliere Component Tests', () => {
  test('Dashboard component renders with correct content', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Your Schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming Tasks/i)).toBeInTheDocument();
  });

  test('Settings component renders and can toggle settings', () => {
    render(<Settings />);
    const voiceToggle = screen.getByLabelText(/Voice Commands/i);
    expect(voiceToggle).toBeInTheDocument();
    fireEvent.click(voiceToggle);
    expect(voiceToggle).toBeChecked();
  });

  test('Dashboard displays personalized recommendations after settings change', () => {
    // Assuming the Dashboard component uses the settings to display personalized recommendations
    render(<Settings />);
    const recommendationToggle = screen.getByLabelText(/Personalized Recommendations/i);
    fireEvent.click(recommendationToggle);
    expect(recommendationToggle).toBeChecked();

    render(<Dashboard />);
    expect(screen.getByText(/Recommended for you/i)).toBeInTheDocument();
  });
});