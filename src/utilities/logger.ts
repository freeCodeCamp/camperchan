import { createLogger, transports } from 'winston';

/**
 * Global logger that can be used everywhere for
 * anything.
 */
export const logger = createLogger({
  level: 'silly',
  transports: [new transports.Console()]
});
