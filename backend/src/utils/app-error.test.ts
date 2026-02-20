import { describe, it, expect } from 'vitest';

import { AppError } from './app-error.js';

describe('AppError', () => {
  it('should create a bad request error', () => {
    const error = AppError.badRequest('Invalid input');

    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid input');
    expect(error.statusCode).toBe(400);
    expect(error.isOperational).toBe(true);
  });

  it('should create an unauthorized error', () => {
    const error = AppError.unauthorized();

    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Unauthorized');
  });

  it('should create a not found error', () => {
    const error = AppError.notFound('User not found');

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('User not found');
  });

  it('should create a non-operational internal error', () => {
    const error = AppError.internal('Database crash');

    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(false);
  });

  it('should create a conflict error', () => {
    const error = AppError.conflict('Email already exists');

    expect(error.statusCode).toBe(409);
    expect(error.message).toBe('Email already exists');
  });
});
