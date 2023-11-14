```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const { errorHandler } = require('../utils/ErrorHandler');
const { db_config, server_config } = require('../config');

const app = express();

// Database Connection
mongoose.connect(db_config.mongoURI, db_config.options)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = server_config.port || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```