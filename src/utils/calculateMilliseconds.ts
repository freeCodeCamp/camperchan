enum timeMeasurements {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  WEEKS = "weeks",
}

/**
 * Parses a value/unit pair into a number of milliseconds. For example,
 * (1, "second") would return one second in milliseconds.
 *
 * @param {number} value The number of "unit" to convert to milliseconds.
 * @param {string} unit The unit of time to convert to milliseconds.
 * @returns {number} The number of milliseconds.
 */
const calculateMilliseconds = (
  value: number,
  unit: timeMeasurements
): number => {
  switch (unit) {
    case timeMeasurements.SECONDS:
      return value * 1000;
    case timeMeasurements.MINUTES:
      return value * 60000;
    case timeMeasurements.HOURS:
      return value * 3600000;
    case timeMeasurements.DAYS:
      return value * 86400000;
    case timeMeasurements.WEEKS:
      return value * 604800000;
    default:
      return 0;
  }
};

export { calculateMilliseconds, timeMeasurements };
