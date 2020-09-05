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
        message.channel.send('Sorry, please include a valid message URl.');
        return;
      }
      const messageURL = message.content.split(' ')[2];
      const messageID = messageURL.split('/')[messageURL.split('/').length - 1];
      if (!messageID || isNaN(parseInt(messageID))) {
        logger.warn('invalid syntax');
        message.channel.send('Sorry, please include a valid message URL.');
        return;
      }
      const messageContent = await message.channel.messages.fetch(messageID);
      if (!messageContent) {
        logger.warn('Message not found');
        message.channel.send('Sorry, but I could not find that message.');
        return;
      }
      return addFormatting(messageContent);
    } catch (error) {
      logger.error(error);
    }
  }
};
