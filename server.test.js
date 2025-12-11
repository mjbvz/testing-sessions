const request = require('supertest');
const server = require('./server');

describe('Testing Sessions Server', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('GET /', () => {
    it('should return HTML home page', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
      expect(response.text).toContain('Welcome to Testing Sessions Server');
      expect(response.text).toContain('/api/status');
      expect(response.text).toContain('/api/time');
    });

    it('should include CORS headers', async () => {
      const response = await request(server).get('/');
      expect(response.headers['access-control-allow-origin']).toBe('*');
    });
  });

  describe('GET /api/status', () => {
    it('should return server status as JSON', async () => {
      const response = await request(server).get('/api/status');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('status', 'running');
      expect(response.body).toHaveProperty('message', 'Server is working correctly');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return valid ISO timestamp', async () => {
      const response = await request(server).get('/api/status');
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.toString()).not.toBe('Invalid Date');
    });

    it('should include CORS headers', async () => {
      const response = await request(server).get('/api/status');
      expect(response.headers['access-control-allow-origin']).toBe('*');
    });
  });

  describe('GET /api/time', () => {
    it('should return current time as JSON', async () => {
      const response = await request(server).get('/api/time');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('time');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return valid ISO time format', async () => {
      const response = await request(server).get('/api/time');
      const time = new Date(response.body.time);
      expect(time).toBeInstanceOf(Date);
      expect(time.toString()).not.toBe('Invalid Date');
    });

    it('should return valid timestamp number', async () => {
      const response = await request(server).get('/api/time');
      expect(typeof response.body.timestamp).toBe('number');
      expect(response.body.timestamp).toBeGreaterThan(0);
    });

    it('should include CORS headers', async () => {
      const response = await request(server).get('/api/time');
      expect(response.headers['access-control-allow-origin']).toBe('*');
    });
  });

  describe('404 Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(server).get('/unknown');
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('/unknown');
    });

    it('should return 404 for non-existent API routes', async () => {
      const response = await request(server).get('/api/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });

  describe('CORS Preflight', () => {
    it('should handle OPTIONS requests', async () => {
      const response = await request(server).options('/api/status');
      expect(response.status).toBe(200);
      expect(response.headers['access-control-allow-origin']).toBe('*');
      expect(response.headers['access-control-allow-methods']).toContain('GET');
      expect(response.headers['access-control-allow-methods']).toContain('POST');
    });
  });
});
