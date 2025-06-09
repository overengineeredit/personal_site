const request = require('supertest');
const app = require('../server');

describe('Server Endpoints', () => {
  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('GET /resume should return 200', async () => {
    const response = await request(app).get('/resume');
    expect(response.statusCode).toBe(200);
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.statusCode).toBe(404);
  });
}); 