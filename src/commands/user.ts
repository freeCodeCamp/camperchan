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
    if (!userSuspend) {
      message.channel.send(`${user} has a clean record!`);
      return;
    }
    message.channel.send(`Generating suspend record for ${user}...`);
    message.channel.send(
      `This user was last seen as ${userSuspend.currentUsername}`
    );
    if (userSuspend.currentNickname) {
      message.channel.send(
        `This user last used the nickname ${userSuspend.currentNickname}`
      );
    }
    const suspendLog = userSuspend.suspended.map(
      (el) =>
        `${el.mod} suspended them on ${el.date.split(',')[0]} for ${el.reason}`
    );
    message.channel.send(suspendLog.join('\n'));
  }
};
