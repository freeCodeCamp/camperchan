const Discord = require('discord.js');
const fs = require('fs');
const { thanks } = require('./thanks');
/**
 * Bootstraps all commands to the client.
 * @param {Object.client} client the discord client
 * @param {Object.config} config the application config
 */
module.exports = function bootstrap({ client, config }) {
  // Get all the command files from commands folder
  const commands = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith('.js') && !file.endsWith('.test.js'));
  client.commands = new Discord.Collection();

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

  for (const file of commands) {
    const command = require(`${__dirname}/${file}`);
    // Set a new command file in the Discord Collection
    // With the key as the command prefix and the value as the exported command function
    client.commands.set(command.prefix, command);
  }

  client.on('message', (message) => {
    if (message.content.startsWith(config.PREFIX)) {
      // Get command after prefix
      const commandArgument = message.content.split(' ')[1];

      // Check if there are no commands sent
      if (!commandArgument) {
        message.channel.send('There are no command indicated!');
        return;
      }

      // Check if the command sent does not exist
      if (!client.commands.has(commandArgument)) {
        message.channel.send('The command does not exist!');
        return;
      }
      // Execute command
      try {
        client.commands.get(commandArgument).command(message);
      } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
      }
    }
    //thank command
    thanks(message);
    // TODO: remove later, leave for reference
    //   if (message.content.toLowerCase().includes('thanks')) {
    //     const messageArr = message.content.split(' ');
    //     for (let i = 0; i < messageArr.length; i++) {
    //       if (messageArr[i] === 'thanks') {
    //         const args = messageArr[i + 1];
    //         if (args.charAt(0) !== '<') {
    //           continue;
    //         }
    //         const thankMessage =
    //           message.author.toString() +
    //           ' sends brownie points to ' +
    //           args +
    //           ' ' +
    //           '✨👍✨';
    //         const thankNope =
    //           'Sorry ' +
    //           message.author.toString() +
    //           ", you can't send brownie points to yourself! ✨✨";
    //         if (args.replace('!', '') == message.author.toString()) {
    //           message.channel.send(thankNope);
    //           continue;
    //         } else {
    //           message.channel.send(thankMessage);
    //           continue;
    //         }
    //       }
    //     }
    //   }
  });
};
