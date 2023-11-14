const express = require('express');
const router = express.Router();
const MarketplaceController = require('../controllers/MarketplaceController');
const { validateAuthToken } = require('../utils/ErrorHandler');

// Middleware to check if the user is authenticated
router.use(validateAuthToken);

// GET request to fetch all products
router.get('/products', MarketplaceController.getAllProducts);

// GET request to fetch a single product by ID
router.get('/products/:id', MarketplaceController.getProductById);

// POST request to create a new product
router.post('/products', MarketplaceController.createProduct);

// PUT request to update an existing product by ID
router.put('/products/:id', MarketplaceController.updateProductById);

// DELETE request to delete a product by ID
router.delete('/products/:id', MarketplaceController.deleteProductById);

// POST request to handle product purchases
router.post('/purchase', MarketplaceController.purchaseProduct);

module.exports = router;