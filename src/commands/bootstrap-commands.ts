import { Client, Collection, MessageEmbed, TextChannel } from 'discord.js';
import { Config } from '../config/get-config';
import { CommandDef } from './command-def';
import { COMMANDS } from './commands';
import { thanks } from './thanks';
import { QuoteDef } from '../APIs/quote-def';
import { issueEmbedder } from '../listeners/issue-embedder';
import { logger } from '../utilities/logger';

/**
 * Bootstraps all commands to the client.
 * @param client the discord client
 * @param config the application config
 */
export const bootstrapCommands = ({
  client,
  config,
  quoteData
}: {
  client: Client;
  config: Config;
  quoteData: QuoteDef;
}): void => {
  const commands = COMMANDS.reduce(
    (acc, commandDef) => acc.set(commandDef.prefix, commandDef),
    new Collection<string, CommandDef>()
  );
  if (config.WELCOME_DM) {
    // we only send this command if the WELCOME_DM environment variable
    // is passed and truthy.
    client.on('guildMemberAdd', (member) => {
      const welcomeEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Welcome!')
        .setDescription('Thank you for joining our server')
        .addFields({
          name: 'Rules',
          value:
            'Please read our [rules](https://www.freecodecamp.org/news/code-of-conduct/)' +
            ' before posting in the server.'
        })
        .setFooter('Thank you and Happy Coding! 😁');
      member.send({ embeds: [welcomeEmbed] });
    });
  }

  if (config.LOG_MSG_CHANNEL) {
    //deleted message logging
    client.on('messageDelete', function (message) {
      //change channel name to match server configuration
      const logChannel = message.guild?.channels.cache.find(
        (channel) => channel.name === config.LOG_MSG_CHANNEL
      );
      const deleteEmbed = new MessageEmbed()
        .setTitle('A message was deleted.')
        .setColor('#ff0000')
        .setDescription('Here are the details of that message.')
        .addFields(
          {
            name: 'Message author',
            value: message.author?.username || 'unknown author'
          },
          {
            name: 'Message ID',
            value: message.id
          },
          {
            name: 'Channel',
            value: message.channel.toString()
          },
          {
            name: 'Content',
            value: message.content || 'Embedded messages cannot be logged.'
          }
        );
      if (!logChannel) {
        logger.error('log channel not found');
        return;
      }
      if (logChannel.type !== 'GUILD_TEXT') {
        logger.error('log channel not a text channel');
        return;
      }
      (logChannel as TextChannel).send({ embeds: [deleteEmbed] });
    });
  }

  client.on('message', (message) => {
    if (
      Array.from(message.attachments).length > 0 &&
      !Array.from(message.attachments)[0][1].height
    ) {
      message.delete();
      message.channel.send(
        'Please do not upload any files other than images or videos. For large blocks of code, use CodePen or PasteBin.'
      );
    }
    if (message.content.startsWith(config.PREFIX)) {
      // Get command after prefix
      const commandArgument = message.content.split(' ')[1];

      // Check if there are no commands sent
      if (!commandArgument) {
        message.channel.send('There is no command indicated!');
        return;
      }

      // Check if the command sent does not exist
      if (!commands.has(commandArgument)) {
        message.channel.send(`The command ${commandArgument} does not exist!`);
        return;
      }
      // Execute command
      try {
        commands
          .get(commandArgument)
          ?.command(message, { client, config, quoteData });
      } catch (error) {
        logger.error(error);
        message.reply('there was an error trying to execute that command!');
      }
    }
    if (message.content.includes('#')) {
      const { AUTO_LINK_CHANNEL, AUTO_LINK_LIMIT } = config;

      if (!AUTO_LINK_CHANNEL) {
        issueEmbedder(message, AUTO_LINK_LIMIT);
      } else {
        if (
          message.channel.type === 'GUILD_TEXT' &&
          message.channel.name === AUTO_LINK_CHANNEL
        ) {
          issueEmbedder(message, AUTO_LINK_LIMIT);
        }
      }
    }
    thanks(message, config);
  });
};
