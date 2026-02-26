import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/response.js';

// Rate limiter for appointment creation - 5 requests per hour per IP
export const appointmentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many appointment requests from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    return sendError(
      res,
      'RATE_LIMIT_EXCEEDED',
      'Too many appointment requests. Please try again later.',
      429
    );
  },
});

// General rate limiter - 100 requests per 15 minutes per IP
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    return sendError(
      res,
      'RATE_LIMIT_EXCEEDED',
      'Too many requests. Please try again later.',
      429
    );
  },
});
