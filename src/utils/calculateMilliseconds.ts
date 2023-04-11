type TimeUnit = "seconds" | "minutes" | "hours" | "days" | "weeks";

/**
 * Parses a value/unit pair into a number of milliseconds. For example,
 * (1, "second") would return one second in milliseconds.
 *
 * @param {number} value The number of "unit" to convert to milliseconds.
 * @param {string} unit The unit of time to convert to milliseconds.
 * @returns {number} The number of milliseconds.
 */
export const calculateMilliseconds = (
  value: number,
  unit: TimeUnit
): number => {
  switch (unit) {
    case "seconds":
      return value * 1000;
    case "minutes":
      return value * 60000;
    case "hours":
      return value * 3600000;
    case "days":
      return value * 86400000;
    case "weeks":
      return value * 604800000;
    default:
      return 0;
  }
};

/**
 * Type guard to validate that the given string is a time unit.
 *
 * @param {string} unit The unit to validate.
 * @returns {unit is TimeUnit} Whether the unit is a valid time unit.
 */
export const isValidTimeUnit = (unit: string): unit is TimeUnit =>
  ["seconds", "minutes", "hours", "days", "weeks"].includes(unit);
