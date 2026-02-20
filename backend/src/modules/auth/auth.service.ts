import jwt from 'jsonwebtoken';
import type { AuthTokenPayload, UserDto } from '@mern/shared';

import { env } from '../../config/env.js';
import { AppError } from '../../utils/app-error.js';
import { User } from '../users/user.model.js';
import type { RegisterInput, LoginInput } from './auth.schemas.js';

const JWT_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function generateToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as string & jwt.SignOptions['expiresIn'],
  });
}

export function getCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
  path: string;
} {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: JWT_COOKIE_MAX_AGE_MS,
    path: '/',
  };
}

export async function register(input: RegisterInput): Promise<{ user: UserDto; token: string }> {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw AppError.conflict('Email already registered');
  }

  const user = await User.create(input);

  const userId = String(user._id);

  const tokenPayload: AuthTokenPayload = {
    userId,
    email: user.email,
    role: user.role,
  };

  const token = generateToken(tokenPayload);

  return {
    user: {
      id: userId,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
    token,
  };
}

export async function login(input: LoginInput): Promise<{ user: UserDto; token: string }> {
  const user = await User.findOne({ email: input.email }).select('+password');

  if (!user) {
    throw AppError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(input.password);

  if (!isMatch) {
    throw AppError.unauthorized('Invalid email or password');
  }

  const userId = String(user._id);

  const tokenPayload: AuthTokenPayload = {
    userId,
    email: user.email,
    role: user.role,
  };

  const token = generateToken(tokenPayload);

  return {
    user: {
      id: userId,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
    token,
  };
}
