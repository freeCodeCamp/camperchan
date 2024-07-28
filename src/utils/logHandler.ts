import { createLogger, format, transports, config } from "winston";

const { combine, timestamp, colorize, printf } = format;

/**
 * Standard log handler, using winston to wrap and format
 * messages. Call with `logHandler.log(level, message)`.
 * @param {string} level - The log level to use.
 * @param {string} message - The message to log.
 */
export const logHandler = createLogger({
  exitOnError: false,
  format:      combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    colorize(),
    printf((info) => {
      return `${info.level}: [${String(info.timestamp)}]: ${String(info.message)}`;
    }),
  ),
  level:      "silly",
  levels:     config.npm.levels,
  transports: [ new transports.Console() ],
});
