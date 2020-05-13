const eightball = require('./eightball');
const help = require('./help')
/**
 * Bootstraps all commands to the client.
 */
module.exports = function bootstrap(client) {
  const commands = [eightball];

  client.on('message', (message) => {
    for (let command of commands) {
      if (message.content.startsWith(command.prefix)) {
        command.command(message);
        break;
      }
    }
  });
};
