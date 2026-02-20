import type { RequestHandler } from 'express';

import { sendSuccess } from '../../utils/response.js';
import * as authService from './auth.service.js';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.cookie('token', token, authService.getCookieOptions());
    sendSuccess(res, user, 201);
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.cookie('token', token, authService.getCookieOptions());
    sendSuccess(res, user);
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (_req, res) => {
  res.clearCookie('token', { path: '/' });
  sendSuccess(res, { message: 'Logged out successfully' });
};
