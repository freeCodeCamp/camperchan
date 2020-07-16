import { ReactionDef } from './reaction-def';
import { addFormatting } from '../commands/add-formatting';

export const formatReaction: ReactionDef = {
  emoji: '🤖',
  description: 'Guesses and formats the message',
  command: async (reaction) => {
    try {
      await reaction.message.reactions.removeAll();

      addFormatting(reaction.message);
    } catch (error) {
      // A common issue with this not working correctly, is
      // if the bot does not have permissions to remove reactions.
      // Check the README.md file for details on setting the correct permissions
      reaction.message.channel.send(
        'Something went wrong! Failed to format code :('
      );
      console.error(error);
    }
  }
};
