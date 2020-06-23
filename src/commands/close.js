const getConfig = require('../config/get-config.js');
const config = getConfig();
module.exports = {
  prefix: 'close',
  description: 'Closes the channel.',
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
      target.delete();
      log.send(`${message.author} deleted a channel.`);
    } catch (error) {
      console.error(error);
    }
  }
};
