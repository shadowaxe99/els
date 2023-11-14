import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component tests', () => {
  it('renders the Footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('contains the correct text', () => {
    render(<Footer />);
    const textElement = screen.getByText(/Elysium OS/i);
    expect(textElement).toBeInTheDocument();
  });

  // Add more tests as needed for specific links, copyright notices, etc.
});