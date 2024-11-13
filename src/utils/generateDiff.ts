import { diffSentences } from "diff";

/**
 * Module to generate a diff string from two strings.
 * @param old - The old string.
 * @param updated - The new string.
 * @returns The diff string, formatted.
 */
export const generateDiff = (old: string, updated: string): string => {
  return diffSentences(old, updated).
    map((element) => {
      if (element.added) {
        return `+ ${element.value}`;
      }
      if (element.removed) {
        return `- ${element.value}`;
      }
      return "";
    }).
    filter(Boolean).
    join("\n");
};

