const getConfig = require('../config/get-config.js');
const config = getConfig();
module.exports = {
  prefix: 'close',
  description: 'Closes the channel.',
  command: async function (message) {
    const target = message.channel;
    //check for log channel
    const log = message.guild.channels.cache.find(
      (channel) => channel.name === config.LOG_MSG_CHANNEL
    );
    if (!log) {
      console.log('Log channel not found.');
      return;
    }
    target.delete().catch((e) => console.error(e));
    log.send(`${message.author} deleted a channel.`)
  }
};
