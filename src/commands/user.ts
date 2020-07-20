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
    const userEmbed = new MessageEmbed()
      .setTitle(user.nickname || user.user.username)
      .setDescription('Here is the available data on them.')
      .addFields(
        { name: 'Username', value: user.user.username },
        {
          name: 'Roles',
          value: user.roles.cache.map((role) => role.name).join(', ')
        }
      );
    let suspended;
    if (config.MONGO_URI) {
      const userSuspend: UserSuspend | null = await userSuspendModel.findOne({
        userId: user.id
      });
      suspended = userSuspend?.suspended;
      if (suspended && message.member?.hasPermission('KICK_MEMBERS')) {
        userEmbed.addFields({ name: 'Prior Suspension?', value: suspended });
      }
    }
    message.channel.send(userEmbed);
  }
};
