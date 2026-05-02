import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './config/env.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import routes from './routes/index.js';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(compression());

const buildAllowedOrigins = (frontendUrl: string) => {
  const normalized = frontendUrl.replace(/\/+$/, '');
  const values = new Set<string>([normalized]);

  try {
    const url = new URL(normalized);
    const host = url.hostname;
    const protocol = url.protocol;

    if (host.startsWith('www.')) {
      values.add(`${protocol}//${host.slice(4)}`);
    } else {
      values.add(`${protocol}//www.${host}`);
    }
  } catch {
    // Fallback to only the configured value if URL parsing fails
  }

  return values;
};

const allowedOrigins = buildAllowedOrigins(env.FRONTEND_URL);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (curl/health checks/postman)
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = origin.replace(/\/+$/, '');
      if (allowedOrigins.has(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight caching for idempotent GET responses
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  }
  next();
});

// Request logging
app.use(requestLogger);

// General rate limiting
app.use(generalLimiter);

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'RP Super Speciality Hospital API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      appointments: '/api/appointments',
      doctors: '/api/doctors',
      departments: '/api/departments',
      hospitalInfo: '/api/hospital-info',
    },
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
