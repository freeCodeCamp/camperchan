import { CommandDef } from './command-def';
import { MessageEmbed } from 'discord.js';

export const mod: CommandDef = {
  prefix: 'mod',
  description: 'Provides helpful mod links.',
  command: (message) => {
    const modEmbed = new MessageEmbed().setTitle('Helpful Links!').addFields(
      {
        name: 'Code of Conduct',
        value: 'https://freecodecamp.org/news/code-of-conduct'
      },
      {
        name: 'Moderator Handbook',
        value: 'https://forum.freecodecamp.org/t/18295'
      },
      {
        name: 'Contributing Guidelines',
        value: 'https://contribute.freecodecamp.org/'
      },
      {
        name: 'News Contributing',
        value: 'https://www.freecodecamp.org/news/developer-news-style-guide/'
      }
    );
    message.channel.send(modEmbed);
  },
  usage: `mod`
};
