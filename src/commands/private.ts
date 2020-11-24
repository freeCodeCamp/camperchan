import { logger } from '../utilities/logger';
import { CommandDef } from './command-def';
import { MessageEmbed, TextChannel } from 'discord.js';

export const privateCmd: CommandDef = {
  prefix: 'private',
  description: 'Creates a private channel for moderators and the target user.',
  usage: 'private <user>',
  command: async (message, { config }) => {
    try {
      //check for appropriate permissions
      if (!message.member?.hasPermission('KICK_MEMBERS')) {
        logger.warn(
          `${message.author.username} did not have the correct permissions.`
        );
        message.channel.send(
          'Sorry, this command is restricted to moderators.'
        );
        return;
      }

      //check for log channel setting
      const modChannel = message.guild?.channels.cache.find(
        (channel) => channel.name === config.LOG_MSG_CHANNEL
      ) as TextChannel;

      if (!modChannel) {
        logger.warn('Log channel not found.');
        message.channel.send('Sorry, I could not find your log channel.');
        return;
      }

      //check for private category setting - same as suspended category
      const privateCategory = config.SUSPEND_CATEGORY;
      const category = await message.guild?.channels.cache.find(
        (c) => c.name === privateCategory && c.type === 'category'
      );

      if (!category) {
        logger.warn('Missing private category.');
        message.channel.send('Sorry, I could not find your private category.');
        return;
      }

      //check for bot role
      const botRole = message.guild?.roles.cache.find(
        (role) => role.name === config.BOT_ROLE
      );

      if (!botRole) {
        logger.warn('Bot role not found.');
        message.channel.send('Sorry, I could not find my bot role.');
        return;
      }

      //check for moderator role

      const modRole = message.guild?.roles.cache.find(
        (role) => role.name === config.MOD_ROLE
      );

      if (!modRole) {
        logger.warn('Mod role not found.');
        message.channel.send('Sorry, I could not find your moderator role.');
        return;
      }

      const mod = message.author;
      const user = message.mentions.members?.first();

      //check for valid user tag
      if (!user) {
        message.channel.send(`Invalid user tag.`);
        message.channel.send(
          'Sorry, but you did not provide a valid user tag.'
        );
        return;
      }

      //cannot target self
      if (message.mentions.users.first() === mod) {
        message.channel.send(`Cannot target self.`);
        return;
      }
      //logging embed
      const restrictEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Private Channel Created`)
        .addFields({
          name: 'What happened?',
          value: `${mod} has created a private discussion channel for **${user.user.username}** (${user}).`
        })
        .setFooter('Please remember to follow our rules!');
      modChannel.send(restrictEmbed);
      //create suspend channel
      const channelName = `private-${user.user.username}`;
      //assign this below line to "suspendChannel" once that feature is turned back on.
      await message.guild?.channels.create(channelName, {
        type: 'text',
        permissionOverwrites: [
          {
            id: user.id,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
            deny: ['CREATE_INSTANT_INVITE']
          },
          {
            id: message.guild.id,
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
    } catch (error) {
      logger.error(error);
    }
  }
};
