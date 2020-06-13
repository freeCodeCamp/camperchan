import hljs from 'highlight.js';
import { Message } from 'discord.js';
const confusedMessageGenerator = require('../utilities/confused-message-generator');
const processReply = require('../utilities/process-reply');
/**
 * @name add-formatting
 * Inserts any unformated code to a code block, enables syntax highlighting and formats it when a
 * message gets a specific reaction
 *
 * @param {Discord.Message} message The message provided
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

  console.log(languageGuesses);

  // TODO: this is due to being a version behind, will fix later
  if (!(detectedWithHLJS as any).top.aliases) {
    (detectedWithHLJS as any).top.aliases = [];
  }

  const reactionOptionsObj = {
    firstOption: '🙂',
    secondOption: '🙃'
  };

  const reactionEmojies = Object.values(reactionOptionsObj);

  const confusedMessage = confusedMessageGenerator(
    languageGuesses,
    reactionEmojies
  );

  const requiredInfoObj = {
    reactionEmojies,
    reactionOptionsObj,
    languageGuesses,
    content
  };

  try {
    const refToPromptMsg = await message.channel.send(confusedMessage);
    processReply({ ...requiredInfoObj, ref: refToPromptMsg });
  } catch (error) {
    console.error(error);
  }
}
