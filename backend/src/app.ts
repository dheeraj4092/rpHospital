import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from './config/env.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import routes from './routes/index.js';
import logger from './utils/logger.js';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Trust proxy headers (required on platforms like Render/Heroku behind load balancers)
// so express-rate-limit can correctly read client IP from X-Forwarded-For.
app.set('trust proxy', 1);

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

const isAllowedOrigin = (origin: string) => {
  const normalizedOrigin = origin.replace(/\/+$/, '');
  if (allowedOrigins.has(normalizedOrigin)) return true;

  // Allow production domain variants explicitly (www and subdomains over https)
  if (/^https:\/\/([a-z0-9-]+\.)?rphospitals\.in$/i.test(normalizedOrigin)) return true;

  // Allow local development origins
  if (/^http:\/\/localhost:\d+$/i.test(normalizedOrigin)) return true;
  if (/^http:\/\/127\.0\.0\.1:\d+$/i.test(normalizedOrigin)) return true;

  return false;
};

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (curl/health checks/postman)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    logger.warn(`Blocked CORS origin: ${origin}`);
    // Do not throw error here; just disable CORS for this origin to avoid 500 preflight.
    callback(null, false);
  },
  credentials: true,
};

// CORS configuration
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsing middleware
// Careers resume uploads are sent as base64 JSON, so we allow a larger body size.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
