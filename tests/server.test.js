const request = require('supertest');
const app = require('../server');

describe('Server Endpoints', () => {
  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('GET / should render about content correctly', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('engineering leader passionate about building');
    expect(response.text).toContain('I&#39;m interested in building impactful engineering cultures');
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