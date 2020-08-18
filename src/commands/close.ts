import { CommandDef } from './command-def';
import { TextChannel, MessageEmbed } from 'discord.js';
import { oneLine } from 'common-tags';

export const closeCommand: CommandDef = {
  prefix: 'close',
  description: oneLine`
    Closes the channel. This command requires admin privileges,
    and will only work on the automatically created "suspended" channels.
    Mentioning user with the command will remove the suspended role from the user.
  `,
  usage: 'close [accepted | denied] [user]',
  command: async (message, { config }): Promise<void> => {
    try {
      if (!message.member?.hasPermission('MANAGE_CHANNELS'))
        return console.log(
          `${message.author.username} did not have the correct permissions.`
        );
      const flag = message.content.split(' ')[2];
      if (flag !== 'accepted' && flag !== 'denied')
        return console.log('invalid paramater');
      const target = message.channel as TextChannel;
      //check for log channel
      const log = message.guild?.channels.cache.find(
        (channel) => channel.name === config.LOG_MSG_CHANNEL
      ) as TextChannel;
      //check for user permissions
      if (!message.member?.hasPermission('MANAGE_CHANNELS'))
        return console.log('Missing permissions.');

      if (!log) return console.log('Log channel not found.');

      if (
        !target.name.includes('suspended') ||
        !target.parent?.name.includes(config.SUSPEND_CATEGORY)
      ) {
        return console.log('Cannot delete non-temporary channel');
      }

      let status = 'The appeal was not approved.';
      if (message.mentions.members?.first() && flag === 'accepted') {
        const suspend = message.guild?.roles.cache.find(
          (role) => role.name === config.SUSPEND_ROLE
        );
        if (!suspend) {
          console.log('Cannot find suspend role');
        } else {
          await message.mentions.members.first()?.roles.remove([suspend]);
          status = `The appeal was approved and ${message.mentions.members.first()}'s access was restored.`;
        }
      }
      await target.delete();
      const deleteEmbed = new MessageEmbed()
        .setTitle('Channel Deleted')
        .setDescription(
          `${message.author} has closed and deleted the \`${target.name}\` channel`
        )
        .addFields({ name: 'Decision', value: status });
      await log.send(deleteEmbed);
    } catch (error) {
      console.error(error);
    }
  }
};
