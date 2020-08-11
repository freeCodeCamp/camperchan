import { CommandDef } from './command-def';
import { MessageEmbed } from 'discord.js';

export const mod: CommandDef = {
  prefix: 'mod',
  description: 'Provides helpful mod links.',
  usage: `mod`,
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
      },
      {
        name: 'Pull Request Reviews',
        value:
          '[PRs Ready for Review](https://github.com/freeCodeCamp/freeCodeCamp/pulls?q=is%3Aopen+is%3Apr+-label%3A%22status%3A+blocked%22+-label%3A%22status%3A+merge+conflict%22+status%3Asuccess+draft%3Afalse)'
      }
    );
    message.channel.send(modEmbed);
  }
};
