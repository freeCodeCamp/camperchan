type TimeUnit = "seconds" | "minutes" | "hours" | "days" | "weeks";

/**
 * Parses a value/unit pair into a number of milliseconds. For example,
 * (1, "second") would return one second in milliseconds.
 * @param value - The number of "unit" to convert to milliseconds.
 * @param unit - The unit of time to convert to milliseconds.
 * @returns The number of milliseconds.
 */
const calculateMilliseconds = (
  value: number,
  unit: TimeUnit,
): number => {
  switch (unit) {
    case "seconds":
      return value * 1000;
    case "minutes":
      return value * 60_000;
    case "hours":
      return value * 3_600_000;
    case "days":
      return value * 86_400_000;
    case "weeks":
      return value * 604_800_000;
    default:
      return 0;
  }
};

/**
 * Type guard to validate that the given string is a time unit.
 * @param unit - The unit to validate.
 * @returns Whether the unit is a valid time unit.
 */
const isValidTimeUnit = (unit: string): unit is TimeUnit => {
  return [ "seconds", "minutes", "hours", "days", "weeks" ].includes(unit);
};

export { calculateMilliseconds, isValidTimeUnit };
