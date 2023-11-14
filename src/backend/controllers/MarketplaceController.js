```javascript
const ProductModel = require('../models/ProductModel');
const { ErrorHandler } = require('../utils/ErrorHandler');
const Logger = require('../utils/Logger');

class MarketplaceController {
  // List all products
  async listProducts(req, res) {
    try {
      const products = await ProductModel.find({});
      res.status(200).json(products);
    } catch (error) {
      Logger.logError(error);
      ErrorHandler.handle(res, error);
    }
  }

  // Get a single product by ID
  async getProductById(req, res) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      Logger.logError(error);
      ErrorHandler.handle(res, error);
    }
  }

  // Create a new product
  async createProduct(req, res) {
    try {
      const newProduct = new ProductModel(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      Logger.logError(error);
      ErrorHandler.handle(res, error);
    }
  }

  // Update an existing product
  async updateProduct(req, res) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      Logger.logError(error);
      ErrorHandler.handle(res, error);
    }
  }

  // Delete a product
  async deleteProduct(req, res) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      Logger.logError(error);
      ErrorHandler.handle(res, error);
    }
  }
}

module.exports = new MarketplaceController();
```