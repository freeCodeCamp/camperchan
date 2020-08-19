import { CommandDef } from './command-def';
import { UserSuspend, userSuspendModel } from '../APIs/mongo-suspend';

export const userCommand: CommandDef = {
  prefix: 'user',
  description: 'Get data on the user mentioned.',
  usage: 'user <username>',
  command: async (message, { config }) => {
    const user = message.mentions.members?.first();

    if (!user) return console.log('No user provided.');

    if (!message.member?.hasPermission('KICK_MEMBERS'))
      return console.log('Invalid permissions');

    if (!config.MONGO_URI) return console.log('No database configured');

    const userSuspend: UserSuspend | null = await userSuspendModel.findOne({
      userId: user.id
    });
    if (!userSuspend) {
      message.channel.send(`${user} has a clean record!`);
      return;
    }
    const log = userSuspend.suspended.map((el) => JSON.stringify(el));
    message.channel.send(`Here is the record for ${user}: ${log}`);
  }
};
