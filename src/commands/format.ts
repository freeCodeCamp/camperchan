import { CommandDef } from './command-def';
import { Message } from 'discord.js';
import { addFormatting } from './add-formatting';
import { logger } from '../utilities/logger';

export const format: CommandDef = {
  prefix: 'format',
  description: 'Formats the code from the given message URL.',
  usage: 'format <message URL>',
  command: async (message: Message): Promise<void> => {
    try {
      if (message.content.split(' ').length < 3) {
        logger.warn('Missing message ID');
        return;
      }
      const messageURL = message.content.split(' ')[2];
      const messageID = messageURL.split('/')[messageURL.split('/').length - 1];
      if (!messageID || isNaN(parseInt(messageID))) {
        logger.warn('invalid syntax');
        message.channel.send('Invalid syntax');
        return;
      }
      const messageContent = await message.channel.messages.fetch(messageID);
      if (!messageContent) {
        logger.warn('Message not found');
        message.channel.send('Message not found');
        return;
      }
      return addFormatting(messageContent);
    } catch (error) {
      logger.error(error);
    }
  }
};
