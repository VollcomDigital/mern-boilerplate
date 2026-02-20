import { vi } from 'vitest';

vi.stubEnv('NODE_ENV', 'test');
vi.stubEnv('PORT', '4001');
vi.stubEnv('MONGODB_URI', 'mongodb://localhost:27017/mern-test');
vi.stubEnv('JWT_SECRET', 'test-jwt-secret-that-is-at-least-32-chars-long');
vi.stubEnv('JWT_EXPIRES_IN', '1h');
vi.stubEnv('CORS_ORIGIN', 'http://localhost:5173');
vi.stubEnv('LOG_LEVEL', 'fatal');
