const getConfig = require('../config/get-config.js');
const Discord = require('discord.js');
const config = getConfig();
module.exports = {
  prefix: 'close',
  description:
    'Closes the channel. This command requires admin privileges, and will only work on the automatically created "suspended" channels. Include the user if you want to remove the suspended role.',
  command: async function (message) {
    try {
      const target = message.channel;
      //check for log channel
      const log = message.guild.channels.cache.find(
        (channel) => channel.name === config.LOG_MSG_CHANNEL
      );
      //check for user permissions
      if (!message.member.hasPermission('MANAGE_CHANNELS')) {
        console.log('Missing permissions.');
        return;
      }
      if (!log) {
        console.log('Log channel not found.');
        return;
      }
      if (
        !target.name.includes('suspended') ||
        !target.parent.name.includes(config.SUSPEND_CATEGORY)
      ) {
        console.log('Cannot delete non-temporary channel');
        return;
      }
      let status = 'The appeal was not approved.';
      if (message.mentions.members.first()) {
        const suspend = message.guild.roles.cache.find(
          (role) => role.name == config.SUSPEND_ROLE
        );
        if (!suspend) {
          console.log('Cannot find suspend role');
        } else {
          message.mentions.members.first().roles.remove([suspend]);
          status = `The appeal was approved and ${message.mentions.members.first()}'s access was restored.`;
        }
      }
      await target.delete();
      const deleteEmbed = new Discord.MessageEmbed()
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
