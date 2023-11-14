```javascript
const UserModel = require('../models/UserModel');
const { logError } = require('../utils/Logger');
const { ErrorHandler } = require('../utils/ErrorHandler');
const { validateAuthToken } = require('../utils/Utils');

class UserController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        throw new ErrorHandler(409, 'User already exists');
      }

      const newUser = new UserModel({ username, email, password });
      const savedUser = await newUser.save();

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email
        }
      });
    } catch (error) {
      logError(error);
      res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        throw new ErrorHandler(401, 'Invalid email or password');
      }

      const authToken = user.generateAuthToken();
      res.status(200).json({
        message: 'User logged in successfully',
        authToken
      });
    } catch (error) {
      logError(error);
      res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  async getUserProfile(req, res) {
    try {
      validateAuthToken(req);

      const user = await UserModel.findById(req.user.id);
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }

      res.status(200).json({
        message: 'User profile fetched successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      logError(error);
      res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  async updateUserProfile(req, res) {
    try {
      validateAuthToken(req);

      const { username, email } = req.body;
      const user = await UserModel.findById(req.user.id);

      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }

      user.username = username || user.username;
      user.email = email || user.email;
      const updatedUser = await user.save();

      res.status(200).json({
        message: 'User profile updated successfully',
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email
        }
      });
    } catch (error) {
      logError(error);
      res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();
```