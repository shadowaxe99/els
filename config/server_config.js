```javascript
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  // Additional server configurations can be added here
};
```