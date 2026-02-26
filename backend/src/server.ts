import app from './app.js';
import { env } from './config/env.js';
import logger from './utils/logger.js';

const PORT = env.PORT || 5000;

// Start server
function startServer() {
  app.listen(PORT, () => {
    logger.info('✅ In-memory data store initialized');
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
    logger.info(`📚 API Documentation: http://localhost:${PORT}/api`);
    logger.info(`🏥 Environment: ${env.NODE_ENV}`);
  });
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();
