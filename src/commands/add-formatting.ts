import { Message } from 'discord.js';
import hljs from 'highlight.js';
import { formatter } from '../utilities/formatter';
import { formatCodeBlock } from '../utilities/format-codeblock';
import { isSupportedByPrettier } from '../utilities/is-supported-by-prettier';
/**
 * @name add-formatting
 * Inserts any unformatted code to a code block, enables syntax highlighting and formats it when a
 * message gets a specific reaction
 *
 * @param  message The message provided
 */
export async function addFormatting(message: Message): Promise<void> {
  const { content } = message;

  const checkForLanguages = [
    'HTML',
    'CSS',
    'SCSS',
    'JavaScript',
    'TypeScript',
    'JSX',
    'PHP',
    'Python',
    'Markdown',
    'JSON',
    'HTTP'
  ];

  const languageGuesses = [];

  const detectedWithHLJS = hljs.highlightAuto(
    message.content,
    checkForLanguages
  );

  languageGuesses.push(detectedWithHLJS.language);
  if (detectedWithHLJS.second_best) {
    languageGuesses.push(detectedWithHLJS.second_best.language);
  }

  // TODO: this is due to being a version behind, will fix later
  // See https://www.npmjs.com/package/@types/highlightjs for version 10
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(detectedWithHLJS as any).top.aliases) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (detectedWithHLJS as any).top.aliases = [];
  }

  if (
    languageGuesses.includes('HTML') &&
    (languageGuesses.includes('CSS') || languageGuesses.includes('JavaScript'))
  ) {
    languageGuesses[0] = 'XML';
  }
  const supportedLanguage = isSupportedByPrettier(languageGuesses[0] || '');
  if (supportedLanguage) {
    const formattedCode = formatter(content, supportedLanguage);
    message.channel.send(formatCodeBlock(supportedLanguage, formattedCode));
    return;
  }
  message.channel.send(formatCodeBlock(languageGuesses[0] || '', content));
}
