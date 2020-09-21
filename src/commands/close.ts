import { CommandDef } from './command-def';
import { TextChannel, MessageEmbed } from 'discord.js';
import { oneLine } from 'common-tags';
import { logger } from '../utilities/logger';

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
      if (!message.member?.hasPermission('KICK_MEMBERS')) {
        logger.warn(
          `${message.author.username} did not have the correct permissions.`
        );
        message.channel.send(
          'Sorry, this command is restricted to moderators.'
        );
        return;
      }
      const flag = message.content.split(' ')[2];
      if (flag !== 'accepted' && flag !== 'denied') {
        logger.warn('invalid paramater');
        message.channel.send(
          "I don't see the right flags. Please use `close [accepted/denied] [@user]`."
        );
        return;
      }
      const target = message.channel as TextChannel;
      //check for log channel
      const log = message.guild?.channels.cache.find(
        (channel) => channel.name === config.LOG_MSG_CHANNEL
      ) as TextChannel;
      //check for user permissions
      if (!log) {
        logger.warn('Log channel not found.');
        message.channel.send('Sorry, but I could not find the log channel.');
        return;
      }

      if (
        !target.name.includes('suspended') ||
        !target.parent?.name.includes(config.SUSPEND_CATEGORY)
      ) {
        logger.warn('Cannot delete non-temporary channel');
        message.channel.send(
          'This command only works on the suspended-user channels.'
        );
        return;
      }

      let status = 'The appeal was not approved.';
      if (message.mentions.members?.first() && flag === 'accepted') {
        const suspend = message.guild?.roles.cache.find(
          (role) => role.name === config.SUSPEND_ROLE
        );
        if (!suspend) {
          logger.warn('Cannot find suspend role');
          message.channel.send('Sorry, I could not find your suspended role.');
        } else {
          await message.mentions.members.first()?.roles.remove([suspend]);
          status = `The appeal was approved and ${message.mentions.members.first()}'s access was restored.`;
        }
      }
      await target.delete();
      const deleteEmbed = new MessageEmbed()
        .setTitle('Channel Deleted')
        .setDescription(
          `${message.author} has closed and deleted the \`${target.name}\` (ID: \`${target.id}\`) channel`
        )
        .addFields({ name: 'Decision', value: status });
      await log.send(deleteEmbed);
    } catch (error) {
      logger.error(error);
    }
  }
};
