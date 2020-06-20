const Discord = require('discord.js');
const getConfig = require('../config/get-config.js');
const config = getConfig();
module.exports = {
  prefix: 'suspend',
  description: 'Suspends a user for the given reason',
  command: async function suspend(message) {
    //check for appropriate permissions
    if (message.member.hasPermission('KICK_MEMBERS') == false) {
      message.channel.send(
        `ERROR 401: ${message.author}, missing permissions.`
      );
      return;
    }
    const mod = message.author;
    const msgArguments = message.content.split(' ');
    const user = message.mentions.members.first();
    //check for valid user tag
    if (user == undefined) {
      message.channel.send(`ERROR 400: ${mod}, invalid user tag.`);
      return;
    }
    //cannot target self
    if (user === mod) {
      message.channel.send(`ERROR 400: ${mod}, cannot target self.`);
      return;
    }
    const reasonArg = msgArguments.slice(3, msgArguments.length);
    let reason = reasonArg.join(' ');
    //check for reason provided, if none then create one.
    if (reason == '') {
      reason = 'ERROR 404: No reason provided.';
    }
    //check for valid role.
    const suspend = message.guild.roles.cache.find(
      (role) => role.name == config.SUSPEND_ROLE
    );
    if (!suspend) {
      message.channel.send(`ERROR 304: ${mod}, missing suspend role.`);
      return;
    }
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
    const modChannel = message.guild.channels.cache.find(
      (channel) => channel.name === config.LOG_MSG_CHANNEL
    );
    if (modChannel) {
      modChannel.send(restrictEmbed);
    }
    if (!modChannel) {
      message.channel.send('ERROR 404: missing log channel');
    }
    //assign roles
    user.roles.remove(user.roles).catch((e) => console.log(e));
    user.roles.add(suspend).catch((e) => console.log(e));
    //create suspend channel
    const channelName = `suspended-${user.user.username}`;
    const suspendCategory = config.SUSPEND_CATEGORY;
    const category = await message.guild.channels.cache.find(
      (c) => c.name === suspendCategory && c.type === 'category'
    );
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
  }
};
