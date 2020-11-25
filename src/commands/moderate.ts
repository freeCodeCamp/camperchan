import { MessageEmbed, TextChannel } from 'discord.js';
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
    const { author, member, content, channel, mentions, guild } = message;
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
      message.channel.send('Sorry, I could not find your moderator role.');
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

    // Create arguments list, removing prefix and command name
    const commandArguments = content.split(' ').slice(2);

    // Get action
    const action = commandArguments.shift();

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
      const channelName = (channel as TextChannel).name;

      // Check for valid channel
      if (
        !channelName.startsWith('private') &&
        !channelName.startsWith('suspended')
      ) {
        await channel.send(
          'I am sorry, but I can only perform this action on suspended or private channels.'
        );
        return;
      }

      // Create channel deleted embed
      const deleteEmbed = new MessageEmbed()
        .setTitle('Channel Deleted')
        .setDescription(
          `${author} has closed and deleted the \`${channelName}\` (ID: \`${channel.id}\`) channel.`
        );

      // Handle flow for private channel
      if (channelName.startsWith('private')) {
        await channel.delete();
        await logChannel.send(deleteEmbed);
        return;
      }

      // Get accepted/denied flag
      const flag = commandArguments.shift();

      // Handle invalid flag
      if (flag !== 'accepted' && flag !== 'denied') {
        await channel.send('Do you want to accept or deny the user appeal?');
        return;
      }

      // Denied flag does not require user mention
      if (flag === 'denied') {
        deleteEmbed.addField('Status', 'The appeal was not approved');
        await channel.delete();
        await logChannel.send(deleteEmbed);
        return;
      }

      // Check for valid user mention
      const targetUser = mentions.members?.first();
      if (!targetUser) {
        await channel.send(
          'Please mention the user you wish to accept the appeal for.'
        );
        return;
      }

      // Remove suspended role, send log, delete channel.
      await targetUser.roles.remove(suspendRole);
      deleteEmbed.addField(
        'Status',
        `The appeal was approved and \`${targetUser.user.username}\`'s access was restored.`
      );
      await logChannel.send(deleteEmbed);
      await channel.delete();
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
      // Create channel
      const channelName = `private-${targetUser.user.username}`;

      await guild?.channels.create(channelName, {
        type: 'text',
        permissionOverwrites: [
          {
            id: targetUser.id,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
            deny: ['CREATE_INSTANT_INVITE']
          },
          {
            id: guild.id,
            deny: [
              'VIEW_CHANNEL',
              'READ_MESSAGE_HISTORY',
              'SEND_MESSAGES',
              'CREATE_INSTANT_INVITE'
            ]
          },
          {
            id: botRole,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
            deny: ['CREATE_INSTANT_INVITE']
          },
          {
            id: modRole,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
            deny: ['CREATE_INSTANT_INVITE']
          }
        ],
        parent: category
      });

      // Send log
      const privateEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Private Channel Created`)
        .addFields({
          name: 'What happened?',
          value: `${author} has created a private discussion channel for **${targetUser.user.username}** (${targetUser}).`
        })
        .setFooter(
          'This is not a suspension, but the notice is created for our records.'
        );
      logChannel.send(privateEmbed);
      return;
    }

    // Last option is suspend... Remove the user mention from command arguments
    commandArguments.shift();

    // Get reason
    const reason = commandArguments.join(' ') || 'No reason provided';

    // Suspend user
    await targetUser.roles.set([suspendRole]);

    // Create channel
    const channelName = `suspended-${targetUser.user.username}`;

    const suspendChannel = await guild?.channels.create(channelName, {
      type: 'text',
      permissionOverwrites: [
        {
          id: targetUser.id,
          allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
          deny: ['CREATE_INSTANT_INVITE']
        },
        {
          id: guild.id,
          deny: [
            'VIEW_CHANNEL',
            'READ_MESSAGE_HISTORY',
            'SEND_MESSAGES',
            'CREATE_INSTANT_INVITE'
          ]
        },
        {
          id: botRole,
          allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
          deny: ['CREATE_INSTANT_INVITE']
        },
        {
          id: modRole,
          allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
          deny: ['CREATE_INSTANT_INVITE']
        }
      ],
      parent: category
    });

    // Send CoC message
    await suspendChannel?.send(
      `This is a standard message notifying ${targetUser} that you have been suspended from freeCodeCamp's Discord for ${reason}.

This channel has been created for you to appeal this decision. In order to appeal the decision, you must complete the following steps:

1. Read our Code of Conduct: https://code-of-conduct.freecodecamp.org/
2. Read our rules in the #rules channel.
3. Confirm in this channel that you have read it.
4. Explain in this channel why you feel you should be un-suspended.

/cc ${modRole}`
    );

    // Send log
    const suspendEmbed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`A user was suspended!`)
      .addFields(
        {
          name: 'What happened?',
          value: `${author} has suspended **${targetUser.user.username}** (${targetUser}).`
        },
        {
          name: 'Reason',
          value: `${reason}`
        }
      )
      .setFooter('Please remember to follow our rules!');
    logChannel.send(suspendEmbed);
  }
};
