import { MessageEmbed, Message } from 'discord.js';
import { CommandDef } from './command-def';
import { COMMANDS } from './commands';
import { oneLine, stripIndent } from 'common-tags';
import { Config } from '../config/get-config';

type helpFunctionArgs = {
  message: Message;
  config?: Config;
  Command?: string;
};

function sendFullList({ message, config }: helpFunctionArgs): void {
  const helpEmbed: MessageEmbed = new MessageEmbed()
    .setColor('#0099FF')
    .setTitle('Help Command')
    .addField(
      'Bot Information',
      oneLine`Hello! I am a test bot created by bradtaniguchi and members of
            FreeCodeCamp.org to experiment with the process of building a
            Discord Bot. You can view my
            [source code here](https://github.com/bradtaniguchi/discord-bot-test)`
    )
    .addField(
      'List of Commands',
      COMMANDS.sort((a, b) =>
        a.prefix.toUpperCase() > b.prefix.toUpperCase() ? 1 : -1
      )
        .map((command, i) => {
          if ((i + 1) % 4 === 0) return `\`${command.prefix}\n\``;
          else return `\`${command.prefix}\``;
        })
        .join(' ') +
        stripIndent`
        \u200b
        \u200b
        For more information about each command, use \`${
          (config as Config).PREFIX
        } help <command>\``
    )
    .setFooter('I am not affiliated with FreeCodeCamp in any way.');
  message.author.send(helpEmbed);
  message.channel.send('DM sent with the requested information');
}

function sendSpecificCommand({ message, Command }: helpFunctionArgs) {
  const commandFound = COMMANDS.find((command) => command.prefix == Command);
  if (!commandFound)
    return message.channel.send(
      `Cannot find the command you specified -> \`${Command}\``
    );
  const helpEmbed = new MessageEmbed()
    .setColor('#0099FF')
    .setTitle(`\`${commandFound.usage}\``)
    .addField('Description', commandFound.description)
    .addField('\u200b', 'Required: `<>` | Optional: `[]`');

  message.author.send(helpEmbed);
  message.channel.send(
    `DM sent with information on the ${commandFound.prefix} command`
  );
}

export const help: CommandDef = {
  prefix: 'help',
  description: oneLine`
    If a command is not specified, it will display all
    the available commands into a list. If a command
    is specified, it will display the usage for that command
    and the description for them.
  `,
  usage: 'help [command]',
  /**
   * @name help
   * Displays currently available commands.
   *
   * @param message the message provided
   * Now automatically adds new commands - make sure the .js file has a prefix and description,
   */
  command: async (message, { config }) => {
    const Command = message.content.split(' ')[2];
    // If there is no Command specified, then it will send a full list of commands
    if (!Command) return sendFullList({ message, config });
    sendSpecificCommand({ message, Command });
  }
};
