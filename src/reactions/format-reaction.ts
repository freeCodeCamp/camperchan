import { Message } from 'discord.js';
import { addFormatting } from '../commands/add-formatting';
import { logger } from '../utilities/logger';
import { ReactionDef } from './reaction-def';

export const formatReaction: ReactionDef = {
  emoji: '🤖',
  description: 'Guesses and formats the message',
  command: async (reaction) => {
    try {
      let message = reaction.message;
      if (reaction.message.partial) {
        message = await reaction.message.fetch();
      }
      await addFormatting(message as Message);

      reaction.message.reactions.cache.get('🤖')?.remove();
      reaction.message.react('✅');
    } catch (error) {
      /* A common issue with this not working correctly, is
       * if the bot does not have permissions to remove reactions.
       * Check the README.md file for details on setting the correct permissions
       */

      reaction.message.channel.send(
        'Something went wrong! Failed to format code :('
      );
      logger.error(error);
    }
  }
};
