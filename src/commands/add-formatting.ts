import { Message } from 'discord.js';
import hljs from 'highlight.js';
import { confusedMessageGenerator } from '../utilities/confused-message-generator';
import { processReply } from '../utilities/process-reply';

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

  try {
    const refToPromptMsg = await message.channel.send(confusedMessage);
    processReply({
      reactionEmojies,
      reactionOptionsObj,
      languageGuesses,
      content,
      ref: refToPromptMsg
    });
  } catch (error) {
    console.error(error);
  }
}
