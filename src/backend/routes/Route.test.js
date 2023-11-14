```javascript
const request = require('supertest');
const app = require('./server'); // Assuming server.js is in the same directory

describe('API route integration tests', () => {
  describe('User Routes', () => {
    test('GET /api/users - success', async () => {
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    test('POST /api/users - success', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      const response = await request(app).post('/api/users').send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
    });
  });

  describe('Game Routes', () => {
    test('GET /api/games - success', async () => {
      const response = await request(app).get('/api/games');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Marketplace Routes', () => {
    test('GET /api/marketplace - success', async () => {
      const response = await request(app).get('/api/marketplace');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  // Additional tests for other routes can be added here
});

afterAll(async () => {
  // Close server and database connections if needed
  const db = require('./config/db_config');
  await db.disconnect();
});
```