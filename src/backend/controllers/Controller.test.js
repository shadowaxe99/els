```javascript
const request = require('supertest');
const app = require('./server'); // Assuming server.js is in the same directory
const { UserModel, GameModel, ProductModel } = require('./models');
const { logError } = require('../utils/Logger');

describe('Controller Tests', () => {
  describe('UserController Tests', () => {
    test('should create a new user', async () => {
      const userData = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body.username).toBe(userData.username);
    });

    test('should not create a user with existing email', async () => {
      const userData = {
        username: 'testUser2',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GameController Tests', () => {
    test('should fetch game details', async () => {
      const gameData = new GameModel({
        title: 'Test Game',
        description: 'A test game description',
        genre: 'Puzzle'
      });
      await gameData.save();

      const response = await request(app)
        .get(`/api/games/${gameData._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(gameData.title);
    });
  });

  describe('MarketplaceController Tests', () => {
    test('should retrieve all products', async () => {
      const response = await request(app)
        .get('/api/marketplace');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  afterAll(async () => {
    // Clean up test data
    try {
      await UserModel.deleteMany({});
      await GameModel.deleteMany({});
      await ProductModel.deleteMany({});
    } catch (error) {
      logError('Error cleaning up test data', error);
    }
  });
});
```