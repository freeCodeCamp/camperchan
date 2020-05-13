const eightball = require('./eightball');

/**
 * Bootstraps all commands to the client.
 */
module.exports = function bootstrap(client) {
  const commands = [eightball];
  
  client.on('guildMemberAdd', member => {
        member.send("Welcome to the server! Please make sure you read the rules in our '#welcome' channel before you start chatting!")
  })
            
  client.on('guildMemberRemove', member => {
    member.guild.channels.cache.find(ch => ch.name === 'introduction').send("**" + member.user.username + "** has left the server! :(")
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
