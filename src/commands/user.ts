import { CommandDef } from './command-def';
import { UserSuspend, userSuspendModel } from '../APIs/mongo-suspend';
import { MessageEmbed } from 'discord.js';
import { logger } from '../utilities/logger';

export const userCommand: CommandDef = {
  prefix: 'user',
  description: 'Get data on the user mentioned.',
  usage: 'user <username>',
  command: async (message, { config }) => {
    const user = message.mentions.members?.first();

    if (!user) {
      logger.warn('No user provided.');
      return;
    }

    if (!message.member?.hasPermission('KICK_MEMBERS')) {
      logger.warn('Invalid permissions');
      return;
    }

    if (!config.MONGO_URI) {
      logger.warn('No database configured');
      return;
    }

    const userSuspend: UserSuspend | null = await userSuspendModel.findOne({
      userId: user.id
    });
    const suspended = !!userSuspend?.suspended;
    const userEmbed = new MessageEmbed()
      .setTitle(user.nickname || user.user.username)
      .setDescription('Here is the available data on them.')
      .addFields({ name: 'Prior Suspension?', value: suspended });
    message.channel.send(userEmbed).catch(logger.error);
  }
};
