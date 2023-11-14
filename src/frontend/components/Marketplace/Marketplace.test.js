import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import { ProductService } from '../services/ProductService';

jest.mock('../services/ProductService');

describe('Marketplace Component Tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ProductService.mockClear();
  });

  it('renders ProductList with products', async () => {
    const mockProducts = [
      { id: '1', name: 'AI Art Generator', price: '0.5 ETH', stock: 10 },
      { id: '2', name: 'Virtual Reality Concert Ticket', price: '0.3 ETH', stock: 5 }
    ];

    ProductService.getProducts.mockResolvedValue(mockProducts);
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('AI Art Generator')).toBeInTheDocument();
      expect(screen.getByText('Virtual Reality Concert Ticket')).toBeInTheDocument();
    });
  });

  it('renders ProductDetail when a product is clicked', async () => {
    const mockProduct = { id: '1', name: 'AI Art Generator', price: '0.5 ETH', stock: 10 };

    ProductService.getProductById.mockResolvedValue(mockProduct);
    render(<ProductList />);

    fireEvent.click(screen.getByText('AI Art Generator'));

    await waitFor(() => {
      expect(screen.getByText('AI Art Generator')).toBeInTheDocument();
      expect(screen.getByText('Price: 0.5 ETH')).toBeInTheDocument();
      expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    });
  });

  it('handles out of stock condition', async () => {
    const mockProduct = { id: '1', name: 'AI Art Generator', price: '0.5 ETH', stock: 0 };

    ProductService.getProductById.mockResolvedValue(mockProduct);
    render(<ProductDetail productId="1" />);

    await waitFor(() => {
      expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });
  });

  it('handles service errors gracefully', async () => {
    ProductService.getProducts.mockRejectedValue(new Error('Service Unavailable'));
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load products. Please try again later.')).toBeInTheDocument();
    });
  });
});