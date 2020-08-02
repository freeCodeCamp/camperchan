import { MessageEmbed } from 'discord.js';
import { CommandDef } from './command-def';
import { COMMANDS } from './commands';

export const help: CommandDef = {
  prefix: 'help',
  description: 'Get the commands currently available with this bot',
  usage: 'help [command]',
  /**
   * @name help
   * Displays currently available commands.
   *
   * @param message the message provided
   * Now automatically adds new commands - make sure the .js file has a prefix and description,
   */
  command: async (message, { config }) => {
    const param = message.content.split(' ')[2];
    if (param == undefined) {
      const helpEmbed: MessageEmbed = new MessageEmbed()
        .setColor('#0099FF')
        .setTitle('Help Command')
        .addField(
          'Bot Information',
          'Hello! I am a test bot created by bradtaniguchi and members of ' +
            'FreeCodeCamp.org to experiment with the process of building a ' +
            'Discord Bot. You can view my [source code here](https://github.com/bradtaniguchi/discord-bot-test)'
        )
        // .addField(
        //   'Commands',
        //   `Hey there ${message.author}, here is the full list of all my commands.\n` +
        //     `For more information about each command, use \`${config.PREFIX} help <command>\``
        // )
        .addField(
          'List of Commands',
          COMMANDS.sort((a, b) =>
            a.prefix.toUpperCase() > b.prefix.toUpperCase() ? 1 : -1
          )
            .map((command, i) => {
              if ((i + 1) % 4 === 0) {
                return `\`${command.prefix}\n\``;
              } else return `\`${command.prefix}\``;
            })
            .join(' ') +
            '\n \n' +
            `For more information about each command, use \`${config.PREFIX} help <command>\``
        )
        .setFooter('I am not affiliated with FreeCodeCamp in any way.');
      message.channel.send(helpEmbed);
    } else {
      const commandFound = COMMANDS.find((command) => command.prefix == param);
      if (!commandFound)
        return message.channel.send(
          `Cannot find the command you specified -> \`${param}\``
        );
      const helpEmbed = new MessageEmbed()
        .setColor('#0099FF')
        .setTitle(commandFound.usage)
        .addField('Description', `\`${commandFound.description}\``)
        .addField('\u200b', 'Required: `<>` | Optional: `[]`');
      message.channel.send(helpEmbed);
    }
  }
};
