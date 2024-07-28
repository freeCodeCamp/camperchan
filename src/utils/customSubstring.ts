/**
 * Determines if a string is longer than the given length, and if so
 * substrings it and appends an ellipsis.
 * @param string - The string to shorten.
 * @param length - The maximum allowed length for the string.
 * @returns The potentially shortened string.
 */
export const customSubstring = (string: string, length: number): string => {
  return string.length > length
    ? `${string.slice(0, Math.max(0, length - 3))}...`
    : string;
};
