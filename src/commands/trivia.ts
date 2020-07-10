import { CommandDef } from './command-def';
import { triviaFacts } from '../APIs/trivia-facts';
import { MessageEmbed } from 'discord.js';

export const triviaCommand: CommandDef = {
  prefix: 'trivia',
  description: 'Returns a random bit of trivia!',
  command: (message) => {
    const random = Math.floor(Math.random() * triviaFacts.length);
    const triviaEmbed = new MessageEmbed().setTitle('Random Fact!').addFields(
      {
        name: 'Fact',
        value: `${triviaFacts[random].fact}`
      },
      {
        name: 'Source',
        value: `${triviaFacts[random].source}`
      }
    );
    message.channel.send(triviaEmbed);
  }
};
