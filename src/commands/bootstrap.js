const eightball = require('./eightball');

/**
 * Bootstraps all commands to the client.
 */
module.exports = function bootstrap(client) {
  const commands = [eightball];
  
  client.on('guildMemberAdd', member => {
    member.guild.channels.get('channelID').send("**" + member.user.username + "** has joined the server! :)")
  })
            
  client.on('guildMemberRemove', member => {
    member.guild.channels.get('channelID').send("**" + member.user.username + "** has left the server! :(")
  })
  
  client.on('message', (message) => {
    for (let command of commands) {
      if (message.content.startsWith(command.prefix)) {
        command.command(message);
        break;
      }
    }
  });
};
