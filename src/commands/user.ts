import { CommandDef } from './command-def';
import { UserSuspend, userSuspendModel } from '../APIs/mongo-suspend';
import { MessageEmbed } from 'discord.js';

export const userCommand: CommandDef = {
  prefix: 'user',
  description: "Get data on a current user. Use the syntax 'user [username]'.",
  command: async (message, { config }) => {
    const user = message.mentions.members?.first();
    if (!user) {
      console.log('No user provided.');
      return;
    }
    if (!message.member?.hasPermission('KICK_MEMBERS')) {
      console.log('Invalid permissions');
      return;
    }
    if (!config.MONGO_URI) {
      console.log('No database configured');
      return;
    }
    const userSuspend: UserSuspend | null = await userSuspendModel.findOne({
      userId: user.id
    });
    let suspended = userSuspend?.suspended;
    if (!suspended) {
      suspended = false;
    }
    const userEmbed = new MessageEmbed()
      .setTitle(user.nickname || user.user.username)
      .setDescription('Here is the available data on them.')
      .addFields({ name: 'Prior Suspension?', value: suspended });
    message.channel.send(userEmbed);
  }
};
