import hljs from "highlight.js";
import { formatCodeBlock } from "./formatCodeblock.js";
import { formatter } from "./formatter.js";
import { isSupportedByPrettier } from "./isSupportedByPrettier.js";
import type { Message } from "discord.js";

/**
 * Inserts any unformatted code to a code block, enables syntax highlighting and formats it.
 * @param message - The message payload from Discord.
 * @returns The formatted message content.
 */
export async function addFormatting(message: Message): Promise<string> {
  const { content } = message;

  const checkForlanguages = [
    "HTML",
    "CSS",
    "SCSS",
    "JavaScript",
    "TypeScript",
    "JSX",
    "PHP",
    "Python",
    "Markdown",
    "JSON",
    "HTTP",
  ];

  const languageGuesses = [];

  const detectedWithHLJS = hljs.highlightAuto(
    content,
    checkForlanguages,
  );

  languageGuesses.push(detectedWithHLJS.language);
  if (detectedWithHLJS.secondBest) {
    languageGuesses.push(detectedWithHLJS.secondBest.language);
  }

  if (
    languageGuesses.includes("HTML")
    && (languageGuesses.includes("CSS")
    || languageGuesses.includes("JavaScript"))
  ) {
    languageGuesses[0] = "XML";
  }
  const supportedLanguage = isSupportedByPrettier(languageGuesses.at(0) ?? "");
  if (supportedLanguage !== false) {
    const formattedCode = await formatter(content, supportedLanguage);
    return formatCodeBlock(supportedLanguage, formattedCode);
  }
  return formatCodeBlock(languageGuesses.at(0) ?? "", content);
}
