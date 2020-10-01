import { CommandDef } from './command-def';
import { MessageEmbed, TextChannel } from 'discord.js';
import { userSuspendModel, UserSuspend } from '../APIs/mongo-suspend';
import { logger } from '../utilities/logger';

export const suspendCommand: CommandDef = {
  prefix: 'suspend',
  description:
    'Suspends a user for the given reason. This command is only available to admins. ',
  usage: 'suspend <user> [reason]',
  command: async (message, { config }): Promise<void> => {
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

      //check for suspend category setting
      const suspendCategory = config.SUSPEND_CATEGORY;
      const category = await message.guild?.channels.cache.find(
        (c) => c.name === suspendCategory && c.type === 'category'
      );

      if (!category) {
        logger.warn('Missing suspend category.');
        message.channel.send('Sorry, I could not find your suspend category.');
        return;
      }

      //check for suspend role setting
      const suspend = message.guild?.roles.cache.find(
        (role) => role.name === config.SUSPEND_ROLE
      );
      if (!suspend) {
        logger.warn(`Missing suspend role.`);
        message.channel.send('Sorry, I could not find your suspend role.');
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
      const msgArguments = message.content.split(' ');
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
      const reasonArg = msgArguments.slice(3, msgArguments.length);
      //check for reason provided, if none then create one.
      const reason = reasonArg.join(' ') || 'violation of the rules';
      //logging embed
      const restrictEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Access Restricted!`)
        .addFields(
          {
            name: 'What happened?',
            value: `${mod} has suspended **${user.user.username}** (${user}).`
          },
          {
            name: 'Reason',
            value: `${reason}`
          }
        )
        .setFooter('Please remember to follow our rules!');
      modChannel.send(restrictEmbed);
      //assign roles
      await user.roles.set([suspend]);
      //create suspend channel
      const channelName = `suspended-${user.user.username}`;
      //assign this below line to "suspendChannel" once that feature is turned back on.
      const suspendChannel = await message.guild?.channels.create(channelName, {
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
      await suspendChannel?.send(
        `This is a standard message notifying ${user} that you have been suspended from freeCodeCamp's Discord for ${reason}.

This channel has been created for you to appeal this decision. In order to appeal the decision, you must complete the following steps:

  1. Read our Code of Conduct: https://code-of-conduct.freecodecamp.org/
  2. Read our rules in the #rules channel.
  3. Confirm in this channel that you have read it.
  4. Explain in this channel why you feel you should be un-suspended.

/cc ${modRole}`
      );
      if (config.MONGO_URI) {
        const userSuspend: UserSuspend | null = await userSuspendModel.findOne({
          userId: user.id
        });
        if (userSuspend) {
          await message.author.send(
            `Hello! It looks like ${user} has been suspended previously. You may consider taking further action based on their offence.`
          );
          userSuspend.suspended.push({
            date: new Date(Date.now()).toLocaleString(),
            mod: message.author.username,
            reason: reason
          });
          userSuspend.currentUsername = user.user.username;
          userSuspend.currentNickname = user.nickname || '';
          await userSuspend.save();
          return;
        }
        const newUser = new userSuspendModel({
          userId: user.id,
          currentUsername: user.user.username,
          currentNickname: user.nickname,
          suspended: [
            {
              date: new Date(Date.now()).toLocaleString(),
              mod: message.author.username,
              reason: reason
            }
          ]
        });
        await newUser.save();
      }
    } catch (error) {
      logger.error(error);
    }
  }
};
