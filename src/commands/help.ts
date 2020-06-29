import { MessageEmbedOptions } from 'discord.js';
import { CommandDef } from './command-def';
import { COMMANDS } from './commands';

export const help: CommandDef = {
  prefix: 'help',
  description: 'Get the commands currently available with this bot',
  /**
   * @name help
   * Displays currently available commands.
   *
   * @param message the message provided
   * Now automatically adds new commands - make sure the .js file has a prefix and description,
   */
  command: async (message) => {
    const helpEmbed: MessageEmbedOptions = {
      color: '#0099FF',
      title: 'Bot Information',
      description:
        'Hello! I am a test bot created by bradtaniguchi and members of ' +
        'FreeCodeCamp.org to experiment with the process of building a ' +
        'Discord Bot. You can view my source code at ' +
        ' https://github.com/bradtaniguchi/discord-bot-test',
      fields: [],
      footer: { text: 'I am not affiliated with FreeCodeCamp in any way.' }
    };
    COMMANDS.forEach((commandDef) => {
      helpEmbed.fields?.push({
        name: commandDef.prefix,
        value: commandDef.description.substring(0, 1023),
        inline: false
      });
    });
    await message.author.send({ embed: helpEmbed });
    message.channel.send('Help message sent!');
  }
};
