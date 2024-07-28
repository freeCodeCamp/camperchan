/**
 * Adds all the formatted code and detected language inside
 * three back ticks for syntax highlighting.
 * @param language - The language's name.
 * @param code - The formatted code.
 * @returns Syntax highlighted codeblock for Discord.
 */
export function formatCodeBlock(language: string, code: string): string {
  return code.endsWith("\n")
    ? `\`\`\`${language}\n${code}\`\`\``
    : `\`\`\`${language}\n${code}\n\`\`\``;
}
