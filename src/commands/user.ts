import { UserSuspend, userSuspendModel } from '../APIs/mongo-suspend';
import { logger } from '../utilities/logger';
import { CommandDef } from './command-def';

export const userCommand: CommandDef = {
  prefix: 'user',
  description: 'Get data on the user mentioned.',
  usage: 'user <username>',
  command: async (message, { config }) => {
    const user = message.mentions.members?.first();

    if (!user) {
      logger.warn('No user provided.');
      message.channel.send('Sorry, please provide a valid user mention.');
      return;
    }

    if (!message.member?.permissions.has('KICK_MEMBERS')) {
      logger.warn('Invalid permissions');
      message.channel.send(
        'Sorry, but this command is restricted to moderators.'
      );
      return;
    }

    if (!config.MONGO_URI) {
      logger.warn('No database configured');
      message.channel.send(
        'Sorry, but this command requires an active database connection.'
      );
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
