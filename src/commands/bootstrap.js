const eightball = require('./eightball');
const help = require('./help');
const Discord = require('discord.js');
/**
 * Bootstraps all commands to the client.
 */
module.exports = function bootstrap(client) {
  const commands = [eightball, help];

  client.on('guildMemberAdd', (member) => {
    const welcomeEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Welcome!')
      .setDescription('Thank you for joining our server')
      .addFields({
        name: 'Rules',
        value:
          'Please read our [rules](https://www.freecodecamp.org/news/code-of-conduct/) before posting in the server.'
      })
      .setFooter('Thank you and Happy Coding! 😁');
    member.send(welcomeEmbed);
  });

  client.on('guildMemberRemove', (member) => {
    member.guild.channels.cache
      .find((ch) => ch.name === 'introduction')
      .send('**' + member.user.username + '** has left the server! :(');
  });

  client.on('message', (message) => {
    for (let command of commands) {
      if (message.content.startsWith(command.prefix)) {
        command.command(message);
        break;
      }
    }
  });
};
