import type { RequestHandler } from 'express';

import { sendSuccess } from '../../utils/response.js';
import { AppError } from '../../utils/app-error.js';
import * as userService from './user.service.js';

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      next(AppError.unauthorized());
      return;
    }

    const user = await userService.getUserById(req.user.userId);
    sendSuccess(res, user);
  } catch (err) {
    next(err);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 20;
    const result = await userService.getAllUsers(page, limit);

    sendSuccess(res, {
      users: result.users,
      meta: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateMe: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      next(AppError.unauthorized());
      return;
    }

    const user = await userService.updateUser(req.user.userId, req.body);
    sendSuccess(res, user);
  } catch (err) {
    next(err);
  }
};

export const deleteMe: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      next(AppError.unauthorized());
      return;
    }

    await userService.deleteUser(req.user.userId);
    sendSuccess(res, null, 204);
  } catch (err) {
    next(err);
  }
};
