import { createLogger, transports, format } from 'winston';

/**
 * Global logger that can be used everywhere for
 * anything.
 */
export const logger = createLogger({
  level: 'silly',
  // **Note** this can be updated based on environment
  format: format.simple(),
  transports: [new transports.Console()]
});
