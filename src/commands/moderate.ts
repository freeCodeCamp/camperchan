import { TextChannel } from 'discord.js';
import { close } from '../command-functions/moderate/close';
import { privateCommand } from '../command-functions/moderate/private';
import { suspend } from '../command-functions/moderate/suspend';
import { logger } from '../utilities/logger';
import { CommandDef } from './command-def';

export const moderate: CommandDef = {
  prefix: 'moderate',
  description:
    'This handles the moderation commands. It can create a `private` discussion channel, `suspend` a user, and `close` a private/suspended channel.',
  usage:
    'moderate <suspend|private> <@user> [reason] || moderate close <accepted|denied> <@user>',
  command: async (message, { config }) => {
    // Extract values
    const { member, content, channel, mentions, guild } = message;
    const {
      LOG_MSG_CHANNEL,
      SUSPEND_ROLE,
      MOD_ROLE,
      SUSPEND_CATEGORY,
      BOT_ROLE
    } = config;

    // Error handling
    if (!guild) {
      logger.error('Guild error.');
      return;
    }

    // Check for moderator role
    const modRole = guild.roles.cache.find((role) => role.name === MOD_ROLE);
    if (!modRole) {
      logger.warn('Mod role not found.');
      message.channel.send(
        'Sorry, I could not find the server moderator role.'
      );
      return;
    }

    //check for appropriate permissions
    if (!member?.roles.cache.has(modRole.id)) {
      logger.warn(
        `${message.author.username} did not have the correct permissions.`
      );
      message.channel.send('Sorry, this command is restricted to moderators.');
      return;
    }

    // Get action
    const [action] = content.split(' ').slice(2);

    // Handle invalid action
    if (action !== 'suspend' && action !== 'private' && action !== 'close') {
      await channel.send(
        `${action} is not a valid action for this command. Please try again, and tell me if you would like to suspend, private, or close.`
      );
      return;
    }

    // Check for log channel
    const logChannel = message.guild?.channels.cache.find(
      (channel) => channel.name === LOG_MSG_CHANNEL
    ) as TextChannel;
    if (!logChannel) {
      logger.warn('Log channel not found.');
      channel.send('Sorry, but I could not find the log channel.');
      return;
    }

    // Check for suspend role
    const suspendRole = guild?.roles.cache.find(
      (role) => role.name === SUSPEND_ROLE
    );

    if (!suspendRole) {
      await channel.send('Sorry, but I could not find your suspended role.');
      return;
    }

    if (action === 'close') {
      await close(message, { modRole, suspendRole, logChannel });
      return;
    }

    // If not closing channel, locate correct category
    const category = guild?.channels.cache.find(
      (c) => c.name === SUSPEND_CATEGORY && c.type === 'category'
    );
    if (!category) {
      logger.warn('Missing private category.');
      channel.send('Sorry, I could not find your private category.');
      return;
    }

    //check for bot role
    const botRole = message.guild?.roles.cache.find(
      (role) => role.name === BOT_ROLE
    );

    if (!botRole) {
      logger.warn('Bot role not found.');
      message.channel.send('Sorry, I could not find my bot role.');
      return;
    }

    // Check for mentioned user
    const targetUser = mentions.members?.first();
    if (!targetUser) {
      await channel.send(
        'Please mention the user you wish to create a private discussion for.'
      );
      return;
    }

    // Cannot target moderators
    if (targetUser.roles.cache.has(modRole.id)) {
      await channel.send('You cannot use this command on moderators.');
      return;
    }

    // Now handle creating private channels
    if (action === 'private') {
      await privateCommand(message, {
        modRole,
        suspendRole,
        logChannel,
        category,
        botRole,
        targetUser
      });
      return;
    }

    // Last option is suspend... Remove the user mention from command arguments
    await suspend(message, {
      modRole,
      suspendRole,
      logChannel,
      category,
      botRole,
      targetUser
    });
    return;
  }
};
