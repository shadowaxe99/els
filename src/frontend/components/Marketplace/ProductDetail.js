import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../services/ProductService';
import { PaymentService } from '../../services/PaymentService';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { Logger } from '../../utils/Logger';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductDetails(productId);
        setProduct(response.data);
      } catch (err) {
        ErrorHandler.handle(err);
        setError('Failed to load product details.');
        Logger.logError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handlePurchase = async () => {
    try {
      await PaymentService.processPayment(product.price);
      // Handle successful purchase logic here
      Logger.log('Purchase successful for product:', product.name);
    } catch (err) {
      ErrorHandler.handle(err);
      setError('Payment processing failed.');
      Logger.logError(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <div className="product-price">Price: {product.price} ETH</div>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default ProductDetail;