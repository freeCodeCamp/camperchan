import { ReactionDef } from './reaction-def';
import { MessageEmbed } from 'discord.js';

export const pin: ReactionDef = {
  emoji: '📌',
  description: 'Sends message to the current user as a DM',
  command: async (reaction) => {
    try {
      const users = await reaction.users.fetch();
      // Get user that reacted with the pushpin emoji
      const user = users.first();
      const pinnedEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Pinned Message:')
        .addFields(
          { name: 'Author', value: reaction.message.author },
          {
            name: 'Content',
            value:
              reaction.message.content || 'Embedded messages cannot be pinned.'
          }
        )
        .setFooter('Happy Coding! 😁');

      user?.send(pinnedEmbed);

      // Remove reaction from the message
      reaction.message.reactions.cache.get('📌')?.remove();
    } catch (error) {
      console.error(error);
    }
  }
};
