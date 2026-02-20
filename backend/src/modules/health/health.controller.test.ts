import { describe, it, expect } from 'vitest';
import request from 'supertest';

import { createApp } from '../../app.js';

const app = createApp();

describe('Health Endpoints', () => {
  describe('GET /health/liveness', () => {
    it('should return alive status', async () => {
      const res = await request(app).get('/health/liveness');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('alive');
      expect(res.body.data).toHaveProperty('uptime');
      expect(res.body.data).toHaveProperty('timestamp');
    });
  });

  describe('GET /health/readiness', () => {
    it('should return 503 when database is not connected', async () => {
      const res = await request(app).get('/health/readiness');

      expect(res.status).toBe(503);
      expect(res.body.success).toBe(false);
    });
  });
});
