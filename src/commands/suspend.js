const Discord = require('discord.js');
const getConfig = require('../config/get-config.js');
const config = getConfig();
module.exports = {
  prefix: 'suspend',
  description: 'Suspends a user for the given reason',
  command: async function suspend(message) {
    //check for appropriate permissions
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      console.log(
        `${message.author.username} did not have the correct permissions.`
      );
      return;
    }
    //check for log channel setting
    const modChannel = message.guild.channels.cache.find(
      (channel) => channel.name === config.LOG_MSG_CHANNEL
    );
    if (!modChannel) {
      console.log('Log channel not found.');
      return;
    }
    //check for suspend category setting
    const suspendCategory = config.SUSPEND_CATEGORY;
    const category = await message.guild.channels.cache.find(
      (c) => c.name === suspendCategory && c.type === 'category'
    );
    if (!category) {
      console.log('Missing suspend category.');
      return;
    }
    //check for suspend role setting
    const suspend = message.guild.roles.cache.find(
      (role) => role.name == config.SUSPEND_ROLE
    );
    if (!suspend) {
      console.log(`Missing suspend role.`);
      return;
    }

    const mod = message.author;
    const msgArguments = message.content.split(' ');
    const user = message.mentions.members.first();
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
    const restrictEmbed = new Discord.MessageEmbed()
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
    user.roles.remove(user.roles).catch((e) => console.error(e));
    user.roles.add(suspend).catch((e) => console.error(e));
    //create suspend channel
    const channelName = `suspended-${user.user.username}`;
    message.guild.channels.create(channelName, {
      type: 'suspended',
      permissionOverwrites: [
        {
          id: user.id,
          allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
        },
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
        }
      ],
      parent: category
    });
    user.send(
      'You have been suspended for violating our Code of Conduct. A channel has been created in the server for you to discuss this with the moderation team.'
    );
  }
};
