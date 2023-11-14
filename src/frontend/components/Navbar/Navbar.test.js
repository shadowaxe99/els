import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';

describe('Navbar component tests', () => {
  test('renders Navbar component', () => {
    render(<Navbar />);
    const navbarElement = screen.getByTestId('navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  test('displays the logo', () => {
    render(<Navbar />);
    const logoElement = screen.getByAltText('Elysium OS Logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('contains navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('The Arena')).toBeInTheDocument();
    expect(screen.getByText('Automation Station')).toBeInTheDocument();
  });

  test('has a user profile access button when authenticated', () => {
    // Mocking isAuthenticated function to return true for this test case
    jest.mock('../services/AuthService', () => ({
      isAuthenticated: () => true
    }));
    render(<Navbar />);
    const profileAccessButton = screen.getByTestId('profile-access-button');
    expect(profileAccessButton).toBeInTheDocument();
  });
});