import { CommandDef } from './command-def';
import { Message } from 'discord.js';
import { addFormatting } from './add-formatting';

export const format: CommandDef = {
  prefix: 'format',
  description: 'Formats the code contained in the message ID.',
  command: async (message: Message): Promise<void> => {
    const messageID = message.content.split(' ')[2];
    if (!messageID || isNaN(parseInt(messageID))) {
      message.channel.send('Invalid syntax');
      return;
    }
    const messageContent = await message.channel.messages.fetch(messageID);
    if (!messageContent) {
      message.channel.send('Message not found');
      return;
    }
    return addFormatting(messageContent);
  }
};
