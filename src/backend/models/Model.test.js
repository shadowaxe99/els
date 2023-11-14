```javascript
const mongoose = require('mongoose');
const UserModel = require('./UserModel');
const GameModel = require('./GameModel');
const ProductModel = require('./ProductModel');

describe('Database Models', () => {
  beforeAll(async () => {
    const dbConfig = require('../../config/db_config');
    await mongoose.connect(dbConfig.url, dbConfig.options);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('UserModel', () => {
    it('should validate user schema', async () => {
      const user = new UserModel({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123',
        profile: {
          avatar: 'default.png',
          bio: 'Just a test user'
        }
      });

      await expect(user.validate()).resolves.toBeUndefined();
    });
  });

  describe('GameModel', () => {
    it('should validate game schema', async () => {
      const game = new GameModel({
        title: 'Test Game',
        description: 'A game for testing',
        genre: 'Puzzle',
        price: 0,
        multiplayer: true
      });

      await expect(game.validate()).resolves.toBeUndefined();
    });
  });

  describe('ProductModel', () => {
    it('should validate product schema', async () => {
      const product = new ProductModel({
        name: 'Test Product',
        description: 'A product for testing',
        price: 100,
        stock: 50
      });

      await expect(product.validate()).resolves.toBeUndefined();
    });
  });
});
```