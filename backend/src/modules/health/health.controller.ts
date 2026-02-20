import type { RequestHandler } from 'express';
import mongoose from 'mongoose';

import { sendSuccess, sendError } from '../../utils/response.js';

export const livenessCheck: RequestHandler = (_req, res) => {
  sendSuccess(res, {
    status: 'alive',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

export const readinessCheck: RequestHandler = (_req, res) => {
  const mongoState = mongoose.connection.readyState;
  const isReady = mongoState === 1;

  if (isReady) {
    sendSuccess(res, {
      status: 'ready',
      services: {
        database: 'connected',
      },
      timestamp: new Date().toISOString(),
    });
  } else {
    sendError(res, 'Service not ready', 503);
  }
};
