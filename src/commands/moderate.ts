import { TextChannel } from 'discord.js';
import { close } from '../command-functions/moderate/close';
import { privateCommand } from '../command-functions/moderate/private';
import { logger } from '../utilities/logger';
import { CommandDef } from './command-def';

export const moderate: CommandDef = {
  prefix: 'moderate',
  description:
    'This handles the moderation commands. It can create a `private` discussion channel, `suspend` a user, and `close` a private/suspended channel.',
  usage:
    'moderate <suspend|private> <@user> [reason] || moderate close <accepted|denied> <@user>',
  command: async (message, { client, config }) => {
    // Extract values
    const { member, content, channel, mentions, guild } = message;
    const { LOG_MSG_CHANNEL, MOD_ROLE, PRIVATE_CATEGORY, BOT_ROLE } = config;
    const { user } = client;

    // Error handling
    if (!guild || !user) {
      logger.error('Guild error.');
      return;
    }

    const botId = user.id;

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
    if (action !== 'private' && action !== 'close') {
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

    if (action === 'close') {
      await close(message, { modRole, logChannel, botId });
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

    // If not closing channel, locate correct category
    let category = guild.channels.cache.find(
      (c) => c.name === PRIVATE_CATEGORY && c.type === 'category'
    );
    if (!category) {
      category = await guild.channels.create(PRIVATE_CATEGORY, {
        type: 'category',
        permissionOverwrites: [
          {
            id: guild.id,
            deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
          },
          {
            id: modRole.id,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
          },
          {
            id: botId,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
          }
        ]
      });
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
    await privateCommand(message, {
      modRole,
      logChannel,
      category,
      botId,
      targetUser
    });
  }
};
