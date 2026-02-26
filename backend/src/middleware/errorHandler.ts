import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';
import logger from '../utils/logger.js';
import { env } from '../config/env.js';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  // Handle Prisma errors
  if (error.code?.startsWith('P')) {
    switch (error.code) {
      case 'P2002':
        return sendError(
          res,
          'DUPLICATE_ERROR',
          'A record with this information already exists',
          409
        );
      case 'P2025':
        return sendError(res, 'NOT_FOUND', 'Requested record not found', 404);
      case 'P2003':
        return sendError(
          res,
          'FOREIGN_KEY_ERROR',
          'Referenced record does not exist',
          400
        );
      default:
        return sendError(
          res,
          'DATABASE_ERROR',
          'A database error occurred',
          500
        );
    }
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    return sendError(res, 'VALIDATION_ERROR', error.message, 400);
  }

  // Default error
  return sendError(
    res,
    'INTERNAL_SERVER_ERROR',
    env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : error.message,
    500,
    env.NODE_ENV === 'development' ? { stack: error.stack } : undefined
  );
};
