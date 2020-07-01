import { Message, CollectorFilter } from 'discord.js';
import { isSupportedByPrettier } from './is-supported-by-prettier';
import { formatter } from './formatter';
import { formatCodeBlock } from './format-codeblock';

/**
 * @name processReply
 * Processes the reply from client (reaction to prompt message)
 * and sends adequate reply
 *
 * @param languageName Object containing infos required to
 * process the reply
 */

export async function processReply({
  ref,
  reactionEmojies,
  reactionOptionsObj,
  languageGuesses,
  content
}: {
  ref: Message;
  reactionEmojies: string[];
  reactionOptionsObj: {
    firstOption: string;
    secondOption: string;
  };
  languageGuesses: string[];
  content: string;
}): Promise<void> {
  try {
    const filter: CollectorFilter = (reaction) => {
      return reactionEmojies.includes(reaction.emoji.name);
    };

    const reactions = await ref.awaitReactions(filter, {
      max: 1,
      time: 60000,
      errors: ['time']
    }); // code can be formatted multiple times by changing this line

    const collectedEmojis = [...reactions.values()];
    if (!collectedEmojis.length) {
      // no emojis found, skip
      return;
    }
    // code can be formatted multiple times by changing this line
    const reactionEmoji = collectedEmojis[0].emoji.name;

    switch (reactionEmoji) {
      case reactionOptionsObj.firstOption: {
        const supportedLanguage = isSupportedByPrettier(languageGuesses[0]);
        if (supportedLanguage) {
          const formattedCode = formatter(content, supportedLanguage);
          ref.channel.send(formatCodeBlock(supportedLanguage, formattedCode));
        } else {
          ref.channel.send(formatCodeBlock(languageGuesses[0], content));
        }
        break;
      }
      case reactionOptionsObj.secondOption: {
        const supportedLanguage = isSupportedByPrettier(languageGuesses[1]);
        if (supportedLanguage) {
          const formattedCode = formatter(content, supportedLanguage);

          ref.channel.send(formatCodeBlock(supportedLanguage, formattedCode));
          return;
        }
        ref.channel.send(formatCodeBlock(languageGuesses[1], content));
        break;
      }
    }
  } catch (error) {
    ref.channel.send('Message timeout!');
    console.error(error);
  }
}
