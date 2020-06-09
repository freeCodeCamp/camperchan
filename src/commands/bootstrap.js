const Discord = require('discord.js');
const fs = require('fs');
const addFormatting = require('../commands/add-formatting');
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
    .filter((file) => file.endsWith('.js'));

  client.commands = new Discord.Collection();

  // The code below listens for reactions to any message in the server and if
  // a reaction is equal to the specified trigger reaction (in this case '🤖'),
  // then is attempts to format the message. To get a detailed explanation of the
  // code below visit: https://discordjs.guide/popular-topics/reactions.html#listening-for-reactions-on-old-messages
  client.on('messageReactionAdd', async (reaction) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        reaction.message.channel.send(
          'Something went wrong! Failed to format code :('
        );
        console.error(error);
        return;
      }
    }

    if (reaction.emoji.name === '🤖') {
      try {
        await reaction.message.reactions.removeAll();

        addFormatting.command(reaction.message);
      } catch (error) {
        // A common issue with this not working correctly, is
        // if the bot does not have permissions to remove reactions.
        // Check the README.md file for details on setting the correct permissions
        reaction.message.channel.send(
          'Something went wrong! Failed to format code :('
        );
        console.error(error);
      }
    }
  });
  if (config.WELCOME_DM) {
    // we only send this command if the WELCOME_DM environment variable
    // is passed and truthy.
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
  }

  if (config.LEAVE_MSG_CHANNEL) {
    // we only mention if users are removed if
    // the leave message channel is given.
    client.on('guildMemberRemove', function (member) {
      const goodbyeChannel = member.guild.channels.cache.find(
        (channel) => channel.name === config.LEAVE_MSG_CHANNEL
      );
      if (!goodbyeChannel) {
        console.error('goodbye channel not found.');
        return;
      }
      goodbyeChannel.send(`** ${member.user} has left us! :( **`);
    });
  }

  for (const file of commands) {
    const command = require(`${__dirname}/${file}`);
    // Set a new command file in the Discord Collection
    // With the key as the command prefix and the value as the exported command function
    client.commands.set(command.prefix, command);
  }

  //deleted message logging
  client.on('messageDelete', function (message) {
    //change channel name to match server configuration
    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.name == 'moderation-activity'
    );
    const deleteEmbed = new Discord.MessageEmbed()
      .setTitle('A message was deleted.')
      .setColor('#ff0000')
      .setDescription('Here are the details of that message.')
      .addFields(
        {
          name: 'Message author',
          value: message.author
        },
        {
          name: 'Channel',
          value: message.channel
        },
        {
          name: 'Content',
          value: message.content
        }
      );
    if (!logChannel) {
      console.error('logging channel not found');
      message.channel.send(deleteEmbed);
      return;
    }
    logChannel.send(deleteEmbed);
  });

  client.on('message', (message) => {
    if (message.content.startsWith(config.PREFIX)) {
      // Get command after prefix
      const commandArgument = message.content.split(' ')[1];

      // Check if there are no commands sent
      if (!commandArgument) {
        message.channel.send('There is no command indicated!');
        return;
      }

      // Check if the command sent does not exist
      if (!client.commands.has(commandArgument)) {
        message.channel.send(`The command ${commandArgument} does not exist!`);
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
    thanks(message);
  });
};
