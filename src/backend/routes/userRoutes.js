const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { validateAuthToken } = require('../utils/ErrorHandler');

// Middleware to validate the authentication token
router.use(validateAuthToken);

// Register a new user
router.post('/register', UserController.registerUser);

// User login
router.post('/login', UserController.loginUser);

// Get user profile
router.get('/profile', UserController.getUserProfile);

// Update user profile
router.put('/profile', UserController.updateUserProfile);

// Delete user account
router.delete('/delete', UserController.deleteUser);

module.exports = router;