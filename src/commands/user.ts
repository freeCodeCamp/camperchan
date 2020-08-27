import { CommandDef } from './command-def';
import { UserSuspend, userSuspendModel } from '../APIs/mongo-suspend';
import { MessageEmbed } from 'discord.js';

export const userCommand: CommandDef = {
  prefix: 'user',
  description: 'Get data on the user mentioned.',
  usage: 'user <username>',
  command: async (message, { config }) => {
    const user = message.mentions.members?.first();

    if (!user) {
      return console.log('No user provided.');
    }

    if (!message.member?.hasPermission('KICK_MEMBERS')) {
      return console.log('Invalid permissions');
    }

    if (!config.MONGO_URI) {
      return console.log('No database configured');
    }

    const userSuspend: UserSuspend | null = await userSuspendModel.findOne({
      userId: user.id
    });
    const suspended = !!userSuspend?.suspended;
    const userEmbed = new MessageEmbed()
      .setTitle(user.nickname || user.user.username)
      .setDescription('Here is the available data on them.')
      .addFields({ name: 'Prior Suspension?', value: suspended });
    message.channel.send(userEmbed);
  }
};
