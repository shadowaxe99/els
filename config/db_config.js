```javascript
const mongoose = require('mongoose');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  name: process.env.DB_NAME || 'elysium_os',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};

const getDbConnectionString = () => {
  if (dbConfig.user && dbConfig.password) {
    return `mongodb://${dbConfig.user}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
  }
  return `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(getDbConnectionString(), dbConfig.options);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = {
  connectToDatabase,
  getDbConnectionString,
};
```