/**
 * @name formatCodeblock
 * Adds all the formatted code and detected language inside
 * three backticks for syntax highlighting
 *
 * @param {string} language The language's name'
 * @param {string} code The formatted code
 *
 * @returns {string} Syntax highlighted codeblock for Discord
 */

module.exports = function formatCodeblock(language, code) {
  const formattedMessageWithCodeblock = `\`\`\`${language}\n${code}\`\`\``;
  return formattedMessageWithCodeblock;
};
