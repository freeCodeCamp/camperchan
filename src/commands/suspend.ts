import { CommandDef } from './command-def';
import { MessageEmbed, TextChannel } from 'discord.js';
import { userModel, UserSuspend } from '../APIs/mongo-suspend';

export const suspendCommand: CommandDef = {
  prefix: 'suspend',
  description:
    'Suspends a user for the given reason. This command is only available to admins. ' +
    'Use the format "suspend <usertag> <reason>"',
  command: async (message, { config }): Promise<void> => {
    try {
      //check for appropriate permissions
      if (!message.member?.hasPermission('KICK_MEMBERS')) {
        console.log(
          `${message.author.username} did not have the correct permissions.`
        );
        return;
      }
      //check for log channel setting
      const modChannel = message.guild?.channels.cache.find(
        (channel) => channel.name === config.LOG_MSG_CHANNEL
      ) as TextChannel;
      if (!modChannel) {
        console.log('Log channel not found.');
        return;
      }
      //check for suspend category setting
      const suspendCategory = config.SUSPEND_CATEGORY;
      const category = await message.guild?.channels.cache.find(
        (c) => c.name === suspendCategory && c.type === 'category'
      );
      if (!category) {
        console.log('Missing suspend category.');
        return;
      }
      //check for suspend role setting
      const suspend = message.guild?.roles.cache.find(
        (role) => role.name == config.SUSPEND_ROLE
      );
      if (!suspend) {
        console.log(`Missing suspend role.`);
        return;
      }
      //check for bot role
      const bot = message.guild?.roles.cache.find(
        (role) => role.name == config.BOT_ROLE
      );
      if (!bot) {
        console.log('Bot role not found.');
        return;
      }
      const mod = message.author;
      const msgArguments = message.content.split(' ');
      const user = message.mentions.members?.first();
      //check for valid user tag
      if (!user) {
        message.channel.send(`Invalid user tag.`);
        return;
      }
      //cannot target self
      if (message.mentions.users.first() === mod) {
        message.channel.send(`Cannot target self.`);
        return;
      }
      const reasonArg = msgArguments.slice(3, msgArguments.length);
      //check for reason provided, if none then create one.
      const reason = reasonArg.join(' ') || 'No reason provided';
      //logging embed
      const restrictEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Access Restricted!`)
        .addFields(
          {
            name: 'What happened?',
            value: `${mod} has suspended ${user}.`
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
      await message.guild?.channels.create(channelName, {
        type: 'text',
        permissionOverwrites: [
          {
            id: user.id,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
          },
          {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
          },
          {
            id: bot,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
          }
        ],
        parent: category
      });
      /*await suspendChannel.send(
        `This channel has been created for ${user} to discuss their suspension from the server. Once the discussion has concluded, an admin may use the \`close\` command to automatically close this channel.`
      ); */
      await user.send(
        'You have been suspended for violating our Code of Conduct. A channel has been created in the server for you to discuss this with the moderation team.'
      );
      if (config.MONGO_URI) {
        await userModel.findOne(
          { userId: user.id },
          async (err: Error, data: UserSuspend) => {
            if (!data) {
              const newUser = new userModel({
                userId: user.id,
                suspended: true
              });
              await newUser.save((err) => console.error(err));
            } else if (data.suspended) {
              await message.author.send(
                `Hello! It looks like ${user} has been suspended previously. You may consider taking further action based on their offence.`
              );
            }
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
};
